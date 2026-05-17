// 1. Оголошуємо об'єкт formData поза функціями
const formData = {
  email: '',
  message: '',
};

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

// 3. Перевірка локального сховища при завантаженні сторінки
populateForm();

// 2. Делегування подій через 'input' на формі
form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
  // Записуємо значення в об'єкт, прибираючи пробіли по краях за допомогою trim()
  formData[event.target.name] = event.target.value.trim();

  // Зберігаємо оновлений об'єкт у локальне сховище
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);

      // Заповнюємо formData та поля форми актуальними значеннями
      Object.assign(formData, parsedData);

      form.elements.email.value = formData.email || '';
      form.elements.message.value = formData.message || '';
    } catch (error) {
      console.error('Error parsing data from localStorage', error);
    }
  }
}

// 4. Обробка відправки форми
function onFormSubmit(event) {
  event.preventDefault();

  // Перевірка на заповненість усіх полів
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  // Якщо все заповнено:
  // Виводимо об'єкт у консоль
  console.log('Submitted Data:', formData);

  // Очищаємо локальне сховище
  localStorage.removeItem(STORAGE_KEY);

  // Очищаємо об'єкт formData
  formData.email = '';
  formData.message = '';

  // Очищаємо поля форми
  form.reset();
}
