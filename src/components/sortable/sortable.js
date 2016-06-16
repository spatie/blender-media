import constrain from 'dragula-constrain';
import dragula from 'dragula';
import { matches } from '../../lib/helpers';

export default {

    params: ['handle'],

    bind() {

        const { handle = '*' } = this.params;

        this.vm.sortable = dragula([this.el], {
            moves(element, container, handleElement) {
                return matches(handleElement, handle);
            },
        });

        constrain(this.vm.sortable);

        this.vm.sortable.on('drop', function () {
            this.vm.$emit('reordered', { elements: Array.from(this.el.children) });
        }.bind(this));
    },

    unbind() {
        this.vm.sortable.destroy();
    },

};
