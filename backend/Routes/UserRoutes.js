const { register } = require("../Controllers/UserController");
const { login } = require("../Controllers/UserController");

const router = require("express").Router();

router.post("/register",register);
router.post("/login",login);
// router.post("/add_to_activity");
// router.post("/get_activity");

module.exports = router;