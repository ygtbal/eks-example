docker run -d --name eks-postgres --network eksnetwork -e POSTGRES_USER=YBALALA -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=eksnode -p 5432:5432 postgres

docker run --rm -d --name eks-backend --network eksnetwork -p 3000:3000 --env-file .env eks-backend:v1
