# schedule-service/Dockerfile
FROM golang:alpine as builder

RUN apk --no-cache add git

WORKDIR /app/backend/gurdwara-schedule-service

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -mod=vendor -a -installsuffix cgo -o schedule-service.exec ./schedule-service/main.go ./schedule-service/handler.go ./schedule-service/datastore.go


FROM alpine:latest

RUN apk --no-cache add ca-certificates

RUN mkdir /app
WORKDIR /app
COPY --from=builder /app/backend/gurdwara-schedule-service/schedule-service.exec .

CMD ["./schedule-service.exec"]