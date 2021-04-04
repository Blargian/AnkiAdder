const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);

async function fetchWord (word) {
    return await db.select('bare','accented','id','type','usage_en','audio').from('words').where('bare','like',`${word}%`).limit(10);
}

async function fetchTranslation (word_id) {
    return await db.select('tl').from('translations').where({'word_id':word_id,'lang':'en'});
}

module.exports = {
    fetchWord,
    fetchTranslation
}

