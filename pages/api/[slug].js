const AirtablePlus = require('airtable-plus')

const usersTable = new AirtablePlus({
  baseID: 'appsMkHIirvlcAGcy',
  apiKey: process.env.AIRTABLE,
  tableName: 'Users',
})

export async function getUser(username) {
  return (
    await usersTable.read(
      {
        filterByFormula: `Username = "${username}"`,
        maxRecords: 1,
      },
      { camelCase: true },
    )
  ).map(x => x.fields)[0]
}

export default async function handler(req, res) {
  res.status(200).json(await getUser(req.query.slug))
}
