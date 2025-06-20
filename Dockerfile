# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY keel-proxy.js ./

RUN npm install express axios

EXPOSE 8080

CMD ["node", "keel-proxy.js"]
