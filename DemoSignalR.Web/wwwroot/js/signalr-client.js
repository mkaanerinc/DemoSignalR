$(document).ready(function () {
    const broadcastMessageToAllClientHubMethodCall = "BroadcastMessageToAllClient";
    const receiveMessageForAllClientClientMethodCall = "ReceiveMessageForAllClient";
    const receiveConnectedClientCountAllClientMethodCall = "ReceiveConnectedClientCountAllClient";
    const connection = new signalR.HubConnectionBuilder().withUrl("/exampletypesafehub")
        .configureLogging(signalR.LogLevel.Information).build();

    function start() {
        connection.start().then(() => console.log("Hub ile bağlantı kuruldu"));
    }

    try {
        start();
    }
    catch {
        setTimeout(() => start(),5000);
    }

    // Subscribe
    connection.on(receiveMessageForAllClientClientMethodCall, (message) => {
        console.log("Gelen Mesaj", message);
    })

    var span_client_count = $("#span-connected-client-count");
    connection.on(receiveConnectedClientCountAllClientMethodCall, (clientCount) => {
        span_client_count.text(clientCount);
        console.log("Connected Client Count", clientCount);
    })

    $("#btn-send-message-all-client").click(function () {
        const message = "hello word";
        connection.invoke(broadcastMessageToAllClientHubMethodCall, message).catch(err => console.log
            ("hata", err));
    })
})