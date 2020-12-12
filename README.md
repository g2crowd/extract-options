# extract-options

This package is responsible for extracting a subset of a hash, based on a namespaced key.

It is useful for reading options out of DOM data attributes, where there may be multiple keys
with different concerns.

## Installation

    npm install @g2crowd/extract-options --save

## Usage

This will create a new hash, seperating out keys based on a common prefix:

```javascript
import { extractOptions } from '@g2crowd/extract-options';
const startingHash = { prefixOne: 1, prefixTwo: 2, otherKey: 3 };

extractOptions(startingHash, 'prefix'); //=> { one: 1, two: 2 }
```

It will treat keys with an `Options` suffix as special. It will expect a hash of raw options to follow:

```javascript
const startingHash = { prefixOne: 1, prefixTwo: 2, otherKey: 3, prefixOptions: { three: 3 } };

extractOptions(startingHash, 'prefix'); //=> { one: 1, two: 2, three: 3 }
```

Pairs nicely with `jQuery.data`:

```html
<div id='element' data-prefix-one=1 data-prefix-two=2 data-other-key=3></div>
```

```javascript
let data = $('#element').data();
const options = extractOptions(data, 'prefix'); //=> { one: 1, two: 2 }
```
