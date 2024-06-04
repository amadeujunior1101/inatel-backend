# Inatel backend

Este projeto utiliza as seguintes tecnologias:

- Nest.js
- Typescript
- Express
- Class-validator
- Socket IO
- Radis
- Mongo
- API Currency 
- swagger

## Executando a Aplicação

- No terminal:

1 - clone do repositorio: 

  git clone https://github.com/amadeujunior1101/inatel-backend.git

2 - acesse a pasta:

  cd inatel-backend

3 - baixe as dependências:

    yarn

4 - crie o arquivo .env na raíz do projeto e set os valores referentes logo abaixo:

	PORT=3000
  REDIS_HOST=localhost #docker use: redis
  REDIS_PORT=6379
  ECONOMY_AWESOME_API=https://economia.awesomeapi.com.br

  FRONTEND_URL=http://localhost:5173

  MONGO_URL=mongodb://localhost:27017/nestjs #docker use: mongodb://mongo:27017/nestjs

  PASSWORD_SALT=10

  EXPIRES_JWT=1d

  JWT_SECRET=27h72088F@19s
	
5 - na pasta inatel-backend:

	yarn dev ou npm run dev

Para executar com docker:
  docker-compose up --build