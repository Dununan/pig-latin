import PigLatinConverter from "./lib/PigLatinConverter";

let input = <HTMLTextAreaElement>document.getElementById("text-input");
let output = <HTMLTextAreaElement>document.getElementById("text-output");
let submit = <HTMLButtonElement>document.getElementById("text-submit");
let liveConvert = <HTMLFormElement>document.getElementById("live-convert");

submit.addEventListener(
  "click",
  () => (output.value = new PigLatinConverter(input.value).getConvertedText())
);

liveConvert.addEventListener("change", () => {
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
