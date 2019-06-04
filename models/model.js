'use strict'

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let modelSchema = Schema({
    name: String,
    brand: {type: Schema.ObjectId, ref: 'brand'}
})

module.exports = mongoose.model('model', modelSchema)
