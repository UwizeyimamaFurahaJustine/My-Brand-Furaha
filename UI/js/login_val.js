var email = document.forms['form']['email'];
var password = document.forms['form']['password'];

var email_error = document.getElementById('email_error');
var pass_error = document.getElementById('pass_error');

email.addEventListener('textInput',email_Verify);
password.addEventListener('textInput',pass_Verify);

function validated(){
    console.log("reached validated");

    if(email.value.length < 9) {
        email.style.borderBottom = "1px solid #d93025";
        email_error.style.display = "block";
        email.focus();
        console.log("email validated");
        return false;
    }
    if(password.value.length < 9) {
        password.style.border = "1px solid #d93025";
        pass_error.style.display = "block";
        password.focus();
        console.log("pass validated");
        return false;
    }
}
function email_Verify(){
    if(email.value.length >= 8) {
        email.style.border = "1px solid silver";
        email_error.style.display = "none";
        return true;
    }
}
function pass_Verify(){
    if(password.value.length >=5) {
        password.style.border = "1px solid silver";
        pass_error.style.display = "none";
        return true;
    }
}


