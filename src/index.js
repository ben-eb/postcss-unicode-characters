import postcss from 'postcss';
import valueParser, {stringify} from 'postcss-value-parser';
import unicodeRange from 'unicode-range-json';
import uniqs from 'uniqs';
import characters from './characters';

function trimLeadingZero (str) {
    if (str[0] === '0') {
        return str.slice(str.lastIndexOf('0') + 1);
    }
    return str;
}

function formatCodePoint (...values) {
    return `U+${values.map(trimLeadingZero).join('-')}`;
}

function formatError (node) {
    let desc = 'identifier';
    if (node.value === 'script') {
        desc = `Unicode script range`;
    } else {
        desc = `Unicode character description`;
    }
    return `Could not find a ${desc} matching \`${stringify(node)}\`.`;
}

function transform (node) {
    const {type} = node;
    if (type === 'function') {
        if (node.value !== 'script' && node.value !== 'name') {
            return false;
        }
        if (node.value === 'script') {
            // Expecting a category name
            const range = unicodeRange.find(r => r.category.match(new RegExp(node.nodes[0].value, 'i')));
            if (range) {
                node.type = 'word';
                node.value = formatCodePoint(...range.hexrange);
                return false;
            }
        } else {
            // Expecting a character description
            const character = Object.keys(characters).find(key => {
                return characters[key].name.match(new RegExp(node.nodes[0].value, 'i'));
            });
            if (character) {
                node.type = 'word';
                node.value = formatCodePoint(characters[character].value);
                return false;
            }
        }
        throw new Error(formatError(node));
    } else if (type === 'string') {
        // Expecting a unicode literal
        node.type = 'word';
        node.value = uniqs(node.value.split('').map(char => {
            return formatCodePoint(characters[char.codePointAt(0)].value);
        })).join(', ');
        return false;
    }
}

export default postcss.plugin('postcss-unicode-characters', () => {
    return css => {
        css.walkDecls(/^unicode-characters$/i, decl => {
            decl.value = valueParser(decl.value).walk(transform).toString();
            decl.prop = 'unicode-range';
        });
    };
});
