# Use node 22-alpine as base image
FROM node:22-alpine
WORKDIR /app

# Install pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# copy only package.json to install dependencies
COPY package.json pnpm-lock.yaml /app/
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

# copy all remaining source to /app
COPY . /app

# expose port 3000
EXPOSE 3000

# start the server
CMD node server.js