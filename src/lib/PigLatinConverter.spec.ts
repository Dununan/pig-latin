import PigLatinConverter from "./PigLatinConverter";

// import * as mocha from 'mocha';
import * as chai from "chai";

const expect = chai.expect;
describe("Pig Latin Converter", () => {
  it("should return Apple - original text", () => {
    const result = new PigLatinConverter("Apple").getOriginalText();
    expect(result).to.equal("Apple");
  });

  it("should return Ellohay - consonant", () => {
    const result = new PigLatinConverter("Hello").getConvertedText();
    expect(result).to.equal("Ellohay");
  });

  it("should return Appleway - vowel", () => {
    const result = new PigLatinConverter("Apple").getConvertedText();
    expect(result).to.equal("Appleway");
  });

  it("should return Stairway - word with way on end", () => {
    const result = new PigLatinConverter("Stairway").getConvertedText();
    expect(result).to.equal("Stairway");
  });

  it("should return histay-hingtay - words with hyphen", () => {
    const result = new PigLatinConverter("this-thing").getConvertedText();
    expect(result).to.equal("histay-hingtay");
  });

  it("should return ontda'y - punctuation", () => {
    const result = new PigLatinConverter("don't").getConvertedText();
    expect(result).to.equal("ontda'y");
  });

  it("should return AnAnAbay - capitalization", () => {
    const result = new PigLatinConverter("BaNaNa").getConvertedText();
    expect(result).to.equal("AnAnAbay");
  });

  it("should return Ellohay appleway stairway antca'y endway. Eachbay histay-hingtay CcLoudmay", () => {
    let testText = "Hello apple stairway can't end. Beach this-thing McCloud";
    const result = new PigLatinConverter(testText).getConvertedText();
    expect(result).to.equal(
      "Ellohay appleway stairway antca'y endway. Eachbay histay-hingtay CcLoudmay"
    );
  });
});
