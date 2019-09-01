package main

import(
	"github.com/graphql-go/graphql"
)

var root = graphql.NewObject(graphql.ObjectConfig{
	Name: "Query",
	Fields: graphql.Fields{
		"month": &graphql.Field{
			Type: graphql.String,
			Args: graphql.FieldConfigArgument{
				"dateTime": &graphql.ArgumentConfig{
					Type: graphql.DateTime,
				},
			},
			Resolve: (&Resolver{}).MonthResolver,
		},
	}},
)