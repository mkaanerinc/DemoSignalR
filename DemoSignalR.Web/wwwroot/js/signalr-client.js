$(document).ready(function () {

    const connection = new signalR.HubConnectionBuilder().withUrl("/exampletypesafehub")
        .configureLogging(signalR.LogLevel.Information).build();

    const broadcastMessageToAllClientHubMethodCall = "BroadcastMessageToAllClient";
    const receiveMessageForAllClientClientMethodCall = "ReceiveMessageForAllClient";

    const broadcastTypedMessageToAllClientHubMethodCall = "BroadcastTypedMessageToAllClient";
    const receiveTypedMessageForAllClientClientMethodCall = "ReceiveTypedMessageForAllClient";

    const broadcastMessageToCallerClientHubMethodCall = "BroadcastMessageToCallerClient";
    const receiveMessageForCallerClientMethodCall = "ReceiveMessageForCallerClient";

    const broadcastMessageToOthersClientHubMethodCall = "BroadcastMessageToOthersClient";
    const receiveMessageForOthersClientMethodCall = "ReceiveMessageForOthersClient";

    const broadcastMessageToIndividualClientHubMethodCall = "BroadcastMessageToIndividualClient";
    const receiveMessageForIndividualClientMethodCall = "ReceiveMessageForIndividualClient";

    const receiveConnectedClientCountAllClientMethodCall = "ReceiveConnectedClientCountAllClient";

    const groupA = "GroupA";
    const groupB = "GroupB";
    let currentGroupList = [];

    async function start() {

        try {

            await connection.start().then(() => {
                $("#connectionId").html(`Connection Id: ${connection.connectionId}`);
                console.log("Hub ile bağlantı kuruldu");
            })

        }
        catch
        {

            setTimeout(() => start(), 5000);

        }
    }

    connection.onclose(async () => {
        await start();
    })

    start();

    function refreshGroupList() {
        $("#groupList").empty();
        currentGroupList.forEach(x => {
            $("#groupList").append(`<p>${x}</p>`)
        })
    }

    $("#btn-groupA-add").click(function () {

        if (currentGroupList.includes(groupA)) return;

        connection.invoke("AddGroup", groupA).then(() => {
            currentGroupList.push(groupA);
            refreshGroupList();
        })
    })
    $("#btn-groupA-remove").click(function () {

        if (!currentGroupList.includes(groupA)) return;

        connection.invoke("RemoveGroup", groupA).then(() => {
            currentGroupList = currentGroupList.filter(x => x !== groupA)
            refreshGroupList();
        })
    })

    $("#btn-groupB-add").click(function () {

        if (currentGroupList.includes(groupB)) return;

        connection.invoke("AddGroup", groupB).then(() => {
            currentGroupList.push(groupB);
            refreshGroupList();
        })
    })
    $("#btn-groupB-remove").click(function () {

        if (!currentGroupList.includes(groupB)) return;

        connection.invoke("RemoveGroup", groupB).then(() => {
            currentGroupList = currentGroupList.filter(x => x !== groupB)
            refreshGroupList();
        })
    })

    $("#btn-groupA-send-message").click(function () {
        const message = "Grup A Mesajı";
        connection.invoke("BroadcastMessageToGroupClient", groupA, message).catch(err => console.log
            ("hata", err));
    })

    $("#btn-groupB-send-message").click(function () {
        const message = "Grup B Mesajı";
        connection.invoke("BroadcastMessageToGroupClient", groupB, message).catch(err => console.log
            ("hata", err));
    })

    const span_client_count = $("#span-connected-client-count");
    connection.on(receiveConnectedClientCountAllClientMethodCall, (clientCount) => {
        span_client_count.text(clientCount);
        console.log("Connected Client Count", clientCount);
    })

    // Subscribers
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
    connection.on("ReceiveMessageForGroupClient", (message) => {
        console.log("Gelen Mesaj", message);
    })
    connection.on(receiveTypedMessageForAllClientClientMethodCall, (product) => {
        console.log("Gelen Ürün", product);
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
    $("#btn-send-typed-message-all-client").click(function () {
        const product = { id: 1, name: "pen 1", price: 200 };
        connection.invoke(broadcastTypedMessageToAllClientHubMethodCall, product).catch(err => console.log
            ("hata", err));
    })
})