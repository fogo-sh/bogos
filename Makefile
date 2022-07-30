pg_connection_string := postgresql://bogos:bogos-binted@127.0.0.1:5432/bogos

up:
	tilt up

down:
	tilt down

create-cluster:
	ctlptl create cluster kind --registry=ctlptl-registry

delete-cluster:
	ctlptl delete cluster kind-kind

pgcli:
	pgcli $(pg_connection_string)

backend-run:
	( cd backend && go run main.go run )

frontend-run:
	( cd frontend && npm run dev )