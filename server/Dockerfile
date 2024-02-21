FROM node:latest

WORKDIR /TaskManager

COPY package*.json ./
RUN npm install


COPY . .

EXPOSE 8080

CMD ["npm", "start"]


