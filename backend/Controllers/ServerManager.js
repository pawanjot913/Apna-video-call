const { connection } = require("mongoose");
const { Server } = require("socket.io");

const ConnectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    socket.on("joinRoom", (path) => {
      if(connection[path]===undefined){
        connection[path] = [];
      }
      connection[path].push(socket.id);
      timeonline[socket.id] = Date.now();
      for (let i = 0; i < connection[path].length; i++) {
        io.to(connection[path][i]).emit("userJoined", socket.id, connection[path]);
      }
      if(messages[path]!==undefined){
        for (let i = 0; i < messages[path].length; ++i) {
          io.to(socket.id).emit("chatMessage", messages[path][i]["data"], messages[path][i]["sender"],messages[path][i]["socket-id-sender"]);
        }
      }
    });
    socket.on("signal", (toid,data) => {
      io.to(toid).emit("signal", socket.id, data);
    });
    socket.on("chatMessage", (data,sender) => {
      const [matchingroom,found] = Object.entries(connection).reduce(([Room,isFound], [key, value]) => {
        if (!isFound && value.includes(socket.id)) {
          return [key, true];
        }
        return [Room, isFound];
      }, [null, false]);

      if(found){
        if(messages[matchingroom]===undefined){
          messages[matchingroom] = [];
        }
        messages[matchingroom].push({
          "data": data,
          "sender": sender,
          "socket-id-sender": socket.id
        });
        for (let i = 0; i < connection[matchingroom].length; i++) {
          io.to(connection[matchingroom][i]).emit("chatMessage", data, sender,socket.id);
        }

      }
    });
    socket.on("disconnect", () => {
  // 1️⃣ Calculate time online
  const difference = Math.abs(Date.now() - timeOnline[socket.id]);

  let roomKey = null;

  // 2️⃣ Find the room
  for (const [key, users] of Object.entries(connections)) {
    if (users.includes(socket.id)) {
      roomKey = key;
      break;
    }
  }

  // 3️⃣ If socket was not in any room
  if (!roomKey) return;

  // 4️⃣ Notify others
  connections[roomKey].forEach(id => {
    if (id !== socket.id) {
      io.to(id).emit("userLeft", socket.id);
    }
  });

  // 5️⃣ Remove socket from room
  connections[roomKey] = connections[roomKey].filter(
    id => id !== socket.id
  );

  // 6️⃣ Delete room if empty
  if (connections[roomKey].length === 0) {
    delete connections[roomKey];
  }

  // 7️⃣ Cleanup
  delete timeOnline[socket.id];

  console.log(`User ${socket.id} disconnected after ${difference} ms`);
});

  return io;


});
}
module.exports = {
  ConnectToSocket,
};
