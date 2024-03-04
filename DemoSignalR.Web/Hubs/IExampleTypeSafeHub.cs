namespace DemoSignalR.Web.Hubs;

public interface IExampleTypeSafeHub
{
    Task BroadcastMessageToAllClient(string message);
}
