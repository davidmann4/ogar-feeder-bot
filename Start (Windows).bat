@echo off
cd /d %~dp0
cls
@echo on
start node server/server.js
timeout 3
@start node feeder.js