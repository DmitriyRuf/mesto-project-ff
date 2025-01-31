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

  /**Список объектов для экспорта*/
export { validationConfig };