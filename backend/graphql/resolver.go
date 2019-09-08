package main

import (
	pb "github.com/ss25sand/Gurdwara-Website/backend/schedule-service/proto/schedule"

	"github.com/graphql-go/graphql"
	"golang.org/x/net/context"
)

type ScheduleResolver struct {
	client pb.ScheduleServiceClient
	ctx    context.Context
}

func (sr *ScheduleResolver) MonthResolver(p graphql.ResolveParams) (interface{}, error) {
	year := int32(p.Args["year"].(int))
	monthNum := p.Args["month"].(int32)

	req := pb.MonthInfo{
		Year:     year,
		MonthNum: monthNum,
	}
	result, err := sr.client.GetMonth(sr.ctx, &req)

	return result, err
}

func (sr *ScheduleResolver) WeekResolver(p graphql.ResolveParams) (interface{}, error) {
	return "This is some testing string!", nil
}

func (sr *ScheduleResolver) DayResolver(p graphql.ResolveParams) (interface{}, error) {
	return "This is some testing string!", nil
}
