'use strict'

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let siteSchema = Schema({
    name: String,
    url: String,
    url_base: String
})

module.exports = mongoose.model('site', siteSchema)