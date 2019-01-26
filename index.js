const mongoose = require('mongoose');
const app = require('./app');
const http = require('http');



mongoose.connect('mongodb://localhost:27017/portfolio',{ useNewUrlParser: true });
mongoose.set('useCreateIndexes', true);
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err)=>{
    console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

const server = http.createServer(app);


server.listen(8000, (err)=>{
   console.log(`
   --------------------------
   -----------------------
   server started in port ${8000}
   --------------------------
   ------------------------------`)
});