// {{{-----DEPENDENCIES-----}}}
// import dependencies
// authorization and messaging dependencies
const express = require('express')
const passport = require('passport')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

// model dependencies
const Deck = require('../models/deck')

// {{{-----MIDDLEWARE-----}}}
const removeBlanks = require('../../lib/remove_blank_fields')

// passing this as a second argument to 'router.<verb>' will make it so that a token MUST be passed for that 
// route to be available, it will also set 'req.user'
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// {{{-----INDEX-----}}}
    // DECK INDEX
    // will display an index of decks that user has created

// {{{-----SHOW-----}}}
    // DECK SHOW
    // will lead to a page displaying each card in the particular deck

// {{{-----CREATE-----}}}
    // DECK CREATE
    // users will be able to create a deck that has a name and cards
    // the deck could be created when user clicks button to navigate to card search page where they add cards to the deck and name it
    // the "create deck" button will actually be an update that changes the name of the deck from untitled to whatever the user inputs

// {{{-----UPDATE-----}}}
    // DECK UPDATE
    // user can update decks by adding and removing cards, and changing the deck name
    // card addition and removal just adds/removes object reference IDs from the deck's "cards" property

// {{{-----DELETE-----}}}
    // DECK DELETE
    // users can delete decks they don't want as a part of their collection anymore

module.exports = router