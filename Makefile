include .env

setup:
	docker build --target dev -t ${APP_NAME} .

up:
	docker-compose up -d

restart:
	docker-compose restart

down:
	docker-compose down
