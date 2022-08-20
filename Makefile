COMMIT_SHA := $(shell git rev-parse --short HEAD)
BASE_NAME := store-builder
NAME_LATEST := ${BASE_NAME}:latest
NAME_COMMIT := ${BASE_NAME}:${COMMIT_SHA}
PROD_NAME := us-central1-docker.pkg.dev/store-builder-356007/rye/store-builder
PROD_CONTAINER_NAME := store-builder-prod
PROD_NAME_LATEST := ${PROD_NAME}:latest
PROD_NAME_COMMIT := ${PROD_NAME}:${COMMIT_SHA}
PROD_NAME_LOCAL := ${PROD_NAME}:local
pwd := $(shell pwd)

# For development builds

.PHONY: build
build:
	docker build --tag ${NAME_LATEST} --tag ${NAME_COMMIT}  .

.PHONY: start
start:
	docker run -d --rm --name=${BASE_NAME} -p 3090:3090 -p 3001:3001 \
	-v "$(pwd)"/frontend/src:/store-builder/frontend/src:ro \
	-v "$(pwd)"/frontend/public:/store-builder/frontend/public:ro \
	${NAME_LATEST}

.PHONY: start-with-local-api
start-with-local-api:
	docker run -d --rm --name=${BASE_NAME} -p 3090:3090 -p 3001:3001 \
	--env REACT_APP_API_URL=http://localhost:8088 \
	-v "$(pwd)"/frontend/src:/store-builder/frontend/src:ro \
	-v "$(pwd)"/frontend/public:/store-builder/frontend/public:ro \
	${NAME_LATEST}

.PHONY: stop
stop:
	docker kill ${BASE_NAME}

# For production builds

.PHONY: build-prod
build-prod:
	docker build -f Dockerfile.prod --tag ${PROD_NAME_LOCAL} .

.PHONY: start-prod
start-prod:
	# TODO https://stackoverflow.com/a/22263280
	docker run -d --rm --name=${PROD_CONTAINER_NAME} -p 3001:3001 \
	--env NODE_TLS_REJECT_UNAUTHORIZED=0 ${PROD_NAME_LOCAL}
	@echo "open http://rye.local:3001 to proceed"

.PHONY: stop-prod
stop-prod:
	docker kill ${PROD_CONTAINER_NAME}

.PHONY: deploy-image
deploy-image:
	docker build -f Dockerfile.prod  --tag ${PROD_NAME_LATEST} --tag ${PROD_NAME_COMMIT} .
	docker image push ${PROD_NAME_LATEST}
	docker image push ${PROD_NAME_COMMIT}
