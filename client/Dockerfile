FROM node:21.6.1-alpine

RUN addgroup app && adduser -S -G app app

WORKDIR /TaskManager

USER app

# Set the npm cache directory to a user-writable location
ENV NPM_CONFIG_CACHE=/TaskManager/node_modules/.cache/npm

COPY package*.json ./

RUN npm cache clean --force && npm install --unsafe-perm

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
