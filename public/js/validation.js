// SSN validation
// trap keypress - only allow numbers
$('input.ssn').on('keypress', function (event) {
    // trap keypress
    var character = String.fromCharCode(event.which);
    if (!isInteger(character)) {
        return false;
    }
});

// checks that an input string is an integer, with an optional +/- sign character
function isInteger(s) {
    if (s === '-') return true;
    var isInteger_re = /^\s*(\+|-)?\d+\s*$/;
    return String(s).search(isInteger_re) != -1
}

// format SSN 
$('input.ssn').on('keyup', function () {
    var val = this.value.replace(/\D/g, '');
    var newVal = '';
    if(val.length > 4) {
       this.value = val;
    }
    if((val.length > 3) && (val.length < 6)) {
       newVal += val.substr(0, 3) + '-';
       val = val.substr(3);
    }
    if (val.length > 5) {
       newVal += val.substr(0, 3) + '-';
       newVal += val.substr(3, 2) + '-';
       val = val.substr(5);
     }
     newVal += val;
     this.value = newVal.substring(0, 11);
});

// Currency Formatter
$("input[data-type='currency']").on({
    keyup: function () {
        formatCurrency($(this));
    },
    blur: function () {
        formatCurrency($(this), "blur");
    }
});


function formatNumber(n) {
    // format number 1000000 to 1,234,567
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}


function formatCurrency(input, blur) {
    // appends $ to value, validates decimal side
    // and puts cursor back in right position.

    // get input value
    var input_val = input.val();

    // don't validate empty input
    if (input_val === "") { return; }

    // original length
    var original_len = input_val.length;

    // initial caret position 
    var caret_pos = input.prop("selectionStart");

    // check for decimal
    if (input_val.indexOf(".") >= 0) {

        // get position of first decimal
        // this prevents multiple decimals from
        // being entered
        var decimal_pos = input_val.indexOf(".");

        // split number by decimal point
        var left_side = input_val.substring(0, decimal_pos);
        var right_side = input_val.substring(decimal_pos);

        // add commas to left side of number
        left_side = formatNumber(left_side);

        // validate right side
        right_side = formatNumber(right_side);

        // On blur make sure 2 numbers after decimal
        if (blur === "blur") {
            right_side += "00";
        }

        // Limit decimal to only 2 digits
        right_side = right_side.substring(0, 2);

        // join number by .
        input_val = "$" + left_side + "." + right_side;

    } else {
        // no decimal entered
        // add commas to number
        // remove all non-digits
        input_val = formatNumber(input_val);
        input_val = "$" + input_val;

        // final formatting
        if (blur === "blur") {
            input_val += ".00";
        }
    }

    // send updated string to input
    input.val(input_val);

    // put caret back in the right position
    var updated_len = input_val.length;
    caret_pos = updated_len - original_len + caret_pos;
    input[0].setSelectionRange(caret_pos, caret_pos);
}


$(document).ready(function () {
    // Hide account distribtuion unless both checkboxes are selected
    $("#accountDistribution").hide();

    // Disable the submit button
    // $("#submit").prop('disabled', true);

    // Only allow letters and white spaces for name input fields
    $(".nameInput").keypress(function(event){
        var inputValue = event.which;
        // allow letters and whitespaces only.
        if(!(inputValue >= 65 && inputValue <= 120) && (inputValue != 32 && inputValue != 0)) { 
            event.preventDefault(); 
        }
    });
});

// Validating Name Input
$('.nameInput').focusout(function () {

    // Validates if the current input form has an empty space
    if ($(this).val() === ''){
        $(this).addClass('form-error');
        $(this).attr("placeholder", "This field is required");
    }
    else{
        $(this).removeClass('form-error');
    }
});

// E-Mail Validation on Focusout
$('#emailInput').focusout(function () {
    $('#emailInput').each(function (e) {
        email_address = $(this);
        email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        if (!email_regex.test(email_address.val())) {
            $('#emailInput').addClass('form-error');
            $(this).attr("placeholder", "This field is required");
            return false;
        }
        else{
            $('#emailInput').removeClass('form-error');
            return true;
        }
    });
});

// Ensuring numberic id's prevent letters and special characters
$('.numeric').on('input blur paste', function () {
    $(this).val($(this).val().replace(/\D/g, ''))
})

// Validating SSN
$("#SSNinput").focusout(function (){
    var SSNlength = ($(this).val().length);
    console.log(SSNlength);
    console.log($(this).val());

    if (SSNlength < 11){
        $(this).addClass('form-error');
        $("#invalidSSN").hide();
        
        if ($("#invalidSSN:not(:visible)")){
            $(this).after("<p id='invalidSSN' style='color:red; padding-top: 5px;'>Invalid SSN<p>");
        }
        else{
            $("#invalidSSN").hide();
        }
    }
    else{
        $(this).removeClass('form-error');
        $("#invalidSSN").hide();
    }
});

// Validating DOB
$('.DOB').mask("99-99-9999");
$('.DOB').change(function () {

    if ($(this).val().substring(0, 2) > 12 || $(this).val().substring(0, 2) == "00") {
        $(this).addClass('form-error');
        $(this).after("<p id='invalidDateFormat' style='color:red; padding-top: 5px;'>Invalid Date Format<p>");
        // Hides the age error paragraph in case it is visible
        $("#applicantAgeError").hide();
        return false;
    }
    if ($(this).val().substring(3, 5) > 31 || $(this).val().substring(0, 2) == "00") {
        $(this).addClass('form-error');
        $(this).after("<p id='invalidDateFormat' style='color:red; padding-top: 5px;'>Invalid Date Format<p>");
        // Hides the age error paragraph in case it is visible
        $("#applicantAgeError").hide();
        return false;
    }

    else{
        $("#invalidDateFormat").hide();
        $(this).removeClass('form-error');
    }
});

// Checking the age of the applicant via MomentJS
$('.DOB').focusout(function () {
    var dob = $("#DOBinput").val();
    var format = moment(dob, "MM-DD-YYYY");
    var age = moment().diff(format, 'years');
    console.log(dob);
    console.log(age);

    if (age <= 18) {
        $(this).addClass('form-error');
        $(this).after("<p id='applicantAgeError' style='color:red; padding-top: 5px;'>Applicant must be at least 18</p>");
    }
    else{
        $(this).removeClass('form-error');
        $('#applicantAgeError').hide();
    }
});

// Ensuring both checkboxes are checked before showing the distribution div
$("#checking-checkbox, #savings-checkbox").click(function () {
    if ($("#checking-checkbox").is(':checked') == true && $("#savings-checkbox").is(':checked') == true) {
        $("#accountDistribution").show();
        $("#initialDeposit").prop('disabled', true);
    } else {
        $("#accountDistribution").hide();
        $("#initialDeposit").prop('disabled', false);
    }
});

// Allowing only numbers and decimal points for currenct
$(function () {
    $("input[class*='currency-field']").keydown(function (event) {

        if (event.shiftKey == true) {
            event.preventDefault();
        }

        if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 46 || event.keyCode == 190) {

        } else {
            event.preventDefault();
        }

        if ($(this).val().indexOf('.') !== -1 && event.keyCode == 190)
            event.preventDefault();

    });
});

// Validating the minimum deposit to be $25
$('#initialDeposit').focusout(function () {

    // Obtain the value from the input field and replace the dollar sign
    var amount = $("#initialDeposit").val().replace(/[$,]/g,"");

    // Parse the value to a number with decimals
    var int = parseFloat(amount, 10);

    // Compare if the amount is less than $25.00
    if ($('#initialDeposit').val() == '' || int < 25.00) {
        $('#initialDeposit').addClass('form-error');
        console.log("The amount cannot be less than 25")
    }
    else{
        $('#initialDeposit').removeClass('form-error');
    }
});