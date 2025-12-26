import express from "express";
import { getAll, getByName, insert, remove, updateAge } from "./operations.js";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/getItems', (req, res) => {
    const items = getAll();
    console.log("The items are ", JSON.stringify(items));
    res.json(items);
})

app.get('/getItems/:name', (req, res) => {
    const { name } = req.params;
    const item = getByName(name);
    res.json(item);
})

app.post('/saveItems', (req, res) => {
    const items = req.body;
    console.log("the data is ", items);
    insert(items);
    res.send(`The ${items} data is inserted`);
})

app.put('/updateAge/:name', (req, res) => {
    const { name } = req.params;
    const { age } = req.query;
    updateAge(name, age);
    res.send(`${name} data is updated ...`);
})

app.delete('/delete', (req, res) => {
    let { name } = req.query;

    console.log(`Delete ${name} ...`);
    let status = remove(name);
    console.log("THe status isssssssssssssssssss ", status);

    if (status)
        res.status(200).json({ message: `${name} is removed` });
    else {
        res.status(404).json({
            error: `Not Found`,
            message: `${name} is not found`
        });
    }
})


app.listen(8080, () => {
    console.log("Server is running on 8080");
});