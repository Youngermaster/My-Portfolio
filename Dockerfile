FROM node:18-alpine AS builder

# Declaring env
ENV NODE_ENV production

# Setting up the work directory
WORKDIR /app

# Copying all the files in our project
COPY . .

# Installing dependencies using Yarn
RUN yarn install

# Building our application
RUN yarn build

# Fetching the latest nginx image
FROM nginx

# Copying built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Copying our nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
