package main

import (
	"context"
	"fmt"
	"log"
	"time"

	pb "github.com/ss25sand/Gurdwara-Website/backend/schedule-service/proto/schedule"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"gopkg.in/mgo.v2/bson"
)

func CreateMongoConnection(uri string) (*mongo.Client, error) {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	return mongo.Connect(ctx, options.Client().ApplyURI(uri))
}

type mongoCollection struct {
	collection *mongo.Collection
}

type DataStore interface {
	createDummyEvents(ctx context.Context) ([]interface{}, error)
	getEvents(ctx context.Context, req *pb.EventsInfo) ([]*pb.Event, error)
}

type MongoEvent struct {
	StartDateTime string
	EndDateTime string
	Organizer string
	Title string
	Description string
}

type MongoEventSerializable struct {
	ID primitive.ObjectID `bson:"_id,omitempty"`
	StartDateTime string `bson:"startdatetime,omitempty"`
	EndDateTime string `bson:"enddatetime,omitempty"`
	Organizer string `bson:"organizer,omitempty"`
	Title string `bson:"title,omitempty"`
	Description string `bson:"description,omitempty"`
}

func (m *mongoCollection) createDummyEvents(ctx context.Context) ([]interface{}, error) {
	var allEvents []interface{}
	for i := 1; i <= 3; i++ {
		allEvents = append(allEvents, &MongoEvent{
			StartDateTime: "2011-10-05T14:48:00.000Z",
			EndDateTime:   "2011-10-05T15:48:00.000Z",
			Organizer:     "Me",
			Title:         "Test Event",
			Description:   "This is a event for testing purposes",
		})
	}
	if result, err := m.collection.InsertMany(ctx, allEvents); err != nil {
		log.Fatal("Error inserting events in mongo", err)
		return nil, err
	} else {
		fmt.Printf("Insert Ids: %v \n", result.InsertedIDs)
		return result.InsertedIDs, err
	}
}

func (m *mongoCollection) getEvents(ctx context.Context, req *pb.EventsInfo) ([]*pb.Event, error) {
	filter := bson.M{
		"startdatetime": bson.M{
			"$gte": req.StartDateTime,
		},
		"enddatetime": bson.M{
			"$lt": req.EndDateTime,
		},
	}
	fmt.Println("The filter:", filter)
	cur, err := m.collection.Find(ctx, filter)
	if err != nil || cur == nil {
		log.Fatal("Couldn't find events in mongo: ", err)
		return nil, err
	}
	fmt.Println("This is the find result", cur)
	var res []*pb.Event
	for cur.Next(ctx) {
		var template *MongoEventSerializable
		if err := cur.Decode(&template); err != nil {
			log.Fatal("Error decoding event ", err)
			return nil, err
		}
		fmt.Println("Decoded: ", *template)
		res = append(res, &pb.Event {
			ID: template.ID.Hex(),
			StartDateTime: template.StartDateTime,
			EndDateTime: template.EndDateTime,
			Organizer: template.Organizer,
			Title: template.Title,
			Description: template.Description,
		})
	}
	if err := cur.Err(); err != nil {
		log.Fatal("Error while iterating: ", err)
		return nil, err
	}
	if err := cur.Close(ctx); err != nil {
		log.Fatal("Error while closing cursor: ", err)
		return nil, err
	}
	fmt.Println("This is the db result", res)
	return res, nil
}

func (m *mongoCollection) createEvent(ctx context.Context, event *pb.Event) (interface{}, error) {
	if result, err := m.collection.InsertOne(ctx, event); err != nil {
		log.Fatal("Error inserting events in mongo", err)
		return nil, err
	} else {
		fmt.Printf("Insert Ids: %v \n", result.InsertedID)
		return result.InsertedID, err
	}
}