# acs575-project
Local Airline Route Dashboard

# To initialise database
1. go to /data
2. run /data/schema.sql in your postgres client to initialise the database. 
3. in /data create a file called .env and setup the following varaibles based on your postgres setup:

      DB_HOST=localhost

      DB_USER=[postgres username]

      DB_PASS=[postgress password]

      DB_NAME=localairlineroutes
      
4. run /data/processing.py to populate the database. This takes a while, may take up to an hour or hour and a half. 
