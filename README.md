# Case


## Installation

```bash
npm install @sil/case
```

## Usage

```js
import { kebabCase } from "@sil/case";

const myString = "This Is My STRING";

const myStringKebabCase = kebabCase(myString); // result: this-is-my-string

```


## Functions

### PascalCase
Convert a string to pascalCase

example:

```
My String > MyString
```




### camelCase
Convert a string to pascalCase

example:

```
My string > myString
```


### kebabCase
Convert a string to kebabCase

example:

```
My string > my-string
```


### snakeCase
Convert a string to snakeCase

example:

```
My string > my_string
```


### upperSnakeCase
Convert a string to upperSnakeCase

example:

```
My string > MY_STRING
```


### slugCase
Convert a string to slugCase aka kebabCase

example:

```
My string > my-string
```


### constCase
Constants usually use an upperSnakeCase, but don't allow the string to start with a number. constCase does exactly that. It adds an _ at the beginning of a string whenever it starts with a number. 

example:



```
My string > MY_STRING
1 String > _1_STRING
```
