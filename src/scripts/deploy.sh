#!/bin/bash

# Exit on any failure
set -e

cd /home/ec2-user/apps/kenia/backend || exit 1

git clean -fd
git fetch --all
git reset --hard origin/HEAD

docker-compose down --volumes --remove-orphans

docker-compose up --build -d &  

sleep 30

docker exec kenia_api pnpm run prisma:stage-migrate

echo "Deployment completed successfully!"
