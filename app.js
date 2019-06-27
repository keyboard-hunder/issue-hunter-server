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
        const issueNumber = getIssueNumber(commitMsg);
    }
});

function getIssueNumber(commitMsg) {
    const closePattern = /(c|C)loses\s+#[1-9][0-9]* /i;
    const issueNumPattern = /#[1-9][0-9]*/;
    let issueNumber;

    let found = commitMsg.match(closePattern);

    if (!found) {
        console.log("This pull request does not close any issue.");
        return null;
    }

    found = found[0].match(issueNumPattern);
    issueNumber = found[0][1];
    console.log(issueNumber);

    return issueNumber;
}

app.listen(3000, function () {
    console.log('listening on port 3000!');
});