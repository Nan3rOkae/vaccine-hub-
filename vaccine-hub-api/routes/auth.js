const express = require("express");
const router = express.Rputer();

router.post("/login", async (req, res, next) => {
  try {
    // take the ysers email and password and attempting to authenticate them
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    // take the users email and password, rsvp status, and the number of guests
    // and create a new user in our database
  } catch (err) {
    next(err);
  }
});
module.exports = router;
