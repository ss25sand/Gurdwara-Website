package main

import (
	"github.com/graphql-go/graphql"
	"github.com/ss25sand/Gurdwara-Website/backend/graphql/schedule"
)

func getRootQuery(scheduleResolver *schedule.Resolver) *graphql.Object {
	fields := *schedule.GetRootQueryFields(scheduleResolver)
	return graphql.NewObject(graphql.ObjectConfig{
		Name: "Query",
		Fields: fields,
	})
}

func getRootMutation(scheduleResolver *schedule.Resolver) *graphql.Object {
	fields := *schedule.GetRootMutationFields(scheduleResolver)
	return graphql.NewObject(graphql.ObjectConfig{
		Name: "Mutation",
		Fields: fields,
	})
}