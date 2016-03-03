var express = require('express');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.static(__dirname));
app.listen(3000);
