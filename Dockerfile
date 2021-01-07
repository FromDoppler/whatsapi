FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json app.js ./
RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]