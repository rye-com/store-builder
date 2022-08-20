#!/bin/bash

# Start the first process
(cd ./server && node index.js ) &

# Start the second process
(cd ./frontend && export PORT=3090 && yarn start) &

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?
