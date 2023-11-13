# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install python && make
RUN apk add --no-cache python3 make g++

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN yarn install

# Bundle app source
COPY . .

RUN yarn prisma:generate

# Creates a "dist" folder with the production build
RUN yarn build

# Expose port 3000
EXPOSE 3000

# Start the server using the production build
CMD ["node", "./dist/src/main.js"]