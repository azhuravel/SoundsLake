var WebSocketServer = new require('ws');
var ServerCharManager = new require('./ServerChatManager.js');

var serverChatManager = new ServerCharManager.serverChatManager();

var clients = {};

var webSocketServer = new WebSocketServer.Server({port: 8081});
webSocketServer.on('connection', function(ws) {
    var id = Math.random();
    clients[id] = ws;

    ws.on('message', function(message) {
        var response = serverChatManager.makeResponseText(message);
        for(var key in clients) {
            clients[key].send(response);
        }
    });

    ws.on('close', function() {
        delete clients[id];
    });

});