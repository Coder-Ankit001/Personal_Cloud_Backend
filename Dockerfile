FROM node:22-alpine

WORKDIR /app

COPY package.*json .

RUN npm install 

COPY . .

RUN npx prisma generate --schema=./prisma/schema.prisma

EXPOSE 3000

CMD ["node", "index.js"]
