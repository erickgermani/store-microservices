#!/bin/bash

filebeat modules enable rabbitmq
filebeat setup
service filebeat start