@echo off
cd /d %~dp0
cls
start node server/server.js
timeout 3
start node feeder.js
