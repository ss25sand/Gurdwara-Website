package schedule

import (
	"context"
	"github.com/graphql-go/graphql"
	pb "github.com/ss25sand/Gurdwara-Website/backend/schedule-service/proto/schedule"
)

type Resolver struct {
	Client pb.ScheduleServiceClient
	Ctx    context.Context
}

func (sr *Resolver) GetMonthResolver(p graphql.ResolveParams) (interface{}, error) {
	year := int32(p.Args["year"].(int))
	monthNum := p.Args["month"].(int32)

	req := pb.MonthInfo {
		Year:     year,
		MonthNum: monthNum,
	}
	result, err := sr.Client.GetMonth(sr.Ctx, &req)

	return result, err
}

func (sr *Resolver) WeekResolver(p graphql.ResolveParams) (interface{}, error) {
	return "This is some testing string!", nil
}

func (sr *Resolver) DayResolver(p graphql.ResolveParams) (interface{}, error) {
	return "This is some testing string!", nil
}

func (sr *Resolver) CreateEventResolver(p graphql.ResolveParams) (interface{}, error) {
	req := pb.Event {
		ID: "",
		Title: p.Args["Title"].(string),
		StartDateTime: p.Args["StartDateTime"].(string),
		EndDateTime: p.Args["EndDateTime"].(string),
		Organizer: p.Args["Organizer"].(string),
		Description: p.Args["Description"].(string),
	}
	result, err := sr.Client.CreateEvent(sr.Ctx, &req)

	return result, err
}