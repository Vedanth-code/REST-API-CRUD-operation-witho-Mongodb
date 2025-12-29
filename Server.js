import express from "express";
import { getAll, getByName, insert, remove, updateAge } from "./operations.js";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send("Hello World");
});

app.get('/getAllUsers', async (req, res) => {
    const items = await getAll();
    console.log("The items are ", items);
    res.status(items[1].status).json(items[0]);
})

app.get('/getUser/:name', async (req, res) => {
    const { name } = req.params;
    const item = await getByName(name);
    res.status(item[1].status).json(item[0]);
})

app.post('/saveUser', async (req, res) => {
    const items = req.body;
    console.log("the data is ", items);
    const item = await insert(items);
    res.status(item[1].status).json(item[0]);
})

app.put('/updateAge/:name', async (req, res) => {
    const { name } = req.params;
    const { age } = req.query;
    const data = await updateAge(name, age);
    res.status(data[1].status).json(data[0]);
})

app.delete('/delete', async (req, res) => {
    let { name } = req.query;

    console.log(`Delete ${name} ...`);
    let status = await remove(name);
    // res.send(status);
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