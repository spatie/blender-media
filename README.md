# Blender Media

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Build Status](https://img.shields.io/travis/spatie-custom/blender-media.svg?style=flat-square)](https://travis-ci.org/spatie-custom/blender-media)

The media uploader and manager for [Blender](https://github.com/spatie-custom/blender), our CMS.

## Installation

```bash
npm install spatie-custom/blender-media@<version>
```

This package must be installed alongside with [blender.js](https://github.com/spatie-custom/blender.js) to resolve the following dependencies:

- Blender.js translate
- jQuery Confirm
- jQuery UI Sortable

The sass files, located in `src/scss`, need to be imported manually.

## Usage

```js
// Require the dependencies

import media from 'blender-media'
import React from 'react'

// Register your component types

media.register('images', {
    acceptedFiles: 'images'
})

media.register('downloads')

// Mount all components

media.mount()
```

```html
<div data-media-collection="images"
     data-media-type="images"
     data-initial="{{ $jsonSerializedMediaCollection }}"
     data-model="{{ $jsonSerializedModel }}"
     data-locales="['nl','fr','en']"> <!-- All other data-keys are imported as custom data -->
</div>
```

## Extending the component

### RowExtensions

RowExtensions allow you to edit the form that appears in each media row.

```js
import Columns from 'blender-media/lib/Components/RowEditors/Layout/Columns'
import media from 'blender-media'
import Name from 'blender-media/lib/Components/Fields/Name'
import React from 'react'
import RowEditor from 'blender-media/lib/Components/RowEditors/Layout/RowEditor'
import Text from 'blender-media/lib/Components/Fields/Text'

const WithLink = () => {
    return (
        <RowEditor>
            <Columns size="4">
                <Name withLabel />
            </Columns>
            <Columns size="8">
                <Text label="Link"
                      forProperty="link" />
            </Columns>
        </RowEditor>
    )
}

media.register('images', {
    acceptedFiles: 'images',
    rowEditor: <WithLink />
})
```

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

Example images provided by [Unsplash](https://unsplash.com).
