start:
	docker compose up -d

stop: 
	docker compose down -v --rmi all --remove-orphans
