"use strict";

$(document).ready(function() 
{

    function handleError(message) 
	{
        alert(message);    
    }
    
    function sendAjax(action, data) 
	{
        $.ajax({
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: function(result, status, xhr) {

                window.location = result.redirect;
            },
            error: function(xhr, status, error) {
                var messageObj = JSON.parse(xhr.responseText);
            
                handleError(messageObj.error);
            }
        });        
    }
    
    $("#signupSubmit").on("click", function(e) 
	{
        e.preventDefault();
    
        if($("#username").val() == '' || $("#password").val() == '' || $("#password2").val() == '') 
		{
            handleError("All fields are required");
            return false;
        }
        
        if($("#password").val() !== $("#password2").val()) 
		{
            handleError("Passwords do not match");
            return false;           
        }

        sendAjax($("#signupForm").attr("action"), $("#signupForm").serialize());
        
        return false;
    });

    $("#loginSubmit").on("click", function(e) 
	{
        e.preventDefault();   
    
        if($("#username").val() == '' || $("#password").val() == '') 
		{
            handleError("Username or password is empty");
            return false;
        }
    
        sendAjax($("#loginForm").attr("action"), $("#loginForm").serialize());

        return false;
    });
});