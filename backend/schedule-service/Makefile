build:
	protoc -I. --go_out=plugins=micro:. \
		proto/schedule/schedule.proto
	docker build -t schedule-service-image .

run:
	docker run -p 50052:50051 -e MICRO_SERVER_ADDRESS=:50051 -e MICRO_REGISTRY=mdns schedule-service-image