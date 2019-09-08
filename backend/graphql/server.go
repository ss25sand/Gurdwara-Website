package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	pb "github.com/ss25sand/Gurdwara-Website/backend/schedule-service/proto/schedule"

	"github.com/go-chi/render"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/graphql-go/graphql"
	"github.com/micro/go-micro"
	"golang.org/x/net/context"
)

type reqBody struct {
	Query string `json:"query"`
}

// ExecuteQuery runs our graphql queries
func ExecuteQuery(query string, schema graphql.Schema) *graphql.Result {
	result := graphql.Do(graphql.Params{
		Schema:        schema,
		RequestString: query,
	})

	// Error check
	if len(result.Errors) > 0 {
		fmt.Printf("Unexpected errors inside ExecuteQuery: %v\n", result.Errors)
	}

	return result
}

// GraphQL returns an http.HandlerFunc for our /graphql endpoint
func GraphQL(s *graphql.Schema) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Check to ensure query was provided in the request body
		if r.Body == nil {
			http.Error(w, "Must provide graphql query in request body", 400)
			return
		}

		var rBody reqBody
		// Decode the request body into rBody
		err := json.NewDecoder(r.Body).Decode(&rBody)
		if err != nil {
			http.Error(w, "Error parsing JSON request body", 400)
		}

		// Execute graphql query
		result := ExecuteQuery(rBody.Query, *s)

		// render.JSON comes from the chi/render package and handles
		// marshalling to json, automatically escaping HTML and setting
		// the Content-Type as application/json.
		render.JSON(w, r, result)
	}
}

func main() {
	// Set up a connection to the server.
	service := micro.NewService(
		micro.Name("gurdwara.schedule.client"),
		micro.Version("latest"),
	)
	service.Init()

	client := pb.NewScheduleServiceClient(
		"gurdwara.schedule.service",
		service.Client(),
	)
	ctx := context.Background()

	resolver := &ScheduleResolver{client, ctx}

	schema, err := graphql.NewSchema(graphql.SchemaConfig{Query: getRootQuery(resolver)})
	if err != nil {
		log.Fatalf("failed to create new schema, error: %v", err)
	}

	// Create router and the graphql route with a Server method to handle it
	router := mux.NewRouter()
	router.HandleFunc("/graphql", GraphQL(&schema))

	allowedHeaders := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}) // "Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
	allowedMethods := handlers.AllowedMethods([]string{"POST", "HEAD", "OPTIONS"})
	allowedOrigins := handlers.AllowedOrigins([]string{"*"})

	if err := http.ListenAndServe(":4000", handlers.CORS(allowedHeaders, allowedMethods, allowedOrigins)(router)); err != nil {
		log.Fatal("Failed to listen on port 4000!")
	}
}
