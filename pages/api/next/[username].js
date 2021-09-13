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
  let user = await getUser(req.query.username)
  let nextUsers = (await usersTable
    .read(
      {
        filterByFormula: 'NOT({HTML Contents}=BLANK())',
        sort: [{ field: 'Number', direction: 'asc' }],
      },
      { camelCase: true },
    )
  ).map(x => x.fields)
  console.log(nextUsers)
  let nextUsersFiltered = nextUsers.filter(
    x => x['number'] > user['number'],
  )
  console.log(nextUsersFiltered)
  if (nextUsersFiltered.length >= 1) {
    res.redirect(`https://${nextUsersFiltered[0].username}.nlcs.sampoder.com`)
  } else {
    res.redirect(`https://${nextUsers[0].username}.nlcs.sampoder.com`)
  }
}
