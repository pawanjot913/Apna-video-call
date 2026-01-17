require('dotenv').config();
const express = require('express');
const app = express();
const createserver = require('http').createServer;
const Server = require('socket.io');
const { ConnectToSocket } = require('./Controllers/ServerManager');
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const server = createserver(app);
const io = ConnectToSocket(server);
const PORT = process.env.PORT || 3000;
const UserRoutes = require('./Routes/UserRoutes');
const User = require('./Models/UserModel');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', UserRoutes);
app.get('/', (req, res) => {
  res.send('Server is running');
});


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    server.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });