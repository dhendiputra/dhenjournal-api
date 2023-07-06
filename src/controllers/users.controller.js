const UserModel = require("../models/users.models");

// GET
const getAllUsers = async (req, res) => {
  try {
    const [data] = await UserModel.getAllUsers();
    res.json({
      message: "GET users success!",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "SERVER ERROR!",
      error,
    });
  }
};

// POST
const createNewUser = async (req, res) => {
  const { body } = req;
  if (!body.name || !body.email || !body.address) {
    return res.status(400).json({
      message: "Anda mengirimkan data yang salah!",
      data: null,
    });
  }
  try {
    await UserModel.createNewUser(body);
    res.status(201).json({
      message: "CREATE NEW users success!",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "SERVER ERROR!",
      error,
    });
  }
};

// PATCH
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await UserModel.updateUser(body, id);
    res.json({
      message: "UPDATE users success!",
      id: id,
      ...body,
    });
  } catch (error) {
    res.status(500).json({
      message: "SERVER ERROR!",
      error,
    });
  }
};

// DELETE
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await UserModel.deleteUser(id);
    res.json({
      message: "DELETE users success!",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "SERVER ERROR!",
      error,
    });
  }
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
