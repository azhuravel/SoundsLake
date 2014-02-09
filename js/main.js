window.onload = function() {
    var chatManager = new ChatManager();
    var socket = new WebSocket("ws://localhost:8081");

    socket.onmessage = function(event) {
        chatManager.processMessage(event.data);
    }

    document.forms.sendForm.onsubmit = function() {
        var request = chatManager.makeRequestMessage(this.text.value);
        socket.send(request);
        return false;
    }

    document.forms.sendForm.text.onkeydown = function() {
        var request = chatManager.makeRequestPrinting();
        socket.send(request);
    }
}

