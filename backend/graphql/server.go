package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/go-chi/render"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/graphql-go/graphql"
)

// Server will hold connection to the db as well as handlers
type Server struct {
	GqlSchema *graphql.Schema
}

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
		fmt.Printf("Unexpected errors inside ExecuteQuery: %v", result.Errors)
	}

	return result
}

// GraphQL returns an http.HandlerFunc for our /graphql endpoint
func (s *Server) GraphQL() http.HandlerFunc {
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
		result := ExecuteQuery(rBody.Query, *s.GqlSchema)

		// render.JSON comes from the chi/render package and handles
		// marshalling to json, automatically escaping HTML and setting
		// the Content-Type as application/json.
		render.JSON(w, r, result)
	}
}

func main() {
	schema, err := graphql.NewSchema(graphql.SchemaConfig{ Query: root })
	if err != nil {
		log.Fatalf("failed to create new schema, error: %v", err)
	}

	s := Server{
		GqlSchema: &schema,
	}

	// Create router and the graphql route with a Server method to handle it
	router := mux.NewRouter()
	router.HandleFunc("/graphql", s.GraphQL())

	allowedHeaders := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}) // "Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
	allowedMethods := handlers.AllowedMethods([]string{"POST", "HEAD", "OPTIONS"})
	allowedOrigins := handlers.AllowedOrigins([]string{"*"})

	if err := http.ListenAndServe(":4000", handlers.CORS(allowedHeaders, allowedMethods, allowedOrigins)(router)); err != nil {
		log.Fatal("Failed to listen on port 4000!")
	}
}