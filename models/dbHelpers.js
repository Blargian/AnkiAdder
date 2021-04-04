const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);

module.exports = {
    fetchWord
}

async function fetchWord (word) {
    return await db.select('bare','accented','id','type','usage_en','audio').from('words').where('bare','like',`${word}%`).limit(10)
}

