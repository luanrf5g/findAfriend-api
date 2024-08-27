### Regras da aplicação

- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG

### Regras de negócio

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

# Find a Friend API

Aplicação criada durante o curso de NodeJs da rocketseat. Nesta api foi desenvolvido melhor a parte de testes unitários e e2e de uma forma mais completa, implementando também verificação JWT e refreshToken para a autenticação do usuário/organização ao acessar a aplicação tanto front quanto mobile. A principal característica dessa API é o fato dela possuir os casos de uso da aplicação totalmente separados do modo como são acessados, facilitando assim o modo de uso de quem for consumir essa api, já que sua funcionalidade está totalmente separada da forma que podemos consumi-la.
