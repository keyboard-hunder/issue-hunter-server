var express = require('express');
const request = require('request');
var bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Hello!');
});

app.post('/', function (req, res) {
    const body = req.body;
    const status = body.action;
    if(status == 'closed' && body.pull_request.merged == true) {    // if closed and merged
        console.log("solved!"); // solvd
        const solvedBy = body.pull_request.user.login;
        // call issueHunter method solve()
    }
});

app.listen(3000, function () {
  console.log('listening on port 3000!');
});