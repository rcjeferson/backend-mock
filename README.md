ambiente de test
docker compose --env-file ./.env.test -f docker-compose-tst.yml up -d
docker compose --env-file ./.env.test -f docker-compose-tst.yml down


docker compose --env-file ./.env.dev -f docker-compose-dev.yml up -d
docker compose --env-file ./.env.dev -f docker-compose-dev.yml down
ou
docker compose -f docker-compose-dev.yml up -d
docker compose -f docker-compose-dev.yml down

# Backend Mock
 Criado para workshop de Kubernetes
