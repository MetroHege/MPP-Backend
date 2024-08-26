# Added a way to run with docker compose
Added compose.yml file and changed the address in index.ts file.

## used commands
```sh
docker-compose up --build
```

## production environment
Hosted in production via podman. Didn't use docker-compose in production as ansible was used to deploy all the required services.
```