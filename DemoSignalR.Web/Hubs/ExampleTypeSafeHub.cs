using Microsoft.AspNetCore.SignalR;

namespace DemoSignalR.Web.Hubs;

public class ExampleTypeSafeHub: Hub<IExampleTypeSafeHub>
{
    public async Task BroadcastMessageToAllClient(string message)
    {
        await Clients.All.BroadcastMessageToAllClient(message);
    }
}
