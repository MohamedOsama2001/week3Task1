let getUser=JSON.parse(localStorage.getItem("user"))
let userInfo=document.querySelector(".user-info")
let userName=document.querySelector(".user-info .user-name")
let navLinks=document.querySelector(".nav-links")
let shopCart=document.querySelector(".shopCart")

if(getUser){
    navLinks.remove()
    userInfo.style.display="flex"
    userName.innerHTML=getUser.fname
    shopCart.style.display="flex"


}
let logoutBtn=document.querySelector(".logout")
logoutBtn.addEventListener("click",function(){
    localStorage.clear();
    setTimeout(()=>{
        window.location="login.html"
    },1000)
})