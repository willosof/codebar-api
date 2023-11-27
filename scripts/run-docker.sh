#!/bin/bash

# docker run doesn't like quotes or comments in .env file
grep -v '^#' .env | grep -v '^$' | sed 's/["]//g' > .env.docker

docker run -it --rm --name api-test --env-file=".env.docker" api