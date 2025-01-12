# # Use the latest LTS version of Node.js
# FROM node:18-alpine
#
# # Set the working directory inside the container
# WORKDIR /app
#
# # Copy package.json and package-lock.json
# COPY package*.json ./
#
# # Install dependencies
# RUN npm install --legacy-peer-deps
#
# # Copy the rest of your application files
# COPY . .
#
# # Expose the port your app runs on
# EXPOSE 3000
#
# # Define the command to run your app
# CMD ["npm", "start"]

# Build Stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Production Stage
FROM nginx:stable-alpine AS production
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
