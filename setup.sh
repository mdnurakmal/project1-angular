#!/bin/bash

sed -i "s#REPLACED_BY_BUILD_SCRIPT_AUTHSERVER_URL#$AUTHSERVER_URL#g" /usr/share/nginx/html/main.js
nginx -g 'daemon off;'