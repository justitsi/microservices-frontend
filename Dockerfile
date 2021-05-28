#################################################
# Container to build application code
#################################################
FROM node:14-alpine as node-build
WORKDIR /app

# Install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm ci

# Build frontend
COPY . ./
RUN npm run build

#################################################
# Container to host application code in
# production
#################################################
FROM nginx:stable-alpine as frontend-production

EXPOSE 80
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=node-build /app/build /usr/share/nginx/html/

ENTRYPOINT ["nginx", "-g", "daemon off;"]
