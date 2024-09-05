# Micro Logs Service

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Pre-requisites](#prerequisites)
- [Environment Variables](#environment-variables)
   - [Steps](#steps)
- [Getting Started](#getting-started)
   - [Local Development](#local-development)
   - [Docker](#docker)
- [API Documentation](#api-documentation)
- [Test](#test)


## Project Description

Micro Logs Service is a Node.js application designed to handle log management using MongoDB for storage and RabbitMQ for message queuing. This service is capable of processing logs through a queue, storing them in a MongoDB database, and providing an API for accessing and managing the logs.

## Features

- **Log Processing**: Processes logs from a RabbitMQ queue and stores them in MongoDB.
- **REST API**: Provides a RESTful API for accessing and managing the logs.
- **Docker Support**: Easily deployable using Docker and Docker Compose.

## Prerequisites

Before setting up the project, ensure you have the following software installed on your system:

**1. Node.js**
- **Version**: 18.18.0 or higher
- **Installation**: You can download Node.js from the [official website](https://nodejs.org/). For Linux and macOS, you might consider using a version manager like `nvm` to manage multiple Node.js versions.

**2. MongoDB**
- **Version**: 4.4 or higher
- **Installation**: You can download MongoDB from the [official website](https://www.mongodb.com/try/download/community). Follow the instructions specific to your operating system.

  - **Running MongoDB Locally**: 
    ```bash
    mongod --dbpath /path/to/your/db
    ```

  - **Running MongoDB with Docker**:
    ```bash
    docker run --name mongodb -d -p 27017:27017 -v mongodb_data:/data/db mongo:4.4
    ```

  - Alternatively, use a cloud-hosted MongoDB instance like MongoDB Atlas.

**3. RabbitMQ**
- **Version**: 3.x or higher
- **Installation**: You can download RabbitMQ from the [official website](https://www.rabbitmq.com/download.html). Ensure that Erlang/OTP is installed, as RabbitMQ requires it.

  - **Running RabbitMQ Locally**:
    After installation, start RabbitMQ with:
    ```bash
    rabbitmq-server
    ```

  - **Running RabbitMQ with Docker**:
    ```bash
    docker run --name rabbitmq -d -p 5672:5672 -p 15672:15672 rabbitmq:3-management
    ```

  - Access the RabbitMQ management console at `http://localhost:15672` after enabling the management plugin.

**4. Docker** (Optional, for running with Docker Compose)
- **Version**: Latest
- **Installation**: You can download Docker from the [official website](https://www.docker.com/get-started).

**5. Docker Compose** (Optional, for running with Docker Compose)
- **Version**: Latest
- **Installation**: Docker Compose usually comes with Docker Desktop on Windows and macOS. For Linux, you can install it separately by following the [official instructions](https://docs.docker.com/compose/install/).

**6. Yarn** (Optional, as an alternative to npm)
- **Version**: Latest
- **Installation**: You can install Yarn globally using npm:
  ```bash
  npm install -g yarn
    ```

## Environment Variables

Before running the project, make sure to configure your environment variables. The project provides a `.example.env` file that you can use as a template.

### Steps:

1. Rename `.example.env` to `.env`:
   ```bash
   mv .example.env .env
    ```

2. Update the `.env` file with your configuration.

## Getting Started

### Local Development
To run locally, follow these steps:

1. Install the project dependencies:
   ```yarn ``` or ```npm install```

2. Start the project:
   ```yarn start``` or ```npm run start```

3. The project will be available at `http://localhost:{your-env-port}` and documentation in `http://localhost:{your-env-port}/api-docs`.

### Docker
To run using Docker, follow these steps:

1. Build the Docker image:
   ```bash
   docker-compose build
   ```
2. Start the Docker container:
   ```bash
    docker-compose up
    ```
3. The project will be available at `http://localhost:{your-env-port}` and documentation in `http://localhost:{your-env-port}/api-docs`.

## API Documentation
The API documentation is available at `http://localhost:{your-env-port}/api-docs`.

## Consumer Usage
For usage information go to [docs folder](./docs)

## Test

A Sender is provided on [sender.ts](./test/sender/sender.ts) to send logs to the service. To run the test, follow these steps:

1. Run steps in the [Local Development](#local-development) section.

2. Start the sender:
   ```bash
   yarn test:sender
   ```