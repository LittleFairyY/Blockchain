var http = require('http');
var mockserver = require('mockserver');
mockserver.headers = ['Authorization', 'X-My-Header'];

http.createServer(mockserver('mocks')).listen(9001);
