$(document).ready(function () {

    const connection = new signalR.HubConnectionBuilder().withUrl("/exampletypesafehub")
        .configureLogging(signalR.LogLevel.Information).build();

    const broadcastStreamDataToAllClientHubMethodCall = "BroadcastStreamDataToAllClient";
    const receiveMessageAsStreamForAllClientClientMethodCall = "ReceiveMessageAsStreamForAllClient";

    const broadcastStreamProductToAllClientHubMethodCall = "BroadcastStreamProductToAllClient";
    const receiveProductAsStreamForAllClientClientMethodCall = "ReceiveProductAsStreamForAllClient";

    const broadcastFromHubToClient = "BroadcastFromHubToClient";

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

    connection.on(receiveMessageAsStreamForAllClientClientMethodCall, (name) => {
        $("#streamBox").append(`<p>${name}</p>`);
    })

    connection.on(receiveProductAsStreamForAllClientClientMethodCall, (product) => {
        $("#streamBox").append(`<p>${product.id}-${product.name}-${product.price}</p>`);
    })

    $("#btn_fromClient_toHub").click(function () {

        const names = $("#txt-stream").val();

        const namesAsChunk = names.split(";");

        const subject = new signalR.Subject();

        connection.send(broadcastStreamDataToAllClientHubMethodCall, subject).catch(err => console.error(err))

        namesAsChunk.forEach(name => {
            subject.next(name)
        });

        subject.complete();
    })

    $("#btn_fromClient_toHub2").click(function () {

        const productList = [
            { id: 1, name: "pen 1", price: 100 },
            { id: 2, name: "pen 2", price: 200 },
            { id: 3, name: "pen 3", price: 300 }
        ]

        const subject = new signalR.Subject();

        connection.send(broadcastStreamProductToAllClientHubMethodCall, subject).catch(err => console.error(err))

        productList.forEach(product => {
            subject.next(product)
        });

        subject.complete();
    })

    $("#btn_fromHubToClient").click(function () {

        connection.stream(broadcastFromHubToClient, 5).subscribe({
            next: (message) => $("#streamBox").append(`<p>${message}</p>`)
        });
    })
})