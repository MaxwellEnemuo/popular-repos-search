FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
COPY /build .

FROM node:18-alpine AS prod
WORKDIR /app
COPY --from=build /app/build /app/build
COPY --from=build /app/node_modules /app/node_modules

CMD ["node", "/app/build/app.js"]
