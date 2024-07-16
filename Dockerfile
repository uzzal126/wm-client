############################
# Multi-stage Docker Build #
############################

# Build Stage A #
# Using the latest Node.js runtime to install NPM packages/dependencies
# This stage helps us cache the "node_modules" directory until the "package.json" file is modified
FROM node:20.10.0-alpine as buildStageA

# Setting the working directory of build stage A
WORKDIR /client.webmanza.com

# Copying "package.json" from the project's root directory (local disk) to the container's working directory
# This excludes the files/directories mentioned in the .dockerignore file
COPY package.json .

# Installing the NPM packages/dependencies
RUN npm install --force

# Build Stage B #
# Using the latest Node.js runtime to build the project
FROM node:20.10.0-alpine as buildStageB

# Setting the working directory of build stage B
WORKDIR /client.webmanza.com

# Copying all the contents from build stage A to build stage B (current stage)
# e.g. "node_modules" directory and "package-lock.json" file
COPY --from=buildStageA /client.webmanza.com /client.webmanza.com

# Copying the entire project from current directory (local disk) to the container's working directory
# This excludes the files/directories mentioned in the .dockerignore file
COPY . .

# Building the project
RUN npm run build

CMD ["npm", "start"]