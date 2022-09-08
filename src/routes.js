const UserController = require("./controllers/UsersController");

module.exports = [
  { endpoint: "/users", method: "GET", handler: UserController.listUsers },
];
