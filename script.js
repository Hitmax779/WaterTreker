let drinkHistory = []; //массив с данными о выпитой воде

const form = document.querySelector('form');
const history = document.querySelector('#history');
const weightInput = document.querySelector('#weight');
const activityLevelInput = document.querySelector('#activity-level');
const calculateButton = document.querySelector('#calculate-button');
const result = document.querySelector('#result');
const clearButton = document.querySelector('#clear-button');
// Получаем значение поля "время" из формы
const timeValue = document.querySelector('#time').value;
// Создаем объект Date из строки времени и преобразуем его в строку формата "dd.mm.yyyy hh:mm"
const date = new Date(timeValue);
const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;


form.addEventListener('submit', (e) => {
    // e.preventDefault(); //внутри обработчика формы добавляем данные в массив

    const amount = document.querySelector('#amount').value;
    const time = document.querySelector('#time').value;

    // Проверяем, что значения полей не пустые
    if (!amount || !time) {
        return; // если одно из полей пустое, выходим из функции, ничего не добавляя в историю
    }

    // создаем дату и время из введенных пользователем значений
    const [hour, minute] = time.split(':');
    const drinkTime = new Date();
    drinkTime.setHours(hour);
    drinkTime.setMinutes(minute);

    const drink = { amount, time: drinkTime };
    drinkHistory.push(drink);

    // Добавляем запись в историю питья с форматированной датой и временем
    const li = document.createElement('li');
    li.innerText = `Выпито ${amount} мл ${formattedDate}`;
    history.appendChild(li);

    form.reset();

    localStorage.setItem('drinkHistory', JSON.stringify(drinkHistory));
});


clearButton.addEventListener('click', () => {
    if (drinkHistory.length > 0) { //проверяем на то что история с данными
        drinkHistory = []; // очищаем массив
        history.innerHTML = ''; // очищаем список на странице
        localStorage.removeItem('drinkHistory'); // удаляем данные из localstorage
    }
});

function init() {
    if (localStorage.getItem('drinkHistory')) { //проверяем наличие данных в localstorage
        drinkHistory = JSON.parse(localStorage.getItem('drinkHistory')); //сохраняем данные в localstorage

        // Выводим сохраненные данные на страницу
        drinkHistory.forEach(drink => {
            const li = document.createElement('li');
            li.innerText = `Выпито ${drink.amount} мл в ${drink.time}`;
            history.appendChild(li);
        });
    }
}

init();

function calculateWaterIntake() {
    const weight = weightInput.value;
    const activityLevel = activityLevelInput.value;
    const waterIntake = (weight * 0.04) + (activityLevel * 0.5)

    result.innerHTML = "Норма питья воды в день: " + waterIntake.toFixed(2) + " л";
}
var myVarValue = localStorage.getItem("myVarValue");

// Создаем новый объект myVar с сохраненным значением свойства value
var myVar = new Object();
myVar.value = myVarValue;

// Выводим значение свойства value объекта myVar внутри элемента с id "myVarSpan"
document.getElementById("myVarSpan").innerHTML = myVar.value;
calculateButton.addEventListener('click', calculateWaterIntake);