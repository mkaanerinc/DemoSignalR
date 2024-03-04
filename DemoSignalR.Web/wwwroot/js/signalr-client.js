$(document).ready(function () {
    const broadcastMessageToAllClientHubMethodCall = "BroadcastMessageToAllClient";
    const receiveMessageForAllClientClientMethodCall = "ReceiveMessageForAllClient";

    const broadcastMessageToCallerClientHubMethodCall = "BroadcastMessageToCallerClient";
    const receiveMessageForCallerClientMethodCall = "ReceiveMessageForCallerClient";

    const broadcastMessageToOthersClientHubMethodCall = "BroadcastMessageToOthersClient";
    const receiveMessageForOthersClientMethodCall = "ReceiveMessageForOthersClient";

    const broadcastMessageToIndividualClientHubMethodCall = "BroadcastMessageToIndividualClient";
    const receiveMessageForIndividualClientMethodCall = "ReceiveMessageForIndividualClient";

    const receiveConnectedClientCountAllClientMethodCall = "ReceiveConnectedClientCountAllClient";
    const connection = new signalR.HubConnectionBuilder().withUrl("/exampletypesafehub")
        .configureLogging(signalR.LogLevel.Information).build();

    function start() {
        connection.start().then(() => {
            $("#connectionId").html(`Connection Id: ${connection.connectionId}`);
            console.log("Hub ile bağlantı kuruldu");
        })
    }

    try {
        start();
    }
    catch {
        setTimeout(() => start(),5000);
    }


    const span_client_count = $("#span-connected-client-count");
    connection.on(receiveConnectedClientCountAllClientMethodCall, (clientCount) => {
        span_client_count.text(clientCount);
        console.log("Connected Client Count", clientCount);
    })

    // Subscribe
    connection.on(receiveMessageForAllClientClientMethodCall, (message) => {
        console.log("Gelen Mesaj", message);
    })
    connection.on(receiveMessageForCallerClientMethodCall, (message) => {
        console.log("(Caller)Gelen Mesaj", message);
    })
    connection.on(receiveMessageForOthersClientMethodCall, (message) => {
        console.log("(Others)Gelen Mesaj", message);
    })
    connection.on(receiveMessageForIndividualClientMethodCall, (message) => {
        console.log("(Individual)Gelen Mesaj", message);
    })

    $("#btn-send-message-all-client").click(function () {
        const message = "hello word";
        connection.invoke(broadcastMessageToAllClientHubMethodCall, message).catch(err => console.log
            ("hata", err));
    })

    $("#btn-send-message-caller-client").click(function () {
        const message = "hello word";
        connection.invoke(broadcastMessageToCallerClientHubMethodCall, message).catch(err => console.log
            ("hata", err));
    })

    $("#btn-send-message-others-client").click(function () {
        const message = "hello word";
        connection.invoke(broadcastMessageToOthersClientHubMethodCall, message).catch(err => console.log
            ("hata", err));
    })

    $("#btn-send-message-individual-client").click(function () {
        const connectionId = $("#text-connectionId").val();
        const message = "hello word";
        connection.invoke(broadcastMessageToIndividualClientHubMethodCall,connectionId,message).catch(err => console.log
            ("hata", err));
    })
})