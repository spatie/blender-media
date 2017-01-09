import Media, { mount, registerType } from '../src';
import Vue from 'vue';

registerType('download', {
    extend: 'download',
    editor: 'description',
});

mount('standalone');

new Vue({

    el: '#component',

    template: `
        <media
            v-model="media"
            collection="images"
            type="images"
            upload-url="http://localhost:4000/upload"
            :model='{ "name": "MyModel", "id": 1 }'
            :debug="true"
        ></media>
    `,

    data() {
        return {
            media: [
                {
                    id: 1,
                    name: "image_1",
                    fileName: "image_1.jpeg",
                    customProperties: {},
                    orderColumn: 1,
                    thumbUrl: "/media/image_1.jpeg",
                    originalUrl: "/media/image_1.jpeg",
                    collection: "images"
                },
                {
                    id: 2,
                    name: "image_2",
                    fileName: "image_2.jpeg",
                    customProperties: {},
                    orderColumn: 2,
                    thumbUrl: "/media/image_2.jpeg",
                    originalUrl: "/media/image_2.jpeg",
                    collection: "images"
                },
            ],
        };
    },
    
    components: {
        Media,
    },
});