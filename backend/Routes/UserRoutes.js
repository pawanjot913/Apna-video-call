const { register } = require("../Controllers/UserController");
const { login } = require("../Controllers/UserController");
const { addMeetingHistory } = require("../Controllers/UserController");
const { getuserhistory } = require("../Controllers/UserController");

const router = require("express").Router();

router.post("/register",register);
router.post("/login",login);
router.post("/add_to_activity", addMeetingHistory);
router.get("/get_activity", getuserhistory);

module.exports = router;