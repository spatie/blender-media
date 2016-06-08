import { includes, sortBy } from 'lodash';
import getClassNameForExtension from 'font-awesome-filetypes';

export const extension = media => {
    return media.file_name.split('.').pop().toLowerCase();
};

export const isImage = media => {
    return includes(['jpg', 'jpeg', 'gif', 'png'], extension(media));
};

export const icon = media => {
    return getClassNameForExtension(extension(media));
};

export const sort = media => {
    return sortBy(media, 'order_column');
};
