const UserRouter = require("./user.route");
const ProductRouter = require("./product.route");
const CartRouter = require("./cart.route");
const AddressRouter = require("./address.route");
const OrderRouter = require("./order.route");

const Routes = [
  UserRouter,
  ProductRouter,
  CartRouter,
  AddressRouter,
  OrderRouter,
];

module.exports = Routes;
