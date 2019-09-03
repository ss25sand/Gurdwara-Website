package main

import (
	"context"
	"log"
	"time"

	pb "github.com/ss25sand/Gurdwara-Website/backend/schedule-service/proto/schedule"

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
	getEvents(req *pb.EventsInfo) []*pb.Event
}

func (m *mongoCollection) getEvents(ctx context.Context, req *pb.EventsInfo) ([]*pb.Event, error) {
	events, err := m.collection.Find(ctx, bson.D {
		{"StartDateTime", bson.D {
			{"$gt", req.StartDateTime},
		}},
		{"EndDateTime", bson.D {
			{"$lt", req.EndDateTime},
		}},
	})
	defer log.Fatal(events.Close(ctx))
	if err != nil {
		return nil, err
	}
	var res []*pb.Event
	for events.Next(ctx) {
		var event *pb.Event
		if err := events.Decode(event); err != nil {
			log.Fatal(err)
		}
		res = append(res, event)
	}
	return res, nil
}