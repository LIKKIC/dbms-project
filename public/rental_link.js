document.querySelector('#T').addEventListener('click',()=>{
    window.location.href = "http://127.0.0.1:3000/tenantsignup";
})
document.querySelector('#O').addEventListener('click',()=>{
    window.location.href = "http://127.0.0.1:3000/ownersignup";
})
const tl = document.querySelector('#tl');

tl.addEventListener('click',()=>{
    window.location.href = "http://127.0.0.1:3000/tenantlogin";
})

