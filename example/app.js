import { mountMedia } from '../src';
import { queryAll } from 'spatie-dom';

// extendType('download', {
//     editor: 'locales',
// });

queryAll('media').forEach(el => mountMedia(el));