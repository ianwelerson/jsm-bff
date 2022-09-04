# <frontend-developer />

The main objective of this project is to create a BFF for the Juntos Somos Mais coding challenge

## Endpoints
The folder `./postman` contain the collection and environment files to be imported on postman.

The available endpoints:

```json
GET: /v1/users

GET: /v1/users/:userID

GET: /v1/users/states
```

## Project Setup and info

This project was made using Express 4

```sh
npm install
```

### Dev environment

```sh
npm run dev
```

### Build for production

```sh
npm run build
```

### Run production version

```sh
npm run start
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
npm run lint:fix
```