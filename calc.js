// node calc.js sum 8 5 23
// node calc.js sub 15 5 3
// node calc.js mult 2 2 3
// node calc.js div 10 2 1
const [operation, ...args] = process.argv.slice(2);
console.log("🚀 ~ file: calc.js:6 ~ data:", operation);
console.log("🚀 ~ file: calc.js:6 ~ data:", args);
