# FROM lukechannings/deno:v1.26.2

# RUN apt-get update
# # RUN apt-get -y install openrc
# RUN apt install docker.io -y

# EXPOSE 7777

# WORKDIR /app

# COPY . .

# RUN deno cache deps.js
FROM denoland/deno:alpine-1.26.2

EXPOSE 7777

WORKDIR /app

COPY . .

RUN deno cache deps.js



CMD ["run", "--allow-net", "--allow-read", "--allow-run", "--allow-env", "--allow-write", "--no-check","--unstable","app.js" ]