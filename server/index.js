const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const errorMiddleware = require("./middlewares/ErrorMiddleware");
const connectToDatabase = require("./config/db");
const Routes = require("./routes");
const cloudinary = require("cloudinary").v2;
const Multer = require("multer");
const HttpException = require("./exceptions/HttpException");

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

const port = process.env.port;

const app = express();

connectToDatabase();

app.use(
  cors({
    origin: ["http://localhost:3000", "/localhost:/"],
    methods: ["GET", "POST", `PUT`, `PATCH`, `DELETE`],
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

app.get("/", (req, res, next) => {
  res.status(200).send("Welcome to the server");
});

app.post("/upload", upload.single("image"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: "auto",
      folder: "shoperz/products",
    });

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    throw new HttpException(500, "something went wrong");
  }
});

Routes.map(({ path, router }) => app.use(path, router));

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`running at port ${port}`);
});
