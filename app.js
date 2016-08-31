var express = require('express');
var app = express();
var port = 3000;

/**
 * Serve the static files
 */
app.use(express.static('public'));
app.use(express.static('src/views'));

app.get('/', function(req, res) {
  res.send('Hello World!!');
});

app.listen(port, function(err){
  if(!err){
    console.log('Express server started on port: '+port);
  }
  else {
    console.log('Unable to Start Express Server!! ERROR: '+err);
  }
});
