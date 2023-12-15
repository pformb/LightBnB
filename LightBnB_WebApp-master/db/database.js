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
  return pool
    .query(
      `SELECT reservations.id, properties.title, properties.cost_per_night, reservations.start_date, AVG(property_reviews.rating) AS average_rating
      FROM reservations
      JOIN properties ON reservations.property_id = properties.id
      LEFT JOIN property_reviews ON properties.id = property_reviews.property_id
      WHERE reservations.guest_id = $1
      GROUP BY properties.id, reservations.id
      ORDER BY reservations.start_date
      LIMIT $2;`,
      [guest_id, limit]
    )
    .then((result) => {
      // Assuming user IDs are unique, so we only expect one result
      return result.rows;
    })
    .catch((err) => {
      // Handling any errors that might occur during the database query
      console.error(err.message);
      throw err; // Re-throw the error to handle it in the calling code
    });
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function (options, limit = 10) {
  // Initialize an array to store parameter values for the SQL query.
  const queryParams = [];
  // Initialize the main part of the SQL query, including the SELECT statement and the JOIN clause.
  let queryString = `
    SELECT properties.*, AVG(property_reviews.rating) AS average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
  `;

  // If city is provided, add a condition to filter properties based on the city.
  if (options.city) {
    // Push city value with wildcard matching to queryParams array
    queryParams.push(`%${options.city}%`);
    // Add "AND" or "WHERE" clause based on whether other conditions have been added
    if (queryParams.length > 1) {
      queryString += " AND";
    } else {
      queryString += " WHERE";
    }
    queryString += ` city LIKE $${queryParams.length} `;
  }

  // If owner_id is provided, add a condition to filter properties owned by a specific owner.
  if (options.owner_id) {
    // Push owner_id value to queryParams array
    queryParams.push(options.owner_id);
    // Add "AND" or "WHERE" clause based on whether other conditions have been added
    if (queryParams.length > 1) {
      queryString += " AND";
    } else {
      queryString += " WHERE";
    }
    queryString += ` owner_id = $${queryParams.length} `;
  }

  // Conditions for filtering properties based on the price range.
  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    // Push minimum and maximum price values (converted to cents) to queryParams array
    queryParams.push(
      options.minimum_price_per_night * 100,
      options.maximum_price_per_night * 100
    );
    // Add "AND" or "WHERE" clause based on whether other conditions have been added
    if (queryParams.length > 2) {
      queryString += " AND";
    } else {
      queryString += " WHERE";
    }
    queryString += ` cost_per_night BETWEEN $${queryParams.length - 1} AND $${
      queryParams.length
    } `;
  } else if (options.minimum_price_per_night) {
    // Push minimum price value (converted to cents) to queryParams array
    queryParams.push(options.minimum_price_per_night * 100);
    // Add "AND" or "WHERE" clause based on whether other conditions have been added
    if (queryParams.length > 1) {
      queryString += " AND";
    } else {
      queryString += " WHERE";
    }
    queryString += ` cost_per_night >= $${queryParams.length} `;
  } else if (options.maximum_price_per_night) {
    // Push maximum price value (converted to cents) to queryParams array
    queryParams.push(options.maximum_price_per_night * 100);
    // Add "AND" or "WHERE" clause based on whether other conditions have been added
    if (queryParams.length > 1) {
      queryString += " AND";
    } else {
      queryString += " WHERE";
    }
    queryString += ` cost_per_night <= $${queryParams.length} `;
  }

  // Condition for filtering properties based on the minimum rating.
  if (options.minimum_rating) {
    // Push minimum rating value to queryParams array
    queryParams.push(options.minimum_rating);
    // Use HAVING statement to filter based on average rating
    queryString += `
      GROUP BY properties.id
      HAVING AVG(property_reviews.rating) >= $${queryParams.length}
    `;
  }

  // Add ORDER BY and LIMIT clauses to complete the query.
  queryParams.push(limit);
  queryString += `
    ORDER BY MAX(cost_per_night)
    LIMIT $${queryParams.length};
  `;

  // Log the final query and parameters for debugging purposes.
  console.log(queryString, queryParams);

  // Execute the query using the pool object and return the result rows.
  return pool.query(queryString, queryParams).then((res) => res.rows);
};


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */

const addProperty = function (property) {
  // Destructuring property object properties
  const {
    owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    street,
    city,
    province,
    post_code,
    country,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms,
  } = property;

  // Using the pool to execute a SQL query to insert a new property into the 'property' table
  return pool
    .query(
      `INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, 
     cover_photo_url, cost_per_night, street, city, province, post_code, country,
     parking_spaces, number_of_bathrooms, number_of_bedrooms) VALUES ($1, $2, $3, 
     $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
      [
        owner_id,
        title,
        description,
        thumbnail_photo_url,
        cover_photo_url,
        cost_per_night * 100,
        street,
        city,
        province,
        post_code,
        country,
        parking_spaces,
        number_of_bathrooms,
        number_of_bedrooms,
      ]
    )
    .then((result) => {
      // Returning the newly inserted user object, including the auto-generated ID
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      // Handling any errors that might occur during the database query
      console.error(err.message);
    });
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
