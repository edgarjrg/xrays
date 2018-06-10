rise-db-bg:
	docker-compose -f ./orchestation/docker-compose.yml up -d postgres

destroy-db:
	docker-compose -f ./orchestation/docker-compose.yml stop postgres