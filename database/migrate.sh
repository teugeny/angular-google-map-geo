#!/bin/bash

# create database
mysql -u root -proot -h database -e "CREATE DATABASE IF NOT EXISTS monitoring_crm CHARACTER SET utf8 COLLATE utf8_general_ci"

# dump
mysql -u root -proot -h database monitoring_crm < /home/database/dump.sql