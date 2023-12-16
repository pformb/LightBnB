
# LightBnB Project

This repository contains a straightforward single-page Airbnb clone implemented using server-side JavaScript. The application fetches and displays information from a database through SQL queries, providing a dynamic and responsive user experience.


## Features

- Single-page architecture for a comprehensive user experience.
- Server-side rendering using JavaScript.
- Integration of SQL queries to fetch and display relevant information.
- Simplified Airbnb-like design for ease of use.

## Getting Started

To get started with LightBnB, follow these steps:

Follow these steps to set up the project locally:

1. Clone the repository to your local machine.
   
   ```
   git clone git@github.com:pformb/LightBnB.git
   ```

2. Install the project dependencies using npm.

    ```
    npm install
    ```

3. Update your database by running the following commands in your psql.

   ```
   \i migrations/01_schema.sql
   \i seeds/01_seeds.sql
   \i seeds/02_seeds.sql
   ```

## Dependencies

- bcrypt (3.0.6 or higher)
- cookie-session (1.3.3 or higher)
- express (4.17.1 or higher)
- nodemon (1.19.1 or higher)
- pg (8.11.3 or higher)


## Contributing

If you'd like to contribute to LightBnB, please fork the repository and create a pull request. We welcome any contributions or bug fixes.

## License

This project is open source and available.

## Acknowledgements

This project has brought me knowledge and skills and I want to thank Lighthouse Labs for providing the mentorship through my education.


## Product Pictures

!["Screenshot of Create Listings Page"](https://github.com/pformb/LightBnB/blob/master/docs/create-listings-page.png?raw=true)

!["Screenshot of My Listings Page"](https://github.com/pformb/LightBnB/blob/master/docs/my-listings-page.png?raw=true)

!["Screenshot of Search Listings Page"](https://github.com/pformb/LightBnB/blob/master/docs/search-listings-page.png?raw=true)

## Entity Relationship Diagram

!["Entity Relationship Diagram"](https://github.com/pformb/LightBnB/blob/master/docs/erd.png?raw=true)

### Enjoy your stay!

