import _ from 'lodash';

_.mixin({

    contains(collection, object) {
        return !! _.find(collection, object);
    },

    pipe(object, ...operations) {
        return operations.reduce((object, operation) => operation(object), object);
    },

});
