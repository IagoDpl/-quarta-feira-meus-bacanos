# 1. Usar a imagem oficial do SDK do .NET para construir o projeto
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copia os arquivos do projeto e restaura as dependências
COPY *.csproj ./
RUN dotnet restore

# Copia todo o resto e cria a versão final (Release)
COPY . .
RUN dotnet publish -c Release -o out

# 2. Usar a imagem leve apenas para RODAR o projeto (sem ferramentas de build)
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

# Configura a porta que o Render exige (8080)
ENV ASPNETCORE_URLS=http://+:8080

# Comando para iniciar a API
ENTRYPOINT ["dotnet", "BackendAPI.dll"]