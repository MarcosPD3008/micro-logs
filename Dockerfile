# Use an official Node.js runtime as a parent image
FROM node:18.18.0-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./
COPY yarn.lock ./

# Install the application dependencies
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Build the TypeScript code
RUN yarn build

# Expose the API port
EXPOSE 3000

# Define environment variables
ENV MONGODB_URI=mongodb://mongodb:27017/MicroLogs
ENV RABBITMQ_URI=amqp://rabbitmq:5672
ENV QUEUE_NAME=MicroLogs
ENV API_PORT=3000

# Start the application
CMD ["node", "dist/index.js"]
