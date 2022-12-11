FROM node:lts-alpine3.16

WORKDIR /app

# ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json

RUN npm install

COPY . /app
# install node dependencies
RUN echo "npm install in progress..." && npm ci

EXPOSE 7778

CMD [ "npm", "start" ]


