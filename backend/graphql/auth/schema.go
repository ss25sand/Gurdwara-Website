package auth
//
//import (
//	"github.com/graphql-go/graphql"
//)
//
//func GetRootQueryFields(resolver *Resolver) *graphql.Fields {
//	return &graphql.Fields{
//		"login": &graphql.Field{
//			Resolve: resolver.LoginResolver,
//		},
//		"register": &graphql.Field{
//			Resolve: resolver.RegisterResolver,
//		},
//	}
//}