
# LightBnB Project

LightBnB is a simple app that will revolutionize the travel industry. It will allow home owners to rent out their homes to people on vacation, creating an alternative to hotels and bed and breakfasts (built for Lighthouse Labs web development course, designed to learn skills in SQL and Javascript). 


## Features

- Create User/ Log In
- Create Property Listing
- Search Property Listings
- View Property Listings 

## Getting Started

To get started with LightBnB, follow these steps:

Clone the repository to your local machine (SSH):

```shell
git clone git@github.com:pformb/LightBnB.git
```

 Install the required dependencies:

```shell
npm install
```

Start the Tweeter server:

```shell
node npm run local
```

Open your web browser and navigate to http://localhost:3000


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

## Project Structure

```
.
├── db
│   ├── json
│   └── database.js
├── public
│   ├── javascript
│   │   ├── components 
│   │   │   ├── header.js
│   │   │   ├── login_form.js
│   │   │   ├── new_property_form.js
│   │   │   ├── property_listing.js
│   │   │   ├── property_listings.js
│   │   │   ├── search_form.js
│   │   │   └── signup_form.js
│   │   ├── libraries
│   │   ├── index.js
│   │   ├── network.js
│   │   └── views_manager.js
│   ├── styles
│   │   ├── main.css
│   │   └── main.css.map
│   └── index.html
├── routes
│   ├── apiRoutes.js
│   └── userRoutes.js
├── styles  
│   ├── _forms.scss
│   ├── _header.scss
│   ├── _property-listings.scss
│   └── main.scss
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

* `db` contains all the database interaction code.
  * `json` is a directory that contains a bunch of dummy data in `.json` files.
  * `database.js` is responsible for all queries to the database. It doesn't currently connect to any database, all it does is return data from `.json` files.
* `public` contains all of the HTML, CSS, and client side JavaScript. 
  * `index.html` is the entry point to the application. It's the only html page because this is a single page application.
  * `javascript` contains all of the client side javascript files.
    * `index.js` starts up the application by rendering the listings.
    * `network.js` manages all ajax requests to the server.
    * `views_manager.js` manages which components appear on screen.
    * `components` contains all of the individual html components. They are all created using jQuery.
* `routes` contains the router files which are responsible for any HTTP requests to `/users/something` or `/api/something`. 
* `styles` contains all of the sass files. 
* `server.js` is the entry point to the application. This connects the routes to the database.


## Final Product

!["Screenshot of Create Listings Page"](https://github.com/pformb/LightBnB/blob/master/docs/create-listings-page.png?raw=true)

!["Screenshot of My Listings Page"](https://github.com/pformb/LightBnB/blob/master/docs/my-listings-page.png?raw=true)

!["Screenshot of Search Listings Page"](https://github.com/pformb/LightBnB/blob/master/docs/search-listings-page.png?raw=true)


### Enjoy your stay!

