function findUniqueFromUniqs(text) {
  const words = text.split(/[\s,]+/); // found from https://masteringjs.io/tutorials/fundamentals/split-on-multiple-characters#:~:text=To%20split%20a%20string%20with,a%20single%20character%2C%20to%20match.
  const uniqueChars = [];
  console.log("🚀 ~ file: script.js:4 ~ findUniqueFromUniqs ~ words:", words);
  words.forEach((word) => {
    const letter = findUniqLetter(word);
    uniqueChars.push(letter);
  });
  return findUniqLetter(uniqueChars.join(""));
}

function findUniqLetter(word) {
  const uniqueChars = {};
  [...word].forEach((letter) => {
    if (uniqueChars[letter]) {
      uniqueChars[letter]++;
    } else {
      uniqueChars[letter] = 1;
    }
  });
  for (const char of word) {
    if (uniqueChars[char] === 1) {
      return char;
    }
  }
  return "";
}

const text = `The Tao gave birth to machine language. Machine language gave birth
to the assembler.
The assembler gave birth to the compiler. Now there are ten thousand
languages.
Each language has its purpose, however humble. Each language
expresses the Yin and Yang of software. Each language has its place within
the Tao.
But do not program in COBOL if you can avoid it.
-- Geoffrey James, "The Tao of Programming"`;
const text2 = `C makes it easy for you to shoot yourself in the foot. C++ makes that harder, but when you do, it blows away your whole leg. (с) Bjarne Stroustrup`;

// const result = findUniqueFromUniqs(text);
const result2 = findUniqueFromUniqs(text2);
// console.log(result);
console.log(result2);
