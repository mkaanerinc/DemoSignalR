$(document).ready(function () {
    const broadcastMessageToAllClientHubMethodCall = "BroadcastMessageToAllClient";
    const ReceiveMessageForAllClientClientMethodCall = "ReceiveMessageForAllClient";
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
    connection.on(ReceiveMessageForAllClientClientMethodCall, (message) => {
        console.log("Gelen Mesaj", message);
    })

    $("#btn-send-message-all-client").click(function () {
        const message = "hello word";
        connection.invoke(broadcastMessageToAllClientHubMethodCall, message).catch(err => console.log
            ("hata", err));
    })
})