const express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

let tasks = [];

app.get('/', (req, res) => {
    res.render('index', {taskslist:tasks});
});

app.get('/deletar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if(id >= 0 && id < tasks.length){
        tasks.splice(id, 1);
    }
    res.redirect('/');
});

app.post('/', (req, res) => {
    const tarefa = req.body.task?.trim();
    if (tarefa) {
        tasks.push(tarefa);
    }
    res.render('index', { taskslist: tasks });
});

app.listen(5000, () =>{
    console.log('Servidor rodando em http://localhost:5000');
})