FROM node:18-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3060

CMD ["node", "app.js"]
