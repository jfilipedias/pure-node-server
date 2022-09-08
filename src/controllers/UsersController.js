const users = require("../mocks/users");

module.exports = {
  listUsers(request, response) {
    const { order } = request.query;

    users.sort((a, b) => {
      if (order === "desc") return a.id < b.id ? 1 : -1;

      return a.id > b.id ? 1 : -1;
    });

    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(JSON.stringify(users));
  },

  getUserById(request, response) {
    const { id } = request.params;

    const user = users.find((user) => user.id === Number(id));

    if (!user) {
      response.writeHead(404, { "Content-Type": "text/html" });
      response.end(JSON.stringify({ error: "User not found" }));
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(JSON.stringify(user));
    }
  },
};
