import test from 'ava';
import postcss from 'postcss';
import plugin from '../';

function testConversion (t, input, output) {
    const fixture  = `
    @font-face {
        font-family: test;
        src: local("Baskerville");
        unicode-characters: ${input};
    }`;
    const expected = `
    @font-face {
        font-family: test;
        src: local("Baskerville");
        unicode-range: ${output};
    }`;
    return postcss(plugin).process(fixture).then(result => {
        t.is(result.css, expected);
    });
}

function testError (t, input) {
    t.throws(testConversion(t, input, ''));
}

test(
    'should work with literal characters',
    testConversion,
    `"&"`,
    `U+26`
);

test(
    'should work with multiple literal characters',
    testConversion,
    `"&!"`,
    `U+26, U+21`
);

test(
    'should work with unicode names',
    testConversion,
    `name("black star")`,
    `U+2605`
);

test(
    'should work with categories',
    testConversion,
    `script("arrows")`,
    `U+2190-21FF`
);

test(
    'should handle multiple types',
    testConversion,
    `U+26, "!", script("arrows")`,
    `U+26, U+21, U+2190-21FF`
);

test(
    'should handle duplicates',
    testConversion,
    `"hello"`,
    `U+68, U+65, U+6C, U+6F`
);

test(
    'should handle var',
    testConversion,
    `var(--foo)`,
    `var(--foo)`
);

test(
    'should error if a category is not found',
    testError,
    `script("Unicorn!")`
);

test(
    'should error if a character is not found',
    testError,
    `name("Unicorn!")`
);
