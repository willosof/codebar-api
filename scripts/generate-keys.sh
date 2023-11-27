#!/bin/bash

openssl rsa -in server.key -text > private.pem
openssl x509 -inform PEM -in server.crt > public.pem
