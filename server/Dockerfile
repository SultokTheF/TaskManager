FROM node:21.6.1-alpine

RUN addgroup app && adduser -S -G app app

WORKDIR /TaskManager

COPY package*.json ./
RUN npm install

RUN chmod -R 755 /TaskManager
RUN chmod 777 /TaskManager/node_modules

USER app

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
