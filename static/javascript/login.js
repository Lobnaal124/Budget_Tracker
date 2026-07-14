const loginform=document.getElementById("login");

loginform.addEventListener("submit",async function(e){

    e.preventDefault();

    const username=document.getElementById("username").value;
    const password=document.getElementById("password").value;

    const response=await fetch("/api/login",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            username,
            password
        })

    });

    const data=await response.json();

    if(data.success){

        localStorage.setItem("username",data.username);

        alert("Login Success");

        window.location.href="/dashboard";

    }

    else{

        alert(data.message);

    }

});