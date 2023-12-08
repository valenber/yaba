FROM node:20.8.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "node", "src/index.js" ]
