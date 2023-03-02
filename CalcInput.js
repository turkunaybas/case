class CalcInput {
  /**

A class for creating a calculator input field with validation and output display.
@class
/
class CalcInput {
/*
Creates an instance of CalcInput.
@constructor
@param {HTMLElement} parent - The parent element to attach the calculator input and output elements.
*/
  constructor(parent) {
    this.parent = parent;
    this.input = this.createInput();
    this.output = this.createOutput();
    this.isValid = false;
    parent.classList.add("container");
  }

  /**

Event handler for when the user types in the calculator input field.
@param {Event} event - The keyup event object.
*/

  onKeyUp(event) {
    let inputVal = event.target.value;

    function calculate(input) {
      return new Function("return " + input)();
    }
    let result;
    if (isNaN(inputVal)) {
      this.isValid = false;
      result = "?";
    }
    try {
      result = calculate(inputVal);
      this.isValid = true;
      this.input.parentNode.classList.remove("invalid");
      this.input.parentNode.classList.add("valid");
    } catch (e) {
      this.input.parentNode.classList.add("invalid");
      this.input.parentNode.classList.remove("valid");
      this.isValid = false;
    }
    if (!this.isValid) {
      result = "?";
    }
    if (result !== undefined) {
      this.output.innerHTML = result;
    } else {
      this.output.innerHTML = "";
    }
  }

  /**

Event handler for when the calculator input field gains focus.
*/
  onFocus() {
    if (this.isValid) {
      this.input.parentNode.classList.add("focus-within");
    } else {
      this.input.parentNode.classList.add("invalid");
    }
  }

  /**

Event handler for when the calculator input field loses focus.
*/

  onBlur() {
    if (this.isValid) {
      this.input.parentNode.classList.remove("focus-within");
      this.input.parentNode.classList.remove("invalid");
    } else {
      this.input.parentNode.classList.add("invalid");
    }
  }

  createOutput() {
    const output = document.createElement("div");
    output.type = "text";
    output.id = "calc-output";
    this.parent.appendChild(output);
    return output;
  }
  createInput() {
    const input = document.createElement("input");
    input.type = "text";
    input.id = "calc-input";
    input.addEventListener("keyup", this.onKeyUp.bind(this));
    input.addEventListener("focus", this.onFocus.bind(this));
    input.addEventListener("blur", this.onBlur.bind(this));
    this.parent.appendChild(input);
    return input;
  }
}
