FROM node:20.18.0

RUN mkdir -p /home/app/node_modules && chown -R node:node /home/app
WORKDIR /home/app
USER node
COPY --chown=node:node . .

COPY package.json .

RUN npm install

COPY . .

CMD  npm start