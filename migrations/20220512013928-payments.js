'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('payments',{
      id: { type: 'int', primaryKey:true, autoIncrement:true, unsigned: true},
      date_paid: 'datetime',
      payment_ref : { type: 'string', length:50}
  })
};

exports.down = function(db) {
  return db.dropTable('payments');
};

exports._meta = {
  "version": 1
};