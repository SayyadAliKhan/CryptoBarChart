const express = require('express');
const request = require('request')
const app = express();
const port = process.env.PORT || 8081;

app.get('/usdMarket', function(err, resp){

    request('https://api.coinmarketcap.com/v1/ticker/?limit=10', function(err, res, body) {

      if(err)
        resp.json({state: 'failure', crypto: body ? body : null});
      else
        resp.json({state: 'success', crypto: body ? body : null});

    });

});

app.listen(port, function(err){
  if(err)
    console.log("Something went wrong");
  else {
    console.log("Server running on Port: " + port);
  }

});
