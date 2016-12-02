import { isString } from 'lodash';
import { queryAll, props } from 'spatie-dom';
import Standalone from '../components/Standalone';
import Vue from 'vue';

export default function mount(el, options = {}) {
    if (isString(el)) {
        return queryAll(el).map(el => mount(el, props(el)));
    }
    
    return new Vue({
        el,
        render(createElement) {
            return createElement(Standalone, { props: props(el) });
        },
    });
}