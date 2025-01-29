/**Объект с настройками валидации*/
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  errorApiClass: ".query-api-error",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

/**Функция отображения валидации элемента формы*/
function showInputError(formElement, inputElement, errorMessage, validConfig){
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // добавление стилей и текста ошибки
  inputElement.classList.add(validConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validConfig.errorClass);
};

/**Функция очистки валидации элемента формы*/
function hideInputError(formElement, inputElement, validConfig) {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // очистка стилей и текста ошибки
  inputElement.classList.remove(validConfig.inputErrorClass);
  errorElement.classList.remove(validConfig.errorClass);
  errorElement.textContent = "";
};

/**Функция проверки валидации элемента формы*/
function isValid(formElement, inputElement, validConfig) {
  //проверка валидности паттерна введенного значения
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.patternMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  //проверка валидности поля ввода
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validConfig);
  } else {
    hideInputError(formElement, inputElement, validConfig);
  }
};

/**Функция проверки валидации всех полей ввода формы*/
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    // Если поле не валидно, вернёт true
    return !inputElement.validity.valid;
  });
};

/**Функция установки активности кнопки*/
function setActiveButtonState(buttonElement, validConfig) {
  buttonElement.disabled = false;
  buttonElement.classList.remove(validConfig.inactiveButtonClass);
};

/**Функция удаления активности кнопки*/
function setInactiveButtonState(buttonElement, validConfig) {
  buttonElement.disabled = true;
  buttonElement.classList.add(validConfig.inactiveButtonClass);
};

/**Функция активности кнопки*/
function toggleButtonState(inputList, buttonElement, validConfig) {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделть кнопку неактивной
    setInactiveButtonState(buttonElement, validConfig);
  } else {
    // сделать кнопку активной
    setActiveButtonState(buttonElement, validConfig);
  }
};

/**Функция валидации элементов формы*/
function setEventListeners(formElement, validConfig) {
  // Находим все поля внутри формы
  const inputList = Array.from(formElement.querySelectorAll(validConfig.inputSelector));
  const buttonElement = formElement.querySelector(validConfig.submitButtonSelector);
  const ApiErrorElement = formElement.querySelector(validConfig.errorApiClass);
  toggleButtonState(inputList, buttonElement, validConfig);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызовем isValid,
      isValid(formElement, inputElement, validConfig);
      toggleButtonState(inputList, buttonElement, validConfig);
      ApiErrorElement.classList.remove(validConfig.errorClass);
      ApiErrorElement.textContent = "";
    });
  });
};

/**Функция включение валидации всех форм*/
function enableValidation(validConfig) {
  // Находим все формы
  const formList = Array.from(
    document.querySelectorAll(validConfig.formSelector)
  );
  formList.forEach((formElement) => {
    formList.forEach((formElement) => {
      // Для каждой формы вызовем функцию setEventListeners
      setEventListeners(formElement, validConfig);
    });
  });
};

/**Функция очистки ошибок валидации*/
function clearValidation(formElement, validConfig) {
   // Находим все поля внутри формы
  const inputList = Array.from(formElement.querySelectorAll(validConfig.inputSelector));
  const buttonElement = formElement.querySelector(validConfig.submitButtonSelector);
  const ApiErrorElement = formElement.querySelector(validConfig.errorApiClass);
  // каждое поле и ошибки к нему очищаем
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validConfig);
  });
    // сделть кнопку неактивной
    setInactiveButtonState(buttonElement, validConfig);
    // скрываем элемент ошибки API запроса
    ApiErrorElement.classList.remove(validConfig.errorClass);
    ApiErrorElement.textContent = "";
};

/**Список объектов для экспорта*/
export { validationConfig, enableValidation, clearValidation };
