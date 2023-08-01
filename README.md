# Market Flea - Backend

## Description

Market Flea backend is a web application backend that handles user authentication, item management, and transaction history. The backend is built using Node.js, Express, and MongoDB as the database.

## Tech Stack

- Node.js - Runtime
- Express - Server Framework
- MongoDB - Database
- Mongoose - Library for MongoDB
- Git - Code Versioning
- GitHub - Code Storage and Collaboration
- CORS - Express CORS Library
- bcryptJS - User Authentication
- JsonWebToken - User Auth Tokens
- uuid v4 (Suggested) - Unique ID Generator

## Installation

1. Clone this repository from GitHub: `git clone https://github.com/JuanTorresCortes/fullstack-markt-flea-server.git`
2. Navigate to the backend directory: `cd your-repo`
3. Install the required dependencies: `npm install`

## Configuration

1. Create a MongoDB database and get the connection URL.
2. In the project's root directory, create a `.env` file and add the following variables:

MONGODB_URI=your-mongodb-connection-url
SECRET_KEY=your-secret-key-for-jsonwebtoken

## Running the App

Start the backend server:
nodemon


This will start the Node.js server using Nodemon, which will automatically reload the server when code changes are detected.

## Usage

1. The frontend will communicate with the backend API to perform actions like user registration, login, item management, and transaction history.

## Contributing

Contributions are welcome! If you have any bug fixes, improvements, or new features to add, please follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch with a descriptive name: `git checkout -b feature/your-feature-name` or `bugfix/your-bugfix-name`.
3. Make your changes and commit them: `git commit -m "Description of your changes"`.
4. Push your changes to your forked repository: `git push origin feature/your-feature-name`.
5. Create a pull request against the main repository.

## License

[MIT License](https://opensource.org/licenses/MIT)

## Contact

If you have any questions or need assistance, please feel free to contact us at support@market-flea.com.

Thank you for using Market Flea - Backend! We hope you find it useful and enjoyable. Happy selling!
