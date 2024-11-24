FROM node:18 AS builder

WORKDIR /app

COPY ./frontend .

RUN npm install


RUN npm run build

FROM nginx AS runner

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist /usr/share/nginx/html

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
