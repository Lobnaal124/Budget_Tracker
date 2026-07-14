const registeform = document.getElementById("register");

registeform.addEventListener("submit", async function(e){

    e.preventDefault();

    const username=document.getElementById("username").value;
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    const confirm=document.getElementById("confimPassword").value;

    if(password!==confirm){

        alert("Passwords don't match");
        return;
    }

    const response=await fetch("/api/register",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            username,
            email,
            password
        })

    });

    const data=await response.json();

    if(data.success){

        alert("Account Created");

        window.location.href="/dashboard";

    }else{

        alert(data.message);

    }

});