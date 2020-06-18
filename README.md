#nodejwt

API NODE WITH JWT

http://localhost:8080/api/v1/auth/login

To run parallel instances you can use pm2 (optional)
https://www.npmjs.com/package/pm2
npm install pm2 -g

Basics:
pm2 start nodejwt-api.js
pm2 list
pm2 stop     nodejwt-api
pm2 restart  nodejwt-api
pm2 delete   nodejwt-api


Classic way. 
node nodejwt-api.js
