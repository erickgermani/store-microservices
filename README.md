# store-microservices

Este repositório guarda o código fonte de uma aplicação simulando as regras de négocio de uma loja utilizando arquitetura de microsserviços.

Os microsserviços, desenvolvidos em Node.js e Typescript seguindo a arquitetura de desenvolvimento orientado a domínio, também utilizam os conceitos de Clean Architecture, SOLID e Design Patterns.

## Microsserviços

#### API Microsservice

A API Microservice é o entrypoint do nosso ecossistema **Store**. Ela recebe as requisições por protocolo HTTP e redireciona para os outros microsserviços da melhor forma possível; seja fazendo uma outra requisição para o microsserviço e devolvendo a resposta diretamente, ou publicando as demandas na fila de mensageria.

#### Orders Microsservice

O Orders Microsservice é responsável por tratar as requisições que tenham a ver com os pedidos.

#### Products Microsservice

O Products Microsservice é responsável por tratar as requisições que tenham a ver com os produtos.

## Requisitos

Para conseguir rodar o sistema, é necessário ter os seguintes programas instalados:

-   Docker
-   Docker Compose

## Como rodar

Tendo o docker instalado e garantindo que as portas 3000, 5672, 15672 e 27017 estejam livres, execute o seguinte comando:

```sh
$ docker-compose up --build
```

-   A API Microsservice irá rodar na porta 3000.
-   O RabbitMQ (mensageria) irá rodar nas portas 15672 e 5672.
-   O MongoDB rodará na porta 27017.
