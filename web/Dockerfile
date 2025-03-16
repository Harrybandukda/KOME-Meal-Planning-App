FROM node:lts-alpine
WORKDIR /app
COPY package.json /app
RUN npm install --production
COPY . /app
EXPOSE 3000
RUN chown -R node /app
USER node
CMD ["npm", "start"]