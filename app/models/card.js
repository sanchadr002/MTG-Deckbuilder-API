// create mongoose variable for reference in export
const mongoose = require('mongoose')

// schema for the Card model
const cardSchema = new Schema(
    {
        // scryfallApiId is the card's ID in scryfall's api system
        // can be used to make quicker api calls in case necessary in the future
        // image calling for the index page?
        scryfallApiId: { type: String },

        // properties for searchability within the database and information display in the app
        name: { type: String },
        manaValue: { type: String },
        colorIdentity: { type: String },
        cardType: { type: String }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Card', cardSchema)