#!/bin/bash

python -m SimpleHTTPServer 8080 &&
atom &&
firefox 127.0.0.1:8080 &&
