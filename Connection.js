import { MongoClient } from "mongodb";

const uri= 'mongodb://localhost:27017';
const databaseName = 'user';

let client = null;
let db = null;

export async function createConnection(){
    if(client &&db){
        return db;
    }
    try{
        client = new MongoClient(uri,{
            maxPoolSize:10,
            minPoolSize:2
        });
        
        await client.connect();

        db = client.db(databaseName);
        console.log("Connected to mongodb ...");
        
        return db;
    }catch(error){
        console.log("Connection error ", error);
        throw error;
    }
}

export async function closeDB() {
    if(client){
        await client.close();
        client = null;
        db = null;

        console.log("MongoDB connection closed");
        
    }
}