import _ from 'lodash';

_.mixin({

    contains(collection, object) {
        return !! _.find(collection, object);
    },

});
