const express = require('express');
const request = require('request');
const Caver = require("caver-js");
const bodyParser = require('body-parser');

const app = express();
const caver = new Caver('https://api.baobab.klaytn.net:8651/');

var abi = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "issues",
		"outputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "owner",
				"type": "address"
			},
			{
				"name": "repoURL",
				"type": "string"
			},
			{
				"name": "issueNumber",
				"type": "uint256"
			},
			{
				"name": "title",
				"type": "string"
			},
			{
				"name": "tags",
				"type": "string"
			},
			{
				"name": "price",
				"type": "uint256"
			},
			{
				"name": "solved",
				"type": "bool"
			},
			{
				"name": "active",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "githubId",
				"type": "string"
			}
		],
		"name": "getAddressByGithubId",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "github_id",
				"type": "string"
			}
		],
		"name": "applyAccount",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			},
			{
				"name": "repo",
				"type": "string"
			},
			{
				"name": "issueNumber",
				"type": "uint256"
			},
			{
				"name": "title",
				"type": "string"
			},
			{
				"name": "tags",
				"type": "string"
			},
			{
				"name": "active",
				"type": "bool"
			}
		],
		"name": "editIssueContents",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "repoURL",
				"type": "string"
			},
			{
				"name": "issueNumber",
				"type": "uint256"
			}
		],
		"name": "matchedIssue",
		"outputs": [
			{
				"name": "id",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "issueSolvedBy",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"name": "githubToAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "erc20",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			},
			{
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "editIssuePrice",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "addressToGithub",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			},
			{
				"name": "by",
				"type": "address"
			}
		],
		"name": "solve",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "new_erc20",
				"type": "address"
			}
		],
		"name": "changeERC20",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "issueMadeBy",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "who",
				"type": "address"
			},
			{
				"name": "repo",
				"type": "string"
			},
			{
				"name": "issueNumber",
				"type": "uint256"
			},
			{
				"name": "title",
				"type": "string"
			},
			{
				"name": "tags",
				"type": "string"
			},
			{
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "makeIssue",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "default_erc20",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "previousOwner",
				"type": "address"
			}
		],
		"name": "OwnershipRenounced",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	}
];

var contractAddress = '0xbbB768c31c2AD3F0aB8ca1D9ae6b333e065b8020';
var myContract = new caver.klay.Contract(abi, contractAddress, {
    from: '0x1234567890123456789012345678901234567891', // default from address
    gasPrice: '25000000000' // default gas price in peb, 25 Gpeb in this case
});
var privateKey = '0x8d760d7929139a7c3a993f36169c25596352e7f303c1f923576253af6b2e9f55'; // ONLY FOR SHORT DEVELOP
var myAccount = caver.klay.accounts.privateKeyToAccount(privateKey);
caver.klay.accounts.wallet.add(myAccount);

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
        if(issueNumber) {
            const repoURL = body.pull_request.html_url;
            const issueId = myContract.methods.matchedIssue(repoURL, issueNumber).call();
            const address = myContract.methods.getAddressByGithubId(solvedBy).call();
            myContract.methods.solve(issueId, address).call();
        }
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

function getAddress(username) {
    return myContract.githubToAddress[username];
}

function solve(id, by) {
    myContract.methods.solve(id, by).send({
        from: myAccount.address,
        gas: '500000', // fixed
    }, function(error, transactionHash) {
        console.log(transactionHash);
    });
}

app.listen(3000, function () {
    console.log('listening on port 3000!');
});