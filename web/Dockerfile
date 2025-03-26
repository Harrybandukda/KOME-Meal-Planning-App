FROM node:lts-alpine
WORKDIR /app
COPY package.json /app
RUN npm install --production
COPY . /app
EXPOSE 3000
RUN chown -R node /app
RUN chmod -R a+x node_modules
USER node
CMD ["npm", "start"]