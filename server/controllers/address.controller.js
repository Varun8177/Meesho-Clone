const AddressServices = require("../services/address.service");

const AddressController = {
  getUserAddresses: async (req, res, next) => {
    const userId = req.body.user;
    try {
      const cart = await AddressServices.getUserAddressService(userId);
      res.status(200).send(cart);
    } catch (error) {
      next(error);
    }
  },
  createAddress: async (req, res, next) => {
    const userId = req.body.user;
    const data = req.body;
    try {
      const cart = await AddressServices.createAddressService(data, userId);
      res.status(200).send(cart);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = AddressController;
