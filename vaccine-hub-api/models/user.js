const bcrypt = require("bcrypt");
const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");
const { UnauthorizedError, BadRequestError } = require("../utils/errors");

class User {
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
    // if any of thwse filds are missing,
    const requiredFields = [
      "first_name",
      "last_name",
      "location",
      "email",
      "password",
      "date",
    ];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body`);
      }
    });
    if (credentials.email.indexOf("0") <= 0) {
      throw new BadRequestError("Invalid email.");
    }
    // make sure no user already exists in the system with that email
    //if one does, throw an error
    const existingUser = await User.fetchUserByEmail(credentials.email);
    if (existingUser) {
      throw new BadRequestError(`Duplicate email: ${credentials.email}`);
    }
    // take the users password, and hash it
    const hashedPassword = await bcrypt.hash(
      credentials.password,
      BCRYPT_WORK_FACTOR
    );
    // take the users email, and lowercase it
    const lowercasedEmail = credentials.email.toLowerCase();
    // create a new user in the db with all their info
    const result = await db.query(
      `
    INSERT INTO users(
        first_name,
        last_name,
        email,
        location,
        password,
        date
    )
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING id,first_name,last_name,email,location,date;
    `,
      [
        credentials.first_name,
        credentials.last_name,
        lowercasedEmail,
        credentials.location,
        hashedPassword,
        credentials.date,
      ]
    );
    // return the user
    const user = result.rows[0];

    return;
  }
  static async fetchUserByEmail(email) {
    if (!email) {
      throw new BadRequestError("No email provided");
    }
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await db.query(query, [email.toLowerCase()]);
    const user = result.rows[0];
    return user;
  }
}
module.exports = User;
