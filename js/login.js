let email=document.querySelector("#email")
let password=document.querySelector("#pwd")
let loginBtn=document.querySelector(".btn")
let getUser=JSON.parse(localStorage.getItem("user"))
loginBtn.addEventListener("click",function(stop){
    stop.preventDefault()
    const userEmail=getUser.email
    const userPswd=getUser.password
    if(email.value=="",password.value==""){
        alert("Empty Field!")
    }
    else{
        if(userEmail===email.value && userPswd===password.value){
            setTimeout(()=>{
                window.location="index.html"
            },1000)
        }
        else{
            alert("Invalid Credentials!")
        }
    }
})