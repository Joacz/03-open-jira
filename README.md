# Next.js OpenJira

To run locally, run:

```
docker-compose up -d
```

_(`-d` stands for **detached**)_

- MongoDB Local URL:

```
mongodb://localhost:27017/entriesdb
```

## Configuring environment variables

To do it rename `.env.template` to `.env` and add the required values.

## Fill database with information for testing (development mode)

- Request to:
  _(any method)_

```
http://localhost:3000/api/seed
```
