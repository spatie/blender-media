import { mountMedia, extendType } from '../src';
import { queryAll } from 'spatie-dom';

extendType('download', {
    editor: 'locales',
});

queryAll('media').forEach(el => mountMedia(el, { debug: true }));