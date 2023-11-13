import throttle from 'lodash.throttle'; // Import lodash.throttle library.

const form = document.querySelector('.feedback-form'); // store the .feedback-form element.
const emailInput = form.querySelector('input[name="email"]'); // sore the input with the refference name="email.
const messageInput = form.querySelector('textarea[name="message"]'); // sore the textarea with the refference name="message.

function saveFormData() { // function
  const formData = { // stores an object with:
    email: emailInput.value, // email property with the value of -emailInput-.
    message: messageInput.value, // message property with the value of -messageInput-.
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData)); // the object its turend into a string.
}

function loadFormData() {
  const savedData = localStorage.getItem('feedback-form-state');
  if (savedData) {
    const formData = JSON.parse(savedData);
    emailInput.value = formData.email || '';
    messageInput.value = formData.message || '';
  }
}

const throttledSave = throttle(saveFormData, 500);

emailInput.addEventListener('input', () => {
  throttledSave();
});

messageInput.addEventListener('input', () => {
  throttledSave();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };

  localStorage.removeItem('feedback-form-state');

  console.log(formData);

  form.reset();
});

loadFormData();

