const jsonServer = require("json-server");
const reset = require("json-server-reset");
const { limitWriteMiddleware } = require("../my-middleware");
// create json server and its router first
const server = jsonServer.create();
const router = jsonServer.router("db.json");
server.use(
  jsonServer.defaults({
    static: ".", // optional static server folder
    bodyParser: true,
    readOnly: false,
  })
);
// server.use(reset);
// server.use(limitWriteMiddleware);
server.db = router.db;
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
// Export the Server API
module.exports = server;
