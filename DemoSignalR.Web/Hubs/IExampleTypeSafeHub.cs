using DemoSignalR.Web.Models;

namespace DemoSignalR.Web.Hubs;

public interface IExampleTypeSafeHub
{
    Task ReceiveMessageForAllClient(string message);
    Task ReceiveMessageAsStreamForAllClient(string name);
    Task ReceiveProductAsStreamForAllClient(Product product);
    Task ReceiveTypedMessageForAllClient(Product product);
    Task ReceiveConnectedClientCountAllClient(int clientCount);
    Task ReceiveMessageForCallerClient(string message);
    Task ReceiveMessageForOthersClient(string message);
    Task ReceiveMessageForIndividualClient(string message);
    Task ReceiveMessageForGroupClient(string message);
}
