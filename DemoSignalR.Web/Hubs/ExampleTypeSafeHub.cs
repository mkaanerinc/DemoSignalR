﻿using Microsoft.AspNetCore.SignalR;
using System;

namespace DemoSignalR.Web.Hubs;

public class ExampleTypeSafeHub: Hub<IExampleTypeSafeHub>
{
    private static int ConnectedClientCount = 0;

    public async Task BroadcastMessageToAllClient(string message)
    {
        await Clients.All.ReceiveMessageForAllClient(message);
    }

    public override async Task OnConnectedAsync()
    {
        ConnectedClientCount++;

        await Clients.All.ReceiveConnectedClientCountAllClient(ConnectedClientCount);

        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        ConnectedClientCount--;

        await Clients.All.ReceiveConnectedClientCountAllClient(ConnectedClientCount);

        await base.OnDisconnectedAsync(exception);
    }
}
