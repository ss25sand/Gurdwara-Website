package main

import (
	"fmt"
	"strconv"
	"time"

	"github.com/graphql-go/graphql"
	"github.com/graphql-go/graphql/language/ast"
)

func serializeDate(value interface{}, layout string) interface{} {
	switch value := value.(type) {
	case time.Time:
		return value.Format(layout)
	case string:
		return parseValueDate(value, layout)
	default:
		fmt.Printf("Got invalid type %T", value)
		return "INVALID"
	}
}

func parseValueDate(value interface{}, layout string) interface{} {
	switch tvalue := value.(type) {
	case string:
		if tval, err := time.Parse(layout, tvalue); err != nil {
			return err
		} else {
			return serializeDate(tval, layout)
		}
	default:
		return "INVALID"
	}
}

var DateType = graphql.NewScalar(graphql.ScalarConfig{
	Name:        "DateType",
	Description: "The date in yyyy-mm-dd format",
	Serialize:   func(value interface{}) interface{} { return serializeDate(value, "2006-01-02") },
	ParseValue:  func(value interface{}) interface{} { return parseValueDate(value, "2006-01-02") },
	ParseLiteral: func(valueAST ast.Value) interface{} {
		switch valueAST := valueAST.(type) {
		case *ast.StringValue:
			return parseValueDate(valueAST.Value, "2006-01-02")
		default:
			return nil
		}
	},
})

var DateTimeType = graphql.NewScalar(graphql.ScalarConfig{
	Name:        "DateTimeType",
	Description: "The date and time in ISO 1806 format",
	Serialize:   func(value interface{}) interface{} { return serializeDate(value, time.RFC3339) },
	ParseValue:  func(value interface{}) interface{} { return parseValueDate(value, time.RFC3339) },
	ParseLiteral: func(valueAST ast.Value) interface{} {
		switch valueAST := valueAST.(type) {
		case *ast.StringValue:
			return parseValueDate(valueAST.Value, time.RFC3339)
		default:
			return nil
		}
	},
})

var MonthType = graphql.NewScalar(graphql.ScalarConfig{
	Name:        "MonthType",
	Description: "Month as a number from 1 to 12",
	Serialize: func(value interface{}) interface{} {
		println("Monthtype - Serialize error: ", value)
		return nil
	},
	ParseValue: func(value interface{}) interface{} {
		println("Monthtype - ParseValue error: ", value)
		return nil
	},
	ParseLiteral: func(valueAST ast.Value) interface{} {
		switch valueAST := valueAST.(type) {
		case *ast.StringValue, *ast.IntValue:
			intValue, err := strconv.ParseUint(valueAST.GetValue().(string), 10, 32)
			println("Monthtype error: ", intValue, err)
			if err == nil && intValue >= 1 && intValue <= 12 {
				println("intValue is returned")
				return int32(intValue)
			} else {
				return nil
			}
		default:
			return nil
		}
	},
})

func parseAndSerializeWeekday(value string) interface{} {
	intValue, err := strconv.ParseUint(value, 10, 32)
	if err == nil && intValue >= 0 && intValue <= 6 {
		return int32(intValue)
	} else {
		return nil
	}
}

var WeekdayType = graphql.NewScalar(graphql.ScalarConfig{
	Name:        "WeekdayType",
	Description: "Weekday as a number from 0 to 6",
	Serialize:   func(value interface{}) interface{} { return parseAndSerializeWeekday(strconv.Itoa(int(value.(int32)))) },
	ParseValue:  func(value interface{}) interface{} { return parseAndSerializeWeekday(strconv.Itoa(int(value.(int32)))) },
	ParseLiteral: func(valueAST ast.Value) interface{} {
		switch valueAST := valueAST.(type) {
		case *ast.StringValue, *ast.IntValue:
			return parseAndSerializeWeekday(valueAST.GetValue().(string))
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
			"weekdayNum": &graphql.Field{
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
				Type: DateTimeType,
			},
			"endDateTime": &graphql.Field{
				Type: DateTimeType,
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
