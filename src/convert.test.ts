import { describe, it, expect } from 'vitest'
import {
  normalize,
  PascalCase,
  pascalCase,
  camelCase,
  snakeCase,
  slugCase,
  upperSnakeCase,
  kebabCase,
  constCase,
  sentenceCase,
  isUpperCase,
  containsSpecialCharacters,
  camelToSnakeCase,
  camelToSlugCase
} from "./convert";

describe('Utility Functions', () => {
  describe('isUpperCase', () => {
    it('should return true for uppercase letters', () => {
      expect(isUpperCase('A')).toBe(true);
      expect(isUpperCase('Z')).toBe(true);
    });

    it('should return false for lowercase letters', () => {
      expect(isUpperCase('a')).toBe(false);
      expect(isUpperCase('z')).toBe(false);
    });

    it('should return true for numbers and special characters', () => {
      expect(isUpperCase('1')).toBe(true);
      expect(isUpperCase('!')).toBe(true);
      expect(isUpperCase(' ')).toBe(true);
    });
  });

  describe('containsSpecialCharacters', () => {
    it('should return false for basic ASCII text', () => {
      expect(containsSpecialCharacters('hello')).toBe(false);
      expect(containsSpecialCharacters('Hello World')).toBe(false);
      expect(containsSpecialCharacters('123')).toBe(false);
    });

    it('should return true for accented characters', () => {
      expect(containsSpecialCharacters('héllo')).toBe(true);
      expect(containsSpecialCharacters('café')).toBe(true);
      expect(containsSpecialCharacters('naïve')).toBe(true);
    });

    it('should detect various special characters', () => {
      expect(containsSpecialCharacters('Zürich')).toBe(true);
      expect(containsSpecialCharacters('señor')).toBe(true);
      expect(containsSpecialCharacters('Øystein')).toBe(false); // Ø is not in the special characters list
    });
  });

  describe('normalize', () => {
    it('should normalize accented characters', () => {
      expect(normalize('helloéèhello')).toBe('helloeehello');
      expect(normalize('café')).toBe('cafe');
      expect(normalize('naïve')).toBe('naive');
    });

    it('should handle various languages', () => {
      expect(normalize('Birżebbuġa')).toBe('Birzebbuga');
      expect(normalize('Ħaż-Żebbuġ')).toBe('Haz-Zebbug');
      expect(normalize('Zürich')).toBe('Zurich');
      expect(normalize('señor')).toBe('senor');
    });

    it('should preserve case when normalizing', () => {
      expect(normalize('CAFÉ')).toBe('CAFE');
      expect(normalize('CaFé')).toBe('CaFe');
    });

    it('should handle empty strings', () => {
      expect(normalize('')).toBe('');
    });

    it('should replace unknown special characters with underscore', () => {
      expect(normalize('hello♥world')).toBe('hello_world');
    });

    it('should properly normalize all accented e characters', () => {
      expect(normalize('café')).toBe('cafe');
      expect(normalize('résumé')).toBe('resume');
      expect(normalize('café_résumé')).toBe('cafe_resume');
      expect(normalize('CAFÉ')).toBe('CAFE');
      expect(normalize('RÉSUMÉ')).toBe('RESUME');
    });
  });
});

describe('Helper Functions', () => {
  describe('camelToSnakeCase', () => {
    it('should convert camelCase to snake_case', () => {
      expect(camelToSnakeCase('helloWorld')).toBe('hello_world');
      expect(camelToSnakeCase('myVariableName')).toBe('my_variable_name');
      expect(camelToSnakeCase('HTTPResponse')).toBe('h_t_t_p_response');
    });

    it('should handle edge cases', () => {
      expect(camelToSnakeCase('')).toBe('');
      expect(camelToSnakeCase('alreadylowercase')).toBe('alreadylowercase');
      expect(camelToSnakeCase('A')).toBe('a');
    });
  });

  describe('camelToSlugCase', () => {
    it('should convert camelCase to slug-case', () => {
      expect(camelToSlugCase('helloWorld')).toBe('hello-world');
      expect(camelToSlugCase('myVariableName')).toBe('my-variable-name');
      expect(camelToSlugCase('HTTPResponse')).toBe('h-t-t-p-response');
    });

    it('should handle edge cases', () => {
      expect(camelToSlugCase('')).toBe('');
      expect(camelToSlugCase('alreadylowercase')).toBe('alreadylowercase');
      expect(camelToSlugCase('A')).toBe('a');
    });
  });
});

describe('Case Conversion Functions', () => {
  describe('PascalCase', () => {
    it('should convert various formats to PascalCase', () => {
      expect(PascalCase('hello world')).toBe('HelloWorld');
      expect(PascalCase('hello-world')).toBe('HelloWorld');
      expect(PascalCase('hello_world')).toBe('HelloWorld');
      expect(PascalCase('helloWorld')).toBe('HelloWorld');
      expect(PascalCase('HelloWorld')).toBe('HelloWorld');
      expect(PascalCase('HELLO_WORLD')).toBe('HelloWorld');
    });

    it('should handle edge cases', () => {
      expect(PascalCase('')).toBe('');
      expect(PascalCase('   ')).toBe('');
      expect(PascalCase('a')).toBe('A');
      expect(PascalCase('123')).toBe('123');
      expect(PascalCase('123abc')).toBe('123abc');
    });

    it('should handle special characters', () => {
      expect(PascalCase('hello@world')).toBe('HelloWorld');
      expect(PascalCase('hello.world')).toBe('HelloWorld');
      expect(PascalCase('hello/world')).toBe('HelloWorld');
    });

    it('should respect exclude option', () => {
      expect(PascalCase('hello:world', { exclude: [':'] })).toBe('Hello:World');
      expect(PascalCase('hello-world', { exclude: ['-'] })).toBe('HelloWorld');
    });

    it('should handle consecutive uppercase letters', () => {
      expect(PascalCase('XMLHttpRequest')).toBe('XmlhttpRequest');
      expect(PascalCase('IOError')).toBe('Ioerror');
    });

    it('should handle numbers', () => {
      expect(PascalCase('hello2world')).toBe('Hello2world');
      expect(PascalCase('2hello')).toBe('2hello');
      expect(PascalCase('hello 2 world')).toBe('Hello2World');
    });
  });

  describe('pascalCase (alias)', () => {
    it('should work identically to PascalCase', () => {
      expect(pascalCase('hello-world')).toBe('HelloWorld');
      expect(pascalCase('hello world')).toBe('HelloWorld');
    });
  });

  describe('camelCase', () => {
    it('should convert various formats to camelCase', () => {
      expect(camelCase('hello world')).toBe('helloWorld');
      expect(camelCase('hello-world')).toBe('helloWorld');
      expect(camelCase('hello_world')).toBe('helloWorld');
      expect(camelCase('HelloWorld')).toBe('helloWorld');
      expect(camelCase('helloWorld')).toBe('helloWorld');
      expect(camelCase('HELLO_WORLD')).toBe('helloWorld');
    });

    it('should handle edge cases', () => {
      expect(camelCase('')).toBe('');
      expect(camelCase('   ')).toBe('');
      expect(camelCase('a')).toBe('a');
      expect(camelCase('A')).toBe('a');
      expect(camelCase('123')).toBe('123');
      expect(camelCase('123abc')).toBe('123abc');
    });

    it('should handle special characters', () => {
      expect(camelCase('hello@world')).toBe('helloWorld');
      expect(camelCase('hello.world')).toBe('helloWorld');
      expect(camelCase('hello/world')).toBe('helloWorld');
    });

    it('should respect exclude option', () => {
      expect(camelCase('hello:world', { exclude: [':'] })).toBe('hello:World');
      expect(camelCase('hello-world', { exclude: ['-'] })).toBe('helloWorld');
    });

    it('should handle consecutive uppercase letters', () => {
      expect(camelCase('XMLHttpRequest')).toBe('xmlhttpRequest');
      expect(camelCase('IOError')).toBe('ioerror');
    });
  });

  describe('kebabCase', () => {
    it('should convert various formats to kebab-case', () => {
      expect(kebabCase('hello world')).toBe('hello-world');
      expect(kebabCase('helloWorld')).toBe('hello-world');
      expect(kebabCase('HelloWorld')).toBe('hello-world');
      expect(kebabCase('hello_world')).toBe('hello-world');
      expect(kebabCase('HELLO_WORLD')).toBe('hello-world');
      expect(kebabCase('hello-world')).toBe('hello-world');
    });

    it('should handle edge cases', () => {
      expect(kebabCase('')).toBe('');
      expect(kebabCase('a')).toBe('a');
      expect(kebabCase('A')).toBe('a');
      expect(kebabCase('123')).toBe('123');
      expect(kebabCase('123abc')).toBe('123abc');
    });

    it('should handle special characters', () => {
      expect(kebabCase('hello@world')).toBe('hello-world');
      expect(kebabCase('hello.world')).toBe('hello-world');
      expect(kebabCase('hello, world')).toBe('hello-world');
    });

    it('should handle consecutive uppercase letters', () => {
      expect(kebabCase('XMLHttpRequest')).toBe('xml-http-request');
      expect(kebabCase('IOError')).toBe('io-error');
    });

    it('should handle mixed numbers and letters', () => {
      expect(kebabCase('hello2world')).toBe('hello2world');
      expect(kebabCase('2hello')).toBe('2hello');
    });
  });

  describe('snakeCase', () => {
    it('should convert various formats to snake_case', () => {
      expect(snakeCase('hello world')).toBe('hello_world');
      expect(snakeCase('helloWorld')).toBe('hello_world');
      expect(snakeCase('HelloWorld')).toBe('hello_world');
      expect(snakeCase('hello-world')).toBe('hello_world');
      expect(snakeCase('hello_world')).toBe('hello_world');
      expect(snakeCase('HELLO_WORLD')).toBe('hello_world');
    });

    it('should handle edge cases', () => {
      expect(snakeCase('')).toBe('');
      expect(snakeCase('a')).toBe('a');
      expect(snakeCase('A')).toBe('a');
      expect(snakeCase('123')).toBe('123');
      expect(snakeCase('123abc')).toBe('123abc');
    });

    it('should handle special characters', () => {
      expect(snakeCase('hello@world')).toBe('hello_world');
      expect(snakeCase('hello.world')).toBe('hello_world');
      expect(snakeCase('hello/world')).toBe('hello_world');
    });

    it('should handle consecutive uppercase letters', () => {
      expect(snakeCase('XMLHttpRequest')).toBe('xml_http_request');
      expect(snakeCase('IOError')).toBe('io_error');
    });
  });

  describe('upperSnakeCase', () => {
    it('should convert various formats to UPPER_SNAKE_CASE', () => {
      expect(upperSnakeCase('hello world')).toBe('HELLO_WORLD');
      expect(upperSnakeCase('helloWorld')).toBe('HELLO_WORLD');
      expect(upperSnakeCase('HelloWorld')).toBe('HELLO_WORLD');
      expect(upperSnakeCase('hello-world')).toBe('HELLO_WORLD');
      expect(upperSnakeCase('hello_world')).toBe('HELLO_WORLD');
      expect(upperSnakeCase('HELLO_WORLD')).toBe('HELLO_WORLD');
    });

    it('should handle edge cases', () => {
      expect(upperSnakeCase('')).toBe('');
      expect(upperSnakeCase('a')).toBe('A');
      expect(upperSnakeCase('123')).toBe('123');
      expect(upperSnakeCase('123abc')).toBe('123ABC');
    });

    it('should handle special characters', () => {
      expect(upperSnakeCase('hello@world')).toBe('HELLO_WORLD');
      expect(upperSnakeCase('hello.world')).toBe('HELLO_WORLD');
    });
  });

  describe('slugCase', () => {
    it('should convert various formats to slug-case', () => {
      expect(slugCase('hello world')).toBe('hello-world');
      expect(slugCase('helloWorld')).toBe('hello-world');
      expect(slugCase('HelloWorld')).toBe('hello-world');
      expect(slugCase('hello_world')).toBe('hello-world');
      expect(slugCase('hello-world')).toBe('hello-world');
      expect(slugCase('HELLO_WORLD')).toBe('hello-world');
    });

    it('should handle edge cases', () => {
      expect(slugCase('')).toBe('');
      expect(slugCase('a')).toBe('a');
      expect(slugCase('123')).toBe('123');
    });

    it('should be equivalent to kebabCase', () => {
      const testStrings = ['HelloWorld', 'hello world', 'hello_world', 'HELLO-WORLD'];
      testStrings.forEach(str => {
        expect(slugCase(str)).toBe(kebabCase(str));
      });
    });
  });

  describe('constCase', () => {
    it('should convert various formats to CONSTANT_CASE', () => {
      expect(constCase('hello world')).toBe('HELLO_WORLD');
      expect(constCase('helloWorld')).toBe('HELLO_WORLD');
      expect(constCase('HelloWorld')).toBe('HELLO_WORLD');
      expect(constCase('hello-world')).toBe('HELLO_WORLD');
      expect(constCase('myVariable')).toBe('MY_VARIABLE');
    });

    it('should handle numbers at the beginning', () => {
      expect(constCase('123hello')).toBe('_123HELLO');
      expect(constCase('1helloWorld')).toBe('_1HELLO_WORLD');
      expect(constCase('123')).toBe('_123');
    });

    it('should allow custom start character for numbers', () => {
      expect(constCase('123hello', { startChar: '$' })).toBe('$123HELLO');
      expect(constCase('1variable', { startChar: '#' })).toBe('#1VARIABLE');
      expect(constCase('123', { startChar: '=' })).toBe('=123');
    });

    it('should not add prefix for non-numeric starts', () => {
      expect(constCase('hello123')).toBe('HELLO123');
      expect(constCase('hello123world')).toBe('HELLO123WORLD');
    });

    it('should handle edge cases', () => {
      expect(constCase('')).toBe('');
      expect(constCase('a')).toBe('A');
      expect(constCase('ABC')).toBe('ABC');
    });
  });

  describe('sentenceCase', () => {
    it('should convert various formats to sentence case', () => {
      expect(sentenceCase('hello world')).toBe('Hello world');
      expect(sentenceCase('helloWorld')).toBe('Hello world');
      expect(sentenceCase('HelloWorld')).toBe('Hello world');
      expect(sentenceCase('hello-world')).toBe('Hello world');
      expect(sentenceCase('hello_world')).toBe('Hello world');
      expect(sentenceCase('HELLO_WORLD')).toBe('Hello world');
      expect(sentenceCase('HELLO-WORLD')).toBe('Hello world');
    });

    it('should handle edge cases', () => {
      expect(sentenceCase('')).toBe('');
      expect(sentenceCase('a')).toBe('A');
      expect(sentenceCase('A')).toBe('A');
      expect(sentenceCase('123')).toBe('123');
      expect(sentenceCase('123abc')).toBe('123abc');
    });

    it('should handle special characters', () => {
      expect(sentenceCase('hello@world')).toBe('Hello world');
      expect(sentenceCase('hello.world')).toBe('Hello world');
    });

    it('should handle multiple words', () => {
      expect(sentenceCase('theQuickBrownFox')).toBe('The quick brown fox');
      expect(sentenceCase('THE_QUICK_BROWN_FOX')).toBe('The quick brown fox');
      expect(sentenceCase('the-quick-brown-fox')).toBe('The quick brown fox');
    });

    it('should handle consecutive uppercase letters', () => {
      expect(sentenceCase('XMLHttpRequest')).toBe('Xmlhttp request');
      expect(sentenceCase('IOError')).toBe('Ioerror');
    });
  });
});

describe('Integration Tests', () => {
  it('should handle round-trip conversions', () => {
    const original = 'hello world example';

    // Through PascalCase
    const pascal = PascalCase(original);
    expect(snakeCase(pascal)).toBe('hello_world_example');
    expect(kebabCase(pascal)).toBe('hello-world-example');
    expect(camelCase(pascal)).toBe('helloWorldExample');

    // Through camelCase
    const camel = camelCase(original);
    expect(snakeCase(camel)).toBe('hello_world_example');
    expect(kebabCase(camel)).toBe('hello-world-example');
    expect(PascalCase(camel)).toBe('HelloWorldExample');
  });

  it('should handle complex strings with numbers and special chars', () => {
    const complex = 'XML2JSON_parser-v3.0';

    expect(camelCase(complex)).toBe('xml2jsonParserV30');
    expect(PascalCase(complex)).toBe('Xml2jsonParserV30');
    expect(kebabCase(complex)).toBe('xml2json-parser-v3-0');
    expect(snakeCase(complex)).toBe('xml2json_parser_v3_0');
    expect(constCase(complex)).toBe('XML2JSON_PARSER_V3_0');
    expect(sentenceCase(complex)).toBe('Xml2json parser v3 0');
  });

  it('should handle unicode and special characters', () => {
    const unicode = 'café_résumé';

    expect(camelCase(unicode)).toBe('cafeResume');
    expect(PascalCase(unicode)).toBe('CafeResume');
    expect(kebabCase(unicode)).toBe('cafe-resume');
    expect(snakeCase(unicode)).toBe('cafe_resume');
  });

  it('should be consistent with empty and whitespace strings', () => {
    const empties = ['', '   ', '\t\n', '    \t    '];

    empties.forEach(str => {
      expect(camelCase(str)).toBe('');
      expect(PascalCase(str)).toBe('');
      expect(kebabCase(str)).toBe('');
      expect(snakeCase(str)).toBe('');
      expect(upperSnakeCase(str)).toBe('');
      expect(slugCase(str)).toBe('');
      expect(constCase(str)).toBe('');
      expect(sentenceCase(str)).toBe('');
    });
  });
});

describe('Exclude Option Tests', () => {
  describe('PascalCase with exclude', () => {
    it('should exclude specified characters from transformation', () => {
      expect(PascalCase('hello@world', { exclude: ['@'] })).toBe('Hello@World');
      expect(PascalCase('hello.world', { exclude: ['.'] })).toBe('Hello.World');
      expect(PascalCase('hello/world', { exclude: ['/'] })).toBe('Hello/World');
    });

    it('should not normalize when exclusions are specified', () => {
      expect(PascalCase('café_résumé', { exclude: ['é'] })).toBe('CaféRésumé');
      expect(PascalCase('naïve', { exclude: ['ï'] })).toBe('Naïve');
    });
  });

  describe('camelCase with exclude', () => {
    it('should exclude specified characters from transformation', () => {
      expect(camelCase('hello@world', { exclude: ['@'] })).toBe('hello@World');
      expect(camelCase('hello.world', { exclude: ['.'] })).toBe('hello.World');
      expect(camelCase('hello/world', { exclude: ['/'] })).toBe('hello/World');
    });

    it('should not normalize when exclusions are specified', () => {
      expect(camelCase('café_résumé', { exclude: ['é'] })).toBe('caféRésumé');
      expect(camelCase('naïve', { exclude: ['ï'] })).toBe('naïve');
    });
  });

  describe('kebabCase with exclude', () => {
    it('should exclude specified characters from transformation', () => {
      expect(kebabCase('hello@world', { exclude: ['@'] })).toBe('hello@world');
      expect(kebabCase('hello.world', { exclude: ['.'] })).toBe('hello.world');
      expect(kebabCase('hello/world', { exclude: ['/'] })).toBe('hello/world');
    });

    it('should not normalize when exclusions are specified', () => {
      expect(kebabCase('café_résumé', { exclude: ['é'] })).toBe('café-résumé');
      expect(kebabCase('naïve', { exclude: ['ï'] })).toBe('naïve');
    });
  });

  describe('snakeCase with exclude', () => {
    it('should exclude specified characters from transformation', () => {
      expect(snakeCase('hello@world', { exclude: ['@'] })).toBe('hello@world');
      expect(snakeCase('hello.world', { exclude: ['.'] })).toBe('hello.world');
      expect(snakeCase('hello/world', { exclude: ['/'] })).toBe('hello/world');
    });

    it('should not normalize when exclusions are specified', () => {
      expect(snakeCase('café_résumé', { exclude: ['é'] })).toBe('café_résumé');
      expect(snakeCase('naïve', { exclude: ['ï'] })).toBe('naïve');
    });
  });

  describe('upperSnakeCase with exclude', () => {
    it('should exclude specified characters from transformation', () => {
      expect(upperSnakeCase('hello@world', { exclude: ['@'] })).toBe('HELLO@WORLD');
      expect(upperSnakeCase('hello.world', { exclude: ['.'] })).toBe('HELLO.WORLD');
      expect(upperSnakeCase('hello/world', { exclude: ['/'] })).toBe('HELLO/WORLD');
    });

    it('should not normalize when exclusions are specified', () => {
      expect(upperSnakeCase('café_résumé', { exclude: ['é'] })).toBe('CAFÉ_RÉSUMÉ');
      expect(upperSnakeCase('naïve', { exclude: ['ï'] })).toBe('NAÏVE');
    });
  });

  describe('slugCase with exclude', () => {
    it('should exclude specified characters from transformation', () => {
      expect(slugCase('hello@world', { exclude: ['@'] })).toBe('hello@world');
      expect(slugCase('hello.world', { exclude: ['.'] })).toBe('hello.world');
      expect(slugCase('hello/world', { exclude: ['/'] })).toBe('hello/world');
    });

    it('should not normalize when exclusions are specified', () => {
      expect(slugCase('café_résumé', { exclude: ['é'] })).toBe('café-résumé');
      expect(slugCase('naïve', { exclude: ['ï'] })).toBe('naïve');
    });
  });

  describe('constCase with exclude', () => {
    it('should exclude specified characters from transformation', () => {
      expect(constCase('hello@world', { startChar: '_', exclude: ['@'] })).toBe('HELLO@WORLD');
      expect(constCase('hello.world', { startChar: '_', exclude: ['.'] })).toBe('HELLO.WORLD');
      expect(constCase('hello/world', { startChar: '_', exclude: ['/'] })).toBe('HELLO/WORLD');
    });

    it('should not normalize when exclusions are specified', () => {
      expect(constCase('café_résumé', { startChar: '_', exclude: ['é'] })).toBe('CAFÉ_RÉSUMÉ');
      expect(constCase('naïve', { startChar: '_', exclude: ['ï'] })).toBe('NAÏVE');
    });

    it('should handle numbers with exclude', () => {
      expect(constCase('123@test', { startChar: '_', exclude: ['@'] })).toBe('123@TEST');
      expect(constCase('123@test', { startChar: '$', exclude: ['@'] })).toBe('123@TEST');
    });
  });

  describe('sentenceCase with exclude', () => {
    it('should exclude specified characters from transformation', () => {
      expect(sentenceCase('hello@world', { exclude: ['@'] })).toBe('Hello@world');
      expect(sentenceCase('hello.world', { exclude: ['.'] })).toBe('Hello.world');
      expect(sentenceCase('hello/world', { exclude: ['/'] })).toBe('Hello/world');
    });

    it('should not normalize when exclusions are specified', () => {
      expect(sentenceCase('café_résumé', { exclude: ['é'] })).toBe('Café résumé');
      expect(sentenceCase('naïve', { exclude: ['ï'] })).toBe('Naïve');
    });
  });

  describe('Multiple exclusions', () => {
    it('should handle multiple excluded characters', () => {
      expect(PascalCase('hello@world.com', { exclude: ['@', '.'] })).toBe('Hello@World.Com');
      expect(camelCase('hello@world.com', { exclude: ['@', '.'] })).toBe('hello@World.Com');
      expect(kebabCase('hello@world.com', { exclude: ['@', '.'] })).toBe('hello@world.com');
      expect(snakeCase('hello@world.com', { exclude: ['@', '.'] })).toBe('hello@world.com');
    });
  });
});
