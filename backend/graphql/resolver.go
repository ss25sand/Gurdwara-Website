package main

import(
	"github.com/graphql-go/graphql"
)

type Resolver struct {
	// micro service
}

func (r *Resolver) MonthResolver(dateTime graphql.ResolveParams) (interface{}, error) {
	return "This is some testing string!", nil
}