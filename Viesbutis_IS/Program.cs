using Viesbutis_IS.Data;
using Viesbutis_IS.Data.Repositories;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddDbContext<ForumDbContext>();
builder.Services.AddTransient<IHotelsRepository, HotelsRepository>();

var app = builder.Build();

app.UseRouting();
app.MapControllers();

app.Run();
