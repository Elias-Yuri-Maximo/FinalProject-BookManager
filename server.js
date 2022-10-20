const app = require('./app');
//const mongodb = require('./db/connection');
const connectDB = require('./db/connection');

connectDB();

const port = process.env.PORT || 8080;




app.listen(port, () => {
console.log(`Connected to DB and listening on ${port}`);
});

