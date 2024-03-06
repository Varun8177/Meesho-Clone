![image](https://github.com/Varun8177/Meesho-Clone/assets/112754116/d1b8c200-00e4-4aaf-b680-e3a0630232a9)

# Shoperz: Meesho-Clone

Shoperz is an online shopping site that allows users to buy high-quality fashion, electronics, home, and kitchen products at the lowest prices. This project is a clone of the popular e-commerce website Meesho.

## Live Link

Visit the live website [here](https://meesho-clone-frontend.vercel.app) and start shopping!

## Tech stack

- client
  - **React.js**
  - **react-icons**
  - **chakra-ui**
  - **redux-toolkit**
  - **axios**
  - **react-router-dom**

- server
  - **express**
  - **MongoDb**
  - **mongoose**
  - **cors**
  - **cloudinary**
  - **compression**
  - **dotenv**
  - **helmet**
  - **jsonwebtoken**
  - **morgan**
  - **multer**
  - **nodemailer**
  - **nodemon**

## Key Features

Features:

- User authentication and authorization (secured using email otp verification).
- Products divided into categories (Men, Women, Kids, etc.)
- Filter and sort functionality on all products pages.
- Detailed single product page with add to cart, and buy options.
- Search functionality on every page.
- Cart page with options to update quantity and delete items, and total calculation.
- Payment page with captcha for secure checkout.
- Profile section for user details and order history.
- Admin can edit , delete or add products to the platform.

## Installation and Usage

To install and run the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/Varun8177/hollow-idea-9446.git`
2. Install the dependencies:
   - open terminal in client folder and write command - `npm install`
   - open terminal in server folder and write command - `npm install`
3. Add Environment variables

- client

```
     REACT_APP_CLOUDINARY_BASE_PATH - your cloudinary base path
     REACT_APP_BASE_URL - your api base url
```

- server

```
     NODE_ENV=development
     mongoURL=MongoDB connection string for development environment
     port=Port number for the server (default: 8080)
     jwtsecret=Secret key for JWT authentication
     TWILIO_ACCOUNT_SID=Twilio account SID for SMS services
     TWILIO_AUTH_TOKEN=Twilio authentication token
     TWILIO_PHONE_NUMBER=Twilio phone number for sending SMS
     cloud_name=Cloudinary cloud name
     api_key=Cloudinary API key
     api_secret=Cloudinary API secret
     hosts=Allowed hosts for CORS (Cross-Origin Resource Sharing)
     MAIL=Email address for SMTP mailer
     MAIL_PASSCODE=Password for SMTP mailer
```

4. Start the development server:
    - client : `npm start`
    - server : `npm run dev`

## Screenshots

signup page
![image](https://github.com/Varun8177/Meesho-Clone/assets/112754116/b5522526-0754-4f63-b395-fd0e55577bcb)

login page
![image](https://github.com/Varun8177/Meesho-Clone/assets/112754116/f6a170fb-8312-4b4d-b500-73d02f47ee82)

user profile page
![image](https://github.com/Varun8177/Meesho-Clone/assets/112754116/eac3bf2c-b985-4b82-9f28-64af1a073ce8)

products page
![image](https://github.com/Varun8177/Meesho-Clone/assets/112754116/e41cce10-7fa3-4d48-b3a0-62d7cd167ed7)

product details page
![image](https://github.com/Varun8177/Meesho-Clone/assets/112754116/09f58de7-69aa-4102-b5ca-a4b83e438f6d)

cart page
![image](https://github.com/Varun8177/Meesho-Clone/assets/112754116/454b5ed4-1016-4d4a-b81b-edbe185cc2db)

payments page
![image](https://github.com/Varun8177/Meesho-Clone/assets/112754116/ce06d16a-767c-4991-9013-ec2878246448)

order history page
![image](https://github.com/Varun8177/Meesho-Clone/assets/112754116/1a24927d-6fbf-4e65-8ea1-d042fbb4d1a6)

## Author

Varun Ergurala
