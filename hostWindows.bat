@echo off

start python -m http.server 8080

start atom.cmd

start "" "c:\program files (x86)\google\chrome\application\chrome.exe" --new-window "http://localhost:8080"