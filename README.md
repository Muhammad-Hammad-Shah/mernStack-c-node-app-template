# MERN-C Auth Service

## Overview

The **MERN-C Auth Service** is a backend authentication service built with Express and TypeScript. It features structured logging using Winston, error handling with HTTP errors, and development tools like Nodemon and Husky for streamlined workflows.

## Project Structure

### TypeScript Configuration

- **`outDir`**: Specifies the directory where compiled JavaScript files will be stored. In this project, they are placed inside the `./dist` directory.
- **`rootDir`**: Defines the directory where the source TypeScript files reside.

### Git Hooks with Husky

- **Husky** is used for automating Git hooks, enforcing quality control before commits and pushes.

## Installation

To set up the project, install the required dependencies:

```sh
npm install express winston http-errors
```

For development dependencies, install:

```sh
npm install -D nodemon ts-node @types/express @types/winston @types/http-errors jest ts-jest @types/jest supertest @types/supertest
```

```sh

npx ts-jest config:init

```

## Logging with Winston

- **Winston** is used for structured logging.
- Logs are stored in JSON format in a dedicated file.
- The **silent** mode can be enabled to suppress unnecessary logs.

## Development

Run the development server using:

```sh
npm run dev
```

## Contributing

Pull requests are welcome! Make sure to follow best practices and test thoroughly before submitting changes.

## License

This project is licensed under the MIT License.

"test": "echo \"Error: no test specified\" && exit 1",
"test": "jest --watch --runInBand", // this is changed in package.json file for test by a library called jest

`docker build -t auth-service:dev -f docker/development/Dockerfile .`
```sh
 This command is used to build a Docker image for the Auth Service in development mode. Let's break it down:

- docker build → Command to create a Docker image.
- -t auth-service:dev → Tags the image as auth-service:dev (useful for versioning).
- -f docker/development/Dockerfile → Specifies the Dockerfile located at docker/development/Dockerfile.
- . → The dot (.) means that the current directory is used as the build context.
```
