pm2 start npm -- start
pm2 serve build 5000
npm install -g serve
pm2 start serve --name <name> -- -s --port=<port> <path>
CHOKIDAR_USEPOLLING=true npm start