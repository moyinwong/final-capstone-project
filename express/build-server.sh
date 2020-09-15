# build-server.sh
#!/bin/bash

yarn knex migrate:rollback
yarn knex migrate:latest
yarn knex seed:run
yarn start