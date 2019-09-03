package main

import (
	"context"
	"fmt"
	"log"
	"os"

	pb "github.com/ss25sand/Gurdwara-Website/backend/schedule-service/proto/schedule"

	"github.com/micro/go-micro"
)

const (
	defaultHost = "mongodb://datastore:27017"
)

func main() {
	// Create a new service. Optionally include some options here.
	srv := micro.NewService(
		// This name must match the package name given in your protobuf definition
		micro.Name("gurdwara.schedule.service"),
		micro.Version("latest"),
	)

	// Init will parse the command line flags.
	srv.Init()

	uri := os.Getenv("DB_HOST")
	if uri == "" {
		uri = defaultHost
	}
	client, err := CreateMongoConnection(uri)
	if err != nil {
		log.Panic(err)
	}
	defer client.Disconnect(context.TODO())

	eventCollection := &mongoCollection {
		client.Database("gurdwara").Collection("events"),
	}

	// Register handler
	pb.RegisterScheduleServiceHandler(srv.Server(), &handler{eventCollection})

	// Run the server
	if err := srv.Run(); err != nil {
		fmt.Println(err)
	}
}