# store-microservices

Este repositório guarda o código fonte de uma aplicação simulando as regras de négocio de uma loja utilizando arquitetura de microsserviços. Atualmente hão os microsserviços de Produtos e Pedidos, que consomem os respectivos tópicos de produtos e pedidos do serviço de mensageria RabbitMQ para persistir as informações no MongoDB com base nas mensagens.

Os microsserviços, desenvolvidos em Node.js e Typescript seguindo a arquitetura de desenvolvimento orientado a domínio, também utilizam os conceitos de Clean Architecture, SOLID e Design Patterns.
