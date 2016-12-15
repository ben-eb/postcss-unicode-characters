import test from 'ava';
import unicodeRange from 'unicode-range-json';
import characters from '../characters';

test('should have no collisions between unicode groups & character names', t => {
    const categories = unicodeRange.map(r => r.category.toLowerCase());
    Object.keys(characters).forEach(key => {
        const {name} = characters[key];
        t.falsy(~categories.indexOf(name.toLowerCase()));
    });
});
