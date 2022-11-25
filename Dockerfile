# escape=`

# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:7.0-windowsservercore-ltsc2022 AS build
WORKDIR /Viesbutis_IS

# copy csproj and restore as distinct layers
COPY Viesbutis_IS/*.csproj .
RUN dotnet restore -r win-x64 /p:PublishReadyToRun=true

# copy everything else and build app
COPY Viesbutis_IS/. .
RUN dotnet publish -c Release -o /app -r win-x64 --self-contained true --no-restore /p:PublishTrimmed=true /p:PublishReadyToRun=true /p:PublishSingleFile=true

# final stage/image
FROM mcr.microsoft.com/windows/servercore:ltsc2022 AS runtime
WORKDIR /app
COPY --from=build /app ./

ENV `
    # Configure web servers to bind to port 80 when present
    ASPNETCORE_URLS=http://+:80 `
    # Enable detection of running in a container
    DOTNET_RUNNING_IN_CONTAINER=true

ENTRYPOINT ["Viesbutis_IS"]