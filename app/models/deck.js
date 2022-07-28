// import dependencies
const mongoose = require('mongoose')
const Card = require('./card')
const User = require('./user')

const { Schema } = mongoose

const deckSchema = new Schema(
    {
        name: { type: String },
        cards: [{
            type: Schema.Types.ObjectId,
            ref: 'Card'
        }],
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Deck', deckSchema)