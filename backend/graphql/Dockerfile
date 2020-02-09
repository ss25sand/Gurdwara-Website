# schedule-service/Dockerfile
FROM golang:alpine as builder

RUN apk --no-cache add git

WORKDIR /app/backend/gurdwara-graphql-server

COPY . .

#RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go install ./graphql/auth
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go install ./graphql/schedule
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -mod=vendor -a -installsuffix cgo -o graphql-server.exec ./graphql/server.go ./graphql/schema.go
# ./graphql/server.go ./graphql/types.go ./graphql/schema.go ./graphql/resolver.go


FROM alpine:latest

RUN apk --no-cache add ca-certificates

RUN mkdir /app
WORKDIR /app
COPY --from=builder /app/backend/gurdwara-graphql-server/graphql-server.exec .

CMD ["./graphql-server.exec"]