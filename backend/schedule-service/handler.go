package main

import(
	pb "github.com/ss25sand/Gurdwara-Website/backend/schedule-service/proto/schedule"
)

type service struct {

}

func (s service) GetEvent(context.Context, *pb.DateTime, pb.ScheduleService_GetEventStream) error {
	panic("implement me")
}

func (s service) GetDay(context.Context, *pb.DateTime, pb.ScheduleService_GetDayStream) error {
	panic("implement me")
}

func (s service) GetWeek(context.Context, *pb.DateTime, pb.ScheduleService_GetWeekStream) error {
	panic("implement me")
}

func (s service) GetMonth(context.Context, *pb.DateTime, pb.ScheduleService_GetMonthStream) error {
	panic("implement me")
}


