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

    this.makeRequestPrinting = function() {
        return genRequest(PRINT_COMMAND,'');
    }
}
