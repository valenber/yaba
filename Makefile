start:
	docker compose up -d

stop: 
	docker compose down -v --rmi local --remove-orphans

restart: stop start
