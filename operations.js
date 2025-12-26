import fs from 'fs';

const data = fs.readFileSync('storage.json', 'utf8');
let storage = JSON.parse(data);
console.log("These are ", storage.length, " items📦 in storage.");

export function getAll() {
    console.log("The items in storage are " + storage);
    return storage;
}

export function getByName(name) {
    const item = storage.filter((item) => item.name === name);
    return item;
}

export function insert(data) {
    data.map(d => storage.push(d));

    saveToSystem(storage);
    console.log("Data is pushed...");
}

export function updateAge(name, age) {

    storage.filter(item => item.name === name).map((item) => item.age = parseInt(age));
    saveToSystem();
    console.log("Age is updated ...");

}

export function remove(name) {
    if (storage.filter((f) => f.name === name).length >0) {
        storage = storage.filter((item) => item.name != name);
        let flag =saveToSystem();
        console.log("THe flag isssssssssssssssssss ",flag);
        return flag;
    }

    return false;
}



function saveToSystem() {
    try {
        fs.writeFileSync('./storage.json', JSON.stringify(storage, null, 2));
        console.log("Data is saved to system ....");
        return true;
    } catch {
        console.log("Failed to save to the system");
        return false;
    }
}
