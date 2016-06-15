import constrain from '../../lib/dragula-constrain';
import dragula from 'dragula';

export default {
    ready() {

        const drake = dragula([this.$els.sortContainer], {
            moves(el, container, handle) {
                return handle.classList.contains('js-handle');
            },
        });

        drake.on('drop', function () {
            // const mediaElements = Array.from(this.$els.sortContainer.children);
            // mediaElements.map(tbody => tbody.children[0].mediaId)
        }.bind(this));

        drake.on('cloned', function (clone) {
            this.dragulaConstraint = constrain(clone, this.$els.sortContainer);
        }.bind(this));

        drake.on('dragend', function () {
            this.dragulaConstraint.break();
        }.bind(this));
    },
};
