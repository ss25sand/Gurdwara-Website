package main

import(
	"fmt"
	"strconv"
	"time"

	"github.com/graphql-go/graphql"
	"github.com/graphql-go/graphql/language/ast"
)

func serializeDate (value interface{}) interface{} {
	switch value := value.(type) {
		case time.Time:
			return value.Format("2006-02-01")
		default:
			fmt.Printf("Got invalid type %T", value)
			return "INVALID"
	}
}

func parseValueDate (value interface{}) interface{} {
	switch tvalue := value.(type) {
	case string:
		if tval, err := time.Parse("2006-02-01", tvalue); err != nil {
			return nil
		} else {
			return tval
		}
	default:
		return nil
	}
}

var DateType = graphql.NewScalar(graphql.ScalarConfig{
	Name: "Date",
	Description: "The date in yyyy-mm-dd format",
	Serialize: serializeDate,
	ParseValue: parseValueDate,
	ParseLiteral: func(valueAST ast.Value) interface{} {
		switch valueAST := valueAST.(type) {
			case *ast.StringValue:
				return parseValueDate(valueAST.Value)
			default:
				return nil
		}
	},
})

var MonthType = graphql.NewScalar(graphql.ScalarConfig{
	Name: "Date",
	Description: "Month as a number from 1 to 12",
	ParseLiteral: func(valueAST ast.Value) interface{} {
		switch valueAST := valueAST.(type) {
			case *ast.StringValue:
				if intValue, err := strconv.ParseUint(valueAST.Value, 10,32); err == nil && intValue >= 1 && intValue <= 12 {
					return intValue
				} else {
					return nil
				}
			default:
				return nil
		}
	},
})

var WeekdayType = graphql.NewScalar(graphql.ScalarConfig{
	Name: "Date",
	Description: "Weekday as a number from 0 to 6",
	ParseLiteral: func(valueAST ast.Value) interface{} {
		switch valueAST := valueAST.(type) {
			case *ast.StringValue:
				if intValue, err := strconv.ParseUint(valueAST.Value, 10,32); err == nil && intValue >= 0 && intValue <= 6 {
					return intValue
				} else {
					return nil
				}
			default:
				return nil
		}
	},
})

var Month = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "Month",
		Fields: graphql.Fields{
			"id": &graphql.Field{
				Type: graphql.ID,
			},
			"monthName": &graphql.Field{
				Type: MonthType,
			},
			"days": &graphql.Field{
				Type: graphql.NewList(Day),
			},
			"year": &graphql.Field{
				Type: graphql.Int,
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
			"date": &graphql.Field{
				Type: DateType,
			},
			"weekday": &graphql.Field{
				Type: WeekdayType,
			},
			"events": &graphql.Field{
				Type: graphql.NewList(Event),
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
			"startDateTime": &graphql.Field{
				Type: graphql.DateTime,
			},
			"endDateTime": &graphql.Field{
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