const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);

module.exports = {
    fetchWord
}

async function fetchWord (word) {
    return await db.select().from('nouns').where('bare',word)
}

