import fs from 'fs';
import { closeDB, createConnection } from './Connection.js';

// const data = fs.readFileSync('storage.json', 'utf8');
// let storage = JSON.parse(data);
// console.log("These are ", storage.length, " items📦 in storage.");

export async function getAll() {
    try {
        const db = await createConnection();

        const data = await db.collection('users').find({}).toArray();
        console.log("HT ", data);
        const result = [data, { "status": 200 }]
        return result;
    } catch (error) {
        console.log("Error Fetching data ...", error);
        return [{ "Error": "Error while Fetching all User", "Message": error.message }, { "status": 500 }];
    } finally {
        await closeDB();
    }
}

export async function getByName(name) {
    try {
        const db = await createConnection();
        const data = await db.collection('users').find({ 'name': name }).toArray();

        if (data.length == 0) {
            return [{"msg":"User not Found !"}, { "status": 404 }]
        } else {
            return  [data, { "status": 200 }]
        }

    } catch (error) {
        console.log("Error fetching the name ...");
        return [{ "Error": `Error while fetching ${name}`, "Message": error.message }, { "status": 500 }];

    } finally {
        await closeDB();
    }
}

export async function insert(val) {
    try {
        const db = await createConnection();

        const data = await db.collection('users').insertMany(val);
        console.log("Data inserted ...", JSON.stringify(data));
        const result = [data, { "status": 200 }]
        return result;

    } catch (error) {
        console.log("Failed inserting data ", error);
        return [{ "Error": `Error while Saving ${val}`, "Message": error.message }, { "status": 500 }];

    }
    finally {
        await closeDB();
    }
}

export async function updateAge(name, age) {
    try {
        const db = await createConnection();

        const data = await db.collection('users').updateOne({ 'name': name }, { $set: { "age": parseInt(age) } });
        
        if(data.modifiedCount == 0){
            return [{"message": "Couldnt found the record"},{"status":404}];
        }
        return [data, { "status": 200 }]

    } catch (error) {
        console.log("Error updating ...");
        return [{ "Error": `Error while Updating ${name}`, "Message": error.message }, { "status": 500 }];
    } finally {
        await closeDB();
    }
}

export async function remove(name) {
    try {
        const db = await createConnection();

        const data = await db.collection('users').deleteOne({ 'name': name });
        if (data.deletedCount == 0) {
            return false;
        }
        return true;

    } catch (error) {
        console.log("Error deleting ...");
        return [{ "Error": `Error while Deleting ${name}`, "Message": error.message }, { "status": 500 }];
    } finally {
        await closeDB();
    }
}

