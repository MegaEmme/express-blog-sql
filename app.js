//collego express
const express = require('express');
const app = express();
//definisco la porta
const port = 7000;
//importo il router
const postsRouter = require('./routers/postsRouter');
//importo middleware checkTime
const checkTime = require('./middlewares/checkTime');
//importo middleware errorsHandler
const errorsHandler = require('./middlewares/errorsHandler');
//importo middleware notFound
const notFound = require('./middlewares/notFound');
//registro gli assets statici
app.use(express.static('public'));
//registro il body parser per application json
app.use(express.json());
//resgistro la path in cui posizionare il router
app.use('/posts', postsRouter);
//mando un messaggio html a schermo
app.get('/', (req,res)=>{
    res.send('<h1>Il mio server</h1>');
});
//registro il middleware checkTime
app.use(checkTime);
//registro il middleware errorsHandler
app.use(errorsHandler);
//registro il middleware notFound
app.use(notFound);
//attivo il server sulla porta
app.listen(port, ()=> {
    console.log(`sono un server attivo sulla porta ${port}`);
});