up:
	tilt up

down:
	tilt down

create-cluster:
	ctlptl create cluster kind --registry=ctlptl-registry

delete-cluster:
	ctlptl delete cluster kind-kind

pgcli:
	pgcli postgres://bogos:bogos-binted@127.0.0.1:5432/bogos
