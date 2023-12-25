FROM node:20.8.0-alpine
WORKDIR /app
COPY package*.json ./
COPY turbo.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
