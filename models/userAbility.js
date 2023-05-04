const { defineAbility } = require('@casl/ability');

module.exports = defineAbility((can, cannot) => {
    cannot('read', 'User');
})