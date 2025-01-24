FROM node:alpine

# Set the working directory
WORKDIR /application

# Copy only dependency files first for better caching
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the entire application code
COPY . .

# Build the project (e.g., transpile TypeScript to JavaScript)
RUN yarn build

# Expose the port your application runs on
EXPOSE 3000

# Command to start the application
CMD ["yarn", "dev"]
