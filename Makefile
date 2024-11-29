# https://www.gnu.org/software/make/manual/make.html
PATH := ./node_modules/.bin:$(PATH)
ENV := dev # default, other options: test, prod

include .env.$(ENV)
export

include *.make

WORKDIR := $(shell pwd)
VERSION := $(shell cat VERSION)
PROJECT := $(shell basename $(CURDIR))

SRC := src
DIST := dist
BUILD := build
CERTS_DIR := ./certs


IGNORE_LIST := .gitignore .dockerignore exclude.lst

ifeq ($(SSL), true)
PROTOCOL := HTTPS
else
PROTOCOL := HTTP
endif
URL := $(PROTOCOL)://$(HOST):$(PORT)

.PHONY: env test all dev clean pyserve gen-commands $(SRC) $(DIST) $(BUILD) cert lint format clcache deps switch-env

.DEFAULT_GOAL := test

.ONESHELL:

%: # https://www.gnu.org/software/make/manual/make.html#Automatic-Variables 
		@:

switch-env:
		sed -i 's/ENV := dev/ENV := $(filter-out $@,$(MAKECMDGOALS))/' Makefile

cert: 
	@echo "Generating SSL certificates..."
	mkdir -p $(CERTS_DIR)
	if [ -f "$(CERTS_DIR)/openssl.conf" ]; then \
		openssl req -x509 -new -config $(CERTS_DIR)/openssl.conf -out $(CERTS_DIR)/cert.pem -keyout $(CERTS_DIR)/key.pem; \
	else \
		openssl req -x509 -nodes -newkey rsa:4096 -out $(CERTS_DIR)/cert.pem -keyout $(CERTS_DIR)/key.pem -sha256 -days 365; \
	fi

clean:
		@if [ -d "$(BUILD)" ]; then rm -r ./$(BUILD)/*; else echo "does not exist"; fi
		@if [ -d "$(DIST)" ]; then rm -r ./$(DIST)/*; else echo "does not exist"; fi

format:
	prettier --write $(SRC)/**/*.{js,jsx,ts,tsx,json,css,scss,html,md}
