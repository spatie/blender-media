# Blender Media

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Build Status](https://img.shields.io/travis/spatie-custom/blender-media.svg?style=flat-square)](https://travis-ci.org/spatie-custom/blender-media)

The media uploader and manager for [Blender](https://github.com/spatie-custom/blender), our CMS.

## Installation

The `blender-media` package isn't publicly available on npm, you'll need to either copy it into your own project, or require a tag as a dependency:

```bash
npm install spatie-custom/blender-media#2.0.0
```

`blender-media` also requires you to install two peer dependencies in your project: `vue` and `vuex`:

```bash
npm install vue@'^1.0.24' vuex@'^0.6.3'
```

## Example

This repository contains a dummy version of the media component which can be used for development. It can be built and served on `http://localhost:4000` with the following command:

```bash
npm run dev
```

The process will also watch for JS and CSS file changes.

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
        "fileName": "image_1.jpeg",
        "customProperties": {},
        "orderColumn": 1,
        "thumbUrl": "/media/image_1.jpeg",
        "originalUrl": "/media/image_1.jpeg",
        "collection": "images"
    }]'
    :data="{ locales: ['nl', 'en'] }"
></media>
```

### `Media` Objects

Media objects look like the original model from the Laravel package.

```js
/**
 * @typedef  {Object} Media
 * @property {number} id
 * @property {string} name
 * @property {string} fileName
 * @property {Object} customProperties
 * @property {number} orderColumn
 * @property {string} thumbUrl
 * @property {string} originalUrl
 * @property {string} collection
 */
```

### Properties

The component requires a few properties to be set up to handle the collection and uploads.

#### `type: string`

The type of component that should be rendered (see [Types](#types) for more details).

#### `upload-url: string`

The URL that newly uploaded media will be posted to. This endpoint should handle the upload, and return a `Media` object.

#### `model: { name: string, id: number }`

The fully qualified class name of the model that the media is related too and it's ID.

#### `initial: Media[]`

The media items that are already in the collection.

#### `data: ?Object`

Custom data that can be used in the media editor, e.g. a list of available locales so the media item can be toggled per language.

### Types

Each media instance requires a type. A type determines the setup of the media component. Types are registered via the `registerType` method, which takes a name and options as arguments.

```js
import { registerType } from 'blender-media';

registerType('images', {
    accepts: '.jpg,.gif',
    multiple: true,
    editor: 'basic',
});
```

#### Type Options

##### `accepts: ?string = null`

The file types that the uploader will accept. If `accepts` is `null`, all file types will be accepted. Available formats of the string are described in [Dropzone's documentation](http://www.dropzonejs.com/#config-acceptedFiles).

##### `multiple: bool = true`

Determines whether multiple files can be uploaded to a collection.

##### `editor: string = 'basic'`

The name of the registered editor to be rendered inside the component. See [Editors](#editors) for a more detailed explanation.

The package ships with `image`, `images`, `download` and `downloads` types. Types have to be registered and extended **before** any `media` component gets rendered.

### Editors

Every media row has an editor in the section between the thumbnail and the remove button. By default a `basic` editor that has in input to rename the media object is used. A `locales` editor also ships with the package, which allows you to enable and disable media items per language.

Editors are simply Vue components with an `editor` mixin. The mixin takes care of the `media` and `data` props, `name` computed prop, and adds some convenience methods.

Editors can be added by registering them through the `registerEditor` method. Here's a bare bone example of a read-only editor:

```js
import { registerEditor, editor } from 'blender-media';

registerEditor('readOnly', {

    template: `
        <div>{{ name }}</div>
    `,

    mixin: [editor],

});
```

#### Editor Methods

##### `rename(name: string)`

Rename the current media item.

##### `customProperty(key: string, fallback: any = null)`

Return the value of a custom property. If the property isn't defined, return the fallback.

```js
// { customProperties: { foo: 'bar' } }

this.customProperty('foo');
// > 'bar'

this.customProperty('baz', 'qux');
// > 'qux'
```

##### `updateCustomProperty(string: key, any: value)`

Update a custom property. The key can also be namespaced with a dot.

```js
// { customProperties: {} }

this.updateCustomProperty('locales', { nl: true, en: false });

// { customProperties: { locales: { nl: true, en: false } } }

this.updateCustomProperty('locales.en', true);

// { customProperties: { locales: { nl: true, en: true } } }
```

For a more detailed example of an editor, check out the `basic` and `locales` editors in `src/components/editors`.

Like types, editors have to be registered **before** any `media` component gets rendered.

## Contributing

Since this is an internal project, we don't accept pull requests at this time.

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

Example images provided by [Unsplash](https://unsplash.com).
