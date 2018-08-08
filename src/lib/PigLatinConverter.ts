export default class PigLatinConverter {
  private convertedText: string;

  constructor(private originalText: string) {
    const wordsArray = this.splitWords(originalText.trim());
    const convertedArray = wordsArray.map(original =>
      original
        .split("-")
        .map(word => this.processWord(word))
        .join("-")
    );

    this.convertedText = convertedArray.join(" ");
  }

  /**
   * Returns converted pig-latin string
   */
  public getConvertedText(): string {
    return this.convertedText;
  }

  /**
   * Returns original text
   */
  public getOriginalText(): string {
    return this.originalText;
  }

  /**
   * Convert one word to pig-latin format
   */
  private processWord(original) {
    let parsed = this.clearText(original);
    parsed = this.vowelOrConsonantWord(parsed);
    parsed = this.fixPunctuation(original, parsed);
    parsed = this.capitalization(original, parsed);
    return parsed;
  }

  /**
   * Split text to words array
   */
  private splitWords(text: string): string[] {
    return text.split(/[\s]+/);
  }

  /**
   * Remove all punctuation character, covert result to lower case
   */
  private clearText(text: string): string {
    let parsed = text.replace(/[.,\/#!$%\^&\*;:{}=_`~() '’]/g,"");
    parsed.split("-");
    return parsed.toLocaleLowerCase();
  }

  /**
   * Convert word by rules for vowel, consonant and word with "way" on end
   */
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
    let lettersParsed = parsed.split('');
    const lettersOriginal = original.split('');

    lettersOriginal.map((letter, index) => {
      if (!/[.,\/#!$%\^&\*;:{}=\-_`~() '’]/.test(letter) && letter === letter.toUpperCase()) {
        lettersParsed[index] = lettersParsed[index].toUpperCase();
      }
    });

    return lettersParsed.join('');
  }

  /**
   * Punctuation must remain in the same relative place from the end of the word.
   */
  private fixPunctuation(original: string, parsed: string): string {
    const punctuationReg = /[.,\/#!$%\^&\*;:{}=_`~() '’]/;
    if (!punctuationReg.test(original)) {
      return parsed;
    }

    let lettersParsed = parsed.split('');
    const lettersOriginal = original.split('');

    lettersOriginal.slice(0).reverse().map((character, positionFromEnd) => {
      if (punctuationReg.test(character)) {
        lettersParsed.splice((lettersParsed.length) - positionFromEnd, 0, character);
      }
    });

    return lettersParsed.join('');
  }
}