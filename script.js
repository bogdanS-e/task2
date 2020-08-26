/////Vars for language change////////////////////////
let appLang = localStorage.getItem('lang');
const uaButton = document.querySelector('button[data-change-lang="ua"]');
const rusButton = document.querySelector('button[data-change-lang="rus"]');
if (!appLang) {
    appLang = 'ua';
    localStorage.setItem('lang', 'ua');
}
function toogleLang(e) {
    const switcher = e.target.dataset.changeLang
    if (switcher === appLang) return;
    appLang = appLang === 'ua' ? 'rus' : 'ua';
    localStorage.setItem('lang', appLang);
    changeAppLang();
    checkTerm();
}
uaButton.onclick = toogleLang;
rusButton.onclick = toogleLang;
function changeAppLang() {
    for (let element of document.querySelectorAll('[data-lang]')) {
        if (appLang === 'ua') {
            if (element.getAttribute('placeholder'))
                element.setAttribute('placeholder', element.dataset.ua)
            else
                element.innerHTML = element.dataset.ua;
        } else {
            if (element.getAttribute('placeholder'))
                element.setAttribute('placeholder', element.dataset.rus)
            else
                element.innerHTML = element.dataset.rus;
        }
    }
}
changeAppLang();
////////Script to change lang of App///////////////////////////

///email change//////////////////////
const emailInput = document.querySelector('input[type="email"]');
emailInput.onchange = emailInput.oninput = function () {
    checkValidForm();
}
/////////////////////////////////////

////Handle text area/////////////////////
const symbolCounter = document.querySelector('.textarea-symbols');
const textArea = document.querySelector('textarea');
const areaDownLoad = document.querySelector('.area-download');
textArea.onchange = textArea.oninput = function (e) {
    const textarea = e.target;
    if (textarea.value.length > 0) {
        areaDownLoad.classList.add('d-none');
        symbolCounter.classList.remove('d-none');
    } else {
        areaDownLoad.classList.remove('d-none');
    }
    symbolCounter.innerHTML = textarea.value.length;
    checkValidForm();
    checkPrice();
    checkTerm()
}
//////////////////////////////////////////

///////radio buttons controller////////////
const radioButtonsList = document.querySelectorAll('.radioButton');
let translateToLang = '';
for (let radio of radioButtonsList) {
    radio.onclick = function (e) {
        for (let radio of radioButtonsList) {
            radio.classList.remove('active');
        }
        translateToLang = this.dataset.toLang;
        this.classList.add('active');
        checkValidForm();
        checkPrice();
        checkTerm()
    }
}
///////////////////////////////////////////


/////send button disabled constroller//////
const sendButton = document.querySelector('.submit-content button');
function checkValidForm() {
    if (translateToLang && emailInput.value.length > 0 && (textArea.value.length > 0 || countSymbols > 0)) {
        sendButton.removeAttribute('disabled');
        sendButton.classList.remove('disabled');
    } else {
        sendButton.setAttribute('disabled', 'true');
        sendButton.classList.add('disabled');
    }
}
///////////////////////////////////////////


/////Send form/////////////////////////////
const form = document.querySelector('form');
form.onsubmit = function (e) {
    e.preventDefault();
    alert("Form was submited")
}
///////////////////////////////////////////

////////file load/////////////////////////
const fileLoader = document.querySelector('input[type="file"]');
const fileLoadArea = document.querySelector('.file-loader');
const fileName = document.querySelector('.file-name');
const fileSize = document.querySelector('.file-size span');
const closeLoadArea = document.querySelector('.file-link');
let countSymbols = 0;
let fileType = '';
closeLoadArea.onclick = function () {
    fileLoader.value = '';
    fileLoadArea.classList.add('d-none');
    countSymbols = 0;
    fileType = '';
    checkValidForm();
    checkPrice();
    checkTerm()
}
function onChangeFile(event) {
    var file = event.target.files[0];
    fileType = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    fileName.innerHTML = file.name;
    var reader = new FileReader();
    reader.onload = function () {
        let content = this.result;
        for (let j = 0; j < content.length; j++) {
            if (/[\w \d]/.test(content[j])) {
                countSymbols++;
            }
        }
        if (countSymbols > 0) {
            fileLoadArea.classList.remove('d-none');
            symbolCounter.classList.add('d-none');
            fileSize.innerHTML = countSymbols;
            checkValidForm();
            checkPrice();
            checkTerm()
        }
    };
    reader.readAsText(file);
}
fileLoader.onchange = onChangeFile;
//////////////////////////////////////////

////////Check Price and Term////////
const priceObject = document.querySelector('.price .number');
const termObject = document.querySelector('.price .time');
function checkPrice() {
    priceObject.innerHTML = '0,00 грн';
    if (!translateToLang) return;
    if (!+symbolCounter.innerHTML && !fileType) return;
    let totalLength = symbolCounter.innerHTML;
    const validTypes = ['.doc', '.docx', '.rtf'];
    const valueOfSymbol = translateToLang === 'en' ? 0.12 : 0.05;
    const minPrice = translateToLang === 'en' ? 120 : 50;
    let totalPrice = totalLength * valueOfSymbol;
    if (fileType) {
        totalLength = countSymbols;
        totalPrice = totalLength * valueOfSymbol;
        if (!validTypes.includes(fileType)) {
            totalPrice += totalPrice * 0.2;
        }
    }
    if (totalPrice < minPrice)
        totalPrice = minPrice;
    priceObject.innerHTML = totalPrice.toFixed(2).replace('.', ',') + ' грн';
}
function checkTerm() {
    termObject.innerHTML = '';
    if (!translateToLang) return;
    if (!+symbolCounter.innerHTML && !fileType) return;
    let totalLength = symbolCounter.innerHTML;
    const validTypes = ['.doc', '.docx', '.rtf'];
    const symbolPerHour = translateToLang === 'en' ? 333 : 1333;
    const minTerm = 1;
    let totalTerm = 0.5 + totalLength / symbolPerHour;
    if (fileType) {
        totalLength = countSymbols;
        totalTerm = 0.5 + totalLength / symbolPerHour;
        if (!validTypes.includes(fileType)) {
            totalTerm += totalTerm * 0.2;
        }
    }
    if (totalTerm < minTerm)
        totalTerm = minTerm;
    totalTerm = Math.ceil(+totalTerm);
    const date = new Date();
    let termCounter = totalTerm;
    let readyDate;
    do {
        if(date.getDay() >=1 && date.getDay() <=5 ){
            if(date.getHours()>=10 && date.getHours() <19){
                termCounter-=1;
                date.setHours(date.getHours() + 1);
                if(termCounter === 0){
                    readyDate = date;
                    break;
                }
                console.log(date);
            }else{
                date.setHours(date.getHours() + 1);
            }
        }else{
            date.setHours(date.getHours() + 1);
        }
    } while (true);
    const dateNow = new Date();
    let message = '';
    if(dateNow.getFullYear() === readyDate.getFullYear() && dateNow.getMonth() === readyDate.getMonth() && dateNow.getDay() === readyDate.getDay()){
        const dateDifference = readyDate.getHours() - dateNow.getHours();
        if(dateDifference <= 1){
            message = appLang === 'ua' ? 'Здамо за: одну годину' : 'Сдадим через: один час';
        } else if(dateDifference <= 2){
            message = appLang === 'ua' ? 'Здамо за: дві години' : 'Сдадим через: два часа';
        } else if(dateDifference <= 3){
            message = appLang === 'ua' ? 'Здамо за: три години' : 'Сдадим через: три часа';
        }
        else{
            message = (appLang === 'ua' ? 'Термін виконання: ' : 'Срок сдачи: ') +  readyDate.getDate() +'.'+`${roundMonth(readyDate.getMonth()+1)}.${readyDate.getFullYear()%1000} ${appLang === 'ua'? 'o':'в'} ${roundMinutes(readyDate.getHours()+':'+readyDate.getMinutes())}`;
        }
    }else{
        message = (appLang === 'ua' ? 'Термін виконання: ' : 'Срок сдачи: ') +  readyDate.getDate() +'.'+`${roundMonth(readyDate.getMonth()+1)}.${readyDate.getFullYear()%1000} ${appLang === 'ua'? 'o':'в'} ${roundMinutes(readyDate.getHours()+':'+readyDate.getMinutes())}`;
    }
    termObject.innerHTML = message;
}
////////////////////////////////////

function roundMinutes(t) {
    function format(v) { return v < 10 ? '0' + v: v; }

    var m = t.split(':').reduce(function (h, m) { return h * 60 + +m; });
    
    m = Math.ceil(m / 30) * 30;
    return [Math.floor(m / 60), m % 60].map(format).join(':');
}
function roundMonth(m) {
    if(+m < 10)
        return '0' + m;
    return m;
}
