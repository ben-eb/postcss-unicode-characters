# [postcss][postcss]-unicode-characters [![Build Status](https://travis-ci.org/ben-eb/postcss-unicode-characters.svg?branch=master)][ci] [![NPM version](https://badge.fury.io/js/postcss-unicode-characters.svg)][npm] [![Dependency Status](https://gemnasium.com/ben-eb/postcss-unicode-characters.svg)][deps]

> An easier way to write unicode-range descriptors.


## Install

With [npm](https://npmjs.org/package/postcss-unicode-characters) do:

```
npm install postcss-unicode-characters --save
```


## Example

This module provides syntactic sugar for the [`unicode-range`][1] descriptor,
inspired by [@svgeesus][2]' dotCSS talk. It provides three different ways to
construct a standard [`unicode-range`][1] descriptor by using the non-standard
`unicode-characters` descriptor.

[1]: https://developer.mozilla.org/en/docs/Web/CSS/@font-face/unicode-range
[2]: https://github.com/svgeesus

The formal syntax for `unicode-characters` looks like this:

```
[ <string> | name( <string> ) | script( <string> ) ]#
```

### Using literal characters

Write in the characters that you want to subset directly, using a string:

#### Input

```css
@font-face {
    font-family: test;
    src: local("Baskerville");
    unicode-characters: "hello";
}
```

#### Output

```css
@font-face {
    font-family: test;
    src: local("Baskerville");
    unicode-range: U+68, U+65, U+6C, U+6F;
}
```

Using this method, duplicate characters are automatically removed for you.

### Using the `name` function

If you can remember a Unicode description for a character, using this function
will save some time obtaining the literal:

#### Input

```css
@font-face {
    font-family: test;
    src: local("Baskerville");
    unicode-characters: name("black star");
}
```

#### Output

```css
@font-face {
    font-family: test;
    src: local("Baskerville");
    unicode-range: U+2605;
}
```

### Using the `script` function

You can also use the `script` function for a range of characters.

#### Input

```css
@font-face {
    font-family: test;
    src: local("Baskerville");
    unicode-characters: script("arrows");
}
```

#### Output

```css
@font-face {
    font-family: test;
    src: local("Baskerville");
    unicode-range: U+2190-21FF;
}
```

### Mix & match

Note that you can mix and match as many combinations as you like, even using
the classic `unicode-range` syntax. Just remember that these should be separated
by a comma:

#### Input

```css
@font-face {
    font-family: test;
    src: local("Baskerville");
    unicode-characters: script("arrows"), "hello", U+26;
}
```

#### Output

```css
@font-face {
    font-family: test;
    src: local("Baskerville");
    unicode-range: U+2190-21FF, U+68, U+65, U+6C, U+6F, U+26;
}
```


## Usage

See the [PostCSS documentation](https://github.com/postcss/postcss#usage) for
examples for your environment.


## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars.githubusercontent.com/u/1282980?v=3" width="100px;"/><br /><sub>Ben Briggs</sub>](http://beneb.info)<br />[💻](https://github.com/ben-eb/postcss-unicode-characters/commits?author=ben-eb) [📖](https://github.com/ben-eb/postcss-unicode-characters/commits?author=ben-eb) 👀 [⚠️](https://github.com/ben-eb/postcss-unicode-characters/commits?author=ben-eb) |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors] specification. Contributions of
any kind welcome!


## License

MIT © [Ben Briggs](http://beneb.info)


[all-contributors]: https://github.com/kentcdodds/all-contributors
[ci]:      https://travis-ci.org/ben-eb/postcss-unicode-characters
[deps]:    https://gemnasium.com/ben-eb/postcss-unicode-characters
[npm]:     http://badge.fury.io/js/postcss-unicode-characters
[postcss]: https://github.com/postcss/postcss
