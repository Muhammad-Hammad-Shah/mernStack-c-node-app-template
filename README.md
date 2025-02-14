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

Initialize Jest for TypeScript:

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

## Testing

The test script is configured to use Jest:

```json
"test": "jest --watch --runInBand"
```

Run tests using:

```sh
npm test
```

## Docker Setup

### Building the Docker Image

```sh
docker build -t auth-service:dev -f docker/development/Dockerfile .
```

**Explanation:**

- `docker build`: Command to create a Docker image.
- `-t auth-service:dev`: Tags the image as `auth-service:dev` (useful for versioning).
- `-f docker/development/Dockerfile`: Specifies the Dockerfile located at `docker/development/Dockerfile`.
- `.`: Uses the current directory as the build context.

### Running the Docker Container

```sh
docker run --rm -it -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules --env-file ${PWD}/.env -p 3001:3001 -e NODE_ENV=development auth-service:dev
```

**For Changes (with Nodemon):**

```sh
docker run --rm -it -v "%CD%":/usr/src/app -v /usr/src/app/node_modules --env-file "%CD%"\.env -p 3001:3001 -e NODE_ENV=development auth-service:dev npx nodemon --legacy-watch src/server.ts
```

### Stopping Docker Containers

- **If running in interactive mode:**

    - Press `Ctrl + C`.

- **If running in detached mode:**
    - List all running containers:
        ```sh
        docker ps
        ```
    - Stop the container using the container ID:
        ```sh
        docker stop <container_id>
        ```

### Managing Docker Volumes

- Create a volume:
    ```sh
    docker volume create <volume_name>
    ```
- List volumes:
    ```sh
    docker volume ls
    ```

## Running PostgreSQL with Docker on Windows CMD

### Command

```cmd
docker run --rm --name mernpg-container -e "POSTGRES_USER=root" -e "POSTGRES_PASSWORD=root" -v mernpgdata:/var/lib/postgresql/data -p 5432:5432 -d postgres
```

### Explanation

- `--rm`: Automatically removes the container after it stops.
- `--name mernpg-container`: Names the container `mernpg-container`.
- `-e "POSTGRES_USER=root"`: Sets the PostgreSQL user to `root`.
- `-e "POSTGRES_PASSWORD=root"`: Sets the PostgreSQL password to `root`.
- `-v mernpgdata:/var/lib/postgresql/data`: Mounts a Docker volume named `mernpgdata` for data persistence.
- `-p 5432:5432`: Maps port 5432 on your machine to the container.
- `-d`: Runs the container in detached mode.

### Accessing PostgreSQL

Connect using tools like **pgAdmin**, **DBeaver**, or via the command line:

```bash
psql -h localhost -U root -p 5432
```

### Stopping the PostgreSQL Container

Since the `--rm` flag removes the container upon stopping, you can stop it using:

```cmd
docker stop mernpg-container
```

### Checking Running Containers

```cmd
docker ps
```

## Using TypeORM

Install TypeORM and related dependencies:

```sh
npm install typeorm reflect-metadata pg
```

Import `reflect-metadata` in your main file (e.g., `app.ts`):

```typescript
import 'reflect-metadata';
```

## Environment Configuration

To manage environment-specific settings, use the following configuration:

```typescript
config({ path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`) });
```

This dynamically loads environment variables based on the current `NODE_ENV`.

## Best Practices

- **Controller Files:** Should only contain TypeScript code for consistency and maintainability.
- **Testing:** Ideally, each test should have its own `expect()` statement. However, in cases where conditions are highly related, multiple assertions can be combined in one test.

data base k realated jtna b kam h wo sara dosri file " services" m hona chahiye controller ko lightwieght rkna h , controller m sirf framework relate code hona chahiye

agr hm service layer ko framework sy alag rkhty hn tw best practice b aur bht kam ka b hota h for later uses.

class banane k bad usko dosri file m ya kahi aur use krne k liye uska instance bana na chahiye lazmi ( best practices )

BP = best practices

- jese k hamari controllers ki file coupled hogayi h with services file ye BP nhi h balky aik contructor bana kr `dependency injection` kr k use krlengy


kabi b roles etc jesi cheezon ko hardcoat "admin" , "customer" nhi likhna chahiye blky ya `enum` bana kr ya `object` bana kr use krna chahiye >>>>>> jo k hm aik alag file  m b rkh skty hn jese `constants/index.ts` etc