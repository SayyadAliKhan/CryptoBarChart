const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8081;

app.set('views', path.join(__dirname, 'client'));
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'client')));

app.get('/client', function(err, resp){

  resp.render('cryptoChart.html');

});

app.get('/serviceUnavailable', function(err, resp){

  resp.render('error.html');

});

app.listen(port, function(err){
  if(err)
    console.log("Something went wrong");
  else {
    console.log("Server running on Port: " + port);
  }

});
