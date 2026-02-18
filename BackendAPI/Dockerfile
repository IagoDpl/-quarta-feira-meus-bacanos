FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# 1. Copia o arquivo do projeto e restaura as dependências
COPY ["BackendAPI.csproj", "./"]
RUN dotnet restore

# 2. AGORA COPIA TODO O RESTO (Program.cs, Controllers, etc.)
# ISSO TEM QUE VIR ANTES DO PUBLISH!
COPY . . 

# 3. Agora sim, compila tudo junto
RUN dotnet publish -c Release -o out

# 4. Finaliza a imagem para rodar
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

# Porta padrão do Render/Docker
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "BackendAPI.dll"]