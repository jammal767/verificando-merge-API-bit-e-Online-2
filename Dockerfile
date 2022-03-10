FROM node:12

EXPOSE 3000
WORKDIR /app
COPY package.json index.js yarn.lock .env . ./
RUN yarn install

CMD ["npm", "start"]