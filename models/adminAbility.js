const { defineAbility } = require('@casl/ability');

module.exports = defineAbility((can, cannot) => {
    can('read', 'all');
    cannot('delete', 'User');
})