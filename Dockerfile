FROM nginx:latest
COPY ./dist /var/www/
CMD ["nginx", "-g", "daemon off;"]
