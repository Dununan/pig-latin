class PigLatinConverter {
  private convertedText: string;

  constructor(text: string) {
    // this.convertedText = this.convertText(text);

    // "Hello my apple.".split(" ")
    const wordsArray = this.splitWords(text);
    // "Hello".slice(0, 1)
    const convertedArray = wordsArray.map(original => {
      let parsed = this.vowelOrConsonantWord(original);
      parsed = this.capitalization(original, parsed);
      parsed = this.fixPunctuation(original, parsed);
      return parsed;
    });

    this.convertedText = convertedArray.join(" ");
    // /[aeiou]/.test("A".toLocaleLowerCase()) true/false
    // /way$/.test("stairway")
    // "can’t".indexOf("’")
    // "can’t".indexOf("’") && "this-thing".split("-")
    // character == character.toUpperCase()
  }

  public getConvertedText(): string {
    return this.convertedText;
  }

  private splitWords(text: string): string[] {
    return text.split(" ");
  }

  private vowelOrConsonantWord(word: string): string {
    // Words that end in “way” are not modified.
    if (/way$/.test(word)) {
      return word;
    }

    // Words that start with a vowel have the letters “way” added to the end.
    const firstLetter = word.slice(0, 1).toLocaleLowerCase();
    if ( /[aeiou]/.test(firstLetter)) {
      return `${word}way`;
    }

    // Words that start with a consonant have their first letter moved to the end of the word and the letters “ay” added to the end.
    return `${word.slice(1)}${firstLetter}ay`;
  }

  /**
   * Capitalization must remain in the same place.
   */
  private capitalization(original: string, parsed: string): string {
    let lettersParsed = parsed.toLowerCase().split('');
    const lettersOriginal = original.split('');

    lettersOriginal.map((letter, index) => {
      if (letter === letter.toUpperCase()) {
        lettersParsed[index] = lettersParsed[index].toUpperCase();
      }
    });

    return lettersParsed.join('');
  }

  /**
   * Punctuation must remain in the same relative place from the end of the word.
   */
  private fixPunctuation(original: string, parsed: string): string {
    const punctuationReg = /[.,\/#!$%\^&\*;:{}=_`~() ']/;
    if (!punctuationReg.test(original)) {
      return parsed;
    }

    let lettersParsed = parsed.replace(/[.,\/#!$%\^&\*;:{}=\-_`~() ']/g,"").split('');
    const lettersOriginal = original.split('');

    lettersOriginal.slice(0).reverse().map((character, positionFromEnd) => {
      if (punctuationReg.test(character)) {
        lettersParsed.splice((lettersParsed.length) - positionFromEnd, 0, character);
      }
    });

    return lettersParsed.join('');
  }
}

let testText = "Hello apple stairway can't end. Beach this-thing McCloud";

let button = document.createElement("button");
button.textContent = "Test";
button.onclick = function() {
  document.getElementById("test2").innerHTML = new PigLatinConverter(testText).getConvertedText();
};

let div = document.createElement("div");
div.id = "test2";

document.getElementById("wrapper").appendChild(button);
document.getElementById("wrapper").appendChild(div);