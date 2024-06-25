import http from 'http';
import fs from 'fs';


const data = JSON.parse(fs.readFileSync('data.json','utf-8'));
const index = fs.readFileSync('index.html','utf-8');

const products =data.products;


const server = http.createServer((req,res)=>{
 
  if(req.url.startsWith('/product')){

    const pid =req.url.split('/')[2];
  
    const product = products.find(p=>p.id=== (+pid));
    console.log(product);

    res.setHeader("Content-Type", "text/html");
    let test = index.replace('**title**',product.title)
    .replace('**price**',product.price)
    res.end(test);
    return;
  }

  switch(req.url){
    case '/':

    res.setHeader('Content-Type', 'text/html');
    res.end(index);
    break;
  
  case '/api':

    res.setHeader("Content-Type", "application/json");
    res.end(data);
    break;


  default:

    res.writeHead(404,"Page not found");
    res.end();
    break;
  }

});


server.listen(8000);
