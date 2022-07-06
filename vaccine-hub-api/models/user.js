const { UnauthorizedError } = require("../utils/erors");

class Use {
  static async login(credentials) {
    //user shoul dsubit their email and password
    // if any of these fields are missing, throw an error
    // lookup the user in the db by email
    // if a user is found, compare the submitted password
    //with the passsword in the db
    // if there is a match, return the user
    //if any of this fors wrong, throw an error
    throw new UnauthorizedError("Invalid email/password combo");
  }
  static async register(credentials) {
    //user shoul dsubmit their email, pw, rsvp sttus, and # of guests
    // if any of thwse filds are missing, throw ian error
    // make sure no user already exists in the system with that email
    //if one does, throw an error
    // take the users password, and hash it
    // take the users email, and lowercase it
    // create a new user in the db with all their info
    // return the user
  }
}
module.exports = User;
