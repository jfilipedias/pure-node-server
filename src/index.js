const http = require("http");
const { URL } = require("url");

const routes = require("./routes");

const server = http.createServer((request, response) => {
  console.log(`Request method: ${request.method} | Endpoint: ${request.url}`);

  const parsedUrl = new URL(`http://localhost:3000${request.url}`);

  let { pathname } = parsedUrl;
  let id = null;

  const splittedEndpoint = pathname.split("/").filter(Boolean);

  if (splittedEndpoint.length > 1) {
    pathname = `/${splittedEndpoint[0]}/:id`;
    id = splittedEndpoint[1];
  }

  const route = routes.find(
    (route) => route.endpoint === pathname && route.method === request.method
  );

  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams);
    request.params = { id };

    response.send = (statusCode, body) => {
      response.writeHead(statusCode, { "Content-Type": "text/html" });
      response.end(JSON.stringify(body));
    };

    route.handler(request, response);
  } else {
    response.writeHead(404, { "Contetn-Type": "text/html" });
    response.end(`Cannot ${request.method} ${request.url}`);
  }
});

server.listen(3000, () =>
  console.log("Server running at http://localhost:3000")
);
