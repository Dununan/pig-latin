/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

var PigLatinConverter = /** @class */ (function () {
    function PigLatinConverter(text) {
        // this.convertedText = this.convertText(text);
        var _this = this;
        // "Hello my apple.".split(" ")
        var wordsArray = this.splitWords(text);
        // "Hello".slice(0, 1)
        var convertedArray = wordsArray.map(function (original) {
            var parsed = _this.vowelOrConsonantWord(original);
            parsed = _this.capitalization(original, parsed);
            parsed = _this.fixPunctuation(original, parsed);
            return parsed;
        });
        this.convertedText = convertedArray.join(" ");
        // /[aeiou]/.test("A".toLocaleLowerCase()) true/false
        // /way$/.test("stairway")
        // "can’t".indexOf("’")
        // "can’t".indexOf("’") && "this-thing".split("-")
        // character == character.toUpperCase()
    }
    PigLatinConverter.prototype.getConvertedText = function () {
        return this.convertedText;
    };
    PigLatinConverter.prototype.splitWords = function (text) {
        return text.split(" ");
    };
    PigLatinConverter.prototype.vowelOrConsonantWord = function (word) {
        // Words that end in “way” are not modified.
        if (/way$/.test(word)) {
            return word;
        }
        // Words that start with a vowel have the letters “way” added to the end.
        var firstLetter = word.slice(0, 1).toLocaleLowerCase();
        if (/[aeiou]/.test(firstLetter)) {
            return word + "way";
        }
        // Words that start with a consonant have their first letter moved to the end of the word and the letters “ay” added to the end.
        return "" + word.slice(1) + firstLetter + "ay";
    };
    /**
     * Capitalization must remain in the same place.
     */
    PigLatinConverter.prototype.capitalization = function (original, parsed) {
        var lettersParsed = parsed.toLowerCase().split('');
        var lettersOriginal = original.split('');
        lettersOriginal.map(function (letter, index) {
            if (letter === letter.toUpperCase()) {
                lettersParsed[index] = lettersParsed[index].toUpperCase();
            }
        });
        return lettersParsed.join('');
    };
    /**
     * Punctuation must remain in the same relative place from the end of the word.
     */
    PigLatinConverter.prototype.fixPunctuation = function (original, parsed) {
        var punctuationReg = /[.,\/#!$%\^&\*;:{}=_`~() ']/;
        if (!punctuationReg.test(original)) {
            return parsed;
        }
        var lettersParsed = parsed.replace(/[.,\/#!$%\^&\*;:{}=\-_`~() ']/g, "").split('');
        var lettersOriginal = original.split('');
        lettersOriginal.slice(0).reverse().map(function (character, positionFromEnd) {
            if (punctuationReg.test(character)) {
                lettersParsed.splice((lettersParsed.length) - positionFromEnd, 0, character);
            }
        });
        return lettersParsed.join('');
    };
    return PigLatinConverter;
}());
var testText = "Hello apple stairway can't end. Beach this-thing McCloud";
var button = document.createElement("button");
button.textContent = "Test";
button.onclick = function () {
    document.getElementById("test2").innerHTML = new PigLatinConverter(testText).getConvertedText();
};
var div = document.createElement("div");
div.id = "test2";
document.getElementById("wrapper").appendChild(button);
document.getElementById("wrapper").appendChild(div);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map