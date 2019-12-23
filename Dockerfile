FROM node:latest

RUN mkdir -p /var/www/node
WORKDIR /var/www/node

COPY package.json .
RUN npm install

CMD ["npm", "start"]