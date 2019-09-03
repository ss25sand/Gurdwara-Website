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

func isLeapYearFunc(year int32) bool {
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

func getDoomsDayByCentury (century int32) int32 {
	if (century - 3) % 4 == 0 {
		return 3
	} else if (century - 4) % 4 == 0 {
		return 2
	} else if (century - 5) % 4 == 0 {
		return 0
	} else {
		return 5
	}
}

func getDoomsDayByMonthMap(isLeapYear bool) map[int32]int32 {
	doomsDayByMonth := map[int32]int32 {
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

func getMonthNumberToNumberOfDaysInMonthMap(isLeapYear bool) map[int32]int32 {
	monthNumberToNumberOfDaysInMonthMap := map[int32]int32 {
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

func makePos(value int32) int32 {
	if value < 0 {
		return makePos(value + 7)
	}
	return value
}

func getWeekdayNum(doomsDay int32, doomsDate int32, i int32) int32 {
	//fmt.Println(doomsDay, doomsDate, i)
	if doomsDate > i {
		//fmt.Println(doomsDay - (doomsDate - i), (doomsDay - (doomsDate - i)) % 7)
		return makePos((doomsDay - (doomsDate - i)) % 7)
	} else {
		//fmt.Println(doomsDay + (doomsDate + i), (doomsDay + (doomsDate + i)) % 7)
		return makePos((doomsDay + (doomsDate + i)) % 7)
	}
}

func getMonthInfoForDate(numberOfDaysForCurr int32, monthNumCurr int32, yearCurr int32, i int32) *pb.MonthInfo {
	if i <= 0 {
		if monthNumCurr - 1 == 0 {
			return &pb.MonthInfo{
				Year:                 yearCurr - 1,
				MonthNum:             12,
			}
		} else {
			return &pb.MonthInfo{
				Year:                 yearCurr,
				MonthNum:             monthNumCurr - 1,
			}
		}
	} else if i > numberOfDaysForCurr {
		if monthNumCurr + 1 == 13 {
			return &pb.MonthInfo{
				Year:                 yearCurr + 1,
				MonthNum:             1,
			}
		} else {
			return &pb.MonthInfo{
				Year:                 yearCurr,
				MonthNum:             monthNumCurr + 1,
			}
		}
	} else {
		return &pb.MonthInfo{
			Year:                 yearCurr,
			MonthNum:             monthNumCurr,
		}
	}
}

func (h *handler) GetMonth(ctx context.Context, req *pb.MonthInfo, res *pb.Month) error {
	// get current month dooms day info
	isCurrLeapYear := isLeapYearFunc(req.Year)
	currDoomsDayByCentury := getDoomsDayByCentury(req.Year / 100)
	currDoomsDayByMonthMap := getDoomsDayByMonthMap(isCurrLeapYear)
	currDoomsDay := (currDoomsDayByCentury + ((req.Year % 100) / 12) + (req.Year % 100) % 12 + ((req.Year % 100) % 12) / 4) % 7
	dateOfDoomsDayForCurr := currDoomsDayByMonthMap[req.MonthNum]
	numberOfDaysForCurr := getMonthNumberToNumberOfDaysInMonthMap(isCurrLeapYear)[req.MonthNum]
	firstOfMonthDay := getWeekdayNum(currDoomsDay, dateOfDoomsDayForCurr, 1)
	lastOfMonthDay := getWeekdayNum(currDoomsDay, dateOfDoomsDayForCurr, numberOfDaysForCurr)
	fmt.Println("Algorithm info:", isCurrLeapYear, currDoomsDayByCentury, currDoomsDay, dateOfDoomsDayForCurr, numberOfDaysForCurr)
	// get previous month info
	var numberOfDaysForPrev int32
	if req.MonthNum - 1 == 0 {
		isPrevLeapYear := isLeapYearFunc(req.Year - 1)
		numberOfDaysForPrev = getMonthNumberToNumberOfDaysInMonthMap(isPrevLeapYear)[12]
	} else {
		numberOfDaysForPrev = getMonthNumberToNumberOfDaysInMonthMap(isCurrLeapYear)[req.MonthNum - 1]
	}
	// create response
	res.MonthNum = req.MonthNum
	res.Year = req.Year
	for i := 1 - firstOfMonthDay; i < numberOfDaysForCurr + 6 - lastOfMonthDay; i++ {
		monthInfo := getMonthInfoForDate(numberOfDaysForCurr, req.MonthNum, req.Year, i)
		var resDayDate int32
		if i <= 0 {
			resDayDate = numberOfDaysForPrev + i
		} else if i > numberOfDaysForCurr {
			resDayDate = i - numberOfDaysForCurr
		} else {
			resDayDate = i
		}
		res.Days = append(res.Days, &pb.Day{
			ID:                   "",
			Date:                 fmt.Sprintf("%04d-%02d-%02d", monthInfo.Year, monthInfo.MonthNum, resDayDate),
			WeekdayNum:           makePos((firstOfMonthDay + i - 1) % 7),
			Events: 							nil,
		})
		events, err := h.collection.getEvents(ctx, &pb.EventsInfo{
			StartDateTime: fmt.Sprintf("%04d-%02d-%02dT12:00:00.000Z", monthInfo.Year, monthInfo.MonthNum, resDayDate),
			EndDateTime: fmt.Sprintf("%04d-%02d-%02dT12:00:00.000Z", monthInfo.Year, monthInfo.MonthNum, resDayDate + 1),
		})
		if err != nil {
			log.Fatal("An error occurred while fetching events: ", err)
			return err
		}
		for _, e := range events {
			event := &pb.Event{
				ID:                   e.ID,
				StartDateTime:        e.StartDateTime,
				EndDateTime:          e.EndDateTime,
				Organizer:            e.Organizer,
				Title:								e.Title,
				Description:          e.Description,
			}
			res.Days[i + firstOfMonthDay - 1].Events = append(res.Days[i + firstOfMonthDay - 1].Events, event)
		}
		//fmt.Println("Current days array:", res.Days)
	}
	//fmt.Println("Final res: ", res)
	return nil
}

//func (h *handler) GetDays(ctx context.Context, req *pb.DaysInfo, res *pb.ScheduleService_GetDaysStream) error {
//	return nil
//}
//
//func (h *handler) GetEvents(ctx context.Context, req *pb.EventsInfo, res *pb.ScheduleService_GetEventsStream) error {
//	return nil
//}



