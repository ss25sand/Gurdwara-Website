package main

import(
	"fmt"
	"github.com/graphql-go/graphql"
	"github.com/graphql-go/graphql/language/ast"
	"time"
)

var dateTimeType = graphql.NewScalar(graphql.ScalarConfig{
	Name: "DateTime",
	Description: "DateTime is a DateTime in ISO 8601 format",
	Serialize: func(value interface{}) interface{} {
		switch value := value.(type) {
			case time.Time:
				return value.Format(time.RFC3339)
		}
		fmt.Println("Got invalid type %T", value)
		return "INVALID"
	},
	ParseValue: func(value interface{}) interface{} {
		switch tvalue := value.(type) {
			case string:
				if tval, err := time.Parse(time.RFC3339, tvalue); err != nil {
					return nil
				} else {
					return tval
				}
			default:
				return nil
		}
	},
	ParseLiteral: func(valueAST ast.Value) interface{} {
		switch valueAST := valueAST.(type) {
			case *ast.StringValue:
				return valueAST.Value
			default:
				return nil
		}
	},
},
)

var weekdayEnum = graphql.NewEnum(graphql.EnumConfig{
	Name: "Weekday",
	Values: graphql.EnumValueConfigMap{
		"MONDAY": &graphql.EnumValueConfig{
			Value: 0,
		},
		"TUESDAY": &graphql.EnumValueConfig{
			Value: 1,
		},
		"WEDNESDAY": &graphql.EnumValueConfig{
			Value: 2,
		},
		"THURSDAY": &graphql.EnumValueConfig{
			Value: 3,
		},
		"FRIDAY": &graphql.EnumValueConfig{
			Value: 4,
		},
		"SATURDAY": &graphql.EnumValueConfig{
			Value: 5,
		},
		"SUNDAY": &graphql.EnumValueConfig{
			Value: 6,
		},
	},
})

var User = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "User",
		Fields: graphql.Fields{
			"id": &graphql.Field{
				Type: graphql.ID,
			},
			"name": &graphql.Field{
				Type: graphql.String,
			},
			"username": &graphql.Field{
				Type: graphql.String,
			},
			"password": &graphql.Field{
				Type: graphql.String,
			},
			"email": &graphql.Field{
				Type: graphql.String,
			},
			"phoneNumber": &graphql.Field{
				Type: graphql.Int,
			},
		},
	},
)

var Event = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "Event",
		Fields: graphql.Fields{
			"id": &graphql.Field{
				Type: graphql.ID,
			},
			"dateTime": &graphql.Field{
				Type: graphql.DateTime,
			},
			"organizer": &graphql.Field{
				Type: graphql.String,
			},
			"description": &graphql.Field{
				Type: graphql.String,
			},
		},
	},
)

var Day = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "Day",
		Fields: graphql.Fields{
			"id": &graphql.Field{
				Type: graphql.ID,
			},
			"dateTime": &graphql.Field{
				Type: graphql.DateTime,
			},
			"weekday": &graphql.Field{
				Type: weekdayEnum,
			},
			"events": &graphql.Field{
				Type: graphql.NewList(Event),
			},
		},
	},
)

var Week = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "Day",
		Fields: graphql.Fields{
			"id": &graphql.Field{
				Type: graphql.ID,
			},
			"days": &graphql.Field{
				Type: graphql.NewList(Day),
			},
		},
	},
)

var Month = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "Month",
		Fields: graphql.Fields{
			"id": &graphql.Field{
				Type: graphql.ID,
			},
			"weeks": &graphql.Field{
				Type: graphql.NewList(Week),
			},
		},
	},
)