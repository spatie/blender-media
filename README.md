
[<img src="https://github-ads.s3.eu-central-1.amazonaws.com/support-ukraine.svg?t=1" />](https://supportukrainenow.org)

# Blender Media

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Build Status](https://img.shields.io/travis/spatie-custom/blender-media.svg?style=flat-square)](https://travis-ci.org/spatie/blender-media)

The media uploader and manager for [Blender](https://github.com/spatie/blender), our CMS.

## Support us

[<img src="https://github-ads.s3.eu-central-1.amazonaws.com/blender-media.jpg?t=1" width="419px" />](https://spatie.be/github-ad-click/blender-media)

We invest a lot of resources into creating [best in class open source packages](https://spatie.be/open-source). You can support us by [buying one of our paid products](https://spatie.be/open-source/support-us).

We highly appreciate you sending us a postcard from your hometown, mentioning which of our package(s) you are using. You'll find our address on [our contact page](https://spatie.be/about-us). We publish all received postcards on [our virtual postcard wall](https://spatie.be/open-source/postcards).

## Installation

The `blender-media` can be installed from npm.

```bash
yarn add @spatie/blender-media
```

`blender-media` also requires you to install `vue@'^2.0.0'`, `lodash@'^4.0.0'`, and `spatie-dom@'^1.0.0'`:

```bash
yarn add vue@'^2.0.0' lodash@'^4.0.0' spatie-dom@'^1.0.0'
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
import Media from '@spatie/blender-media';
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

If you want to use a `media` component outside of a Vue instance, this package provides a `mount` function. The `mount` function will replace every element that matches a given selector with a `media` component. The element should contain props just like you'd pass them with Vue.

```js
import { mount } from '@spatie/blender-media';

export default function init() {
    mount('.js-media');
}
```

```html
<div
    class="js-media"
    collection="images"
    type="images"
    upload-url="/upload"
    :model="{ name: 'MyModel', id: 1 }"
    :initial="[]"
    :data="{ locales: ['nl', 'en'] }"
></div>
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

### Component Properties

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

The package ships with `image`, `images`, `download` and `downloads` types. Types have to be registered **before** any `media` component gets rendered. If you register a type with the same name twice, only the last registered type will be used.

#### Type Options

##### `accepts: ?string = null`

The file types that the uploader will accept. If `accepts` is `null`, all file types will be accepted. Available formats of the string are described in [Dropzone's documentation](http://www.dropzonejs.com/#config-acceptedFiles).

##### `multiple: bool = true`

Determines whether multiple files can be uploaded to a collection.

##### `editor: string = 'basic'`

The name of the registered editor to be rendered inside the component. See [Editors](#editors) for a more detailed explanation.

##### `extend: ?string = null`

Extend an existing type. Creates a new type, based on an existing type. Other options will overwrite the existing type's options.

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
    
    customProperties: {
        sku: '',
    },
    
    
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

Editors can then be registered with the `registerEditor` method. Like types, editors have to be registered **before** any `media` component gets rendered. If you register an editor with the same name twice, only the last registered editor will be used.

```js
import { registerEditor } from 'blender-media';
import MyEditor from './editors/MyEditor';

registerEditor('myEditor', MyEditor);
```

Note that editors should be contained in a `.vue` file since they also require a template! Browse the [existing editors](https://github.com/spatie/blender-media/tree/ab21b19cb485c73906c96c72403b358d145cc437/src/components/editors) for some examples.

#### Editor Methods

##### `customProperty(key: string, fallback: any = null)`

Return the value of a custom property. If the property isn't defined, return the fallback.

```js
// { customProperties: { foo: 'bar' } }

this.customProperty('foo');
// > 'bar'

this.customProperty('baz', 'qux');
// > 'qux'
```

##### `setCustomProperty(key: string, value: any)`

Set a custom property.

```js
// { customProperties: {} }

this.updateCustomProperty('locales', { nl: true, en: false });

// { customProperties: { locales: { nl: true, en: false } } }
```

##### `getTranslation(key: string, locale: string)`

Get a translated custom property.

```js
// { customProperties: { foo: { en: 'bar' } } }

this.getTranslation('foo', 'en');
// > 'bar'
```

##### `setTranslation(key: string, locale: string, value: any)`

Set a translated custom property's translation.

```js
// { customProperties: { foo: { en: 'bar' } } }

this.setTranslation('foo', 'en', 'baz');

// { customProperties: { foo: { en: 'baz' } } }
```

## Contributing

Since this is an internal project, we don't accept pull requests at this time.

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

Example images provided by [Unsplash](https://unsplash.com).
