FROM node:lts-alpine3.16

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
COPY postcss.config.js /app/postcss.config.js
COPY tailwind.config.js /app/tailwind.config.js

RUN npm install
# install node dependencies
RUN echo "npm install in progress..." && npm ci

EXPOSE 7778

CMD [ "npm", "start" ]