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
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_PigLatinConverter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/PigLatinConverter */ "./src/lib/PigLatinConverter.ts");

var input = document.getElementById("text-input");
var output = document.getElementById("text-output");
var submit = document.getElementById("text-submit");
var liveConvert = document.getElementById("live-convert");
submit.addEventListener('click', function () { return output.value = new _lib_PigLatinConverter__WEBPACK_IMPORTED_MODULE_0__["default"](input.value).getConvertedText(); });
liveConvert.addEventListener('change', function () {
    liveConvert.checked ? bindKeyUp() : unbindKeyUp();
});
function bindKeyUp() {
    input.addEventListener("keyup", handleKeyUp);
}
function unbindKeyUp() {
    input.removeEventListener("keyup", handleKeyUp);
}
function handleKeyUp() {
    submit.click();
}


/***/ }),

/***/ "./src/lib/PigLatinConverter.ts":
/*!**************************************!*\
  !*** ./src/lib/PigLatinConverter.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var PigLatinConverter = /** @class */ (function () {
    function PigLatinConverter(originalText) {
        var _this = this;
        this.originalText = originalText;
        var wordsArray = this.splitWords(originalText.trim());
        var convertedArray = wordsArray.map(function (original) {
            return original
                .split("-")
                .map(function (word) { return _this.processWord(word); })
                .join("-");
        });
        this.convertedText = convertedArray.join(" ");
    }
    /**
     * Returns converted pig-latin string
     */
    PigLatinConverter.prototype.getConvertedText = function () {
        return this.convertedText;
    };
    /**
     * Returns original text
     */
    PigLatinConverter.prototype.getOriginalText = function () {
        return this.originalText;
    };
    /**
     * Convert one word to pig-latin format
     */
    PigLatinConverter.prototype.processWord = function (original) {
        var parsed = this.clearText(original);
        parsed = this.vowelOrConsonantWord(parsed);
        parsed = this.fixPunctuation(original, parsed);
        parsed = this.capitalization(original, parsed);
        return parsed;
    };
    /**
     * Split text to words array
     */
    PigLatinConverter.prototype.splitWords = function (text) {
        return text.split(/[\s]+/);
    };
    /**
     * Remove all punctuation character, covert result to lower case
     */
    PigLatinConverter.prototype.clearText = function (text) {
        var parsed = text.replace(/[.,\/#!$%\^&\*;:{}=_`~() '’]/g, "");
        parsed.split("-");
        return parsed.toLocaleLowerCase();
    };
    /**
     * Convert word by rules for vowel, consonant and word with "way" on end
     */
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
        var lettersParsed = parsed.split('');
        var lettersOriginal = original.split('');
        lettersOriginal.map(function (letter, index) {
            if (!/[.,\/#!$%\^&\*;:{}=\-_`~() '’]/.test(letter) && letter === letter.toUpperCase()) {
                lettersParsed[index] = lettersParsed[index].toUpperCase();
            }
        });
        return lettersParsed.join('');
    };
    /**
     * Punctuation must remain in the same relative place from the end of the word.
     */
    PigLatinConverter.prototype.fixPunctuation = function (original, parsed) {
        var punctuationReg = /[.,\/#!$%\^&\*;:{}=_`~() '’]/;
        if (!punctuationReg.test(original)) {
            return parsed;
        }
        var lettersParsed = parsed.split('');
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
/* harmony default export */ __webpack_exports__["default"] = (PigLatinConverter);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map