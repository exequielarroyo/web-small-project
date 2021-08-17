// TODO: Select all elements needed
//    Use the HTML to figure out what classes/ids will work best for selecting each element
const formGroup = document.querySelector(".form-group");
const passwordInputs = document.querySelectorAll('input[type="password"]');
const usernameInput = document.querySelector("#username");
const termsInput = document.querySelector("#terms");
const form = document.querySelector("form");
const errorList = document.querySelector(".errors-list");

// TODO: Create an event listener for when the form is submitted and do the following inside of it.
form.addEventListener("submit", e => {
  clearErrors();
  //    TODO: Create an array to store all error messages and clear any old error messages
  const errorMessages = [];
  //    TODO: Define the following validation checks with appropriate error messages
  //      1. Ensure the username is at least 6 characters long
  if (usernameInput.value.length < 6) {
    errorMessages.push("Ensure the username is at least 6 characters long");
  }
  //      2. Ensure the password is at least 10 characters long
  if (passwordInputs[0].value.length < 10) {
    errorMessages.push("Ensure the password is at least 10 characters long");
  }
  //      3. Ensure the password and confirmation password match
  if (passwordInputs[1].value != passwordInputs[0].value) {
    errorMessages.push("Ensure the password and confirmation password match");
  }
  //      4. Ensure the terms checkbox is checked
  if (!termsInput.checked) {
    errorMessages.push("Ensure the terms checkbox is checked");
  }
  //    TODO: If there are any errors then prevent the form from submitting and show the error messages

  if (errorMessages.length > 0) {
    e.preventDefault();
    showErrors(errorMessages);
  } else {
    clearErrors();
  }
});

// TODO: Define this function
function clearErrors() {
  // Loop through all the children of the error-list element and remove them
  while (errorList.children[0] != null) {
    errorList.removeChild(errorList.children[0])
  }
  // IMPORTANT: This cannot be done with a forEach loop or a normal for loop since as you remove children it will modify the list you are looping over which will not work
  // I recommend using a while loop to accomplish this task
  // This is the trickiest part of this exercise so if you get stuck and are unable to progress you can also set the innerHTML property of the error-list to an empty string and that will also clear the children. I recommend trying to accomplish this with a while loop, though, for practice.
  // Also, make sure you remove the show class to the errors container
  document.querySelector(".errors").classList.remove("show");
}

// TODO: Define this function
function showErrors(errorMessages) {
  // Add each error to the error-list element
  errorMessages.forEach(message => {
    // Make sure to use an li as the element for each error
    if (message != null) {
      const newError = document.createElement("li");
      newError.innerText = message;
      errorList.append(newError);
    }
  });
  // Also, make sure you add the show class to the errors container
  document.querySelector(".errors").classList.add("show");
}
