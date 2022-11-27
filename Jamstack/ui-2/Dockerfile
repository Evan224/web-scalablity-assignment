FROM node:lts-alpine3.16

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
COPY tsconfig.json /app/tsconfig.json
COPY tailwind.config.cjs /app/tailwind.config.cjs

# install node dependencies
RUN echo "npm install in progress..." && npm ci

EXPOSE 7778

CMD [ "npm", "dev" ]