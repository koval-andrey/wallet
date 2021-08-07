const express = require('express')

const { contacts: ctrl } = require('../../controllers/')
const routerContacts = express.Router()

routerContacts.get('/', ctrl.listContacts)

routerContacts.get('/:contactId', ctrl.getContactById)

routerContacts.post('/', express.json(), ctrl.addContact)

routerContacts.delete('/:contactId', ctrl.removeContact)

routerContacts.patch('/:contactId', express.json(), ctrl.updateContact)

routerContacts.patch('/:contactId', express.json(), ctrl.updateStatusFavorite)

module.exports = routerContacts
