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

docker run --rm -it -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules --env-file ${PWD}/.env -p 3001:3001 -e NODE_ENV=development auth-service:dev

- _For Changes_

docker run --rm -it -v "%CD%":/usr/src/app -v /usr/src/app/node_modules --env-file "%CD%"\.env -p 3001:3001 -e NODE_ENV=development auth-service:dev npx nodemon --legacy-watch src/server.ts

// If container is running in interactive mode.
ctr + c

// If container is running in detached mode.
// List all running container
docker ps

// Stop the container using container id
docker stop <container id>

docker volume create <anyname for volume>
docker volume ls

### Running PostgreSQL with Docker on Windows CMD

**Command:**

```cmd
docker run --rm --name mernpg-container -e "POSTGRES_USER=root" -e "POSTGRES_PASSWORD=root" -v mernpgdata:/var/lib/postgresql/data -p 5432:5432 -d postgres
```

**Explanation:**

- `--rm`: Automatically removes the container after it stops, ensuring no leftover containers consume space.
- `--name mernpg-container`: Assigns the name **mernpg-container** to the running container for easy reference.
- `-e "POSTGRES_USER=root"`: Sets the environment variable **POSTGRES_USER** to **root**. _(Quotes are necessary in Windows CMD)_
- `-e "POSTGRES_PASSWORD=root"`: Sets the environment variable **POSTGRES_PASSWORD** to **root**.
- `-v mernpgdata:/var/lib/postgresql/data`: Mounts a Docker volume named **mernpgdata** to persist PostgreSQL data even after the container is removed.
- `-p 5432:5432`: Maps port **5432** on your local machine to port **5432** in the container, allowing access to PostgreSQL.
- `-d`: Runs the container in **detached mode** (in the background), so your terminal remains free for other commands.

---

**Accessing PostgreSQL:**
After running the command, you can connect to PostgreSQL using tools like **pgAdmin**, **DBeaver**, or via the command line:

```bash
psql -h localhost -U root -p 5432
```

**Stopping the Container:**
Since the `--rm` flag automatically removes the container on stop, you can simply stop it using:

```cmd
docker stop mernpg-container
```

**Checking Running Containers:**
To verify if your container is running:

```cmd
docker ps
```

---

This setup ensures a clean PostgreSQL instance every time you run the container, with data persistence managed via the **mernpgdata** volume.

we will be using typeORM

Install the npm package:

npm install typeorm --save

You need to install reflect-metadata shim:

npm install reflect-metadata --save

and import it somewhere in the global place of your app (for example in app.ts):

import "reflect-metadata"

for PostgreSQL or CockroachDB

npm install pg --save
