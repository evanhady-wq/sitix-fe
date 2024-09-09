# React app image
FROM node:lts-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Debugging step: Check if build directory exists
RUN ls -l /app/dist

FROM nginx:latest AS prod

# Copy the build directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the NGINX configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80/tcp

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
