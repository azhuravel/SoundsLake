var ChatManager = function() {
    var _this = this;

    var PRINT_COMMAND = 'PRINT';
    var MESSAGE_COMMAND = 'MESSAGE';

    this.elText = document.getElementById('dialog');
    this.elPrintStaus = document.getElementById('dialog');

    // extract command from message
    // message: 'command$$args'
    function getCommand(message) {
        var idx = message.indexOf('$$');
        if (idx > 0)
            return message.substring(0,idx);
        else
            return null;
    }

    // extract args from message
    // message: 'command$$args'
    function getArgs(message) {
        var idx = message.indexOf('$$');
        if (idx > 0)
            return message.substring(idx+2);
        else
            return null;
    }

    // add a message to chat window
    // text: any string
    function addMessage(text) {
        var newNode = document.createElement('p');
        newNode.innerHTML = text;
        _this.elText.appendChild(newNode);
    }

    // set printing status
    // users: (in future)
    function setPrinting(users) {
        console.log('printing');
    }

    function genRequest(command, args) {
        return command + '$$' + args;
    }

    this.processMessage = function (message) {
        var command = getCommand(message);
        var args = getArgs(message);
        return this.process(command, args);
    }

    this.process = function (command, args) {
        switch(command) {
            case MESSAGE_COMMAND :
                addMessage(args);
                break;
            case PRINT_COMMAND :
                setPrinting(args);
                break;
        }
    }

    this.makeRequestMessage = function(text) {
        return genRequest(MESSAGE_COMMAND, text);
    }
}

window.onload = function() {
    var chatManager = new ChatManager();
    var socket = new WebSocket("ws://localhost:8081");

    socket.onopen = function() {
        console.log('connections is opened');
    };

    socket.onclose = function(event) {
        if (event.wasClean)
            console.log('Connection is closed CLEAN');
        else
            console.log('Connection is closed. Error' + event.code + ' (' + event.reason + ')');
    }

    var dialogDiv = document.getElementById('dialog');

    socket.onmessage = function(event) {
        chatManager.processMessage(event.data);
    }

    socket.onerror = function (event) {
        console.log('Error: ' + event.message)
    }

    document.forms.sendForm.onsubmit = function() {
        var request = chatManager.makeRequestMessage(this.text.value);

        socket.send(request);
        return false;
    }
}

