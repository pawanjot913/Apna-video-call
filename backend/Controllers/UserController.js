const bcrypt = require("bcrypt");
const User = require("../Models/UserModel");
const crypto = require("crypto");
const Meeting = require("../Models/MeetingModel");


const register = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      password: hashedPassword
    });

    console.log({ name, username, password, hashedPassword }); // debug

    await newUser.save();

    // ✅ Use numeric status code directly
    return res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ message: "Error registering user", error });
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = crypto.randomBytes(64).toString("hex");
    user.token.push(token);
    await user.save();

    return res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: "Error logging in", error });
  }
};


const addMeetingHistory = async (req, res) => {
  const { token, meetingId } = req.body;
  try {
    const user = await User.findOne({ token });
    const meeting = new Meeting({ userId: user.username, meetingId });
   

    await meeting.save();
    return res.status(200).json({ message: "Meeting history added successfully" });
  } catch (error) {
    console.error("ADD MEETING HISTORY ERROR:", error);
    return res.status(500).json({ message: "Error adding meeting history", error });
  } 
};
const getuserhistory = async (req, res) => {
  const {token} = req.query;
  try {
    const user = await User.findOne({token: token});
    if(!user){
      return res.status(400).json({message: "Invalid token"});
    }
    const meeting = await Meeting.find({userId: user.username})
    res.json(meeting);

  } catch (error) {
    console.error("GET USER HISTORY ERROR:", error);
    return res.status(500).json({ message: "Error fetching user history", error });
  }
};
module.exports = { register, login, getuserhistory, addMeetingHistory };