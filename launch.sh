#!/bin/bash
./start_pepepy.sh &
./backend/start.sh &
./frontend/start.sh

kill $(jobs -p)
