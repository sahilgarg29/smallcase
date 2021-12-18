const path = require("path");
const jsonServer = require("json-server");

const port = 5000;

const server = jsonServer.create();

const router = jsonServer.router(path.join(__dirname, "db.json"));

const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use("/api", router);

server.listen(port, () => {
  console.log("SERVER IS RUNNING ON PORT " + port);
});
