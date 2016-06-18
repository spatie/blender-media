# Blender Media

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Build Status](https://img.shields.io/travis/spatie-custom/blender-media.svg?style=flat-square)](https://travis-ci.org/spatie-custom/blender-media)

The media uploader and manager for [Blender](https://github.com/spatie-custom/blender), our CMS.

## Installation

The `blender-media` package isn't publicly available on npm, you'll need to either copy it into your own project, or require a tag as a dependency:

```bash
npm install spatie-custom/blender-media@'2.0.0'
```

`blender-media` requires two peer dependencies which you'll need to install, `vue` and `vuex`:

```bash
npm install vue@'^1.0.24' vuex@'^0.6.3'
```

## Example

This repository contains a dummy version of the media component. It can be built and served on `http://localhost:4000` with the following command:

```bash
npm run example
```

## Usage

In order to use the `media` component, you'll need to register it first. You can either register it globally, or scoped to a view model:

```js
import Media from 'blender-media';
import Vue from 'vue';

// Global registration...
Vue.component('media', Media);

// ...or scoped to your view model
new Vue({
    el: 'body',
    components: {
        Media,
    },
});
```

After registering the component, it can be used in your html:

```html
<media
    collection="images"
    type="images"
    upload-url="/upload"
    :model="{ name: 'MyModel', id: 1 }"
    :initial='[{
        "id": 1,
        "name": "image_1",
        "file_name": "image_1.jpeg",
        "custom_properties": {},
        "order_column": 1,
        "thumbUrl": "/media/image_1.jpeg",
        "originalUrl": "/media/image_1.jpeg",
        "collection": "images"
    }]'
></media>
```

### `Media` Objects

Media objects look like the original model from the Laravel package.

```js
/**
 * @typedef {Object} Media
 * @property {number} id
 * @property {string} name
 * @property {string} file_name
 * @property {Object} custom_properties
 * @property {number} order_column
 * @property {string} thumbUrl
 * @property {string} originalUrl
 * @property {string} collection
 */
```

### Properties

The component requires a few properties to be set up to handle the collection and uploads.

#### `type` : string

The type of component that should be rendered (see Types for more details).

#### `upload-url` : string

The URL that newly uploaded media will be posted to. This endpoint should handle the upload, and return a `Media` object.

#### `model` : { name: string, id: number }

The fully qualified class name of the model that the media is related too, and it's ID.

#### `initial` : Media[]

The media items that are already in the collection.

### Types

...

Types have to be registered **before** any `media` component gets rendered.

### Editors

Every media row has an editor in section between the thumbnail and the remove button. A `basic` editor is provided that has in input to rename the media object.

Editors are simply Vue components with and `editor` mixin. The mixin takes care of the `media` prop and adds some convenience methods.

Editors can be added by registering them through the `registerEditor` method. Here's a bare bone example of a read-only editor:

```js
import { registerEditor, editor } from 'blender-media';

registerEditor('readOnly', {

    template: `
        <div>{{ media.name }}</div>
    `,

    mixin: [editor],

});
```

Since the media component uses Vuex, any updates that editors do should be made through actions. Thanks to the `editor` mixin, you don't have to worry about the implementation, just make sure you make your changes with the `rename` and `updateCustomProperty` methods.

A more complex editor that can toggle a media item per locale. You can pass in custom data for the editor in the `data` property of the `media` component:

```html
<media
    :data="{ locales: ['nl', 'en'] }"
></media>
```

```js
import { registerEditor, editor } from 'blender-media';

registerEditor('localeEditor', {

    template: `
        <div>
            <div>
                <input type="text" v-model="name">
            </div>
            <div>
                <label v-for="locale in data.locales">
                    {{ locale }}
                    <input
                        :checked="locales[locale]"
                        @change="toggleLocale(locale)"
                    >
                </label>
            </div>
        </div>
    `,

    mixin: [editor],

    computed: {
        name: {
            get() {
                return this.media.name;
            },
            set(value) {
              this.rename(value);
            },
        },
        locales() {
            return media.custom_properties.locales || {};
        },
    },

    methods: {
        toggleLocale(locale) {
            this.updateCustomProperty('locales.locale', locale);
        },
    },

});
```

Like types, editors have to be registered **before** any `media` component gets rendered.

## Contributing

Since this is an internal project, we don't accept pull requests at this time.

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

Example images provided by [Unsplash](https://unsplash.com).
