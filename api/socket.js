module.exports = async (req, res) => {
  const server = require("http").createServer();
  const IO = require("socket.io")(server);
  
  IO.on("connection", (socket) => {
    console.log(socket);
  });
};
