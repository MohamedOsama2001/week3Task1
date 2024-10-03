let firstName=document.querySelector("#fname");
let lastName=document.querySelector("#lname");
let email=document.querySelector("#email");
let password=document.querySelector("#pwd");
let registerBtn=document.querySelector(".btn");
registerBtn.onclick=function(stop){
    stop.preventDefault()
    if(firstName.value==""||lastName.value==""||email.value==""||password.value==""){
        alert("Empty Field!")
    }
    else{
        const user={
            fname:firstName.value,
            lname:lastName.value,
            email:email.value,
            password:password.value
        }
        localStorage.setItem('user',JSON.stringify(user))
        setTimeout(()=>{
            window.location="login.html"
        },1000)

    }
}