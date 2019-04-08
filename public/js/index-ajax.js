$(document).ready(function () {

  // Get references to page elements
  var firstNameInput = $("#firstNameInput");
  var lastNameInput = $("#lastNameInput");
  var emailInput = $("#emailInput");
  var usernameInput = $("#usernameInput");
  var addressLine1Input = $("#addressLine1Input");
  var addressLine2Input = $("#addressLine2Input");
  var cityInput = $("#cityInput");
  var stateInput = $("#stateInput");
  var zipCodeInput = $("#zipCodeInput");
  var SSNinput = $("#SSNinput");
  var DOBinput = $("#DOBinput");
  var initialDepositInput = $("#initialDeposit");
  var CHKcheckbox = $("#checking-checkbox");
  var SAVcheckbox = $("#savings-checkbox");
  var CHKamount = $("#checking-amount");
  var SAVamount = $("#savings-amount");

  // Declaring a create user function
  function createUser(userData){
    $.post("/api/users", userData).then(getUsers);
  }
  // Creates the users accounts
  function createAccount(accountData){
    $.post("/api/accounts", accountData).then(getAccounts);
  }
  
  function getUsers() {
    $.get("/api/users", function(data) {
      console.log(data)
    });
  }
  // Calling the createUser function
  

  function handleFormSubmit(event){
    event.preventDefault();

    createUser({
      firstName: firstNameInput.val(),
      lastName: lastNameInput.val(),
      email: emailInput.val(),
      username: usernameInput.val(),
      addressLine1: addressLine1Input.val(),
      addressLine2: addressLine2Input.val(),
      city: cityInput.val(),
      state: stateInput.val(),
      zip: zipCodeInput.val(),
      SSN: SSNinput.val(),
      DOB: DOBinput.val(),
    });

    // if (CHKcheckbox.val() === true && SAVcheckbox.val() === false ) {
      createAccount({
        checking: CHKcheckbox.val(),
        savings: SAVcheckbox.val(),
        initialDeposit: initialDepositInput.val()
        
      });
    // }
    // createAccount({
    //   checking: CHKcheckbox.val(),
    //   savings: SAVcheckbox.val(),
    //   initialDeposit: initialDepositInput.val()
      
    // });
  }

  // Add event listeners to the submit and delete buttons

  $(document).on("click", "#createAcctButton", handleFormSubmit);
 
}); // end of document.ready

$(document).on("click", "#createAcctButton", function() {window.location.href="/dashboard"});