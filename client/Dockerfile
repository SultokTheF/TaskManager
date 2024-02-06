FROM node:21.6.1-alpine

RUN addgroup app && adduser -S -G app app

WORKDIR /TaskManager

COPY package*.json ./

USER root
RUN npm cache clean --force && npm install --unsafe-perm
RUN chmod 777 /TaskManager/node_modules

USER app

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
