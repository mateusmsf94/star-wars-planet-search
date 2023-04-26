# SWAPI Planets Table :milky_way:

Este projeto tem como objetivo criar uma aplicação que consome a API de Star Wars ([SWAPI](https://swapi.dev/)) e exibe informações dos planetas em uma tabela, com filtros de pesquisa e ordenação. A aplicação utiliza React, Context API e Hooks para gerenciar o estado da aplicação.

## :rocket: Funcionalidades

- Requisição para o endpoint `/planets` da SWAPI e preenchimento da tabela com os dados retornados;
- Filtro de texto para a tabela;
- Filtro para valores numéricos;
- Implementação de múltiplos filtros numéricos;
- Não utilizar filtros repetidos;
- Remoção de filtros de valor numérico e de todas as filtragens numéricas;

## :construction_worker: Instalação

Primeiro, você precisa clonar este repositório:

```
git clone https://github.com/seu_usuario/swapi-planets-table.git
```

Em seguida, instale as dependências do projeto:

```
npm install
```

## :computer: Execução

Para executar a aplicação, utilize o comando:

```
npm start
```

A aplicação estará disponível no endereço `http://localhost:3000`.

## :white_check_mark: Testes

Para executar os testes, utilize o comando:

```
npm test
```

Para verificar a cobertura de testes, utilize o comando:

```
npm run test-coverage
```

## :memo: Licença

Este projeto está sob a licença MIT. Consulte [LICENSE](LICENSE) para obter detalhes.

