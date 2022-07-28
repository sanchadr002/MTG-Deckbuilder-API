// {{{-----DEPENDENCIES-----}}}
// import dependencies
// authorization and messaging dependencies
const express = require('express')
const passport = require('passport')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

// model dependencies
const Card = require('../models/card')

// {{{-----MIDDLEWARE-----}}}
const removeBlanks = require('../../lib/remove_blank_fields')

// passing this as a second argument to 'router.<verb>' will make it so that a token MUST be passed for that 
// route to be available, it will also set 'req.user'
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// {{{-----INDEX-----}}}
// CARD INDEX
    // lead to a page displaying cards currently in user's created decks

// {{{-----SHOW-----}}}
// CARD SHOW
    // leads to page displaying individual card information

// {{{-----CREATE-----}}}
// CARD CREATE
    // when user is adding a card to their deck, route should check if the card already exists in teh database by using scryfallApiId
    // if card doesn't exist, create it and add it to the deck
    // if it does, add that objectID reference to the deck

// {{{-----UPDATE-----}}}
// CARD UPDATE
    // card update unnecessary; players cannot make changes to cards, so there is no need for users of this app to be able to change card information

// {{{-----DELETE-----}}}
// CARD DELETE
    // users will be able to edit their decks to remove cards from it which removes object reference IDs from the deck
    // however this doesn't remove the card from the database
    // having a delete button for the card could prove to be problematic, as having the card in 
    // multiple decks would then cause multiple decks would have object reference IDs to objects that don't exist
    // will have to figure out a way to delete cards if they only exist in the deck they're being removed from for the sake of saving database space

module.exports = router