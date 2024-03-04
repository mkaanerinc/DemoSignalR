using Microsoft.AspNetCore.SignalR;
using System;

namespace DemoSignalR.Web.Hubs;

public class ExampleTypeSafeHub: Hub<IExampleTypeSafeHub>
{
    private static int ConnectedClientCount = 0;

    public async Task BroadcastMessageToAllClient(string message)
    {
        await Clients.All.ReceiveMessageForAllClient(message);
    }

    public async Task BroadcastMessageToCallerClient(string message)
    {
        await Clients.Caller.ReceiveMessageForCallerClient(message);
    }

    public async Task BroadcastMessageToOthersClient(string message)
    {
        await Clients.Others.ReceiveMessageForOthersClient(message);
    }

    public async Task BroadcastMessageToIndividualClient(string connectionId, string message)
    {
        await Clients.Client(connectionId).ReceiveMessageForIndividualClient(message);
    }

    public async Task BroadcastMessageToGroupClient(string groupName, string message)
    {
        await Clients.Group(groupName).ReceiveMessageForGroupClient(message);
    }

    public async Task AddGroup(string groupName)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId,groupName);

        await Clients.Caller.ReceiveMessageForCallerClient($"{groupName} grubuna dahil oldun.");

        await Clients.Group(groupName).ReceiveMessageForGroupClient($"Kullanıcı({Context.ConnectionId}) {groupName} grubuna dahil oldu.");
    }

    public async Task RemoveGroup(string groupName)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

        await Clients.Caller.ReceiveMessageForCallerClient($"{groupName} grubundan ayrıldın.");

        await Clients.Group(groupName).ReceiveMessageForGroupClient($"Kullanıcı({Context.ConnectionId}) {groupName} grubundan ayrıldı.");
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
