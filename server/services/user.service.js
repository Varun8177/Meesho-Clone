const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const HttpException = require("../exceptions/HttpException");
const UserModel = require("../models/user.model");
const twilio = require("twilio");
const nodemailer = require("nodemailer");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const fromMail = process.env.MAIL;
const mailPasscode = process.env.MAIL_PASSCODE;

const UserServices = {
  getUserService: async (userId) => {
    try {
      const isValidObjectId = mongoose.Types.ObjectId.isValid(userId);

      if (!isValidObjectId) {
        throw new HttpException(400, "Please provide a valid user id");
      }

      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new HttpException(404, "No user found");
      }

      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(500, "Error fetching user");
      }
    }
  },

  registerUserService: async (registrationDetails) => {
    try {
      const { mobile, email } = registrationDetails;

      // Check if the email is already registered
      const existingUser = await UserModel.findOne({
        $or: [{ mobile }, { email }],
      });

      if (existingUser) {
        if (existingUser.verified) {
          if (existingUser.mobile === mobile) {
            throw new HttpException(
              404,
              "mobile number already registered please login"
            );
          } else if (existingUser.email === email) {
            throw new HttpException(
              404,
              "email already registered please login"
            );
          }
          throw new HttpException(404, "user already registered please login");
        } else {
          if (existingUser.verificationToken) {
            const decodedToken = await UserServices.decodeToken(
              existingUser.verificationToken,
              existingUser.mobile
            );
            console.log(decodedToken);
            return "please enter the verification code send on your mobile number";
          } else {
            const { otp } = await UserServices.sendOtp(email);

            const token = jwt.sign({ otp }, process.env.jwtsecret, {
              expiresIn: "200s",
            });
            await UserModel.findByIdAndUpdate(existingUser._id, {
              verificationToken: token,
            });
            return `otp sent successfully to ${email}`;
          }
        }
      }

      const { otp } = await UserServices.sendOtp(email);

      const token = jwt.sign({ otp }, process.env.jwtsecret, {
        expiresIn: "100s",
      });

      const newUser = new UserModel({
        ...registrationDetails,
        verificationToken: token,
      });

      await newUser.save();
      return `otp sent successfully to ${mobile}`;
    } catch (error) {
      console.log(error);
      if (error.name === "ValidationError") {
        const validationErrors = [];

        for (const key in error.errors) {
          validationErrors.push(error.errors[key].message);
        }

        const errorMessage = `Validation error: ${validationErrors.join(", ")}`;

        throw new HttpException(400, errorMessage);
      } else if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(500, "Error creating user");
      }
    }
  },

  loginUserService: async (loginDetails) => {
    try {
      const { mobile } = loginDetails;
      if (!mobile)
        throw new HttpException(404, "please provide a mobile number");

      const user = await UserModel.findOne({ mobile, verified: true });

      if (!user)
        throw new HttpException(404, "no registered user found please sign up");

      if (user.verificationToken) {
        const decodedToken = await UserServices.decodeToken(
          user.verificationToken,
          user.mobile
        );
        console.log(decodedToken);
        return "please enter the verification code send on your email";
      } else {
        const { otp } = await UserServices.sendOtp(user.email);

        const token = jwt.sign({ otp, user }, process.env.jwtsecret, {
          expiresIn: "200s",
        });

        await UserModel.findOneAndUpdate(
          { mobile },
          { verificationToken: token }
        );
        return "otp successfully sent";
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(500, "Error logging in");
      }
    }
  },
  sendOtp: async (email) => {
    // const client = new twilio(accountSid, authToken);
    let otp = Math.floor(100000 + Math.random() * 900000);
    // try {
    //   const message = await client.messages.create({
    //     body: otp,
    //     from: twilioPhoneNumber,
    //     to: `+91${mobile}`,
    //   });
    //   return { sid: message.sid, otp };
    // } catch (error) {
    //
    // }
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: fromMail,
          pass: mailPasscode,
        },
      });
      await transporter.sendMail({
        from: fromMail,
        to: email,
        subject: "This is shoperz official service",
        text: "Thank you for choosing us",
        html: `
            <table
              style="width: 100%; background-color: rgb(244, 51, 151); text-align: center; padding: 1rem;"
            >
              <tr>
                <td>
                  <p
                    style="line-height: 1.25; font-size: 1.875rem; color: #fff; font-weight: 600; margin-bottom: 1rem;"
                  >
                    Here's your verification code
                  </p>
                  <p
                    style="line-height: 1.25; font-size: 1.5rem; color: #dbdbdb; margin-bottom: 2rem; padding: 1rem;"
                  >
                    ${otp}
                  </p>
                  <img
                    src="https://res.cloudinary.com/megamart/image/upload/f_auto,q_auto/v1/shoperz/gcammfhm41mnf0fetggp"
                    alt="login-image"
                    style="max-width: 100%; height: auto;"
                  />
                </td>
              </tr>
            </table>
          `,
      });
      return { otp };
    } catch (error) {
      console.log(error);
      throw new HttpException(400, "unable to send otp message");
    }
  },

  decodeToken: async (verificationToken, mobile) => {
    try {
      const decodedToken = jwt.verify(verificationToken, process.env.jwtsecret);
      return decodedToken;
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        await UserModel.findOneAndUpdate({ mobile }, { verificationToken: "" });
        throw new HttpException(400, "please try again");
      } else {
        // Handle other errors, if needed
        throw new HttpException(400, "Unable to send OTP message");
      }
    }
  },

  verifyotp: async (otpFromUser, mobile, use) => {
    const user = await UserModel.findOne({ mobile });
    if (!user)
      throw new HttpException(404, "no registered user found please sign up");
    if (use === "login") {
      if (user) {
        if (!user.verified) {
          throw new HttpException(404, "user not verified please sign up");
        }
        const decodedToken = await UserServices.decodeToken(
          user.verificationToken,
          user.mobile
        );
        console.log(decodedToken);
        const { otp } = decodedToken;
        if (otpFromUser === otp) {
          await UserModel.findByIdAndUpdate(user._id, {
            verificationToken: "",
          });
          const token = jwt.sign({ userId: user._id }, process.env.jwtsecret);
          return { token, user };
        } else {
          throw new HttpException(400, "incorrect otp");
        }
      }
    } else {
      if (user) {
        if (user.verified) {
          throw new HttpException(404, "user already registered please login");
        }
        const decodedToken = await UserServices.decodeToken(
          user.verificationToken,
          user.mobile
        );
        const { otp } = decodedToken;
        if (otpFromUser === otp) {
          await UserModel.findByIdAndUpdate(user._id, {
            verified: true,
            verificationToken: "",
          });
          return { message: "user successfully registered" };
        } else {
          throw new HttpException(400, "incorrect otp");
        }
      }
    }
  },
  getCurrentUser: async (userId) => {
    try {
      const user = await UserModel.findById(userId);
      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(500, "Error logging in");
      }
    }
  },
  updateCurrentUser: async (userId, changes) => {
    try {
      const user = await UserModel.findByIdAndUpdate(userId, changes, {
        new: true,
      });
      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(500, "Error logging in");
      }
    }
  },
};

module.exports = UserServices;
