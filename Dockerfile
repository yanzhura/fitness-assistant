FROM node:16-alpine as builder
WORKDIR /app/client
COPY client/package.json .
RUN npm i
COPY client .
RUN npm run build

FROM node:16-alpine as app
WORKDIR /app
COPY server/package.json .
RUN npm i
COPY server .
COPY --from=builder /app/client/build /app/static
EXPOSE 8080
CMD [ "npm", "start" ]