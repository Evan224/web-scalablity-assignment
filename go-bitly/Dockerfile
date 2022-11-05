# Installs Node.js image
FROM golang:1.16-alpine

# sets the working directory for any RUN, CMD, COPY command
# all files we put in the Docker container running the server will be in /usr/src/app (e.g. /usr/src/app/package.json)
WORKDIR /app

# set the environment variables
ENV PGHOST=database-server
ENV PGUSER=username 
ENV PGPASSWORD=password
ENV PGDATABASE=database
ENV PGPORT=5432

# Copies package.json, package-lock.json, tsconfig.json, .env to the root of WORKDIR
COPY go.mod ./
COPY go.sum ./

RUN go mod download
COPY *.go ./
# Installs all packages
RUN go get github.com/gin-gonic/gin/binding@v1.8.1
RUN go build -o /docker-gs-ping

EXPOSE 7777
# Runs the dev npm script to build & start the server
CMD [ "/docker-gs-ping" ]