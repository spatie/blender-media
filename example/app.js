import { mount, extendType } from '../src';

extendType('download', {
    editor: 'locales',
});

mount('media');