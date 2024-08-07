# store-microservices

Este repositório guarda o código fonte de uma aplicação simulando as regras de négocio de uma loja utilizando arquitetura de microsserviços. Atualmente hão os microsserviços de Produtos e Pedidos, que consomem os respectivos tópicos de produtos e pedidos do serviço de mensageria RabbitMQ para persistir as informações no MongoDB com base nas mensagens.

Os microsserviços, desenvolvidos em Node.js e Typescript seguindo a arquitetura de desenvolvimento orientado a domínio, também utilizam os conceitos de Clean Architecture, SOLID e Design Patterns.

## Requisitos

Rabbitmq

```sh
$ docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

Elasticsearch

```sh
$ docker run -d --name elasticsearch -p 9200:9200 -e "discovery.type=single-node" elasticsearch:7.12.0
```

Kibana

```sh
$ docker run -d --name kibana -p 5601:5601 --link elasticsearch:kibana elastic/kibana:7.12.0
```
