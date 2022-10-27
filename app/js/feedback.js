"use strict";

// телефон заполнить полностью
let phoneText = false;
// емайл заполнить полностью
let emailText = false; 

var h_form_btn = document.querySelectorAll('.btn-send');

h_form_btn.forEach(function (item) {
    formReadyClick(item);
});

function formReadyClick (btn) { 

    let form = btn.closest("form");
    
    form.addEventListener("submit", formSendAsync2, {once: true});
    
    async function formSendAsync2(e){

        e.preventDefault(); // запрет на отправку стандартной формы
        
        formSendAsync(btn);
    }
}



async function formSendAsync(btn_child){

    let form = btn_child.closest("form");
    
    let error = formValidate(form);

    let formData = new FormData(form);

    //form.preventDefault(); // запрет на отправку стандартной формы

    if(error === 0){

        form.classList.add('_sending');
        let response = await fetch('/js/ajax-send.php', {
           method: 'POST',
            body: formData
        });
        if(response.ok){
            let result = await response.json();

            form.reset();
            form.classList.remove('_sending');
            $.fancybox.close();

            formMainSend();
            
            
            return true;

        } else {
            alert("ошибка");
        }

    } else {
        if(phoneText){
            alert('Введите ещё цифры телефона');
        } else if(emailText)  {
            alert('Введите емайл полностью');
        } else {
            alert('заполните поля');
        }
    }
    return false;
}


function formMainSend() {

              
    
        let panel = document.querySelector('body');
        let modal = document.querySelector('.modal-wrapper'); // .modal-wrapper обертка для всех модалок с задним фоном во весь экран

        let modals = document.querySelectorAll('.modal-wrapper > .modal');
    
    
            
        for (let modal of modals) {
            modal.classList.remove("active-modal");
        }
        document.querySelector('.modal-thanks').classList.add("active-modal");

        panel.classList.toggle('no-scroll');
        modal.classList.add('modal-wrapper--open'); // добавляем этот класс .modal-wrapper--open для оберток всех модалок тогда окно откроется

    
    
}

// проверка на ошибки
function formValidate(form){
    let error = 0;
    //let formReq = document.querySelectorAll('._req'); // обязательное поле
    let formReq = form.getElementsByClassName('_req');

    for (let index = 0; index < formReq.length; index++){
        const input = formReq[index];
        formRemoveError(input); // убрать класс проверки

        if(input.classList.contains('_email')){
            if(emailTest(input)){
                formAddError(input);
                error++;
            }
        }
        else if(input.classList.contains('input__mask')){
            if(phoneTest(input)){
                formAddError(input);
                error++;
                phoneText = true;
            }

        }
        else if(input.getAttribute("type") === "checkbox" && input.checked === false){
            formAddError(input);
            error++;  
        } else {
            if(input.value === ''){
                formAddError(input);
                error++; 
            }
        }
    }
    return error;
}
// добавляют родители и элементу класс _error
function formAddError(input){
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
}
function formRemoveError(input){
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
}

// проверка emai
function emailTest(input){
    emailText = true;
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

// проверка телефона
function phoneTest(input){
    if(input.value.replace(/ +/g, ' ').trim() === "+7" || 
       input.value === '' || 
       input.value.replace(/[\+\(\)\s]/g,"").length < 12 
      ){
        //let hhh = input.value.replace(/[\+\(\)\s]/g,"").length;
       return true ;
    }
    return false;
}

//////////
    const formImage = document.getElementById('quiz__file');
    const formPreview = document.querySelector('.input__file-button-text');
    //const formPreview = document.getElementById('formPreview');
    
    if(formImage){
       formImage.addEventListener('change', () => {
           uploadFile(formImage.files[0]); 
        }); 
    }
    
    
    
function uploadFile(file){


    if(file.size > 4 * 1024 * 1024){
        alert('файл должен быть менее 4мб');
        return;
    }

    var reader = new FileReader();

    reader.onload = function (e){
        //formPreview.innerHTML = `<img src="${e.target.result}" alt="FOTO" style="">`;
        formPreview.innerHTML = `<span style="color: #f28d55;">Файл добавлен</span>`;
    }
    reader.onerror = function (e){
        alert('Ошибка');
    };
    reader.readAsDataURL(file);

}
    
