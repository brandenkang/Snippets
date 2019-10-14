class Snippet {
    constructor(name, code, ...args) {
        this.name = name; 
        this.code = code; 
        this.lines = code.split(/\r\n|\r|\n/).length
        this.tags = args.slice(); 
    };
};

// function hasTag(asdf) {
//     if (this.hasOwnProperty(asdf) == true) {
//         return true; 
//     }
// };

const s = new Snippet(
    'hello.js', 
    `const hello = () => {
    console.log('hello');
  };
  hello();`,
    'hello', 'function', 'arrow'
) 

  
//   // the constructor results in an object with the following properties / methods:
console.log(s.name);  // hello.js
console.log(s.code);  // the entirety of the code
console.log(s.lines); // 4 (this needs to be calculated!)
console.log(s.tags);  // an Array, ['hello', 'function', 'arrow']
// console.log(s.hasTag('fun')); // false
// console.log(s.hasTag('function')); // true

module.exports = {
    Snippet: Snippet
}
