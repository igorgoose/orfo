let mainHtml = ` 
    
<button id="floating-button-top">^ наверх ^</button>
<button id="floating-button-pr"> ← ошибка </button>
<button id="floating-button-sl"> ошибка → </button>

<p id="obr" align="center">
  Статус проверки</p>
<div align="center" id="progress"><label align="center" for="progress"></label><progress max="100"
    value="1">1%</progress>
</div>

<p id="zag" style="text-align: center"><span>Проверяемый
      текст &nbsp;
    </span><input id="paste-button" class="button" type="button" value="Вставить из буфера обмена (Ctrl+V)"> &nbsp <input id="clrProv" class="button" type="button" value="Очистить текст">

</p>

<p style="text-align: center">

  <textarea id="provText" rows="10" style="width: 90%; height: 123px"></textarea>
  <br>
</p>

<p align="center">
  <span class="block"><input id="podtvOsh" type="checkbox">подтверждение ошибок</input></span>

  <input id="goProv" class="button" type="button" value="Начать проверку">
  <input id="stProv" class="button" type="button" value="Завершить">

</p>
<p align="center">
  <br>
</p>
<p></p>
<p align="center"></p>
<p></p>
<hr>

<p align="center">Результаты проверки текста &nbsp; &nbsp<input id="clrItog" class="button"
    type="button" value="Очистить"></p>

    <p align="center">Скопировать в буфер результаты:</p>
    
    <p align="center">&nbsp<input id="goBuf" class="button" type="button" value="с выделением ошибок цветом">&nbsp<input id="goBuf3" class="button" type="button" value="с выделением ошибок знаками">&nbsp;</p>
  
  <p align="center"></p>
  



<div align="center"></div>


<p align="center">включить в отчет:

<div align="center">
  <span class="block"><input id="vklSl" type="checkbox">слова с ошибками</input></span>
  <span class="block"><input id="vklFr" type="checkbox" >абзацы с ошибками</input></span>
  <span class="block"><input id="vklIspr" type="checkbox" >возможные исправления</input></span>
  <span class="block"><input id="vklTxt" type="checkbox" >весь текст</input></span>
</div>
<br>
</p>



<hr>
</p>
<table id="rezTable" style="height: 0px" ></table>

    <br>
    
    <hr>
    <p style="text-align: center">
  <strong><span>
      <textarea id="ProvItog" rows="10" style="width: 90%; height: 0px" ></textarea></span></strong>
</p>
<p><br> </p>
    <textarea id="dlBlok" rows="10" style="width: 50px; height: 15px; display: none"></textarea>
        `;

//alert(mainHtml)

let style = document.createElement("style");
style.innerHTML = `body {
      font-family: Arial;
      font-size: 12pt;

    }

    span {
      font-size: 12pt;
    }

    input {
      margin-top: 0.25em;
      font-size: 12pt;
    }

    p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
      font-size: 12pt;
    }

    textarea {
      background-color: #dcdcdc;
      font-size: 12pt;
      width: 90%;
      border-radius: 4px;
    }

    table {
      border: 0;
      margin: auto;
      background-color: #dcdcdc;
      width: 90%;
      border-spacing: 10px;
      white-space: pre-wrap;
      font-size: 14pt;
      border-radius: 4px;
    }

    th,
    td {
      background-color: #dcdcdc;
      white-space: pre-wrap;
      font-size: 14pt;
    }

    .add_palitra {
      display: block;
      width: 80px;
      height: 150px;
      position: fixed;
      right: 0;
      top: 200px;
      z-index: 99999;
    }

    @media screen and (max-width: 480px) {
      .add_palitra {
        top: 100px !important;
      }
    }

    
    #floating-button-top {
      visibility: hidden;
      width: 180px;
      margin: auto;
      position: fixed;
      z-index: 100;
      bottom: 120px;
      vertical-align: top;
      background-color: #a52a2a;
      color: white;
      border: none;
      padding: 4px 8px;
      text-align: center;
      text-decoration: none;
      font-size: 16px;
      border-radius: 4px;
      cursor: pointer;
    }

    #floating-button-top:hover {
      background-color: #ff7961;
    }
    
    #floating-button-pr {
      visibility: hidden;
      margin: auto;
      width: 180px;
      position: fixed;
      z-index: 100;
      bottom: 90px;
      vertical-align: top;
      background-color: #f44336;
      color: white;
      border: none;
      padding: 4px 8px;
      text-align: center;
      text-decoration: none;
      font-size: 16px;
      border-radius: 4px;
      cursor: pointer;
    }

    #floating-button-pr:hover {
      background-color: #ff7961;
    }

    #floating-button-sl {
      position: fixed;
      width: 180px;
      margin: auto;
      visibility: hidden;
      z-index: 100;
      bottom: 60px;
      vertical-align: top;
      background-color: #f44336;
      color: white;
      border: none;
      padding: 4px 8px;
      text-align: center;
      text-decoration: none;
      font-size: 16px;
      border-radius: 4px;
      cursor: pointer;
      
    }

    #floating-button-sl:hover {
      background-color: #ff7961;
    }


    .button {

      
      transition: all .3s;
      font-size: 12pt;
      border-radius: 1rem;
    }

    .button:hover {
      background-color: #0075ff;

      color: #ffffff;
      border-color: #ffffff;
    }

    .button:disabled {
      opacity: 70;
      pointer-events: none;
    }

    .button:active {
      background-color: #0d529c;
      box-shadow: 0 5px #666;
      transform: translateY(4px);
    }

    .block {
      border-radius: 1rem;
      background-color: #dcdcdc;
      border-color: #000000;
      transition: all .3s;
      font-family: Arial;
      border-spacing: 10px;
      padding: 2px 7px 2px 7px;
      border-width: 6px;
      box-shadow: 0 1px #666;
      margin: 0px 5px 0px 5px;
      line-height: 33px;
      white-space: nowrap;
      font-size: 12pt;


    }`;
document.head.appendChild(style);


div1.insertAdjacentHTML("beforebegin", mainHtml);

const pasteButton = document.querySelector("#paste-button");
const provText = document.querySelector("#provText");
const goProv = document.querySelector("#goProv");
const stProv = document.querySelector("#stProv");
const clrProv = document.querySelector("#clrProv");
const clrItog = document.querySelector("#clrItog");
const ProvItog = document.querySelector("#ProvItog");
const obrZa = document.querySelector("#obr");
const dlBlok = document.querySelector("#dlBlok");
const podtvOsh = document.querySelector("#podtvOsh");
const copyRezProv = document.querySelector("#copyRezProv");
const vstavProv = document.querySelector("#vstavProv");
const vklSl = document.querySelector("#vklSl");
const vklFr = document.querySelector("#vklFr");
const vklIspr = document.querySelector("#vklIspr");
const vklTxt = document.querySelector("#vklTxt");
const rezTable = document.querySelector("#rezTable");
const rezDiv = document.querySelector("#rezDiv");
const goBuf = document.querySelector("#goBuf");
const goBuf2 = document.querySelector("#goBuf2");
const goBuf3 = document.querySelector("#goBuf3");

const end = performance.now();
const rT = rezTable;
const blokArr = [], blokArr2 = [], osh = [], blokTxts = [];


let txtItogSlova, txtItogFr, txtItogFr2, txtItogVes, txtItogVesT,
    txtItogVes2, txtItogVesT2, k, offset, bl, tekS;

tekS = 0;

let res = [], sortedRes = [], oshSpec = [], tItxtTabFr = [], tItxtTabFr2 = [],
    tItxtTabVes = [], tItxtTabVes2 = [];

dlBlok.value = 900;


function set2Sel(sel) {
    var element = document.getElementById(sel);

    // создание выделения
    var range = document.createRange();
    range.selectNode(element);

    // удаление текущего выделения на странице
    window.getSelection().removeAllRanges();

    // выделение объекта
    window.getSelection().addRange(range);

    window.getSelection().addRange(range);

    document.execCommand("copy");

}


function shuffle(array) {
    let m = array.length,
        t,
        i;

    // Пока есть элементы для перемешивания
    while (m) {
        // Взять оставшийся элемент
        i = Math.floor(Math.random() * m--);

        // И поменять его местами с текущим элементом
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

function pasteFromClipboard(elementId) {
    // Создаем временный input элемент
    var aux = document.createElement("input");
    // Добавляем его на страницу
    document.body.appendChild(aux);
    // Вызываем команду вставки из буфера обмена
    aux.select();
    document.execCommand("paste");
    // Получаем текст из временного элемента
    var pastedText = aux.value;
    // Удаляем временный элемент
    document.body.removeChild(aux);

    // Вставляем полученный текст в указанное поле
    document.getElementById(elementId).value = pastedText;
}


async function addExclusions(exclusions) {
    const response = await fetch('https://test.cleandoc.tech/api/exclusions', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        credentials: 'include',
        body: JSON.stringify({"words": exclusions})
    });

    if (!response.ok) {
        alert("Ошибка при сохранении исключения")
    }
}


async function fetchTopFive(sub, nBlok) {
    const response = await fetch('https://test.cleandoc.tech/api/speller/check',
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "X-Api-Key": localStorage.getItem("key")

            },
            body: JSON.stringify({text: sub})

        });


    if (response.status === 401) {
        localStorage.removeItem("key");


        if (!key) {

            let key2 = prompt("Введите ключ")

            localStorage.setItem("key", key2)

        }


    } else {
        if (response.status < 200 && response.status > 299) {
            alert("Сервис недоступен! Осуществите проверку позже!")
        }
    }

    const jsonData = await response.json();

    if (jsonData.length > 0) {
        for (k = 0; k < jsonData.length; k++) {
            if (jsonData[k].word.length > 0) {
                res.push({
                    pos: nBlok + jsonData[k].pos,
                    word: jsonData[k].word,
                    options: jsonData[k].suggestions[0],
                });
            }
        }
    }
}


if (localStorage.getItem("podtvOsh_St") === 'true') {
    podtvOsh.checked = true
}
if (localStorage.getItem("podtvOsh_St") === 'false') {
    podtvOsh.checked = false
}

if (localStorage.getItem("vklSl_St") === 'true') {
    vklSl.checked = true
}
if (localStorage.getItem("vklSl_St") === 'false') {
    vklSl.checked = false
}

if (localStorage.getItem("vklFr_St") === 'true') {
    vklFr.checked = true
}
if (localStorage.getItem("vklFr_St") === 'false') {
    vklFr.checked = false
}

if (localStorage.getItem("vklIspr_St") === 'true') {
    vklIspr.checked = true
}
if (localStorage.getItem("vklIspr_St") === 'false') {
    vklIspr.checked = false
}

if (localStorage.getItem("vklTxt_St") === 'true') {
    vklTxt.checked = true
}
if (localStorage.getItem("vklTxt_St") === 'false') {
    vklTxt.checked = false
}

if (vklFr.checked === false && vklTxt.checked === false) {
    vklTxt.checked = true
}


provText.value = localStorage.getItem("provText_St")

///console.log(localStorage.getItem("podtvOsh_St"))
///console.log(localStorage.getItem("vklSl_St"))
///console.log(localStorage.getItem("vklFr_St"))
///console.log(localStorage.getItem("vklIspr_St"))
///console.log(localStorage.getItem("vklTxt_St"))

rT.style.visibility =
    "hidden";

ProvItog.style.visibility =
    "hidden";


rT.style.height = "0px"

ProvItog.style.height = "0px"


goProv.onclick = async () => {

    let key = localStorage.getItem("key")

    if (!key) {

        let key2 = prompt("Введите ключ")

        localStorage.setItem("key", key2)

    }


    document.getElementById("floating-button-top").style.visibility =
        "hidden";
    document.getElementById("floating-button-sl").style.visibility =
        "hidden";
    document.getElementById("floating-button-pr").style.visibility =
        "hidden";

    //  document.getElementById('goProv').style.visibility = 'hidden';
    document.getElementById("goProv").disabled = true;

    let perT = []
    perT = [' г', ' т.д', ' т.п', ' долл', ' руб', ' тыс', ' с', ' сек',
        ' м', ' мин', ' кг', ' тн', ' мм', ' т. д', ' т. п', ' Ф.И.О',
        ' Ф. И. О', ' млн', ' млрд', ' авт. л', ' вв', ' в', ' гг', ' др']

    txtItogSlova = "";
    txtItogFr = "";
    txtItogFr2 = "";
    txtItogVes = "";
    txtItogVes2 = "";

    txtTabFr = "";
    txtTabFr2 = "";
    txtTabVes = "";
    txtTabVes2 = "";

    tItxtTabFr.length = 0;
    tItxtTabFr2.length = 0;
    tItxtTabVes.length = 0;
    tItxtTabVes2.length = 0;

    let eKurs = 0;

    res.length = 0;
    sortedRes.length = 0;
    rezTable.innerHTML = "<p></p>";

    blokArr.length = 0;
    blokArr2.length = 0;
    osh.length = 0;
    blokTxts.length = 0;

    rT.innerHTML = "<p></p>";

    const start = performance.now();
    let inp = provText.value;


    repl = [["…", " . "], ["...", " . "], ['\'', " "],
        ['\«', " "], ['\»', " "], ['\"', " "], ["  ", " "], ["  ", " "]];

    //["/", "/ "],
    //["&", "& "],
    //["%", "% "],
    //["=", "= "],
    //["-", "- "],


    for (k = 0; k < repl.length; k++) {

        inp = inp.replaceAll(repl[k][0], repl[k][1]);

    }
    ;

    let inp2 = inp.replaceAll(" ", '\n')

    localStorage.setItem("provText_St", provText.value)

    inp = inp + "  "

    let inpDl = inp.length;

    let ref = inp.replaceAll(" ", '').toLowerCase()

    //alert(ref)

    if (
        ref.indexOf("\n" + "курсоваяработа" + "\n") > 0 ||
        ref.indexOf("\n" + "дипломнаяработа" + "\n") > 0 ||
        ref.indexOf("\n" + "реферат" + "\n") > 0
    ) {
        eKurs = 1;
        ref = '';


        async function loadData() {

            return fetch(`https://test.cleandoc.tech/api/alternative-data/Oshibki`);
        }

        async function showData() {
            const response = await loadData();
            if (response.status === 404) {
                alert("Запись не найдена");
                return;
            }

            const recordData = await response.json();
            const rawDataDiv = JSON.stringify(recordData);
            const dataDiv = recordData.data;
            alert(dataDiv)
        }

        showData(params)

        oshSpec = [['\n' + 'кафедра государственного управления' + '\n', 'Кафедра государственной экономической политики', 0, 1000,],
            ['\n' + 'кафедра государственного управления' + '\n', 'Кафедра государственной экономической политики', 0, 1000],
            ['\n' + 'кафедра  государственного управления' + '\n', 'Кафедра государственной экономической политики', 0, 1000],
            ['\n' + 'кафедра государственного  управления' + '\n', 'Кафедра государственной экономической политики', , 0, 1000],
            ['\n' + 'Кафедра государственного управления' + '\n', 'Кафедра государственной экономической политики', 0, 1000],
            ['\n' + 'КАФЕДРА ГОСУДАРСТВЕННОГО УПРАВЛЕНИЯ' + '\n', 'Кафедра государственной экономической политики', 0, 1000],
            ['\n' + 'ИНСТИТУТ ГОСУДАРСТВЕННОЙ СЛУЖБЫ' + '\n', 'Институт государственной службы', 0, 1000],
            ['\n' + 'Факультет', 'в ИГС нет факультета', 0, 1000],
            ['\n' + 'ФАКУЛЬТЕТ', 'в ИГС нет факультета', 0, 1000],
            ['\n' + 'факультет', 'в ИГС нет факультета', 0, 1000],
            ['\n' + 'кафедра государственной экономической политики' + '\n', 'Кафедра государственной экономической политики', 0, 1000],
            ['Кандидат', 'кандидат', 0, 1000],
            ['Слушатель', 'Обучающийся', 0, 1000],
            ['слушатель', 'Обучающийся', 0, 1000],
            ['Доктор', 'доктор', 0, 1000],
            ['К.э.н.', 'кандидат экономических наук', 0, 1000],
            ['Д.э.н.', 'доктор экономических наук', 0, 1000],
            ['к.э.н.', 'кандидат экономических наук', 0, 1000],
            ['д.э.н.', 'доктор экономических наук', 0, 1000],
            ['РЕФЕРАТ', 'Реферат исключен из структуры дипломной работы', 0, 3000],
            ['Реферат', 'Реферат исключен из структуры дипломной работы', 0, 3000],
            ['Обзор', 'Обзор литературных источников исключен из структуры дипломной работы', 0, 5000],
            ['ОБЗОР', 'Обзор литературных источников исключен из структуры дипломной работы', 0, 5000],
            ['список использованной литературы', 'СПИСОК ИСПОЛЬЗОВАННЫХ ИСТОЧНИКОВ', 0, inpDl],
            ['Список использованной литературы', 'СПИСОК ИСПОЛЬЗОВАННЫХ ИСТОЧНИКОВ', 0, inpDl],
            ['СПИСОК ИСПОЛЬЗОВАННО ЛИТЕРАТУРЫ', 'СПИСОК ИСПОЛЬЗОВАННЫХ ИСТОЧНИКОВ', 0, inpDl],
            ['Глава 1', 'ГЛАВА 1 - проверить форматирование', 0, inpDl],
            ['Глава 2', 'ГЛАВА 2 - проверить форматирование', 0, inpDl],
            ['Глава 3', 'ГЛАВА 3 - проверить форматирование', 0, inpDl],
            ['ГЛАВА 1.', 'после номера главы точка не ставится', 0, inpDl],
            ['ГЛАВА 2.', 'после номера главы точка не ставится', 0, inpDl],
            ['ГЛАВА 3.', 'после номера главы точка не ставится', 0, inpDl],
            ['Глава 1.', 'ГЛАВА - прописными, после номера главы точка не ставится', 0, inpDl],
            ['Глава 2.', 'ГЛАВА - прописными, после номера главы точка не ставится', 0, inpDl],
            ['Глава 3.', 'ГЛАВА - прописными, после номера главы точка не ставится', 0, inpDl],
            ['Введение', 'ВВЕДЕНИЕ - проверить форматирование', 0, 4000],
            ['Заключение', 'ЗАКЛЮЧЕНИЕ - проверить форматирование', 0, inpDl],
            ['\n' + 'Минск, 2022', 'Минск 2024', 0, inpDl],
            ['\n' + 'Минск 2022', 'Минск 2024', 0, inpDl],
            ['\n' + 'Минск, 2023', 'Минск 2024', 0, inpDl],
            ['\n' + 'курсовая работа', 'КУРСОВАЯ РАБОТА', 0, inpDl],
            ['\n' + 'Курсовая работа', 'КУРСОВАЯ РАБОТА', 0, inpDl],
            ['\n' + 'дипломная работа', 'ДИПЛОМНАЯ РАБОТА', 0, inpDl],
            ['\n' + 'Дипломная работа', 'ДИПЛОМНАЯ РАБОТА', 0, inpDl],
            ['1курс', '1 курс', 0, inpDl],
            ['2курс', '2 курс', 0, inpDl],
            ['Государственное управление национальной экономики', 'Государственное управление национальной экономикой', 0, inpDl],
            ['Государственное регулирование национальной экономикой', 'Государственное регулирование национальной экономики', 0, inpDl],
            ['1 - 26 01 72', '1 - 26 01 73?', 0, inpDl],
            ['1-26 01 72', '1-26 01 73?', 0, inpDl],
            ['.[', 'возможно неверное расположение квадратных скобок (правильно перед точкой, обозначающей конец предложения)', 0, inpDl],
            ['. [', 'возможно неверное расположение квадратных скобок (правильно перед точкой, обозначающей конец предложения)', 0, inpDl],
            ['Приложения', 'ПРИЛОЖЕНИЯ', 0, inpDl]];


    }

    // alert(eKurs)
    ProvItog.value = "";


    if (inpDl < 300000) {
        blokDl = inpDl
    } else {
        blokDl = 100000
    }
    blokDl = inpDl


    let pozTek = inpDl > blokDl ? blokDl - 1 : inpDl - 1;
    let i = pozTek;

    blokArr[0] = 0;

    do {
        pozTek = i;
        pozTek = 1 + inp.lastIndexOf(" ", pozTek);

        blokArr[blokArr.length] = pozTek;

        i = inpDl > pozTek ? i + blokDl : inpDl;

        const endRb = performance.now();

        let perC = ((pozTek / inpDl) * 100).toFixed(1);

        perC ?? 0;

        if (perC > 100) {
            perC = 100;
        }

        if (perC === NaN) {
            perC = 0;
        }


        //alert(perC)

        obrZa.textContent =
            "Время обработки (разбиение блоков - " +
            (endRb / 1000 - start / 1000).toFixed(2) +
            " cек, " +
            perC +
            "%. ";
    } while (i < inpDl);

    blokArr[blokArr.length] = inpDl;

    for (j = 0; j < blokArr.length - 1; j++) {
        blokArr2[j] = [blokArr[j], blokArr[j + 1] - 1];
    }

    console.log(blokArr);
    console.log(blokArr2);

    let blokArr4 = shuffle(blokArr2);
    ////console.log(blokArr4)

    bl = blokArr4.length;

    iN = 0;


    if (eKurs === 1 && oshSpec.length > 0) {


        for (k = 0; k < oshSpec.length; k++) {
            /// alert (k + ' ' + oshSpec.length + ' ' + oshSpec[k][0])
            ///      searchAllOccurrences(inp, oshSpec[k][0], oshSpec[k][1], oshSpec[k][2], oshSpec[k][3]);
            let sk = 0
            let posOsh = 0;

            /// posOsh = inp.indexOf(oshSpec[k][0]);

            while (posOsh !== -1) {
                sk = 0
                posOsh = inp.indexOf(oshSpec[k][0], posOsh + oshSpec[k][0].length);

                // alert('Индекс ошибки - ' + k + ' Ошибочное значение - ' + oshSpec[k][0] + ' ' + 'Позиция ошибки - ' + posOsh)


                if (((oshSpec[k][0] === '. [') || (oshSpec[k][0] === '.[')) && posOsh > 0) {

                    let subT = inp.substring(inp.lastIndexOf(" ", posOsh), posOsh)
                    //alert('Индекс ошибки - ' + k + ' Ошибочное значение - ' + oshSpec[k][0] + ' ' + 'Позиция ошибки - ' + posOsh + ' SubT - ' + subT  )

                    if (perT.includes(subT)) {
                        sk = 1
                    }
                    subT = ''
                }

                if (posOsh > (oshSpec[k][2] - 1) && sk == 0 && posOsh < (oshSpec[k][3] + 1)) {


                    let word = oshSpec[k][0];

                    //// alert('Индекс ошибки - ' + k + ' Ошибочное значение - ' + oshSpec[k][0] + ' ' + ' Позиция ошибки - ' + posOsh + ' oshSpec[k][2] - ' + oshSpec[k][1] + ' oshSpec[k][3] - ' + oshSpec[k][3])

                    res.push({
                        pos: posOsh,
                        word: word,
                        options: oshSpec[k][1],
                    });
                }
            }
        }
    }


    let iN;
    do {
        let blokTxt = inp.substring(blokArr4[iN][0], blokArr4[iN][1]);
        let blokTxt3 = inp2.substring(blokArr4[iN][0], blokArr4[iN][1])

        console.log(
            "Начало блока - " +
            blokArr2[iN][0] +
            1 +
            " Конец блока - " +
            blokArr2[iN][1] +
            "\n" +
            "Текст блока:" +
            "\n" +
            blokTxt
        );

        offset = blokArr4[iN][0];

        if (blokTxt.length > 0) {
            try {
                await fetchTopFive(blokTxt, offset);
                await fetchTopFive(blokTxt3, offset);
            } catch (error) {
            }
        }


        iN = iN + 1;

        const endZ = performance.now();

        let perC = ((iN / blokArr2.length) * 100).toFixed(1);
        if (perC > 100) {
            perC = 100;
        }

        if (perC === NaN) {
            perC = 0;
        }

        // alert(perC)

        obrZa.textContent =
            "Время обработки (запросы) -  " +
            (endZ / 1000 - start / 1000).toFixed(2) +
            " cек, " +
            perC +
            "%. ";
        progress.innerHTML =
            '<label align="center" for="progress"></label><progress  max="100" value="' +
            ((iN / blokArr2.length) * 100).toFixed(0) +
            '">' +
            ((iN / blokArr2.length) * 100).toFixed(0) +
            "%" +
            "</progress>";
    } while (iN < blokArr4.length);


    //console.log(res);


    sortedRes = res.sort(function (a, b) {
        return a.pos - b.pos;
    });

    for (j = 0; j < sortedRes.length - 1;) {
        if (
            sortedRes[j].pos === sortedRes[j + 1].pos &&
            sortedRes[j].word === sortedRes[j + 1].word
        ) {
            sortedRes.splice(j, 1);
        } else {
            j = j + 1;
        }
    }


    document.getElementById("goProv").disabled = false;
    console.log(sortedRes);

    if (podtvOsh.checked) {
        for (j = 0; j < sortedRes.length;) {

            sw = sortedRes[j].word

            if (
                window.confirm(
                    "Является ли выражение ошибкой (эл.№" +
                    "  " +
                    j +
                    " из " +
                    sortedRes.length +
                    "): " +
                    "\n" +
                    "\n" +
                    "[......" +
                    inp.substring(sortedRes[j].pos - 50, sortedRes[j].pos) +
                    "\n" +
                    " << " +
                    sortedRes[j].word +
                    " >> " +
                    inp.substring(
                        sortedRes[j].pos + sortedRes[j].word.length,
                        sortedRes[j].pos + sortedRes[j].word.length + 50
                    ) +
                    "......]" +
                    "\n" +
                    "\n" +
                    "возможное верное написание -  (" +
                    sortedRes[j].options +
                    ")"
                )
            ) {
                j = j + 1;
            } else {
                if (
                    window.confirm("Не считать ошибками все аналогичные фразы по всему тексту (добавить в словарь неошибок): " +
                        "\n" + "\n" + " << " + sortedRes[j].word + " >> ")

                ) {
                    for (ff = j; ff < sortedRes.length;) {
                        if (sw === sortedRes[ff].word) {
                            sortedRes.splice(ff, 1);
                            await addExclusions([sw])
                        } else {
                            ff = ff + 1
                        }
                    }
                } else {
                    sortedRes.splice(j, 1)
                }
            }
        }
    }

    console.log("массив после проверки ");
    console.log(sortedRes);

    if (sortedRes.length < 1) {
        ProvItog.value = "Ошибки не найдены!";
        alert("Ошибки не найдены!")

        rT.style.visibility =
            "hidden";

        ProvItog.style.visibility =
            "hidden";


        rT.style.height = "0px"

        ProvItog.style.height = "0px"


        document.getElementById("floating-button-top").style.visibility =
            "hidden";
        document.getElementById("floating-button-sl").style.visibility =
            "hidden";
        document.getElementById("floating-button-pr").style.visibility =
            "hidden";
    } else {

        rT.style.visibility =
            "visible";

        rT.style.height = "150px"

        rT.style.fontsize = "14pt"

        ProvItog.style.visibility =
            "visible";

        ProvItog.style.height = "150px"
        ProvItog.style.fontsize = "14pt"


        if (vklTxt.checked) {
            document.getElementById("floating-button-top").style.visibility =
                "visible";
            document.getElementById("floating-button-sl").style.visibility =
                "visible";
            document.getElementById("floating-button-pr").style.visibility =
                "visible";
        } else {
            document.getElementById("floating-button-top").style.visibility =
                "hidden";
            document.getElementById("floating-button-sl").style.visibility =
                "hidden";
            document.getElementById("floating-button-pr").style.visibility =
                "hidden";
        }


        txtItogSlova =
            "РЕЗУЛЬТАТЫ ПРОВЕРКИ ТЕКСТА:" +
            "\n" +
            "Слова с ошибками (номер позиции, слово с ошибкой, (возможные варианты написания)):" +
            "\n" +
            "= = = = = = = =" +
            "\n";

        txtItogSlova += sortedRes
            .map((value) => `${value.pos} ${value.word} (${value.options})`)
            .join("\n");

        // конец блока обработки слов // начало блока обработки фраз

        function frazaOsh(j) {
            let posDo = 0;
            let posPosle = 0;
            let posRasDo = 70;
            let posRasPosle = 70;
            let frDo;
            let frPosle;

            if (j === sortedRes.length - 1) {
                frPosle = inp.substring(
                    sortedRes[j].pos + sortedRes[j].word.length,
                    inp.length - 1
                );
                let t;
                let t1 = frPosle.indexOf(". ", 0);
                let t2 = frPosle.indexOf("? ", 0);
                let t3 = frPosle.indexOf("! ", 0);
                let t4 = frPosle.indexOf("\n", 0);

                t = t1 < t2 && t1 > 0 && t2 > 0 ? t1 : t2;
                t = t3 < t && t3 > 0 && t > 0 ? t3 : t;
                t = t4 < t && t4 > 0 && t > 0 ? t4 : t;

                posRasPosle = t > 0 && t < 71 ? t : 70;

                posRasPosle =
                    posRasPosle > 70 || posRasPosle < 1 ? 70 : posRasPosle;
                posPosle =
                    sortedRes[j].pos + sortedRes[j].word.length + posRasPosle <
                    inp.length - 1
                        ? sortedRes[j].pos + sortedRes[j].word.length + posRasPosle
                        : inp.length - 1;
            } else {
                frPosle = inp.substring(
                    sortedRes[j].pos + sortedRes[j].word.length,
                    sortedRes[j + 1].pos
                );

                t1 = frPosle.indexOf(". ", 0);
                t2 = frPosle.indexOf("? ", 0);
                t3 = frPosle.indexOf("! ", 0);
                t4 = frPosle.indexOf("\n", 0);

                t = t1 < t2 && t1 > 0 && t2 > 0 ? t1 : t2;
                t = t3 < t && t3 > 0 && t > 0 ? t3 : t;
                t = t4 < t && t4 > 0 && t > 0 ? t4 : t;

                posRasPosle = t > 0 && t < 71 ? t : 70;

                ///alert (posRasPosle)

                posRasPosle =
                    posRasPosle > 70 || posRasPosle < 1 ? 70 : posRasPosle;
                posPosle =
                    sortedRes[j + 1].pos -
                    (sortedRes[j].pos + sortedRes[j].word.length) >
                    posRasPosle
                        ? posRasPosle + (sortedRes[j].pos + sortedRes[j].word.length)
                        : sortedRes[j + 1].pos - 1;
            }

            if (j === 0) {
                frDo = inp.substring(0, sortedRes[j].pos);
                posRasDo = Math.max(
                    frDo.lastIndexOf(". ", frDo.length - 1),
                    frDo.lastIndexOf("? ", frDo.length - 1),

                    frDo.lastIndexOf("! ", frDo.length - 1),
                    frDo.lastIndexOf("\n", frDo.length - 1)
                );

                posRasDo =
                    sortedRes[j].pos - posRasDo > 70
                        ? 70
                        : sortedRes[j].pos - posRasDo;

                posDo =
                    sortedRes[j].pos > posRasDo ? sortedRes[j].pos - posRasDo : 0;

                //alert (j + " " +  posRasDo)
            } else {
                frDo = inp.substring(
                    sortedRes[j - 1].pos + sortedRes[j - 1].word.length,
                    sortedRes[j].pos
                );
                posRasDo = Math.max(
                    frDo.lastIndexOf(". ", frDo.length - 1),
                    frDo.lastIndexOf("? ", frDo.length - 1),
                    frDo.lastIndexOf("! ", frDo.length - 1),
                    frDo.lastIndexOf("\n", frDo.length - 1)
                );

                //alert (j + " " +  posRasDo)

                posRasDo =
                    frDo.length - 1 - posRasDo > 70
                        ? 70
                        : frDo.length - 1 - posRasDo;

                posDo =
                    sortedRes[j].pos -
                    (sortedRes[j - 1].pos + sortedRes[j - 1].word.length) >
                    posRasDo
                        ? sortedRes[j].pos - posRasDo
                        : sortedRes[j - 1].pos + sortedRes[j - 1].word.length + 1;
            }
            return (frazaO = [
                "[" +
                sortedRes[j].pos +
                "......" +
                inp.substring(posDo, sortedRes[j].pos) +
                " ^^" +
                sortedRes[j].word +
                "^^" +
                inp.substring(
                    sortedRes[j].pos + sortedRes[j].word.length,
                    posPosle
                ) +
                "......]" +
                "\n",
                "[" +
                sortedRes[j].pos +
                "......" +
                inp.substring(posDo, sortedRes[j].pos) +
                " ^^" +
                sortedRes[j].word +
                "^^" +
                "(" +
                sortedRes[j].options +
                ")" +
                inp.substring(
                    sortedRes[j].pos + sortedRes[j].word.length,
                    posPosle
                ) +
                "......]" +
                "\n",
                "<P>" +
                "[" +
                sortedRes[j].pos +
                "......" +
                inp.substring(posDo, sortedRes[j].pos) +
                '<font style="background-color:#ffff00;">' +
                sortedRes[j].word +
                "</font>" +
                '<font style="background-color:#ccff99;"></font>' +
                inp.substring(
                    sortedRes[j].pos + sortedRes[j].word.length,
                    posPosle
                ) +
                "......]" +
                "</p>",
                "<P>" +
                "[" +
                sortedRes[j].pos +
                "......" +
                inp.substring(posDo, sortedRes[j].pos) +
                '<font style="background-color:#ffff00;">' +
                sortedRes[j].word +
                "</font>" +
                '<font style="background-color:#ccff99;"> &nbsp (' +
                sortedRes[j].options +
                ")</font>" +
                inp.substring(
                    sortedRes[j].pos + sortedRes[j].word.length,
                    posPosle
                ) +
                "......]" +
                "</p>",
            ]);
        }

        txtItogFr =
            "\n" +
            "\n" +
            "==============================================" +
            "\n" +
            "РЕЗУЛЬТАТЫ ПРОВЕРКИ ТЕКСТА (фразы с ошибками)" +
            "\n" +
            "слова с ошибками заключены в символы ^^....^^: " +
            "\n" +
            "---------------------------------------" +
            "\n";

        txtItogFr2 =
            "\n" +
            "\n" +
            "==============================================" +
            "\n" +
            "РЕЗУЛЬТАТЫ ПРОВЕРКИ ТЕКСТА (фразы с ошибками)" +
            "\n" +
            "слова с ошибками заключены в символы ^^....^^, в скобках - возможные варианты исправления: " +
            "\n" +
            "---------------------------------------" +
            "\n";

        txtItogVes =
            "\n" +
            "\n" +
            "==============================================" +
            "\n" +
            "Текст с выделенными ошибками:" +
            "\n" +
            "---------------------------------------" +
            "\n";
        txtItogVes2 =
            "\n" +
            "\n" +
            "==============================================" +
            "\n" +
            "Текст с выделенными ошибками:" +
            "\n" +
            "---------------------------------------" +
            "\n";

        txtItogVes =
            "\n" +
            "\n" +
            "==============================================" +
            "\n" +
            "Текст с выделенными ошибками:" +
            "\n" +
            "---------------------------------------" +
            "\n";


        txtTabFr =
            "<br><hr><p><b>Фразы с выделенными ошибками</b></p><hr><br>";

        txtTabFr2 =
            "<p><b>Фразы с выделенными ошибками (желтый цвет) и возможным верным написанием (зеленый цвет в скобках):</b></p><hr><br>";

        txtTabVes =
            `<br><hr><p><b><a id='z-1'>Результаты проверки текста<a/></b></p><hr><br></p>`


        txtTabVes2 =
            `<br><hr><p><b><a id='z-1'>Результаты проверки<a/>&nbsp; текста выделены цветом: слова с возможной ошибкой - <span style="background-color:#ffff00">желтым цветом,</span> с предлагаемыми исправлениями - в скобках <span style="background-color:#ccff99"> (светло-зеленым цветом):</b></p><hr><br></p>`

        function wbr(sl) {
            return sl
                .replaceAll("/", "/" + "<wbr>")
                .replaceAll("&", "&" + "<wbr>")
                .replaceAll("=", "=" + "<wbr>")
                .replaceAll("-", "-" + "<wbr>")
                .replaceAll("%", "%" + "<wbr>");
        }

        for (j = 0; j < sortedRes.length; j++) {
            txtItogFr += frazaOsh(j)[0];
            txtItogFr2 += frazaOsh(j)[1];

            txtTabFr += frazaOsh(j)[2];
            txtTabFr2 += frazaOsh(j)[3];
        }

        //let opt = ''
        // opt = vklIspr.checked ? ' (' + sortedRes[0].options + ') ' : '';

        txtItogVes +=
            inp.substring(0, sortedRes[0].pos) +
            " ^^" +
            sortedRes[0].word +
            "^^";
        txtTabVes +=
            wbr(inp.substring(0, sortedRes[0].pos)) +
            '<a id="z' +
            sortedRes[0].pos +
            '"><font style="background-color:#ffff00;">' +
            sortedRes[0].word +
            "</font></a>" +
            '<font style="background-color:#ccff99;"></font>';

        txtItogVes2 +=
            inp.substring(0, sortedRes[0].pos) +
            " ^^" +
            sortedRes[0].word +
            "^^" +
            " (" +
            sortedRes[0].options +
            ") ";
        txtTabVes2 +=
            wbr(inp.substring(0, sortedRes[0].pos)) +
            '<a id="z' +
            sortedRes[0].pos +
            '"><font style="background-color:#ffff00;">' +
            sortedRes[0].word +
            "</font></a>" +
            '<font style="background-color:#ccff99;">' +
            " (" +
            sortedRes[0].options +
            ") " +
            "</font>";

        for (j = 1; j < sortedRes.length; j++) {
            //let opt = ''
            // opt = vklIspr.checked ? ' (' + sortedRes[j].options + ') ' : '';

            txtItogVes +=
                inp.substring(
                    sortedRes[j - 1].pos + sortedRes[j - 1].word.length,
                    sortedRes[j].pos
                ) +
                " ^^" +
                sortedRes[j].word +
                "^^";
            txtTabVes +=
                wbr(
                    inp.substring(
                        sortedRes[j - 1].pos + sortedRes[j - 1].word.length,
                        sortedRes[j].pos
                    )
                ) +
                '<a id="z' +
                sortedRes[j].pos +
                '"><font style="background-color:#ffff00;">' +
                sortedRes[j].word +
                "</font></a>" +
                '<font style="background-color:#ccff99;"></font>';

            txtItogVes2 +=
                inp.substring(
                    sortedRes[j - 1].pos + sortedRes[j - 1].word.length,
                    sortedRes[j].pos
                ) +
                " ^^" +
                sortedRes[j].word +
                "^^" +
                " (" +
                sortedRes[j].options +
                ") ";

            txtTabVes2 +=
                wbr(
                    inp.substring(
                        sortedRes[j - 1].pos + sortedRes[j - 1].word.length,
                        sortedRes[j].pos
                    )
                ) +
                '<a id="z' +
                sortedRes[j].pos +
                '"><font style="background-color:#ffff00;">' +
                sortedRes[j].word +
                "</font></a>" +
                '<font style="background-color:#ccff99;">' +
                " (" +
                sortedRes[j].options +
                ") " +
                "</font>";
        }

        txtItogVes += inp.substring(
            sortedRes[sortedRes.length - 1].pos +
            sortedRes[sortedRes.length - 1].word.length,
            inp.length - 1
        );
        txtTabVes += wbr(
            inp.substring(
                sortedRes[sortedRes.length - 1].pos +
                sortedRes[sortedRes.length - 1].word.length,
                inp.length - 1
            )
        );

        txtItogVes2 += inp.substring(
            sortedRes[sortedRes.length - 1].pos +
            sortedRes[sortedRes.length - 1].word.length,
            inp.length - 1
        );
        txtTabVes2 += wbr(
            inp.substring(
                sortedRes[sortedRes.length - 1].pos +
                sortedRes[sortedRes.length - 1].word.length,
                inp.length - 1
            )
        );

        // ProvItog.value = txtItogSlova + txtItogFr + txtItogVes

        if (vklIspr.checked) {
            ProvItog.value = txtItogSlova + txtItogFr2 + txtItogVes2;
        } else {
            ProvItog.value = txtItogSlova + txtItogFr + txtItogVes;
        }
    } //// конец блока формирования


    tItxtTabFr = txtTabFr.split("\n");
    tItxtTabFr2 = txtTabFr2.split("\n");
    //alert (txtTabVes)
    tItxtTabVes = txtTabVes.split("\n");
    //alert (txtTabVes)
    tItxtTabVes2 = txtTabVes2.split("\n");

    txtTabFr = "";
    txtTabFr2 = "";
    txtTabVes = "";
    txtTabVes2 = "";

    for (j = 0; j < tItxtTabFr.length; j++) {
        txtTabFr += "<p>" + tItxtTabFr[j] + "</p>";
    }

    for (j = 0; j < tItxtTabFr2.length; j++) {
        txtTabFr2 += "<p>" + tItxtTabFr2[j] + "</p>";
    }

    for (j = 0; j < tItxtTabVes.length; j++) {
        txtTabVes += "<p>" + tItxtTabVes[j] + "</p>";

    }

    for (j = 0; j < tItxtTabVes2.length; j++) {
        txtTabVes2 += "<p>" + tItxtTabVes2[j] + "</p>";
    }
    console.log(txtTabVes2);


    rT.innerHTML = "<p>Проверенный текст</p>";

    if (vklIspr.checked) {
        rT.innerHTML = "";

        rT.innerHTML =
            '<div id="rezDiv"  style="align="center"; width: 90%;  white-space: normal;" >' +
            txtTabFr2 +
            txtTabVes2 +
            "</div>";
    } else {
        rT.innerHTML = "";

        rT.innerHTML =
            '<div id="rezDiv"  style="align="center"; width: 90%;  white-space: normal;" >' +
            txtTabFr +
            txtTabVes +
            "</div>";
    }

    // console.log(rezTable);


    const endO = performance.now();
    obrZa.textContent +=
        "Общее время  обработки -  " +
        (endO / 1000 - start / 1000).toFixed(2) +
        " сек.";


    click()

};


clrProv.onclick = () => {
    provText.value = "";

    //document.getElementById("floating-button-top").style.visibility =
    //   "hidden";
    // document.getElementById("floating-button-sl").style.visibility =
    //   "hidden";
    // document.getElementById("floating-button-pr").style.visibility =
    //   "hidden";


};

goBuf.onclick = () => {

    // navigator.clipboard.writeText("");

    set2Sel('rezDiv')


};

goBuf3.onclick = () => {

    // navigator.clipboard.writeText("");

    set2Sel('ProvItog')


};


clrItog.onclick = () => {
    document.getElementById("floating-button-top").style.visibility =
        "hidden";
    document.getElementById("floating-button-sl").style.visibility =
        "hidden";
    document.getElementById("floating-button-pr").style.visibility =
        "hidden";

    rT.style.visibility =
        "hidden";

    ProvItog.style.visibility =
        "hidden";


    rT.style.height = "0px"
    ProvItog.style.height = "0px"


    rT.innerHTML = "<p></p>";
    ProvItog.value = "";
    res.length = 0;
    txtItogSlova = "";
    txtItogFr = "";
    txtItogFr2 = "";
    txtItogVes = "";
    txtItogVes2 = "";

    txtTabFr = "";
    txtTabFr2 = "";
    txtTabVes = "";
    txtTabVes2 = "";
    tI.length = 0;
    tI2.length = 0;

    res.length = 0;
    sortedRes.length = 0;

    blokArr.length = 0;
    blokArr2.length = 0;
    osh.length = 0;
    blokTxts.length = 0;

    rT.innerHTML = "<p></p>";
};


function click() {


    // alert(podtvOsh_St)
    // alert(vklSl_St)
    //  alert(vklFr_St)
    //  alert(vklIspr_St)
    // alert(vklTxt_St)

    ProvItog.value = "";
    rT.innerHTML = "";
    if (vklIspr.checked) {
        if (vklSl.checked && txtItogSlova.length > 0) {
            ProvItog.value = txtItogSlova;
        }
        if (vklFr.checked && txtItogFr2.length > 0) {
            ProvItog.value += txtItogFr2;
        }
        if (vklTxt.checked && txtItogVes2.length > 0) {
            ProvItog.value += txtItogVes2;
        }

        if (
            vklFr.checked &&
            vklTxt.checked === false &&
            txtTabFr2.length > 0
        ) {
            rT.innerHTML =
                '<div id="rezDiv"  style="align="center"; width: 90%;  white-space: normal;" >' +
                txtTabFr2 +
                "</div>";
        }
        if (vklFr.checked && vklTxt.checked) {
            rT.innerHTML =
                '<div id="rezDiv"  style="align="center"; width: 90%;  white-space: normal;" >' +
                txtTabFr2 +
                txtTabVes2 +
                "</div>";
        }
        if (
            vklTxt.checked &&
            vklFr.checked === false &&
            txtTabVes2.length > 0
        ) {
            rT.innerHTML =
                '<div id="rezDiv"  style="align="center"; width: 90%;  white-space: normal;" >' +
                txtTabVes2 +
                "</div>";
        }
    } else {
        if (vklSl.checked && txtItogSlova.length > 0) {
            ProvItog.value = txtItogSlova;
        }
        if (vklFr.checked && txtItogFr.length > 0) {
            ProvItog.value += txtItogFr;
        }
        if (vklTxt.checked && txtItogVes.length > 0) {
            ProvItog.value += txtItogVes;
        }

        if (
            vklFr.checked &&
            vklTxt.checked === false &&
            txtTabFr.length > 0
        ) {
            rT.innerHTML =
                '<div id="rezDiv"  style="align="center"; width: 90%;  white-space: normal;" >' +
                txtTabFr +
                "</div>";
        }
        if (vklFr.checked && vklTxt.checked) {
            rT.innerHTML =
                '<div id="rezDiv"  style="align="center"; width: 90%;  white-space: normal;" >' +
                txtTabFr +
                txtTabVes +
                "</div>";
        }
        if (
            vklTxt.checked &&
            vklFr.checked === false &&
            txtTabVes2.length > 0
        ) {
            rT.innerHTML =
                '<div id="rezDiv"  style="align="center"; width: 90%;  white-space: normal;" >' +
                txtTabVes +
                "</div>";
        }


    }


    if (podtvOsh.checked === true) {
        localStorage.setItem("podtvOsh_St", 'true')
    } else {
        localStorage.setItem("podtvOsh_St", 'false')
    }
    if (vklSl.checked === true) {
        localStorage.setItem("vklSl_St", 'true')
    } else {
        localStorage.setItem("vklSl_St", 'false')
    }
    if (vklFr.checked === true) {
        localStorage.setItem("vklFr_St", 'true')
    } else {
        localStorage.setItem("vklFr_St", 'false')
    }
    if (vklIspr.checked === true) {
        localStorage.setItem("vklIspr_St", 'true')
    } else {
        localStorage.setItem("vklIspr_St", 'false')
    }
    if (vklTxt.checked === true) {
        localStorage.setItem("vklTxt_St", 'true')
    } else {
        localStorage.setItem("vklTxt_St", 'false')
    }

}

vklSl.onclick = () => {
    click();

};


podtvOsh.onclick = () => {
    click();

};


vklFr.onclick = () => {
    click();

};

vklTxt.onclick = () => {
    click();


    if (vklTxt.checked && sortedRes.length > 0) {
        document.getElementById("floating-button-top").style.visibility =
            "visible";
        document.getElementById("floating-button-sl").style.visibility =
            "visible";
        document.getElementById("floating-button-pr").style.visibility =
            "visible";
    } else {
        document.getElementById("floating-button-top").style.visibility =
            "hidden";
        document.getElementById("floating-button-sl").style.visibility =
            "hidden";
        document.getElementById("floating-button-pr").style.visibility =
            "hidden";
    }

};

vklIspr.onclick = () => {
    click();

};

stProv.onclick = () => {
    iN = bl;

    document.getElementById("goProv").disabled = false;
};


pasteButton.onclick = () => {
    alert("Вставить")

    // pasteFromClipboard("provText")

    navigator.clipboard
        .readText()
        .then((clipText) => (provText.value = clipText));

    var clP = navigator.clipboard.readText


    provText.value


};


document
    .getElementById("floating-button-pr")
    .addEventListener("click", function () {


        if (tekS > (-1)) {
            tekS = tekS - 1;


            window.location.hash = "z" + sortedRes[tekS].pos

            window.scrollBy({
                top: -100,
                left: 0,
                behavior: 'smooth'
            })


            set2Sel("z" + sortedRes[tekS].pos)
            // alert(tekS)
            document.getElementById('floating-button-pr').innerText = '← ошибка ' + (tekS + 1) + ' из ' + sortedRes.length
            document.getElementById('floating-button-sl').innerText = 'ошибка ' + (tekS + 1) + ' из ' + sortedRes.length + ' → '

            let dtxt = document.getElementById('floating-button-sl').innerText.length - document.getElementById('floating-button-top').innerText.length

            // alert(dtxt)


            //if (dtxt === 5) { document.getElementById('floating-button-top').innerText = "^ -- наверх -- ^" }
            // if (dtxt === 6) { document.getElementById('floating-button-top').innerText = "^ --- наверх --- ^" }
            // if (dtxt === 7) { document.getElementById('floating-button-top').innerText = "^ ---- наверх ---- ^" }
            // if (dtxt === 8) { document.getElementById('floating-button-top').innerText = "^ ----- наверх ---- ^" }
            // if (dtxt === 9) { document.getElementById('floating-button-top').innerText = "^ ----- наверх ----- ^" }


            //alert(tekS)
        } else {
            tekS = sortedRes.length
            window.location.hash = "z-1"

            window.scrollBy({
                top: -100,
                left: 0,
                behavior: 'smooth'
            })


            // set2Sel("z-1")

            document.getElementById('floating-button-pr').innerText = ' ← ошибка '
            document.getElementById('floating-button-sl').innerText = ' ошибка → '

            // document.getElementById('floating-button-top').innerText = "^ наверх ^"


        }
    });

document
    .getElementById("floating-button-sl")
    .addEventListener("click", function () {
        // alert(tekS)
        document.getElementById("floating-button-sl").style.visibility =
            "visible";
        if (tekS < sortedRes.length - 1) {
            // document.getElementById('floating-button-sl').style.visibility = 'visible'
            tekS = tekS + 1;

            window.location.hash = "z" + sortedRes[tekS].pos;

            window.scrollBy({
                top: -100,
                left: 0,
                behavior: 'smooth'
            })


            set2Sel("z" + sortedRes[tekS].pos)


            document.getElementById('floating-button-sl').innerText = 'ошибка ' + (tekS + 1) + ' из ' + sortedRes.length + ' → '
            document.getElementById('floating-button-pr').innerText = '← ошибка ' + (tekS + 1) + ' из ' + sortedRes.length

            //let dtxt = document.getElementById('floating-button-sl').innerText.length - document.getElementById('floating-button-top').innerText.length

            // alert(dtxt)


            // if (dtxt === 5) { document.getElementById('floating-button-top').innerText = "^ ---- наверх ---- ^" }
            //  if (dtxt === 6) { document.getElementById('floating-button-top').innerText = "^ ---- наверх ----- ^" }
            // if (dtxt === 7) { document.getElementById('floating-button-top').innerText = "^ ----- наверх ------ ^" }
            // if (dtxt === 8) { document.getElementById('floating-button-top').innerText = "^ ------ наверх ------ ^" }
            // if (dtxt === 9) { document.getElementById('floating-button-top').innerText = "^ ------ наверх ------- ^" }


        } else {
            tekS = -1
            window.location.hash = "z-1"
            window.scrollByLines(5);

            //set2Sel("z-1")

            document.getElementById('floating-button-pr').innerText = ' ← ошибка '
            document.getElementById('floating-button-sl').innerText = ' ошибка → '

            // document.getElementById('floating-button-top').innerText = "^ наверх ^"


        }
    });


document
    .getElementById("floating-button-top")
    .addEventListener("click", function () {
        // alert(tekS)
        tekS = -1
        window.location.hash = "progress"

        //set2Sel("z-1")

        document.getElementById('floating-button-pr').innerText = ' ← ошибка '
        document.getElementById('floating-button-sl').innerText = ' ошибка → '
        document.getElementById('floating-button-top').innerText = "^ наверх ^"


    });
