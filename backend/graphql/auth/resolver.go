package auth
//
//import (
//	"context"
//	"github.com/graphql-go/graphql"
//	"net/http"
//)
//
//type Resolver struct {
//	Host 	 string
//	Ctx    context.Context
//}
//
////func getCookieParams(graphqlParams graphql.ResolveParams, cookiesToGet map[string] string) error {
////	for cookie := range cookiesToGet {
////		value := graphqlParams.Context.Value(cookie);
////		if value == nil {
////			return fmt.Errorf("couldn't get %s from cookie", value)
////		}
////		cookiesToGet[cookie] = value.(*http.Cookie).Value
////	}
////	return nil
////}
//
//func (ar *Resolver) LoginResolver(p graphql.ResolveParams) (interface{}, error) {
//	//cookieMap := map[string]string{"token": nil}
//	//if err := getCookieParams(p, cookieMap); err != nil {
//	//	return nil, err
//	//}
//	//
//	//println("Token: ", token)
//
//	//username := p.Args["username"].(string)
//	//password := p.Args["password"].(string)
//	//result, err := http.Get(ar.host + "/login")
//
//	req, _ := http.NewRequest("POST", ar.Host + "/session", nil)
//	reqWithCxt := req.WithContext(p.Context)
//	client := &http.Client{}
//	resp, err := client.Do(reqWithCxt)
//
//	return resp, err
//}
//
//func (ar *Resolver) RegisterResolver(p graphql.ResolveParams) (interface{}, error) {
//	//token, err := getToken(p)
//	//if err != nil {
//	//	return nil, err
//	//}
//	//
//	//println("Token: ", token)
//
//	//username := p.Args["username"].(string)
//	//password := p.Args["password"].(string)
//	//email := p.Args["email"].(string)
//	//result, err := http.Get(ar.host + "/login")
//
//	req, _ := http.NewRequest("POST", ar.Host + "/user", nil)
//	reqWithCxt := req.WithContext(p.Context)
//	client := &http.Client{}
//	resp, err := client.Do(reqWithCxt)
//
//	return resp, err
//}