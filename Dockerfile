FROM nginx:latest
COPY ./dist /var/www/html
CMD ["nginx", "-g", "daemon off;"]
