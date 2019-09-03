package main

import(
	pb "github.com/ss25sand/Gurdwara-Website/backend/schedule-service/proto/schedule"

	"github.com/graphql-go/graphql"
	"golang.org/x/net/context"
)

type ScheduleResolver struct {
	client pb.ScheduleServiceClient
	ctx context.Context
}

func (sr *ScheduleResolver) MonthResolver(p graphql.ResolveParams) (interface{}, error) {
	year := p.Args["year"].(uint32)
	monthNum := p.Args["month"].(uint32)

	req := pb.MonthInfo {
		Year: year,
		MonthNum: monthNum,
	}

	return sr.client.GetMonth(sr.ctx, &req), nil
}

func (sr *ScheduleResolver) WeekResolver(p graphql.ResolveParams) (interface{}, error) {
	return "This is some testing string!", nil
}

func (sr *ScheduleResolver) DayResolver(p graphql.ResolveParams) (interface{}, error) {
	return "This is some testing string!", nil
}