// навигация полоски и кнопок вперед и назад
const questions = document.querySelectorAll('.question');
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

let currentQuestion = 0;

// Функция для обновления прогресса
function updateProgress() {
    const progressPercent = (currentQuestion / (questions.length - 1)) * 100;
    progressBar.style.width = `${progressPercent}%`;
    progressText.textContent = `ЗАВЕРШЕНО: ${Math.round(progressPercent)}%`;
}

// Функция для показа текущего вопроса
function showQuestion(index) {
    questions.forEach((question, i) => {
        question.classList.toggle('active', i === index);
    });

    prevButton.disabled = index === 0;
    nextButton.style.display = index === questions.length - 1 ? 'none' : 'inline-block'; // Скрыть кнопку "Далее" на последнем вопросе
    checkIfAnswered(); // Проверка, активировать ли кнопку "Далее"
    updateProgress();
}

// Функция проверки, активировать ли кнопку "Далее"
function checkIfAnswered() {
    const currentQuestionInputs = questions[currentQuestion].querySelectorAll('input[type="radio"], input[type="checkbox"]');
    let isAnswered = false;

    currentQuestionInputs.forEach(input => {
        if (input.checked) {
            isAnswered = true;
        }
    });

    if (currentQuestion < questions.length - 1) {
        nextButton.disabled = !isAnswered; // Деактивация кнопки "Далее", если ничего не выбрано
    }
}

// Обработка нажатия на кнопку "Далее"
nextButton.addEventListener('click', () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
});

// Обработка нажатия на кнопку "Назад"
prevButton.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
});

// Добавляем обработчики событий для всех input элементов, чтобы активировать кнопку "Далее" при выборе
questions.forEach((question, index) => {
    const inputs = question.querySelectorAll('input[type="radio"], input[type="checkbox"]');
    
    inputs.forEach(input => {
        input.addEventListener('change', checkIfAnswered);
    });
});

// Инициализируем показ первого вопроса
showQuestion(currentQuestion);









// Форма для заполнения данных

// это было в js script

document.addEventListener('DOMContentLoaded', function () {
    const phoneInputField = document.querySelector("#formPhone");

    const allowedCountries = [
        "AD", "AT", "BE", "BG", "HR", "CZ", "DK", "EE", "FI", "FR",
        "GR", "IS", "IE", "IT", "LV", "LI", "LT", "LU", "MK", "MT",
        "MC", "ME", "NL", "NO", "PT", "RO", "RS", "SK", "SI", "ES",
        "SE", "CH", "GB"
    ];

    const phoneInput = window.intlTelInput(phoneInputField, {
        initialCountry: "auto",
        separateDialCode: true, 
        onlyCountries: allowedCountries, 
        geoIpLookup: function(callback) {
            fetch('https://ipinfo.io/json')
                .then(response => response.json())
                .then(data => callback(data.country))
                .catch(() => callback('us'));
        },
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });


    phoneInputField.addEventListener('countrychange', function() {
        const dialCode = phoneInput.getSelectedCountryData().dialCode;
        let currentValue = phoneInputField.value;
        
     
        currentValue = currentValue.replace(/^\+\d+/, '');


        phoneInputField.value = currentValue;
    });

    
    const form = document.querySelector("#form-new");
    form.addEventListener('submit', function(e) {
        const fullNumber = phoneInput.getNumber();
        phoneInputField.value = fullNumber;

        
        var nameInput = form.querySelector('input[name="name"]');
        var emailInput = form.querySelector('input[name="email"]');

        var nameRegex = /^.{2,}$/;
        var emailRegex = /@/;

        var isValid = true;

        if (!nameRegex.test(nameInput.value.trim())) {
            nameInput.classList.add('error');
            if (nameInput.value.trim() === '') {
                nameInput.placeholder = 'Введите полное имя';
            }
            isValid = false;
        } else {
            nameInput.classList.remove('error');
            nameInput.placeholder = 'Ваше имя';
        }

        if (!emailRegex.test(emailInput.value.trim())) {
            emailInput.classList.add('error');
            if (emailInput.value.trim() === '') {
                emailInput.placeholder = 'Введите правильно почту';
            }
            isValid = false;
        } else {
            emailInput.classList.remove('error');
            emailInput.placeholder = 'Ваша почта';
        }

        if (!phoneInput.isValidNumber()) {
            phoneInputField.classList.add('error');
            phoneInputField.placeholder = 'Введите правильный номер';
            isValid = false;
        } else {
            phoneInputField.classList.remove('error');
            phoneInputField.placeholder = 'Ваш номер телефона';
        }

        if (!isValid) {
            e.preventDefault();
        }
    });

 
    const nameInput = form.querySelector('input[name="name"]');
    const emailInput = form.querySelector('input[name="email"]');

    nameInput.addEventListener('input', function () {
        var nameValue = nameInput.value.trim();
        var nameRegex = /^.{2,}$/;

        if (nameRegex.test(nameValue)) {
            nameInput.classList.remove('error');
            nameInput.placeholder = 'Ваше имя';
        }
    });

    emailInput.addEventListener('input', function () {
        var emailValue = emailInput.value.trim();
        var emailRegex = /@/;

        if (emailRegex.test(emailValue)) {
            emailInput.classList.remove('error');
            emailInput.placeholder = 'Ваша почта';
        }
    });

   
    const closeButton = document.getElementById('close-button-new');
    closeButton.addEventListener('click', function () {
        document.getElementById('popup-form-new').style.display = 'none';
    });

    document.getElementById('popup-button').addEventListener('click', function () {
        document.getElementById('popup-form-new').style.display = 'block';
    });

    window.addEventListener('click', function(event) {
        const popupForm = document.getElementById('popup-form-new');
        if (event.target === popupForm) {
            popupForm.style.display = 'none';
        }
    });
});
