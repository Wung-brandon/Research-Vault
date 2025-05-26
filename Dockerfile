# Use official Node.js 20 image as the base
FROM node:20

# Set the working directory inside the container
WORKDIR /src/app

# Copy package.json and package-lock.json for dependency installation
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port 3000 to the host
EXPOSE 3000

# Start the application
CMD ["npm", "start"]