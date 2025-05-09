const express = require('express');
const path = require('path');
const app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

let tasks = ['Passear com o dog', 'Ir ao mercado', 'Comprar pão'];

app.get('/', (req, res) => {
    res.render('index', {taskslist:tasks});
});

app.get('/deletar/:id', (req, res) => {
    tasks = tasks.filter(function(val, index){
        if(index != req.params.id){
            return val;
        }
    })
    res.render('index', {taskslist:tasks});
});



app.listen(5000, () =>{
    console.log('Servidor rodando em http://localhost:5000');
})