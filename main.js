!function(){"use strict";function e(e,r,n,o,c,i){var a=e.querySelector(".places__item").cloneNode(!0),u=a.querySelector(".card__image"),l=a.querySelector(".card__title"),s=a.querySelector(".card__like-button"),p=a.querySelector(".card__delete-button");return a.id=r._id,u.src=r.link,u.alt=r.name,l.textContent=r.name,t(r,n,a),r.owner._id==n._id?p.addEventListener("click",(function(){return o(r,a)})):p.remove(),u.addEventListener("click",(function(){return c(r)})),s.addEventListener("click",(function(){return i(r,n,a)})),a}function t(e,t,r){var n=r.querySelector(".card__like-button");r.querySelector(".card__like-count").textContent=e.likes.length,n.classList.toggle("card__like-button_is-active",e.likes.some((function(e){return e._id===t._id})))}function r(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");null!==t&&c(t)}}function n(e){e.target.classList.contains("popup_is-opened")&&c(e.target)}function o(e){e.classList.add("popup_is-opened"),document.body.addEventListener("keydown",r),e.addEventListener("click",n)}function c(e){e.classList.remove("popup_is-opened"),document.body.removeEventListener("keydown",r),e.removeEventListener("click",n)}function i(e,t,r){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r.inputErrorClass),n.classList.remove(r.errorClass),n.textContent=""}function a(e,t){e.disabled=!0,e.classList.add(t.inactiveButtonClass)}function u(e,t,r){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?function(e,t){e.disabled=!1,e.classList.remove(t.inactiveButtonClass)}(t,r):a(t,r)}function l(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector),o=e.querySelector(t.errorApiClass);r.forEach((function(r){i(e,r,t)})),a(n,t),o.classList.remove(t.errorClass),o.textContent=""}var s={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",errorApiClass:".query-api-error",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},p={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-31",headers:{authorization:"8fb61c75-604e-4d96-aba9-a3e69ed9080c","Content-Type":"application/json"}};function d(e,t){return e.json().then((function(r){return e.ok?r:Promise.reject("".concat(t," Ошибка: ").concat(e.status))})).then((function(e){return e})).catch((function(e){return Promise.reject(e)}))}var f=function(e){return fetch("".concat(p.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:p.headers}).then((function(e){return d(e,"Не удалось поставить лайк.")}))},_=function(e){return fetch("".concat(p.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:p.headers}).then((function(e){return d(e,"Не удалось убрать лайк.")}))};function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}var m,v,S,h,q=document.querySelector("#card-template").content,b=document.querySelector(".page__content"),L=b.querySelector(".content"),C=L.querySelector(".places").querySelector(".places__list"),k=L.querySelector(".profile__info"),E=L.querySelector(".profile__image"),g=L.querySelector(".profile__edit-button"),A=L.querySelector(".profile__add-button"),x=L.querySelector(".profile__image-edit"),U=b.querySelector(".popup_type_edit"),j=b.querySelector(".popup_type_new-card"),w=b.querySelector(".popup_type_edit-avatar"),T=b.querySelector(".popup_type_image"),O=b.querySelector(".popup_type_delete_confirm"),P=U.querySelector(".popup__form"),B=j.querySelector(".popup__form"),D=w.querySelector(".popup__form"),I=O.querySelector(".popup__form"),M=j.querySelector(".popup__close"),N=U.querySelector(".popup__close"),J=T.querySelector(".popup__close"),H=w.querySelector(".popup__close"),V=O.querySelector(".popup__close");function $(e){var t=e.querySelector(s.errorApiClass);t.classList.remove(s.errorClass),t.textContent=""}function z(e,t){var r=e.querySelector(s.errorApiClass);r.classList.add(s.errorClass),r.textContent=t}function F(e){e.querySelector(".popup__button").textContent="Сохранить"}function G(e){e.querySelector(".popup__button").textContent="Сохранение..."}function K(e,t){if(t.classList.contains("profile__info")){var r=t.querySelector(".profile__title"),n=t.querySelector(".profile__description");r.textContent=e.name,n.textContent=e.about,E.style.backgroundImage="url('"+e.avatar+"')",S=e}}function Q(e){!function(e){var t=T.querySelector(".popup__image"),r=T.querySelector(".popup__caption");t.src=e.link,t.alt=e.name,r.textContent=e.name}(e),o(T)}function R(e,t){v=e,m=t,$(I),o(O)}function W(e){c(e.target.closest(".popup"))}function X(e,r,n){(n.querySelector(".card__like-button").classList.contains("card__like-button_is-active")?_:f)(e._id).then((function(e){return t(e,r,n)})).catch((function(e){return console.log(e)}))}function Y(t){t.preventDefault(),$(B),G(B);var r,n=B.querySelector(".popup__input_type_card-name"),o=B.querySelector(".popup__input_type_url");(r={name:n.value,link:o.value},fetch("".concat(p.baseUrl,"/cards"),{method:"POST",headers:p.headers,body:JSON.stringify({name:r.name,link:r.link})}).then((function(e){return d(e,"Добавление карточки не выполнено.")}))).then((function(t){var r=e(q,t,S,R,Q,X);C.prepend(r),B.reset(),c(j)})).catch((function(e){return z(B,e)})).finally((function(){return F(B)}))}g.addEventListener("click",(function(e){l(P,s),function(e,t){if(e.classList.contains("profile__info")&&t.classList.contains("popup_type_edit")){var r=e.querySelector(".profile__title"),n=e.querySelector(".profile__description"),o=t.querySelector(".popup__form");o.elements.name.value=r.textContent,o.elements.description.value=n.textContent}}(k,U),o(U)})),A.addEventListener("click",(function(e){B.reset(),l(B,s),o(j)})),x.addEventListener("click",(function(e){var t,r;l(D,s),r=w,(t=E).classList.contains("profile__image")&&r.classList.contains("popup_type_edit-avatar")&&(r.querySelector(".popup__form").elements.link.value=t.style.backgroundImage.replace(/^.+?['"]|['"].+?$/g,"")),o(w)})),N.addEventListener("click",W),H.addEventListener("click",W),M.addEventListener("click",W),J.addEventListener("click",W),V.addEventListener("click",W),P.addEventListener("submit",(function(e){var t,r;e.preventDefault(),$(P),G(P),(t=P.elements.name.value,r=P.elements.description.value,fetch("".concat(p.baseUrl,"/users/me"),{method:"PATCH",headers:p.headers,body:JSON.stringify({name:t,about:r})}).then((function(e){return d(e,"Изменение профиля не выполнено.")}))).then((function(e){K(e,k),P.reset(),c(U)})).catch((function(e){return z(P,e)})).finally((function(){return F(P)}))})),D.addEventListener("submit",(function(e){var t;e.preventDefault(),$(D),G(D),(t=D.elements.link.value,fetch("".concat(p.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:p.headers,body:JSON.stringify({avatar:t})}).then((function(e){return d(e,"Изменение аватара не выполнено.")}))).then((function(e){var t,r;t=e,(r=E).classList.contains("profile__image")&&(r.style.backgroundImage="url('"+t.avatar+"')",S=t),D.reset(),c(w)})).catch((function(e){return z(D,e)})).finally((function(){return F(D)}))})),B.addEventListener("submit",Y),B.addEventListener("submit",Y),I.addEventListener("submit",(function(e){var t;e.preventDefault(),$(I),I.querySelector(".popup__button").textContent="Удаление...",(t=v._id,fetch("".concat(p.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:p.headers}).then((function(e){return d(e,"Удаление карточки не выполнено.")}))).then((function(e){console.log(e),m.remove(),m={},v={},c(O)})).catch((function(e){return z(I,e)})).finally((function(){I.querySelector(".popup__button").textContent="Да"}))})),b.querySelectorAll(".popup").forEach((function(e){e.classList.add("popup_is-animated")})),h=s,Array.from(document.querySelectorAll(h.formSelector)).forEach((function(e){!function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector),o=e.querySelector(t.errorApiClass);u(r,n,t),r.forEach((function(c){c.addEventListener("input",(function(){!function(e,t,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.patternMessage):t.setCustomValidity(""),t.validity.valid?i(e,t,r):function(e,t,r,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),o.textContent=r,o.classList.add(n.errorClass)}(e,t,t.validationMessage,r)}(e,c,t),u(r,n,t),o.classList.remove(t.errorClass),o.textContent=""}))}))}(e,h)}));var Z=[fetch("".concat(p.baseUrl,"/users/me"),{headers:p.headers}).then((function(e){return d(e,"Запрос профайла не выполнен.")})),fetch("".concat(p.baseUrl,"/cards"),{headers:p.headers}).then((function(e){return d(e,"Запрос карточек не выполнен.")}))];Promise.all(Z).then((function(t){var r,n,o=(n=2,function(e){if(Array.isArray(e))return e}(r=t)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,c,i,a=[],u=!0,l=!1;try{if(c=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=c.call(r)).done)&&(a.push(n.value),a.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=r.return&&(i=r.return(),Object(i)!==i))return}finally{if(l)throw o}}return a}}(r,n)||function(e,t){if(e){if("string"==typeof e)return y(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?y(e,t):void 0}}(r,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],i=o[1];K(c,k),i.forEach((function(t){var r=e(q,t,S,R,Q,X);C.append(r)}))})).catch((function(e){return console.log(e)}))}();