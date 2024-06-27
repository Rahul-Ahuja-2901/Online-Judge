FROM node:18-alpine
WORKDIR /backend
RUN apk update && \
    apk add --no-cache g++ openjdk11 python3 py3-pip
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD ["node", "index.js"]