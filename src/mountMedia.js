import createStore from './createStore';
import { props } from 'spatie-dom';
import Media from './components/Media';
import Vue from 'vue';

export default function mountMedia(el) {
    const store = createStore();

    store.init(props(el));
    
    new Vue({
        el,
        render(createElement) {
            return createElement(Media, { props: { store } });
        },
    });
}