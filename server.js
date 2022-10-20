const server = require('./app')
const mongodb = require('./db/connection');


const port =  process.env.PORT || 8080;


mongodb.initDb((err, mongodb) => {
    if (err) {
      console.log(err);
    } else {
      server.listen(port);
      console.log(`Connected to DB and listening on ${port}`);
    }
  });
