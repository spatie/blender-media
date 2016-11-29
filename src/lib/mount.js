import createStore from './createStore';
import { isString } from 'lodash';
import { queryAll, props } from 'spatie-dom';
import Media from '../components/Media';
import Vue from 'vue';

export default function mount(el, options = {}) {
    if (isString(el)) {
        return queryAll(el).map(el => mount(el, props(el)));
    }
    
    const store = createStore();
    store.init(options);
    
    return new Vue({
        el,
        render(createElement) {
            return createElement(Media, { props: { store } });
        },
    });
}