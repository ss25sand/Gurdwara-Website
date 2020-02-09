run:
	mkdir -p $(HOME)/docker/volumes/postgres
	rm -rf $HOME/docker/volumes/postgres/data
	docker run --rm --name pg-docker -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=gurdwara -d -p 5432:5432 -v $(HOME)/docker/volumes/postgres:/var/lib/postgresql postgres
	sleep 3
	PGPASSWORD=postgres psql -U postgres -d gurdwara -h localhost -f bin/schema.sql
	PGPASSWORD=postgres psql -U postgres -d gurdwara -h localhost -f bin/data.sql

#seed:
#	PGPASSWORD=postgres psql -U postgres -d dev -h localhost -f bin/schema.sql
#   PGPASSWORD=postgres psql -U postgres -d dev -h localhost -f bin/data.sql