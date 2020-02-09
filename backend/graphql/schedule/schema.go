package schedule

import (
	"github.com/graphql-go/graphql"
)

func GetRootQueryFields(resolver *Resolver) *graphql.Fields {
	return &graphql.Fields{
		"getMonth": &graphql.Field{ Type: Month,
			Args: graphql.FieldConfigArgument{
				"year": &graphql.ArgumentConfig{ Type: graphql.Int, },
				"month": &graphql.ArgumentConfig{ Type: MonthType, },
			},
			Resolve: resolver.GetMonthResolver,
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
	}
}

func GetRootMutationFields(resolver *Resolver) *graphql.Fields {
	return &graphql.Fields{
		"createEvent": &graphql.Field{ Type: graphql.String,
			Args: graphql.FieldConfigArgument{
				"Title": &graphql.ArgumentConfig{ Type: graphql.String, },
				"StartDateTime": &graphql.ArgumentConfig{ Type: DateTimeType, },
				"EndDateTime": &graphql.ArgumentConfig{ Type: DateTimeType, },
				"Organizer": &graphql.ArgumentConfig{ Type: graphql.String, },
				"Description": &graphql.ArgumentConfig{ Type: graphql.String, },
			},
			Resolve: resolver.CreateEventResolver,
		},
	}
}
