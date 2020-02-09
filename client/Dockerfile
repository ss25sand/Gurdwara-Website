# Using build to deploy
FROM node:12.2.0-alpine as build-deps

WORKDIR /app/client

ENV PATH /app/client/node_modules/.bin:$PATH

COPY . .
RUN pwd
RUN ls -a

RUN yarn install

RUN yarn global add react-scripts@3.0.1

RUN yarn run build
RUN pwd
RUN ls -a

FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /app
COPY --from=build-deps /app/client/build .
CMD ["serve", "-p", "4001", "-s", "."]


# Using start to run app:
#FROM node:12.2.0-alpine
#
#WORKDIR /app/client
#
#ENV PATH /app/client/node_modules/.bin:$PATH
#
#COPY . .
#RUN pwd
#RUN ls -a
#
#RUN yarn install
#
#RUN yarn global add react-scripts@3.0.1
#
#EXPOSE 4001
#
#CMD ["yarn", "start"]