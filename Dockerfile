FROM node:alpine

WORKDIR /usr/app

# Copy dependency definitions and install
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

# Install required system packages
RUN apk add --no-cache openssl libssl3

# Install prisma in the container
RUN npm install -g prisma

# Copy source files and generate Prisma client
COPY . .
RUN pnpm run prisma:stage-generate

EXPOSE 6500
EXPOSE 5500
EXPOSE 5555

RUN pnpm run build

# Run database migrations and start the application
CMD ["sh", "-c", "pnpm run prisma:stage-migrate && pnpm run start:stage"]




