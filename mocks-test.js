'use strict';

const mockData = [
    {
        "id":"Cx-wNZ",
        "title":"Самый лучший музыкальный альбом этого года",
        "createdDate":"2021-08-06T17:13:38.400Z",
        "announce":"Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Простые ежедневные упражнения помогут достичь успеха.",
        "fullText":"Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Там они и встретились, прямо в центре. Достичь успеха помогут ежедневные повторения. Из под его пера вышло 8 платиновых альбомов. Золотое сечение — соотношение двух величин, гармоническая пропорция. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Первая большая ёлка была установлена только в 1938 году. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Как начать действовать? Для начала просто соберитесь. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Ёлки — это не просто красивое дерево. Это прочная древесина.",
        "category":"Спорт",
        "comments":[
            {"id":"Gx4TM8","text":"Хочу такую же футболку :-)"}
        ]
    },
    {
        "id":"0C8erK",
        "title":"Как перестать беспокоиться и начать жить",
        "createdDate":"2021-08-19T01:18:19.198Z",
        "announce":"Это один из лучших рок-музыкантов. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.",
        "fullText":"Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Красиво жить не запретишь. Первая большая ёлка была установлена только в 1938 году. Ёлки — это не просто красивое дерево. Это прочная древесина. Простые ежедневные упражнения помогут достичь успеха. Он написал больше 30 хитов. Золотое сечение — соотношение двух величин, гармоническая пропорция. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?",
        "category":"Без рамки",
        "comments":[
            {"id":"P3vgQp","text":"Плюсую, но слишком много буквы! Согласен с автором!"},
            {"id":"_KR_M5","text":"Мне кажется или я уже читал это где-то? Это где ж такие красоты? Плюсую, но слишком много буквы!"},
            {"id":"vYZ21Q","text":"Согласен с автором!"},
            {"id":"QyrJT-","text":"Мне кажется или я уже читал это где-то?"}
        ]
    },
    {
        "id":"RxCDXS",
        "title":"Как достигнуть успеха не вставая с кресла",
        "createdDate":"2021-10-10T23:40:40.277Z",
        "announce":"Это один из лучших рок-музыкантов. Простые ежедневные упражнения помогут достичь успеха. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Как начать действовать? Для начала просто соберитесь.",
        "fullText":"Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Программировать не настолько сложно, как об этом говорят. Красиво жить не запретишь. Первая большая ёлка была установлена только в 1938 году. Это один из лучших рок-музыкантов. Простые ежедневные упражнения помогут достичь успеха. Как начать действовать? Для начала просто соберитесь. Из под его пера вышло 8 платиновых альбомов. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Собрать камни бесконечности легко, если вы прирожденный герой. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Он написал больше 30 хитов. Достичь успеха помогут ежедневные повторения.",
        "category":"IT",
        "comments":[
            {"id":"ue8TuH","text":"Давно не пользуюсь стационарными компьютерами. Ноутбуки победили."},
            {"id":"-98SSK","text":"Согласен с автором! Мне не нравится ваш стиль. Ощущение, что вы меня поучаете."},
            {"id":"Koiy1L","text":"Планируете записать видосик на эту тему?"},
            {"id":"3w0NPF","text":"Хочу такую же футболку :-) Совсем немного... Мне кажется или я уже читал это где-то?"}
        ]
    },
    {
        "id":"73y6Oc",
        "title":"Смотрите во всех кинотеатрах страны",
        "createdDate":"2021-08-23T02:59:02.712Z",
        "announce":"Достичь успеха помогут ежедневные повторения. Первая большая ёлка была установлена только в 1938 году. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Золотое сечение — соотношение двух величин, гармоническая пропорция.",
        "fullText":"Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Программировать не настолько сложно, как об этом говорят. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Он написал больше 30 хитов.",
        "category":"За жизнь",
        "comments":[
            {"id":"cFp9Lb","text":"Согласен с автором!"}
        ]
    },
    {
        "id":"MI2Dk7",
        "title":"Как достигнуть успеха не вставая с кресла",
        "createdDate":"2021-08-29T05:24:54.158Z",
        "announce":"Собрать камни бесконечности легко, если вы прирожденный герой. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Там они и встретились, прямо в центре. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.",
        "fullText":"Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Красиво жить не запретишь. Из под его пера вышло 8 платиновых альбомов. Первая большая ёлка была установлена только в 1938 году. Программировать не настолько сложно, как об этом говорят. Золотое сечение — соотношение двух величин, гармоническая пропорция. Собрать камни бесконечности легко, если вы прирожденный герой. Ёлки — это не просто красивое дерево. Это прочная древесина.",
        "category":"Разное",
        "comments":[
            {"id":"fRp6BA","text":"Это где ж такие красоты?"}
        ]
    }
];

module.exports = mockData;