FROM node:21.6.1-alpine

RUN addgroup app && adduser -S -G app app

WORKDIR /TaskManager

COPY package*.json ./
RUN npm install

# Set permissions without chown
RUN chmod -R 755 /TaskManager

USER app

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
