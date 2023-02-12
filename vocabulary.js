// ____________________
// ЧТО ГДЕ в конце
// ____________________

// ____________________
//  Set
// ____________________
// Set (по-русски говорят множество) — коллекция для хранения уникальных значений 
// любого типа. 
// Одно и то же значение нельзя добавить в Set больше одного раза.

const uniqueIds = new Set()

uniqueIds.add(123)
uniqueIds.add(456)
uniqueIds.add(111)
uniqueIds.add(123) //уже было

console.log("Set exaple: " + uniqueIds.size)
// 3


// ____________________
//  Event
// ____________________        

// Объект Event описывает событие, произошедшее на странице.(MouseEvent, KeyboardEvent)


// ____________________
//  псевдоклассы
// ____________________

// Браузер умеет находить CSS-селекторы и добавлять в них сведения, 
// которые вы в документе не прописывали. Такие сведения называются псевдоклассы,
// то есть «классы, которых как бы нет».
// Браузер определяет их, исходя из своих знаний:
// об HTML-разметке: типе элементов, порядке их расположения, вложенности, языке;
// о действиях пользователя: кликах по ссылкам, заполнении форм, перемещении элемента мышкой.

// если пользователь ещё не посещал ссылку — псевдокласс link;
// уже посещал ссылку —                 visited;
// навёл на элемент указатель мыши —    hover;
// нажал на элемент —                   active.

// nth-of-type(3n) - каждый третий
/* выберет первый или последний элемент */
// first-of-type    last-of-type
/* стили применятся только к секциям, внутри которых есть заголовок второго уровня */
// section:has(h2) {} 
/* выберет все ссылки, по которым пользователь ещё не переходил */
// a:not(:visited) {} 


// ____________________
//  Кроссбраузерность 
// ____________________

// Кроссбраузерность — это одинаковая работа и отображение сайта во всех браузерах. 
// Чтобы проверить, сработает ли инструмент в определённом браузере, существует сайт Can I Use 

// -webkit- // для браузеров на основе движка WebKit https://ru.wikipedia.org/wiki/WebKit
// -moz-    // FireFox
// -o-      // Opera
// -ms-     // для браузеров компании Microsoft 


// ____________________
//  декларативный и императивный стиль программирования
// ____________________

// декларативный стиль программирования отличается от императивного

// императивный. В нём мы фокусируемся 
// на описании последовательности шагов, которые нужно совершить, 
// чтобы достичь результата
{
    const a = [1, 2, 3];
    const b = [];
    for (let i = 0; i < a.length; i += 1) {
        b[i] = a[i] * 2;
    }
}

// Декларативный стиль описывает, чего нужно достичь — не фокусируясь на том, как:
{
    const a = [1, 2, 3];
    const b = a.map(function (item) {
        return item * 2;
    });
}


// ____________________
//  Затенение идентификаторов
// ____________________

// «внутренняя переменная затеняет внешнюю»

function callMeFromTheInside() { //внешняя ф-ция
    console.log('Hello');
}
function callMe() {
    function callMeFromTheInside() { //нашел ф-цию =  Внутренняя функция затенила внешнюю.
        console.log("Затенение идентификаторов: " + 'world');
    }
    callMeFromTheInside(); //ищет функцию от часного к общему
}
callMe(); // "world" 


// ____________________
//  поднятие переменных
// ____________________

// сначала движок найдёт все объявления функций и объявит их;
// затем найдёт все переменные, объявленные через var, объявит их и присвоит каждой значение undefined.
// Объявление функций и переменных через var произойдёт в первую очередь. 
// Это называется «поднятие»
// Переменные, объявленные через const и let, 
// а также функции, созданные через функциональные выражения, не поднимаются.


// ____________________
//  Поверхностное и глубокое копирование
// ____________________

// Поверхностное копирование работает так:
// создаётся новый пустой объект;
// все свойства исходного объекта копируются в новый.
const firstObj = {
    one: 1,
    two: 2,
    three: { message: 'I love JS 🖤' }
};
const secondObj = Object.assign({}, firstObj);
console.log(secondObj === firstObj); // false
console.log(secondObj.three === firstObj.three); // true        
// Копирование произошло, внутренние ссылки скопировались, но ссылка объекта сгенерилась по-новой

// глубокое копирование (нечасто применяется)
const original = {
    one: 1,
    two: 2,
    three: { message: 'I love JS' }
};

const copy = Object.assign({}, original);
copy.three = Object.assign({}, original.three);

// копия
console.log(copy);

// { one: 1, two: 2, three: { message: "I love JS" } } 

// копия имеет общие корни с оригиналом?
console.log(copy === original); // false

// свойство three копии имеет общие корни
// со свойством three оригинала?
console.log(copy.three === original.three); // false 

// ____________________
//  ВСПЛЫТИЕ и делегирование событий
// ____________________

// Подход, в котором слушатель события добавляется не на сам элемент
// (а их может быть тысячи), 
// а на ближайшего общего для множества элементов родителя называется делегированием.
// ----на галлерею, а не на фотки(1000) в ней

// Если событие происходит на элементе, оно срабатывает ещё и на каждом элементе-родителе.
//  Такой механизм называется «всплытие»

function callback(evt) {
    console.log('Событие обработано');
};

parent.addEventListener('click', callback);
firstChild.addEventListener('click', callback);
secondChild.addEventListener('click', callback);
thirdChild.addEventListener('click', callback);
//click на thirdChild -> console.log отработает 4 раза
// событие сработает и на body, html, document и window

// возвращаясь к делегированию.. вышаем 1 слушатель для лайка на галлерею, 
// а не по 1 слушателю на каждую фотку
// Свойство evt.target никак не зависит от того, куда вы повесили обработчик. Куда бы вы ни нажали, 
// в evt.target попадёт самый глубокий элемент DOM-дерева из всех, где сработало событие.

const playlist = document.querySelector('.playlist');

// добавим всему плейлисту обработчик лайка отдельной песни 
playlist.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('song__like')) {
        like(evt.target);
    } // если нажали на «Лайк», то он в evt.target
});

// evt.currentTarget — элемент, где сработал обработчик;
// evt.target — элемент, где возникло событие.

// ОТМЕНА ВСПЛЫТИЯ
evt.stopPropagation(); // cобытие сработало на элементе,но вверх не пойдет

evt.stopImmediatePropagation();
// отменяет не только всплытие событий, 
// но и срабатывание всех других обработчиков того же события на этом элементе.
// консоли до сработают, а те, что стоят после этой команды в коде, нет

credit.addEventListener('click', function (event) {
    console.log('Одолжил 100 рублей');  //да
    console.log('Взял микрозайм');      //да
    event.stopImmediatePropagation();
    console.log('Продал квартиру');     //нет
});


// ____________________
//  Инкапсуляция
// ____________________

// инкапсуляция — когда внутренняя реализация устройства скрыта от внешнего мира.
// Пользователю просто и удобно управлять таким гаджетом: вся его сложность спрятана «под капотом».


// ____________________
//  Наследование
// ____________________

// Наследование в ООП — это возможность создать класс на основе других классов.
// в родительском классе общие данные и функциональность, а уникальные фичи унаследуются в дочерних.

// ____________________
//  ПОЛИМОРФИЗМ
// ____________________

// Возможность объектов с одинаковым интерфейсом иметь разную реализацию — это и есть полиморфизм.
// Наример, когда основной метод написан в родителе, а в ребенке пишется super() и дописывается доп функционал

// Мы сделали перегрузку метода — расширение функциональности родительского класса в наследнике.


// _____________________
// Пост и Пре процессоры
// _____________________

// SASS написан на руби(язык) => синтаксис

// $base-width: 260px           --объявление переменной
// .container
//     width: $base-width
// ...
//      width: calc(100% - #{$base-width})

// SCSS (синтаксис чуть другой)

// $base-width: 260px;            --объявление переменной
// .container{
//     width: $base-width;
// }
// ...
//      width: calc(100% - #{$base-width});

// LESS

// @base-width: 260px;           --объявление переменной
// .container{
//     width: @base-width;
// }
// ...
//      width: ~"calc(100% - @{base-width})";


// Механизм работы- все стили пишутся на языке препроцессора, обрабатывается парсером,
// он создает необходимые переменные функции и тд и на выходе выдает css файл

// ____________________
// МИКСИНЫ

// стили, которые хочется вынести для нескольких блоков

// @mixin large-text($size) {    ------->      .page-title {
//  font: {                                          @include large-text(64px);
//     family: Arial;                          }
//     size: $size;
//  }
//  color: #000
// }


// ____________________
// Постпроцессор

// СSS -> парсер -> CSS
// персер обрабатывает css дерево, образует ast дерево, которое потом обрабатывает JS

// PostCSS

// -контроль браузерной поддержки
// -вендорные префиксы
// -меняет дизайн для разных языков (для иврита например , который пишется справа налево)

// .link {
//     left: 10px;
//     text-align: left;
// }




// ____________________
//  IIFE
// ____________________

// спринт 8

// __________________________________________________________________________________ //
//                                    ЧТО ГДЕ                                         //
// __________________________________________________________________________________ //

// ЧТО                                  ГДЕ
// ------------------------         -----------
// коллекция Set                        5
// Объект события Event                 24
// псевдокласс                          31
// Кроссбраузерность                    56
// декларативный и императивный         69
// Затенение идентификаторов            95
// поднятие переменных                  113
// Поверхностное и глубокое копирование 125
// Всплытие и делегирование событий     164
// Инкапсуляция                         220
// Наследование                         228
// Полиморфизм                          234
// Пост и Пре процессоры (миксин)       244
// IIFE      (8спринт)                  246


