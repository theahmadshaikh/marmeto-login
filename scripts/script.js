const loginContainer = document.querySelector(".login-container")
const otpContainer = document.querySelector(".otp-container")
const mainPage = document.querySelector(".main-page")
const loginForm = document.querySelector("#login-form")
const email = document.querySelector("#email")
const phoneNumber = document.querySelector("#phone-number")
const emailError = document.querySelector("#email-error")
const phoneNumberError = document.querySelector("#phone-number-error")
const confirmButton = document.querySelector("#confirm-btn")
const backBtn = document.querySelector(".back-btn");
const editButton = document.querySelector("#edit-button");
const userNameElement = document.querySelector("#user-name")
const otpError = document.querySelector(".otp-error")
let userName ="User";


let allowedDomain = "marmeto.com";
let emailPattern = new RegExp(`^[a-zA-Z0-9._%+-]+@${allowedDomain}$`);
let phonePattern = /^[6-9]\d{9}$/;

const handelSubmit = (e)=>{
    e.preventDefault();
    emailError.classList.add("hidden")
    phoneNumberError.classList.add("hidden")
    if(!emailPattern.test(email.value))
       return emailError.classList.toggle("hidden")
    if(!phonePattern.test(phoneNumber.value))
        return phoneNumberError.classList.toggle("hidden") 
    userName = email.value.split("@")[0];
    loginContainer.classList.toggle("hidden")
    otpContainer.classList.toggle("hidden")
}


const handelSubmitOtp = (e)=>{
    const digit1 = document.querySelector("#digit1")
    const digit2 = document.querySelector("#digit2")
    const digit3 = document.querySelector("#digit3")
    const digit4 = document.querySelector("#digit4")
    const otp = digit1.value+digit2.value+digit3.value+digit4.value;
    if(otp!=="2025")
       return otpError.classList.toggle("hidden")
    otpContainer.classList.toggle("hidden")
    mainPage.classList.toggle("hidden")
    userNameElement.textContent = `Hey ${userName}!`
    
}


window.addEventListener("DOMContentLoaded",()=>{
    loginForm.addEventListener("submit",handelSubmit)
    confirmButton.addEventListener("click",handelSubmitOtp)
    
        let inputs = document.querySelectorAll(".otp-btns input");
    
        inputs.forEach((input, index) => {
            input.addEventListener("input", function () {
                if(this.value.length === 1 && index===inputs.length-1)
                    confirmButton.focus()
                if (this.value.length === 1 && index < inputs.length - 1) {
                    inputs[index + 1].focus(); 
                }
            });
    
            input.addEventListener("keydown", function (event) {
                if (event.key === "Backspace" && index > 0 && this.value === "") {
                    inputs[index - 1].focus(); 
                }
            });
            input.addEventListener("paste", function (event) {
                event.preventDefault();
                console.log("hi")
                let pastedData = (event.clipboardData ).getData("text");
                let digits = pastedData.replace(/\D/g, "").split(""); 
                if(!digits.length)
                    return ;
    
                if (digits.length <= inputs.length) {
                    inputs.forEach((inp, i) => {
                        inp.value = digits[i] || ""; 
                    });
                    inputs[Math.min(digits.length, inputs.length) - 1].focus(); 
                }
            });
        });
        backBtn.addEventListener("click",()=>{
            loginContainer.classList.toggle("hidden")
    otpContainer.classList.toggle("hidden")
        })

        editButton.addEventListener("click",(e)=>{
            email.focus();
        })
})

