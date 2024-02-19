const express = require("express");
const EnsureAuth = require("../middlewares/Auth.middleware");
const AddressController = require("../controllers/address.controller");
const router = express.Router();
const path = "/address";

router.get("/", EnsureAuth, AddressController.getUserAddresses);
router.post("/", EnsureAuth, AddressController.createAddress);

module.exports = { path, router };
