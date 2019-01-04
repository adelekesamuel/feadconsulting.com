


/**
INDEX PAGE - This function is used in the loop game to display multiplication table for input numbers and validate input fields
**/
  function add()
 {
  var x = parseInt(document.getElementById("x").value);
  var y = parseInt(document.getElementById("y").value);
  var xField = document.getElementById("x").value;
  var yField = document.getElementById("y").value;
  var totalOutput = "";
  
  if (xField == "" || yField == ""|| isNaN(xField) || isNaN(yField)) 
 {
		alert("Please enter a number in both fields");
		return false;
}
	
  
  
  
  
  var j = 1;
  for(i = 1; i<= y; i = x*j)
  {
   var c = i;
   totalOutput = totalOutput + x + " * "+ j +" = "+ i +"<br>";
   j = j + 1;
  }
  document.getElementById("demo").innerHTML = totalOutput;
 }

 


/**
This function gets that user enters username and password to login
**/
function validateLoginForm()
{
	
    var email = document.getElementById("loginemail").value;
	var password = document.getElementById("password").value;
	localStorage.setItem("storageName", email);
	var limit = 20;
		

if (email == "" || password == "" || email.length > limit) 
    {
		alert("Please note: Username and/or password cannot be blank and username cannot be more than 20 characters");
		return false;
	}

 return true;
 
}




// This function validates that the password field on login page only accepts alphanumeric inputs
function alphanumeric()
{
 var regex = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,10})$/;
 var password = document.getElementById("password").value;
 
 if(password.match(regex)) 
  {
   return true;
  }
else
  { 
   alert("Your password must be between 8 and 10 characters, contains at least one digit and one alphabet, and must not contain special characters. If your password is correct, ensure that your username is also correct"); 
   return false; 
  }
  }
  

  function loginPageLoad()
  {
	  var url_string = window.location.href;
	  var params=window.location.search.substring(1); 
	  var invalidCredentials = params.split("&")[0];
	  if(invalidCredentials){
		  $('.error').show();
		  $('.info').hide();
	  }
  }
  
 // This function validates that the passwoed field on login page only accepts alphanumeric inputs 
  function validateLoginCredentials()
{
  
 
			var c = "xyzabc";
			var d = c.substring(1,3);
			console.debug("value of d is : "+d);
			
			var url_string = window.location.href;
			console.log("search: "+window.location.search);
			console.log("search: "+window.location.search.substring(0));
			console.log("search: "+window.location.search.substring(1));
			var params=window.location.search.substring(1); 
			var fullUserName = params.split("&")[0];
			var fullPassword = params.split("&")[1];
			console.log("User: "+fullUserName);
			console.log("password: "+fullPassword);
			var userName = decodeURIComponent(fullUserName.split("=")[1]);
			var password = fullPassword.split("=")[1];
			console.log("User Name : "+userName);
			console.log("Password : "+password);

			if(userName =="testuser@email.com" && password == "password12")
			{
			
				document.getElementById("loginemail").innerHTML = "Welcome, " + userName;
				
				
				$(document.body).show();
			}
			else{
					window.location = "login.html?invalidCredentials=true";
			}
		
  
  
}
  
  
  
  
  
  
  
  
  
  
  
  
  
  



/**
This function gets the username of the user and displays it on the 'My Account' page 
**/
function loggedInUser(email)
{
document.getElementById("loggedinuser").innerHTML = "Welcome, " + localStorage.getItem("storageName");

}


/**
This function validates registration form inputs
**/

function validateForm()
{
var firstname = document.getElementById("firstname").value;
var lastname = document.getElementById("lastname").value;
var email = document.getElementById("email").value;


if (firstname == "" || lastname == "" || email == "") 
{
		alert("Please ensure you have entered your names and a valid email address");
		return false;
}
	
var tel = document.getElementById("tel").value;	
var regex = /^\d{10}$/;
if(tel.match(regex))
{
return true;
}
else
{
alert("Please enter a valid mobile number");
return false;
}

	
}





/**
CALCULATOR PAGE - This function loads the calculator functionality
**/
function calculator()
{
var keys = document.querySelectorAll('#calculator span');
var operators = ['+', '-', 'x', 'รท'];
var decimalAdded = false;

// Add onclick event to all the keys and perform operations
for(var i = 0; i < keys.length; i++) {
	keys[i].onclick = function(e) {
		// Get the input and button values
		var input = document.querySelector('.screen');
		var inputVal = input.innerHTML;
		var btnVal = this.innerHTML;
		
		// Now, just append the key values (btnValue) to the input string and finally use javascript's eval function to get the result
		// If clear key is pressed, erase everything
		if(btnVal == 'C') {
			input.innerHTML = '';
			decimalAdded = false;
		}
		
		// If eval key is pressed, calculate and display the result
		else if(btnVal == '=') {
			var equation = inputVal;
			var lastChar = equation[equation.length - 1];
			
			// Replace all instances of x and รท with * and / respectively. This can be done easily using regex and the 'g' tag which will replace all instances of the matched character/substring
			equation = equation.replace(/x/g, '*').replace(/รท/g, '/');
			
			// Final thing left to do is checking the last character of the equation. If it's an operator or a decimal, remove it
			if(operators.indexOf(lastChar) > -1 || lastChar == '.')
				equation = equation.replace(/.$/, '');
			
			if(equation)
				input.innerHTML = eval(equation);
				
			decimalAdded = false;
		}
		
		// Basic functionality of the calculator is complete. But there are some problems like 
		// 1. No two operators should be added consecutively.
		// 2. The equation shouldn't start from an operator except minus
		// 3. not more than 1 decimal should be there in a number
		
		// We'll fix these issues using some simple checks
		
		// indexOf works only in IE9+
		else if(operators.indexOf(btnVal) > -1) {
			// Operator is clicked
			// Get the last character from the equation
			var lastChar = inputVal[inputVal.length - 1];
			
			// Only add operator if input is not empty and there is no operator at the last
			if(inputVal != '' && operators.indexOf(lastChar) == -1) 
				input.innerHTML += btnVal;
			
			// Allow minus if the string is empty
			else if(inputVal == '' && btnVal == '-') 
				input.innerHTML += btnVal;
			
			// Replace the last operator (if exists) with the newly pressed operator
			if(operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
				// Here, '.' matches any character while $ denotes the end of string, so anything (will be an operator in this case) at the end of string will get replaced by new operator
				input.innerHTML = inputVal.replace(/.$/, btnVal);
			}
			
			decimalAdded =false;
		}
		
		// Now only the decimal problem is left. We can solve it easily using a flag 'decimalAdded' which we'll set once the decimal is added and prevent more decimals to be added once it's set. It will be reset when an operator, eval or clear key is pressed.
		else if(btnVal == '.') {
			if(!decimalAdded) {
				input.innerHTML += btnVal;
				decimalAdded = true;
			}
		}
		
		// if any other key is pressed, just append it
		else {
			input.innerHTML += btnVal;
		}
		
		// prevent page jumps
		e.preventDefault();
	} 
}









/**
This function uses switch-case method to peform arithmetic operations and validate input
**/
function calculate(){


var a = document.getElementById("num1").value;
if(a == "" || isNaN(a))
{
alert("Please enter a valid number and try again")
return false;
}


var b = document.getElementById("num2").value;	
if(b == "" || isNaN(b))
{
alert("Please enter a valid number and try again")
return false;		
}


var operator = document.getElementById("operator").value;	

switch(operator)
{
case "+":
	var result = parseInt(a) + parseInt(b);
	break;
	
case "-":
	var result = parseInt(a) - parseInt(b);
	break;
	
case "/":
	var result = parseInt(a) / parseInt(b);
	break;
case "*":
	var result = parseInt(a) * parseInt(b);
	break;
default:
	var result = "Operator Not Permitted";
}

document.getElementById("result").value = result;
}







}