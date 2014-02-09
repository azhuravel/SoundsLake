var ServerChatManager = function() {
    var PRINT_COMMAND = 'PRINT';
    var MESSAGE_COMMAND = 'MESSAGE';

    function getCommand(message) {
        var idx = message.indexOf('$$');
        return (idx > 0) ? message.substring(0,idx) : null;
    }

    function getArgs(message) {
        var idx = message.indexOf('$$');
        return (idx > 0 ) ? message.substring(idx+2) : null;
    }

    function genMessageResponsse(text) {
        return MESSAGE_COMMAND + '$$' + text;
    }

    function genPrintingResponsse () {
        return PRINT_COMMAND + '$$';
    }

    this.makeResponseText = function (message) {
        var command = getCommand(message);
        var args = getArgs(message);
        return this.process(command, args);
    }

    this.process = function (command, args) {
        switch(command) {
            case PRINT_COMMAND :
                return genPrintingResponsse();
                break;
            case MESSAGE_COMMAND:
                return genMessageResponsse(args);
                break;
            default:
                return null;
        }
    }
}

exports.serverChatManager = ServerChatManager;