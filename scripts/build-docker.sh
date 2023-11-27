#!/bin/bash

export $(cat .env | xargs)

if [ -z "$REDIS_HOST" ]; then
  echo "REDIS_HOST is not set, please fill out .env file"
  exit 1
fi
if [ -z "$REDIS_PORT" ]; then
  echo "REDIS_PORT is not set, please fill out .env file"
  exit 1
fi
if [ -z "$REDIS_USER" ]; then
  echo "REDIS_USER is not set, please fill out .env file"
  exit 1
fi
if [ -z "$REDIS_PASS" ]; then
  echo "REDIS_PASS is not set, please fill out .env file"
  exit 1
fi




docker build -t codebar-api --build-arg REDIS_HOST="${REDIS_HOST}" --build-arg REDIS_PORT="${REDIS_PORT}" --build-arg REDIS_USER="${REDIS_USER}" --build-arg REDIS_HOST="${REDIS_USER}" .
