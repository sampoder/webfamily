const AirtablePlus = require('airtable-plus')

const usersTable = new AirtablePlus({
  baseID: 'appsMkHIirvlcAGcy',
  apiKey: process.env.AIRTABLE,
  tableName: 'Users',
})

export default async function handler(req, res) {
  let updatedRecord = await usersTable.update(req.query.id, req.body)
  res.json(updatedRecord)
}   
