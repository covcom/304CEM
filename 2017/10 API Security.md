
# API Security


Content

Assignment Update
Job control / running in background
SSL certificates

The Problem

Script run using terminal over SSH
If the terminal is closed the script stops

Need to be able to run the script detached from the terminal

Linux Job Control

Launching a program in the background
node index &
List processes (each has an id number)
jobs
Putting a process in the foreground (job id 1)
fg 1

Standard Streams

Input and output channels
Each has a default:
stdin 	- defaults to the keyboard
stdout 	- defaults to the terminal
stderr 	- defaults to the terminal

Redirect Streams

Send stdout to a log file
node index > log.txt
Send stdout and stderr to log file
node index > log.txt 2>&1
Send errors to different file
node index > log.txt 2> err.txt
Silence errors
node index > log.txt 2> /dev/null

Forever

Node package so runs on all supported platforms
npm install -g forever
forever start index.js
forever list
forever restart app.js
forever stop app.js
forever stopall

SSL Certificates

The Problem

All the APIs built so far run over HTTP
This is an unencrypted connection
Packets can be intercepted and read using a packet sniffer

The Solution

All data packets need to be encrypted
Use an asymmetric encryption called TLS 1.2

The Process

https means client will connect to port 443 unless specified
First byte out of our browser makes a handshake request
Server sends a response and agrees to the request to use TLS
The client checks server certificate expiry and makes sure its public key is authorized for exchanging secret keys
TLS is used to exchange a shared (symmetric) one time encryption key that is then used to encrypt and decrypt data packets

Generating a TLS1.2 Certificate

Normally certificated issued by a 'trusted authority'
Tied to a specific domain name
Requires annual payment
For development purposes we can generate our own
Known as a 'self-signed' certificate

Need to generate a self-signed certificate for our Certificate Authority
Means that this CA is totally trusted
Its certificate will serve as the root certificate
Run the following command to generate the self-signed certificate for the CA
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

The Key
Contains the Certificate Authority's private key
key.pem
The Certificate
Contains the public-key certificate
cert.pem

const fs = require('fs')
const httpsOptions = {
	key: fs.readFileSync('./key.pem'),
	certificate: fs.readFileSync('./cert.pem')
}
const server = restify.createServer(httpsOptions)

