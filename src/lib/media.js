import _ from 'lodash';
import getClassNameForExtension from 'font-awesome-filetypes';

export const thumbUrl = media => {
    return `/media/${media.id}/conversions/admin.jpg`;
};

export const originalUrl = media => {
    return `/media/${media.id}/${media.file_name}`;
};

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
    return media.sort((a, b) => a.order_column - b.order_column);
};
