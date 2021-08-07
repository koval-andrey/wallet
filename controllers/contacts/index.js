const addContact = require('./add')
const removeContact = require('./del')
const listContacts = require('./getAll')
const getContactById = require('./getById')
const updateContact = require('./update')
const updateStatusFavorite = require('./updateStatusFavorite')
const updateJson = require('./updateJSON')

module.exports = {
  addContact,
  removeContact,
  listContacts,
  getContactById,
  updateContact,
  updateStatusFavorite,
  updateJson,
}
