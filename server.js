const http = require('node:http');
const os = require('os');

const HOSTNAME = '127.0.0.1';
const PORT = 3000; 

const server = http.createServer((req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  if(req.url === '/'){
    const delay = Math.round(Math.random() * 5001);

    setTimeout(() => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hey there! \n\nNote: Response after ' + delay + ' ms delay');
    }, delay);

  } else if (req.method === 'GET' && req.url === '/system-info') {

    const cpuModel = os.cpus()[0].model;
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const platform = os.platform();
    const release = os.release();

    const responseData = {
      cpuModel,
      totalMemory,
      freeMemory,
      platform,
      release
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(responseData));

  } 
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
}); 