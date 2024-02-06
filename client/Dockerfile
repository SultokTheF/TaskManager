FROM node:21.5-alpine

RUN addgroup app && adduser -S -G app app

WORKDIR /TaskManager

USER app


ENV NPM_CONFIG_CACHE=/TaskManager/node_modules/.cache/npm

COPY package*.json ./

RUN npm cache clean --force && npm install --unsafe-perm

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
