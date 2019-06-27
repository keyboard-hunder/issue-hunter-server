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
        const commitMsg = body.pull_request.body;

        let closePattern = /(c|C)loses\s+#[1-9][0-9]* /i;
        let found = commitMsg.match(closePattern);
        let issueNumber;
        if (!found) {
            console.log("This pull request does not close any issue.");
        } else {
            let issueNumPattern = /#[1-9][0-9]*/;
            found = found[0].match(issueNumPattern);
            issueNumber = found[0][1];
            console.log(issueNumber);
        }
    }

});

app.listen(3000, function () {
    console.log('listening on port 3000!');
});