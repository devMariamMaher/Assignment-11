var signupName = document.querySelector('#signupName');
var signupEmail = document.querySelector('#signupEmail');
var signupPass = document.querySelector('#signupPass');
var signupBtn = document.querySelector('#signupBtn');
var emailAlert = document.querySelector('#emailAlert');
var loginEmail = document.querySelector('#loginEmail');
var loginPass = document.querySelector('#loginPass');
var showPassIcon = document.querySelector('.showPassIcon');
var hidePassIcon = document.querySelector('.hidePassIcon');
var loginBtn = document.querySelector('#loginBtn');
var loginAlert = document.querySelector('#loginAlert');
var welcomeMessage = document.querySelector('#welcomeMessage');
var logoutBtn = document.querySelector('#logoutBtn');
var users = [];

if(localStorage.getItem('users')){
    users = JSON.parse(localStorage.getItem('users'));
}

// =====================================================================
// Signup

if(signupBtn){
    signupBtn.addEventListener('click', function(e){
        e.preventDefault();
        addUser();
    })

    signupPass.addEventListener('input', function(){
        if(signupPass.value){
            showPassIcon.classList.remove('d-none')
        } else{
            showPassIcon.classList.add('d-none')
        }
    })
}

function addUser(){
    if(validateSignup(signupName) & validateSignup(signupEmail) & validateSignup(signupPass) && !checkExistence(signupEmail)){
        var user = {
            userName: signupName.value,
            userEmail: signupEmail.value,
            userPass: signupPass.value
        }
    
        user.userName = user.userName.at(0).toUpperCase() + user.userName.slice(1);
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        clearInputs(signupName, signupEmail, signupPass);
        window.location.href = '../index.html';
    }
}

function clearInputs(...arg){
    for(var i = 0; i < arg.length; i++){
        arg[i].value = null
    }
}

function validateSignup(element){
    var inputsRegex = {
        signupName: /^[A-z|a-z]{3,15}$/,
        signupEmail: /^\w{3,10}@(gmail|yahoo)\.(com)$/,
        signupPass: /^\S{8,13}$/
    }

    if(inputsRegex[element.id].test(element.value)){
        element.classList.remove('is-invalid')
        element.classList.add('is-valid')
        element.nextElementSibling.classList.add('d-none');
        return true
    } else{
        element.classList.remove('is-valid')
        element.classList.add('is-invalid')
        signupEmail.nextElementSibling.textContent = "Invalid email address.";
        element.nextElementSibling.classList.remove('d-none');

        showPassIcon.style.right = '38px'
        showPassIcon.style.top = '17%'
        hidePassIcon.style.right = '38px'
        hidePassIcon.style.top = '17%'
        return false
    }
}

function checkExistence(inputEmail){
    for(var i = 0; i < users.length; i++){
        if(inputEmail.value.toLowerCase() == users[i].userEmail.toLowerCase()){
            signupEmail.nextElementSibling.classList.remove('d-none');
            signupEmail.nextElementSibling.textContent = "Email already exists.";
            signupEmail.classList.add('is-invalid');
            return true;
        } 
    }
}

if(showPassIcon){
    showPassIcon.addEventListener('click', function(){
        if(signupPass){
            showHidePass(signupPass);
            showPassIcon.classList.add('d-none');
            hidePassIcon.classList.remove('d-none');
        } else if(loginPass){
            showHidePass(loginPass);
            showPassIcon.classList.add('d-none');
            hidePassIcon.classList.remove('d-none');
        }
    })    
}

if(hidePassIcon){
    hidePassIcon.addEventListener('click', function(){
        if(signupPass){
            showHidePass(signupPass);
            showPassIcon.classList.remove('d-none');
            hidePassIcon.classList.add('d-none');
        } else if(loginPass){
            showHidePass(loginPass);
            showPassIcon.classList.remove('d-none');
            hidePassIcon.classList.add('d-none');
        }
    })
}

function showHidePass(passElement){
    if(passElement.getAttribute('type') == 'password'){
        passElement.setAttribute('type', 'text');
    } else{
        passElement.setAttribute('type', 'password');
    }
}

// =====================================================================
// Login

if(loginBtn || loginPass){
    loginBtn.addEventListener('click', function(e){
        e.preventDefault();
        loginUser();
    })

    loginPass.addEventListener('input', function(){
        if(loginPass.value){
            showPassIcon.classList.remove('d-none')
        } else{
            showPassIcon.classList.add('d-none')
        }
    })
}

function loginUser(){
    if(loginEmail.value == "" && loginPass.value == ""){
        loginEmail.classList.add('is-invalid');
        loginPass.classList.add('is-invalid');
        showPassIcon.style.right = '38px'
        hidePassIcon.style.right = '38px'
        
        loginAlert.textContent = "All inputs are required";
        loginAlert.classList.remove('d-none');
        return;
    } else if(loginEmail.value && loginPass.value == ""){
        loginEmail.classList.remove('is-invalid');
        loginPass.classList.add('is-invalid');
        showPassIcon.style.right = '38px'
        hidePassIcon.style.right = '38px'
        
        loginAlert.textContent = "All inputs are required";
        loginAlert.classList.remove('d-none');
        return;
    } else if(loginEmail.value == "" && loginPass.value){
        loginEmail.classList.add('is-invalid');
        loginPass.classList.remove('is-invalid');
        
        loginAlert.textContent = "All inputs are required";
        loginAlert.classList.remove('d-none');
        return;
    } else{
        for(var i = 0; i < users.length; i++){
            if(loginEmail.value == users[i].userEmail && loginPass.value == users[i].userPass){
                loginEmail.classList.remove('is-invalid');
                loginEmail.classList.add('is-valid');
                loginPass.classList.remove('is-invalid');
                loginPass.classList.add('is-valid');

                loginAlert.classList.remove('text-danger');
                loginAlert.classList.add('text-success');
                loginAlert.classList.remove('alert-danger');
                loginAlert.classList.add('alert-success');
                loginAlert.textContent = "Success";
                loginAlert.classList.remove('d-none');
                
                localStorage.setItem('accountIndex', i);
                clearInputs(loginEmail, loginPass);
                window.location.href = './pages/home.html';
                return;
            } else{
                loginEmail.classList.remove('is-valid');
                loginEmail.classList.add('is-invalid');
                loginPass.classList.remove('is-valid');
                loginPass.classList.add('is-invalid');
                showPassIcon.style.right = '38px'
                hidePassIcon.style.right = '38px'        

                loginAlert.classList.remove('text-success');
                loginAlert.classList.add('text-danger');
                loginAlert.classList.remove('alert-success');
                loginAlert.classList.add('alert-danger');
                loginAlert.textContent = "Invalid email or password";
                loginAlert.classList.remove('d-none');
            }
        }
    }
}

// =====================================================================
// Home

if(welcomeMessage){
    var loginIndex = localStorage.getItem('accountIndex');
    if(loginIndex){
        welcomeMessage.append(users[loginIndex].userName);
    }
}

if(logoutBtn){
    logoutBtn.addEventListener('click', function(){
        logout();
    })
}

function logout(){
    window.location.href = '../index.html';
    localStorage.removeItem('accountIndex');
}