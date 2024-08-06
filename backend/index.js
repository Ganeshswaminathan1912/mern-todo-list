// **backend/index.js**
    const express = require('express');
    const bodyParser = require('body-parser');
    const cors = require('cors');

    const app = express();
    const port = 5000;

    app.use(cors());
    app.use(bodyParser.json());

    // Sample in-memory data store (replace with database later)
    let todos = []; 

    app.get('/todos', (req, res) => {
        res.json(todos);
    });

    app.post('/todos', (req, res) => {
        const newTodo = { id: Date.now(), text: req.body.text, completed: false };
        todos.push(newTodo);
        res.json(newTodo); 
    });

    app.put('/todos/:id', (req, res) => {
        const todoIndex = todos.findIndex(todo => todo.id === parseInt(req.params.id));
        if (todoIndex > -1) {
            todos[todoIndex] = { ...todos[todoIndex], ...req.body };
            res.json(todos[todoIndex]);
        } else {
            res.status(404).send('Todo not found');
        }
    });

    app.delete('/todos/:id', (req, res) => {
        const todoIndex = todos.findIndex(todo => todo.id === parseInt(req.params.id));
        if (todoIndex > -1) {
            todos.splice(todoIndex, 1);
            res.status(204).send(); // 204 No Content
        } else {
            res.status(404).send('Todo not found');
        }
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });