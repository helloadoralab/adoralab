@echo off
title Smooth Scroll Animation Server
cd /d "%~dp0"
echo Starting animation server at http://localhost:3000...
"C:\Users\rohit kumar\AppData\Roaming\Antigravity\bin\agy-node.cmd" server.js
pause
