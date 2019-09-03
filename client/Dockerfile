FROM node:7.10 as build-deps

WORKDIR /app/client

COPY package.json yarn.lock ./

RUN yarn

COPY . ./

RUN yarn build


FROM nginx:1.12-alpine

COPY --from=build-deps /app/client/build /usr/share/nginx/html

EXPOSE 4001

CMD ["nginx", "-g", "daemon off;"]