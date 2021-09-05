const AirtablePlus = require('airtable-plus');
 
const usersTable = new AirtablePlus({
    baseID: 'appsMkHIirvlcAGcy',
    apiKey: process.env.AIRTABLE,
    tableName: 'Users',
});

export async function getUsers(){
    return (await usersTable.read({}, {camelCase: true})).map(x => x.fields)
}

export default async function handler(req,res){
    res.status(200).json((await getUsers()))
}