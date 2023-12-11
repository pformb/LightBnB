const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb",
  port: 5432,
});

pool
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Error connecting to the database", err));

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

// Function to retrieve a user based on their email using the LightBnB database
const getUserWithEmail = function (email) {
  // Using the pool to execute a SQL query to select a user based on the provided email
  return pool
    .query("SELECT * FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1", [
      email,
    ])
    .then((result) => {
      // Assuming email is unique, so we only expect one result
      return result.rows[0];
    })
    .catch((err) => {
      // Handling any errors that might occur during the database query
      console.error(err.message);
    });
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */

// Function to retrieve a user based on their ID using the LightBnB database
const getUserWithId = function (id) {
  return pool
    .query("SELECT * FROM users WHERE id = $1 LIMIT 1", [id])
    .then((result) => {
      // Assuming user IDs are unique, so we only expect one result
      return result.rows[0];
    })
    .catch((err) => {
      // Handling any errors that might occur during the database query
      console.error(err.message);
    });
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */

// Function to add a new user to the LightBnB database
const addUser = function (user) {
  // Destructuring user object properties
  const { name, email, password } = user;

  // Using the pool to execute a SQL query to insert a new user into the 'users' table
  return pool
    .query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, password]
    )
    .then((result) => {
      // Returning the newly inserted user object, including the auto-generated ID
      return result.rows[0];
    })
    .catch((err) => {
      // Handling any errors that might occur during the database query
      console.error(err.message);
    });
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return getAllProperties(null, 2);
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = (options, limit = 10) => {
  return pool
    .query(`SELECT * FROM properties LIMIT $1`, [limit])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
