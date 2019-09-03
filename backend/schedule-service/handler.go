package main

import (
	"fmt"
	"log"

	pb "github.com/ss25sand/Gurdwara-Website/backend/schedule-service/proto/schedule"

	"golang.org/x/net/context"
)

type handler struct {
	collection *mongoCollection
}

func isLeapYearFunc(year uint32) bool {
	if year % 4 == 0 {
		if year % 100 == 0 {
			if year % 400 == 0 {
				return true
			} else {
				return false
			}
		} else {
			return true
		}
	} else {
		return false
	}
}

func getDoomsDayByCentury (year uint32) uint32 {
	if (year - 3) % 4 == 0 {
		return 3
	} else if (year - 4) % 4 == 0 {
		return 2
	} else if (year - 5) % 4 == 0 {
		return 0
	} else {
		return 5
	}
}

func getDoomsDayByMonthMap(isLeapYear bool) map[uint32]uint32 {
	doomsDayByMonth := map[uint32]uint32 {
		3: 14,
		4: 4,
		5: 9,
		6: 6,
		7: 11,
		8: 8,
		9: 5,
		10: 10,
		11: 7,
		12: 12,
	}
	if isLeapYear {
		doomsDayByMonth[1] = 4
		doomsDayByMonth[2] = 29
	} else {
		doomsDayByMonth[1] = 3
		doomsDayByMonth[2] = 28
	}
	return doomsDayByMonth
}

func getMonthNumberToNumberOfDaysInMonthMap(isLeapYear bool) map[uint32]uint32 {
	monthNumberToNumberOfDaysInMonthMap := map[uint32]uint32 {
		1: 31,
		3: 31,
		4: 30,
		5: 31,
		6: 30,
		7: 31,
		8: 31,
		9: 30,
		10: 31,
		11: 30,
		12: 31,
	}
	if isLeapYear {
		monthNumberToNumberOfDaysInMonthMap[2] = 29
	} else {
		monthNumberToNumberOfDaysInMonthMap[2] = 28
	}
	return monthNumberToNumberOfDaysInMonthMap
}

func (h *handler) GetMonth(ctx context.Context, req *pb.MonthInfo, res *pb.Month) error {
	isLeapYear := isLeapYearFunc(req.Year)
	doomsDayByCentury := getDoomsDayByCentury(req.Year)
	doomsDayByMonthMap := getDoomsDayByMonthMap(isLeapYear)
	doomsDay := (doomsDayByCentury + ((req.Year % 100) / 12) + (req.Year % 100) % 12 + ((req.Year % 100) % 12) / 4) % 7
	dateOfDoomsDayForMonthInfo := doomsDayByMonthMap[doomsDay]
	numberOfDaysForMonthInfo := getMonthNumberToNumberOfDaysInMonthMap(isLeapYear)[req.MonthNum]
	res.MonthNum = req.MonthNum
	res.Year = req.Year
	for i := uint32(1); i <= numberOfDaysForMonthInfo; i++ {
		res.Days[i-1].Date = fmt.Sprintf("%d-%d-%d", req.Year, req.MonthNum, i)
		res.Days[i-1].WeekdayNum = (doomsDay + dateOfDoomsDayForMonthInfo - i) % 7
		events, err := h.collection.getEvents(ctx, &pb.EventsInfo{
			StartDateTime: fmt.Sprintf("%d-%d-%dT12:00:00.000Z", req.Year, req.MonthNum, i),
			EndDateTime: fmt.Sprintf("%d-%d-%dT12:00:00.000Z", req.Year, req.MonthNum, i+1),
		})
		if err != nil {
			log.Fatal("An error occurred while fetching events.")
			return err
		}
		for _, e := range events {
			fmt.Println(res.Days[i-1].Events, res.Days[i-1].Events[0])
			eventTemplate := res.Days[i-1].Events[0]
			eventTemplate.ID = e.ID
			eventTemplate.StartDateTime = e.StartDateTime
			eventTemplate.EndDateTime = e.EndDateTime
			eventTemplate.Organizer = e.Organizer
			eventTemplate.Description = e.Description
			res.Days[i-1].Events = append(res.Days[i-1].Events, eventTemplate)
		}
	}
}

func (h *handler) GetDays(ctx context.Context, req *pb.DaysInfo, res *pb.ScheduleService_GetDaysStream) error {
	panic("implement me")
}

func (h *handler) GetEvents(ctx context.Context, req *pb.EventsInfo, res *pb.ScheduleService_GetEventsStream) error {
	panic("implement me")
}



