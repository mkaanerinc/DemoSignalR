using Microsoft.AspNetCore.SignalR.Client;

namespace SignalRClientWorkerServiceApp;

public class Worker : BackgroundService
{
    private HubConnection? _connection;
    private readonly IConfiguration _configuration;

    public Worker(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public override Task StartAsync(CancellationToken cancellationToken)
    {
        _connection = new HubConnectionBuilder().WithUrl(_configuration.GetSection("SignalR")["Hub"]!).Build();

        _connection.StartAsync().ContinueWith((result) =>
        {
            Console.WriteLine(result.IsCompletedSuccessfully ? "Connected" : "Connection failed");
        });

        return base.StartAsync(cancellationToken);
    }

    protected override Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _connection!.On<Product>("ReceiveTypedMessageForAllClient",
            (product) => { Console.WriteLine($"Received message: {product.Id}-{product.Name}-{product.Price}"); });

        return Task.CompletedTask;
    }

    public override async Task StopAsync(CancellationToken cancellationToken)
    {
        await _connection!.StopAsync(cancellationToken);
        await _connection!.DisposeAsync();

        await base.StopAsync(cancellationToken);
    }
}
