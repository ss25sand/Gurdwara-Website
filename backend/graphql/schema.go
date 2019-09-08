package main

import (
	"github.com/graphql-go/graphql"
)

func getRootQuery(resolver *ScheduleResolver) *graphql.Object {
	return graphql.NewObject(graphql.ObjectConfig{
		Name: "Query",
		Fields: graphql.Fields{
			"getMonth": &graphql.Field{
				Type: Month,
				Args: graphql.FieldConfigArgument{
					"year": &graphql.ArgumentConfig{
						Type: graphql.Int,
					},
					"month": &graphql.ArgumentConfig{
						Type: MonthType,
					},
				},
				Resolve: resolver.MonthResolver,
			},
			//"getDays": &graphql.Field{
			//	Type: graphql.NewList(Day),
			//	Args: graphql.FieldConfigArgument{
			//		"startDate": &graphql.ArgumentConfig{
			//			Type: DateType,
			//		},
			//		"endDate": &graphql.ArgumentConfig{
			//			Type: DateType,
			//		},
			//	},
			//	Resolve: resolver.DayResolver,
			//},
			//"getEvents": &graphql.Field{
			//	Type: Event,
			//	Args: graphql.FieldConfigArgument{
			//		"startTime": &graphql.ArgumentConfig{
			//			Type: DateType,
			//		},
			//		"endTime": &graphql.ArgumentConfig{
			//			Type: DateType,
			//		},
			//	},
			//	Resolve: resolver.DayResolver,
			//},
		}},
	)
}
