package main

import(
	"fmt"

	pb "github.com/ss25sand/Gurdwara-Website/backend/schedule-service/proto/schedule"

	"github.com/micro/go-micro"
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

	// Register handler
	pb.RegisterScheduleServiceHandler(srv.Server(), &service{})

	// Run the server
	if err := srv.Run(); err != nil {
		fmt.Println(err)
	}
}