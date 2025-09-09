
FROM node:20-alpine
WORKDIR /app
COPY .env ./
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
RUN npm run build
CMD ["node", "build/index.js"]