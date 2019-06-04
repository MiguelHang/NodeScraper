'use strict'

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let brandSchema = Schema({
    name: String,
    site: {type: Schema.ObjectId, ref: 'site'}
})

module.exports = mongoose.model('brand', brandSchema)