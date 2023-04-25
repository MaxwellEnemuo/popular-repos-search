FROM node:lts-alpine AS development
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --development --silent && mv node_modules ../
COPY . .
RUN npm run build
EXPOSE 80
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
