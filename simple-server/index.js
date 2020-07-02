const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
   if(req.method === 'GET') {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    })

    if(req.url === '/') {
        fs.readFile(path.join(__dirname, 'views', 'index.html'), 'utf-8', (err, data) => {
            if(err) throw err;
            res.end(data);
        })
    } else if(req.url === '/about') {
        fs.readFile(path.join(__dirname, 'views', 'about.html'), 'utf-8', (err, data) => {
            if(err) throw err;
            res.end(data);
        })
    } else if(req.url === '/api/users') {
        res.writeHead(200, {
            'Content-Type': 'text/json'
        });

        res.end(JSON.stringify([{name: 'Dzmitry', age: 23}, {name: 'Elena', age: 27}]));
    }

   

   } else if(req.method === 'POST') {
       res.writeHead(200, {
           'Content-Type': 'text/html; charset=utf-8'
       })
        const body = [];
        req.on('data', (data) => {
            body.push(Buffer.from(data));
        })

        req.on('end', () => {
           const message = body.toString().split('=')[1];
           res.end(`
       <h1>Ваше Сообщение: ${message}</h1>
       `)
        })

       
   }
});

server.listen('3000', () => {
    console.log(`Server is runing...`);
});