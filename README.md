# Blender Media

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Build Status](https://img.shields.io/travis/spatie-custom/blender-media.svg?style=flat-square)](https://travis-ci.org/spatie-custom/blender-media)

The media uploader and manager for [Blender](https://github.com/spatie-custom/blender), our CMS.

## Installation

The `blender-media` can be installed from npm.

```bash
yarn add @spatie/blender-media
```

`blender-media` also requires you to install `vue@'^2.0.0'`:

```bash
yarn add vue@'^2.0.0'
```

## Example

This repository contains a dummy version of the media component which can be used for development. It can be built and served on `http://localhost:4000` with the following command:

```bash
npm run example
```

script will also watch for JS and CSS file changes.

## Usage

In order to use the `media` component, you need to register it first. You can register it globally, or inside a Vue component:

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

```ts
interface Media {
    id: number;
    name: string;
    fileName: string;
    customProperties: any;
    orderColumn: number;
    thumbUrl: string;
    originalUrl: string;
    colection: string;
}
```

### Properties

The component requires a few properties in order to handle the collection and uploads.

#### `type: string`

The type of component that should be rendered (see [Types](#types) for more details).

#### `upload-url: string`

The URL that newly uploaded media will be posted to. This endpoint should handle the upload, and return a `Media` object.

#### `model: { name: string, id: number }`

The fully qualified class name of the model that the media is related too and it's ID.

#### `initial: Array<Media>`

The media items that are already in the collection.

#### `data: any`

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

The package ships with `image`, `images`, `download` and `downloads` types. Types have to be registered **before** any `media` component gets rendered.

#### Extending Types

*Todo*

### Editors

Every media row has an editor in the section between the thumbnail and the remove button. The default editor—named `basic`—has in input to rename the media object.

#### Available Editors

This package ships with 4 editors:

- `basic`: A simple `name` field
- `sizePicker`: A `name` field and a `size` dropdown with 4 options (`full width`, `2/3`, `1/2`, `1/3`)
- `toggleLocales`: A `name` field and a toggle for every language, to enable or disable the image. Use this when you need a different image per language
- `translatedDescription`: A `description` field for every language. Use this when the image is the same per language, but needs a translated caption

Editors come as-is, there's no extra configuration. If you need a variation, for example different widths in the `sizePicker`, copy the source code and register your own project-specific editor.

#### Project-Specific Editors

Editors are Vue components with an `editor` mixin. The mixin takes care of the boilerplate that a custom editor requires.

- It adds `media` and `data` props
- It provides convenience methods for dealing with custom properties
- It provides convenience methods for UI actions

The editor mixin allows you to set two new options: `customProperties` and `translatableCustomProperties`. They both take a name as key, and a default value as property value.

```js
import editor from './editor';

export default {
    mixins: [editor],
    
    translatableCustomProperties: {
        description: '',
    },
    
    computed: {
        descriptions() {
            return this.customProperty('description');
        },
    },
    
    methods: {
        updateDescription(locale, value) {
            this.setTranslation('description', locale, value);
        },
    },
};
```

Editors then can be registered with the `registerEditor` method.

```js
import { registerEditor } from 'blender-media';
import MyEditor from './editors/MyEditor';

registerEditor('myEditor', MyEditor);
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
