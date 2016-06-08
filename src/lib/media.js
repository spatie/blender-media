import _ from 'lodash';
import getClassNameForExtension from 'font-awesome-filetypes';

export const extension = media => {
    return media.file_name.split('.').pop().toLowerCase();
};

export const isImage = media => {
    return _.contains(['jpg', 'jpeg', 'gif', 'png'], extension(media));
};

export const icon = media => {
    return getClassNameForExtension(extension(media));
};

export const sort = media => {
    return _.sortBy(media, 'order_column');
};
