const app = require('./app')
const mongodb = require('./db/connection');

//const server = http.createServer(function(req,resp){
//    resp.write('Elias Maximo')
//    resp.end()
//})

const port =  process.env.PORT || 8080;
mongodb.initDb((err, mongodb) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Connected to DB and listening on ${port}`);
    }
  });