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
router.get('/decks', (req, res, next) => {
    Deck.find()
        .then((decks) => {
            // 'decks' will be an array of Mongoose documents
            // we want to convert each one to a POJO, so we use .map to apply .toObject to each one
            return decks.map((deck) => {deck.toObject()})
        })
        .save(deck)
        // respond with status 200 and JSON of the characters
        .then((decks) => res.status(200).json({ decks: decks }))
        // if an error occurs, pass it to the handler
        .catch(next)
})

// {{{-----SHOW-----}}}
    // DECK SHOW
    // will lead to a page displaying each card in the particular deck

router.get('/decks/:id', (req, res, next) => {
    // req.params.id will be set based on the ':id' in the route
    Deck.findById(req.params.id)
        // populate the owner field/id
        .populate('owner')
        // pass through the error handler if 404 no content is return
        .then(handle404)
        // if 'findById' is successful, respond with 200 and 'deck' JSON
        .then((deck) => res.status(200).json({ deck: deck.toObject() }))
        // if an error occurs, pass it to the handler
        .catch(next)
})

// {{{-----CREATE-----}}}
    // DECK CREATE
    // users will be able to create a deck that has a name and cards
    // the deck could be created when user clicks button to navigate to card search page where they add cards to the deck and name it
    // the "create deck" button will actually be an update that changes the name of the deck from untitled to whatever the user inputs
router.post('/decks', (req, res, next) => {
    // set owner of new deck to be current user
    req.body.deck.owner = req.user.id
    Deck.create(req.body.deck)
        // respond to successful 'create' with status 201 and JSON of new 'deck'
        .then((deck) => {
            res.status(201).json({ deck: deck.toObject() })
        })
        // if an error occurs, pass it off to the error handler
        // the error handler needs the error message and the 'res' object so that it can send an error message back to the client
        .catch(next)
})

// {{{-----UPDATE-----}}}
    // DECK UPDATE
    // user can update decks by adding and removing cards, and changing the deck name
    // card addition and removal just adds/removes object reference IDs from the deck's "cards" property

// {{{-----DELETE-----}}}
    // DECK DELETE
    // users can delete decks they don't want as a part of their collection anymore

module.exports = router