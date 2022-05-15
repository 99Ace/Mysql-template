const bookshelf = require('../bookshelf')

const User = bookshelf.model('User', {
    tableName:'users'
});

const Provider = bookshelf.model('Provider', {
    tableName:'providers'
});

module.exports = { User, Provider };