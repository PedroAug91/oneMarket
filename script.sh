#! /usr/bin/env bash

# Colors and other pretty stuff :)
RESET="\e[0m"
BOLD="\e[1m"
ITALIC="\e[3m"

CYANBG="\e[48;5;25m"
REDBG="\e[48;5;160m"

INFOTAG="  ${CYANBG}${BOLD} INFO ${RESET}"
ERRORTAG="  ${REDBG}${BOLD} ERROR ${RESET}"
PREFIX="${BOLD}> ${RESET}"

usage() {
	echo -e "\nThis is a simple CLI to help ${ITALIC}${BOLD}you${RESET}, the developer, run this project without headaches =)"
	echo -e "I made this project as my entry to a fullstack developer position at Super1"
	echo -e "\n${INFOTAG} ${BOLD}Below are all the available script options and their respective descriptions:${RESET}"
	echo -e "\n${PREFIX}${BOLD}Usage:${RESET} $(basename "$0") [OPTIONS]"
	echo -e "${PREFIX}${BOLD}Options:${RESET}"
	printf "  %-15s %s\n" "-h, --help"    "Show this help"
	printf "  %-15s %s\n" "-d, --docker"  "Run docker containers"
	printf "  %-15s %s\n" "-b, --build"   "Build and run docker containers"
	printf "  %-15s %s\n" "-v, --volumes" "Stop docker containers and remove volumes"
	printf "  %-15s %s\n" "-c, --codegen" "Run Kysely-Codegen to infer database types"
	printf "  %-15s %s\n" "-m, --migrate" "Run all migrations"
	printf "  %-15s %s\n" "-r, --revert"  "Revert the last migration"
	echo -e "\n${INFOTAG} ${BOLD}The default behavior of this script is to build and run the docker containers.${RESET}"
}

migrate_up() {
	docker exec oneMarket_api npm run migrate:latest
	exit 0
}

migrate_down() {
	docker exec oneMarket_api npm run migrate:down
	exit 0
}

infer_db_types() {
	docker exec oneMarket_api npm run db:types
	exit 0
}

remove_volumes() {
	docker compose down -v
	exit 0
}

run_containers() {
	if [[ $1 ]]; then
		docker compose up --build
		exit 0
	fi

	docker compose up
	exit 0
}

main() {
	local BUILD=true
	case "$1" in
	-v|--volumes)
		remove_volumes ;; # This does not
	-d|--docker)
		run_containers ;;
	-b|--build)
		run_containers $BUILD ;;
	-c|--codegen)
		infer_db_types ;;
	-m|--migrate)
		migrate_up ;;
	-r|--revert)
		migrate_down ;;
	-h|--help)
		usage
		exit 0 ;;
	-*)
		echo -e "\n${ERRORTAG} Unknown option: $1" >&2
		usage
		exit 1 ;;
	esac

	# Default behavior
	run_containers $BUILD
}

main $@
