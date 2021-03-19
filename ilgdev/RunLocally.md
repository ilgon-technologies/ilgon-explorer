# Start ILGON explorer locally for development purposes

1. Clone the repo
2. cd blockscout
3. Provide DB URL:
   export DATABASE_URL=postgresql://user:password@localhost:5432/blockscout
   Linux: Update the database username and password configuration
   Mac: Use logged-in user name and empty password
   Optional: Change credentials in apps/explorer/config/test.exs for test env
   Example usage: Changing the default Postgres port from localhost:5432 if Boxen is installed.
4. Install Mix dependencies, compile them and compile the application:mix do deps.get, local.rebar --force, deps.compile, compile
5. If not already running, start Postgres: pg_ctl -D /usr/local/var/postgres start
   To check postgres status: pg_isready
6. Create and migrate database mix do ecto.create, ecto.migrate
   If you in dev environment and have run the application previously with the different blockchain, drop the previous database mix do ecto.drop, ecto.create, ecto.migrate
   Be careful since it will delete all data from the DB. Don't execute it on production if you don't want to lose all the data!
7. Install Node.js dependencies
   cd apps/block_scout_web/assets; npm install && node_modules/webpack/bin/webpack.js --mode production; cd -
   cd apps/explorer && npm install; cd -
8. Build static assets for deployment mix phx.digest
9. Return to the root directory and run `./ilgdev/startserver.sh`

You can recompile frontend javascript with `./ilgdev/updatejs.sh`