(function() {
// База артистів з айсбергу українського репу та особистих заміток
const TIERS = {
  0: {
    id: 0,
    title: "Рівень 0: Топ-чарти",
    subtitle: "Широкі маси, мільйонні перегляди, радіо та поп-реп",
    badge: "Топ-чарти",
    color: "#f59e0b", // Gold / Amber
    icon: "📈"
  },
  1: {
    id: 1,
    title: "Рівень 1: Вершина айсберга",
    subtitle: "Поверхня — відомі імена, мейнстрім, чарти та впізнаваний саунд",
    badge: "Вершина",
    color: "#38bdf8", // Sky blue
    icon: "🏔️"
  },
  2: {
    id: 2,
    title: "Рівень 2: Під водою",
    subtitle: "Середня глибина — самобутній вайб, нішевий хайп, альтернативний хіп-хоп",
    badge: "Під водою",
    color: "#0284c7", // Ocean blue
    icon: "🌊"
  },
  3: {
    id: 3,
    title: "Рівень 3: Безодня",
    subtitle: "Глибокий андеграунд — експериментальний звук, локальні мікросцени, мем-реп та деконструкція",
    badge: "Безодня",
    color: "#818cf8", // Deep indigo / abyss
    icon: "🕳️"
  }
};

const ARTISTS = [
  // ==========================================
  // --- РІВЕНЬ 0: ТОП ЧАРТИ ---
  // ==========================================
  {
    id: "alyona-alyona",
    name: "alyona alyona",
    tier: 0,
    tracks: ["Мама Тереза", "Рибки", "Голови"],
    bonusTracks: [],
    impression: "Пару найпопулярніших пісень з рейтингу в Ютуб мюзік. Навіть ліньки писати.\n\nАльоно, сучка, шмара, ти. Бичівка, руда ти.\nСупер нецікава творчість. Попса для широких мас з елементами репу. Нічого цікавого, класно звучного. Контент для аудиторії Анни Трінчер.\nМама Тереза красива пісня, але тільки парт Jerry Heil.",
    verdict: "💤 Контент для широких мас",
    image: "https://cdn-images.dzcdn.net/images/artist/f51d536271e012b7f1021a35a2f9813a/1000x1000-000000-80-0-0.jpg",
    highlight: false
  },
  {
    id: "kalush",
    name: "Kalush",
    tier: 0,
    tracks: ["Стефанія", "Зорі", "Додому"],
    bonusTracks: [],
    impression: "І це блять репер? Репер це коли у тебе ствол, ну тебе і називають «Ствол»😂\nТа ж хуйня для мас, що і alyona alyona. Хоч і мушу визнати, що мені подобається його етно-інтеграція у творчість. Виглядає природно.\nАле слухати я це не буду, дякую.",
    verdict: "😐 Етно-поп для мас",
    image: "https://i.ytimg.com/vi/UiEGVYOruLk/hqdefault.jpg",
    highlight: false
  },
  {
    id: "skofka",
    name: "Skofka",
    tier: 0,
    tracks: ["Чути гімн", "Не забудем і не пробачим", "Крузак"],
    bonusTracks: [],
    impression: "Щось на рівні «Пляшка Фраголіно».",
    verdict: "💤 «Пляшка Фраголіно»",
    image: "https://cdn-images.dzcdn.net/images/artist/ae1a97c3f7c362d1b8e4ff35796bed1f/1000x1000-000000-80-0-0.jpg",
    highlight: false
  },
  {
    id: "yarmak",
    name: "Yarmak",
    tier: 0,
    tracks: ["Сердце пацана", "Дике поле", "Моя країна"],
    bonusTracks: [],
    impression: "Всі ми знаємо його творчість. Раніше був пацанський реп: «Сердце пацана» 😭\nСлухав, коли був малим, тоді подобалося. Зараз це не проходить перевірку часом.\nНова творчість пішла більше в поп, патріотизм і військову тематику. Я не прям фанат, але респект і шатаут кидаю ♥️",
    verdict: "❤️ Респект і шатаут",
    image: "https://i.ytimg.com/vi/s1V0aFTl0aE/hqdefault.jpg",
    highlight: true
  },
  {
    id: "qatoshi",
    name: "qatoshi",
    tier: 0,
    tracks: ["Ластівки", "Панночка", "Брате"],
    bonusTracks: [],
    impression: "Ластівки-ластівки-ластівки😂😂😂\nБля, ну це як Артур Пірожков: потанцювати пʼяним можна, але слухати… ні, дякую.",
    verdict: "💀 Артур Пірожков",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2e/ea/f1/2eeaf17c-26d6-3072-1c4c-ec2c766ee0a2/cover.jpg/600x600bb.jpg",
    highlight: false
  },

  // ==========================================
  // --- РІВЕНЬ 1: ВЕРШИНА (ВЕРХ) ---
  // ==========================================
  {
    id: "naperexresti",
    name: "Naperexresti",
    tier: 1,
    tracks: ["Йоу", "На повторі", "Ти не догоняєш"],
    bonusTracks: ["Патронус"],
    impression: "Половина пісень реп, половина поп. Як репер — повна хуєта. Його образ — іспанський сором. Тексти помойка: «В попсі немає правди» — тіп, ти крінж, тому що твої найпопулярніші пісні це другосортний поп…",
    verdict: "💀 Іспанський сором",
    image: "https://cdn-images.dzcdn.net/images/artist/7dcc7ca5c222b93f974fe098b1534ce3/1000x1000-000000-80-0-0.jpg",
    highlight: false
  },
  {
    id: "mc-petya",
    name: "МС Петя",
    tier: 1,
    tracks: ["Канівес", "Діти Сироти", "Львівський Спайдермен"],
    bonusTracks: [],
    impression: "Люта сатира, підходить для танців в Тік-Ток, слухати таке постійно неможливо…\nТільки якщо ти хапаєш.",
    verdict: "💀 Люта сатира",
    image: "https://i.ytimg.com/vi/-oLrRJ0uBsI/hqdefault.jpg",
    highlight: false
  },
  {
    id: "clonnex",
    name: "Clonnex",
    tier: 1,
    tracks: ["Мила", "ТЦК", "ІДЛ"],
    bonusTracks: ["Пітбуль", "Locked in", "Найкращий український репер", "Самый Лучший Русский Репер", "New Rag", "Chocolate Haze", "Y2K", "Galore", "Ya Lubly", "i feel pain", "Codeinoslav", "Ублюдки"],
    impression: "Типовий треп/клауд, лайк за популяризацію Живчика та локальні відсилки. Вставки закадрового голосу — ржака: «Знову цей Клонекс»😂\nІмхо, флоу схожий на Soda Luv, в деяких треках не покидає відчуття, ніби слухаєш російський клауд 2020-х років. Що загалом корелює з його бекграундом, хоча він на відосах і каже, що не слухає їх і може сам переплюнути західних артистів, проте звучить він не переконливо.\nЗагалом прикольно, хотілося б більше популярних артистів такого жанру та більше оригінальності. Лайк «Ублюдкам»!",
    verdict: "👍 Лайк за Живчик та «Ублюдкам»",
    image: "https://i.ytimg.com/vi/Ay3ORE1jf88/hqdefault.jpg",
    highlight: true
  },
  {
    id: "jockii-druce",
    name: "jockii druce",
    tier: 1,
    tracks: ["Бути долбойобом", "Іноді", "Боі стули пельку"],
    bonusTracks: ["Будем снідати"],
    impression: "Омар Хайям на бітах😂 Цікава подача, прості та близькі до душі теми в піснях. Але звучить як скоромовка, іноді досить важко зрозуміти слова, бо дикція підводить (і це не Скриптоніт, тут немає приколу).\nЗагалом нот бед, лайк «Іноді».",
    verdict: "👍 Омар Хайям на бітах / Лайк «Іноді»",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/ec/8f/e4/ec8fe4c0-6574-cb51-3497-35d2cac1b910/artwork.jpg/600x600bb.jpg",
    highlight: true
  },
  {
    id: "nord-division",
    name: "NORD DIVISION",
    tier: 1,
    tracks: ["Лабуда", "Магура", "Орешник"],
    bonusTracks: ["220", "К.О"],
    impression: "Лабуда: лютий лайк, я так не ржав давно😂😂😂\nОлдскул, актуальні для суспільства теми. Слухати важко, плюс армійська спрямованість, яка не близька мені. Але ознайомитися варто.\n\n«Желаю детям всего лучшего: рак. Я убил русского ровно пять минут назад. Пью чай Ахмат, ебу в рот Ахмат😂 Патриарх Кирил сосал Ломаченко в русской православной церкви 😂»",
    verdict: "🔥 «Лабуда» розрив",
    image: "https://i.ytimg.com/vi/snXc2ua-kpA/hqdefault.jpg",
    highlight: true
  },
  {
    id: "the-curly",
    name: "The Curly",
    tier: 1,
    tracks: ["Тобі Личить", "Ритми", "Я тут зайвий"],
    bonusTracks: ["Сни", "Я забувся", "Зима", "Чорнобрива", "Емоційний мазохізм", "Ночі так тягнуться", "Звуками"],
    impression: "Прикольно. Пісні в різних стилях: хіп-хоп, треп, поп. Загалом навіть вайбово. Але особливо нічого виразного. Пісні та слова не запам'яталися. Лайків немає.",
    verdict: "😐 Вайбово, але без лайків",
    image: "https://cdn-images.dzcdn.net/images/artist/5eda70ac8b49295bd2e70096b64922ac/1000x1000-000000-80-0-0.jpg",
    highlight: false
  },
  {
    id: "otoy",
    name: "Otoy",
    tier: 1,
    tracks: ["На двох", "Шукали вчора", "Бийся"],
    bonusTracks: [],
    impression: "«На двох» — лютий вайб, лайк. В іншому — посередність, аля поп-реп🥸\n«Я живу як ментос у колу»🗿\n«Якщо нам зашити рота, то нам усім пизда» 🫡\nГлибоко. Музика чисто для якоїсь Вікторії.",
    verdict: "🧐 «На двох» — лютий вайб",
    image: "https://cdn-images.dzcdn.net/images/artist/fbe499f46fa7a4f84c0e76e8cebbc37d/1000x1000-000000-80-0-0.jpg",
    highlight: false
  },
  {
    id: "lesfleures",
    name: "lesfleures",
    tier: 1,
    tracks: ["Я палю сигарету", "Між нами", "Знову"],
    bonusTracks: ["Психолог"],
    impression: "Просто хуєта.",
    verdict: "💩 Повний провал",
    image: "https://i.ytimg.com/vi/kSivKIWaxwA/hqdefault.jpg",
    highlight: false
  },
  {
    id: "dofamin",
    name: "Dofamin",
    tier: 1,
    tracks: ["Grande", "Forward", "Lembergman 2"],
    bonusTracks: ["PsyKhin"],
    impression: "Big Baby Tape? Біти залік, тексти не зачепили.",
    verdict: "🧐 Біти залік, тексти ні",
    image: "https://cdn-images.dzcdn.net/images/artist/96af20e8ff8db01436ffb12cb8abe026/1000x1000-000000-80-0-0.jpg",
    highlight: false
  },
  {
    id: "xarakter",
    name: "Xarakter",
    tier: 1,
    tracks: ["No Xomo", "Podol", "Office-37"],
    bonusTracks: ["Психічно хворі"],
    impression: "Гачі-мучі реп😂 Поржати можна, слухати..",
    verdict: "💀 Гачі-мучі реп / Поржати",
    image: "https://i.ytimg.com/vi/scmYgX5ft0Y/hqdefault.jpg",
    highlight: false
  },
  {
    id: "elarm",
    name: "elarm",
    tier: 1,
    tracks: ["Київ то є дім", "Монументально", "Лоу"],
    bonusTracks: ["Що ти накоїла.."],
    impression: "«Київ то є дім» (дякую 4-м мільйонам киян за прослуховування), «Монументально», «Лоу», «Що ти накоїла..»\nЯкийсь недорепер, недо поп-співак…\nПісля рядків «Знаю про тебе багато, бо ми стали друзями, у твоїх минулих стосунках ти була в аб'юзі» викинув і забув.",
    verdict: "💤 Викинув і забув",
    image: "https://i.ytimg.com/vi/O9XQrUrOfTg/hqdefault.jpg",
    highlight: false
  },
  {
    id: "nestor",
    name: "нестор",
    tier: 1,
    tracks: ["Як твої справи", "No Days Off", "Заляканий"],
    bonusTracks: ["Агонія", "Рецепт"],
    impression: "Бля, дякую Нестору: у нього на фіті дівчинка Nadeen. У неї лютий психодел-флоу. Вона прям крута, підписався на неї.\nЗа це і лайк: «Як твої справи» та «Рецепт» тупо витягує.\n«No Days Off» — жорсткий біт та подача, прикольно, але панчі хуєта.\nВ іншому — ну, він збудливо картавить, більше нічим не виділився..\nІ бля, я тебе благаю: не співай🫣 Читай вже свій реп.",
    verdict: "👍 Лайк за фіт з Nadeen",
    image: "https://cdn-images.dzcdn.net/images/artist/db6a31b3e59fcb41f0a9bf9ec72d75fd/1000x1000-000000-80-0-0.jpg",
    highlight: true
  },
  {
    id: "palindrom",
    name: "паліндром",
    tier: 1,
    tracks: ["Берзин", "Холодна кров", "Була Весна"],
    bonusTracks: ["Намалюй", "Альбом «Декілька пісень про невизначеність»"],
    impression: "Прикольний чувак, цікава музика. Дуже сподобався інструментал. Цікаво поєднує спів з репом, хоча спів мені подобається більше. В треках відчувається текстура і якийсь сенс. Є фіти з SadSvit, Курган — плюс вайб. Було б цікаво більш детально ознайомитися з творчістю.",
    verdict: "❤️ Цікава музика / +Вайб",
    image: "https://cdn-images.dzcdn.net/images/artist/9e4f8e90592552f92874e009a070ddf7/1000x1000-000000-80-0-0.jpg",
    highlight: true
  },

  // ==========================================
  // --- РІВЕНЬ 2: ПІД ВОДОЮ (СЕРЕДИНА) ---
  // ==========================================
  {
    id: "blessbaby",
    name: "blessbaby",
    tier: 2,
    tracks: ["Дотики", "Ліл чіпсік", "Руки"],
    bonusTracks: ["Хвойда", "Роялті", "Роялті 2", "Oversine", "Тупік", "Плая", "Паливо", "Кожне лице", "Токсин", "Vlone", "380", "TrapZ1rka"],
    impression: "Загалом прикольний флоу, прикольно змінює голос за одну пісню, піздаті біти. Співати йому не треба…\nІмхо, дуже схожий по стилю на Pharaoh. Місцями навіть ніби копія фіта Фараона та Джимбо. Пісня «Ліл чіпсік» — крінж, особливо тіп, який співає за 10-літнього хлопчика🗿\nАле не зачепив, не згадаю ні слова з жодної пісні.",
    verdict: "😐 Біти піздаті, але не зачепив",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/66/33/9c/66339cef-d978-7dbe-c403-bd362a497e7d/cover.jpg/600x600bb.jpg",
    highlight: false
  },
  {
    id: "oi-fusk",
    name: "Oi FUSK",
    tier: 2,
    tracks: ["Скажена собака", "Логос", "Антиутопія"],
    bonusTracks: ["Квітка", "Лю", "Природа хоробрості", "Хай здоровими будуть усі рідні", "Демон"],
    impression: "«Скажена собака» (цікава тема пісні. Мать їбав за те, що вставив 8D звук стуку в двері — я так обісрався…), «Логос», «Антиутопія», «Квітка»...\nМені сподобалось, як він читає, у тіпа явно є свій стиль. Біти хуйня. Тексти: теми цікаві, але розкриті хуйово. Можна вполовину різати пісню і ніхуя не зміниться.\nУ кінці кінців я не зрозумів його. В двох піснях він читає реп, у інших співає... Там де співає — пісні посередні.",
    verdict: "🧐 Є стиль / Стук у двері 8D 😂",
    image: "https://i.ytimg.com/vi/qxVzxg8n0yI/hqdefault.jpg",
    highlight: false
  },
  {
    id: "lord-enemy",
    name: "lord enemy",
    tier: 2,
    tracks: ["Revolution", "Demon and Angel", "NewSwag"],
    bonusTracks: ["I Luv u haters", "Hollywood", "Afterparty", "Ok", "Pain 2002"],
    impression: "Trap / cloud rap. Те ж саме, що і Clonnex, тільки гірше. Жодна пісня не сподобалась. Взагалі незрозуміло, що вони там пиздять у піснях, просто жують слова. Просто не моє.",
    verdict: "💤 Жують слова / Не моє",
    image: "https://cdn-images.dzcdn.net/images/artist/646e4eb958b53d791f25e23dbee49458/1000x1000-000000-80-0-0.jpg",
    highlight: false
  },
  {
    id: "raichu",
    name: "Райчу",
    tier: 2,
    tracks: ["Не люби", "Не обіцяй", "Казантіп"],
    bonusTracks: ["Цнотлива", "Губи"],
    impression: "По вайбу як Пошлая Молли. Не зайшло.",
    verdict: "💤 Як Пошлая Молли / Не зайшло",
    image: "https://cdn-images.dzcdn.net/images/artist/e76cd71076b8f9b26c998dc320fa1465/1000x1000-000000-80-0-0.jpg",
    highlight: false
  },
  {
    id: "g-grizzie",
    name: "G Grizzie",
    tier: 2,
    tracks: ["Miu bagg", "По Вага", "GG90"],
    bonusTracks: ["BOZO", "Swagadona", "Iced Out", "Dawg Talk"],
    impression: "Треп. Так собі, я би навіть сказав — посередність.",
    verdict: "😐 Посередність",
    image: "https://cdn-images.dzcdn.net/images/artist/a432be1ad6a88afd8713fcb2972b1d01/1000x1000-000000-80-0-0.jpg",
    highlight: false
  },
  {
    id: "yungkerya",
    name: "YungKerya",
    tier: 2,
    tracks: ["2 colors", "Намалюй ніч", "Людяність"],
    bonusTracks: ["Вибратись", "Боюсь"],
    impression: "Цей ніггер має реальний стиль. ПРОСТО АХУЄНО! Тіп такого гівна навалює. Їбать.. Поки що найкраще, що я слухав.\nЛайк усім пісням, які я слухав!",
    verdict: "🔥 ГОЛОВНЕ ВІДКРИТТЯ / ТОП-1",
    image: "https://cdn-images.dzcdn.net/images/artist/06447046db4478cf0e3baf5980808d59/1000x1000-000000-80-0-0.jpg",
    highlight: true
  },
  {
    id: "figurat",
    name: "Figurat",
    tier: 2,
    tracks: ["Sobou", "Krok", "Квіти"],
    bonusTracks: ["Vybach", "В доміке", "Otche"],
    impression: "Прикольний голос та музика. Явно має свій стиль. Проте мені не зайшов.",
    verdict: "🧐 Є свій стиль, але не зайшов",
    image: "https://i.ytimg.com/vi/GwLRxWCZyjs/hqdefault.jpg",
    highlight: false
  },
  {
    id: "nytso-potvorno",
    name: "Ницо Потворно",
    tier: 2,
    tracks: ["Окситоцин", "Покоління 300", "Молодість"],
    bonusTracks: ["Ти", "Літо", "Новий шоу-бізнес"],
    impression: "Дуже навіть цікаво. Незвичайно, те, що запамʼятовується. Такий трішки психодел-абсурд. Іноді здається, що тіп буквально в моменті затягується і починає на приході співати. Інакше рядки «Я заснув на пляжі. І мене вкрив він. Журавель. Бодя. Ноооормально»😂\nЯкщо потрібні оригінальні компліменти: пісня «Ти» до ваших послуг.",
    verdict: "🤯 Психодел-абсурд / Топ",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/f5/a9/fe/f5a9fed1-51b3-f9a0-aa6c-479c2b015167/5059950770803.jpg/600x600bb.jpg",
    highlight: true
  },
  {
    id: "032nimble",
    name: "032nimble",
    tier: 2,
    tracks: ["Я попаду в твої сни", "Molly Santana", "Гранули"],
    bonusTracks: ["Вона належить вулицям"],
    impression: "От ніби і не дуже погано, але хуєта.",
    verdict: "💤 Ніби й нічого, але хуєта",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/9c/6d/d6/9c6dd66b-a2b0-181d-531b-6855b45be298/5904892617306.jpg/600x600bb.jpg",
    highlight: false
  },
  {
    id: "stas-azarenko",
    name: "STAS AZARENKO",
    tier: 2,
    tracks: ["BackHome", "Памʼятаю", "Hot Wigga"],
    bonusTracks: ["Ти розбила мені серце"],
    impression: "Stas Azarenko = 032nimble. Ні додати, ні відняти.",
    verdict: "💤 Копія 032nimble",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/33/ae/0a/33ae0a66-7853-e85d-fccd-f354d378531e/cover.jpg/600x600bb.jpg",
    highlight: false
  },
  {
    id: "pozer90",
    name: "Pozer90",
    tier: 2,
    tracks: ["Demon", "Audi", "Пузогенг"],
    bonusTracks: ["Соплі"],
    impression: "Черговий Cloud репер. Посередність 👎\nЧи є взагалі нормальні виконавці, у яких в ніку цифри?",
    verdict: "👎 Посередність",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/67/5d/de/675dde07-fe86-e4e6-5dc6-96a23faa8cb0/5016122268377.jpg/600x600bb.jpg",
    highlight: false
  },
  {
    id: "qbuy",
    name: "qBuy",
    tier: 2,
    tracks: ["Вибратись", "Ожиріння", "Музику на мінімал"],
    bonusTracks: [],
    impression: "Просто не сподобалось. Цей навіть картавить не сексуально.",
    verdict: "💤 Картавить не сексуально",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/c8/f0/5a/c8f05ac6-0737-780e-81fb-10324e44ae36/cover.jpg/600x600bb.jpg",
    highlight: false
  },
  {
    id: "irlbabee",
    name: "Irlbabee",
    tier: 2,
    tracks: ["Мова кохання", "Вдячна", "Я хочу"],
    bonusTracks: ["Ковтунами світла"],
    impression: "Повна хуєта.",
    verdict: "💩 Повна хуєта",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/25/7f/7f/257f7f73-848d-2743-befc-6dcfb11267fb/cover.jpg/600x600bb.jpg",
    highlight: false
  },
  {
    id: "blandee",
    name: "blandee",
    tier: 2,
    tracks: ["Carousel", "Don’t break my vibe", "На стрессе"],
    bonusTracks: ["Обнулил"],
    impression: "Говнище.",
    verdict: "💩 Говнище",
    image: "https://cdn-images.dzcdn.net/images/artist/aa9a458f3bd713d10a04935c89afb6d0/1000x1000-000000-80-0-0.jpg",
    highlight: false
  },
  {
    id: "krechet",
    name: "Krechet",
    tier: 2,
    tracks: ["Доля", "До батьків", "Хмари"],
    bonusTracks: ["Trembita"],
    impression: "Шароварщина місцями. За фіт з alyona alyona — мінус вайб. Теж: він хто? Поп, реп? Поп-реп? Хуйня.",
    verdict: "💤 Шароварщина / -Вайб",
    image: "https://i.ytimg.com/vi/MDVuui_T9QU/hqdefault.jpg",
    highlight: false
  },
  {
    id: "monogrvm",
    name: "MONOGRVM",
    tier: 2,
    tracks: ["У типа нет синглов"],
    bonusTracks: [],
    impression: "У тіпа немає жодного синглу. Я не їбу, кого там оцінювати. На фітах вони всі однакові. Треп-хуєта чергова.",
    verdict: "💤 Немає синглів",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/5c/a5/45/5ca54541-012a-0b43-2bdf-e92b86623366/artwork.jpg/600x600bb.jpg",
    highlight: false
  },
  {
    id: "dovhyi-pes",
    name: "Довгий пес",
    tier: 2,
    tracks: ["Шишка із Закарпаття", "Липа гарно пахне", "Дивлюсь на район з вікна"],
    bonusTracks: ["Дім", "Може ти б ти думав", "Український Шєт Лонг"],
    impression: "Місцями забавно: «Шишка із Закарпаття». Більше емоцій, крім «забавно», не відчув.",
    verdict: "🧐 Забавно («Шишка із Закарпаття»)",
    image: "https://cdn-images.dzcdn.net/images/artist/d49a42836a2a7022bd36d58e62135ab8/1000x1000-000000-80-0-0.jpg",
    highlight: false
  },
  {
    id: "lover",
    name: "LOVER",
    tier: 2,
    tracks: ["Танцуй", "Как у Ники", "Угараю"],
    bonusTracks: ["Мы разные"],
    impression: "Типовий клубняк, треп. Немає пісень українською. Загалом просто хуєта, без прив'язки до мови виконання.",
    verdict: "💤 Клубняк / Хуєта",
    image: "https://i.ytimg.com/vi/eDI7cKubgaA/hqdefault.jpg",
    highlight: false
  },
  {
    id: "daniel-okaro",
    name: "Daniel Okaro",
    tier: 2,
    tracks: ["Топ пісні"],
    bonusTracks: [],
    impression: "Я так і не зрозумів: чи то він реп, чи то поп, чи то електронна клубна музика. Тіп шукає себе, удачі. Звучить прикольно, але не зачепило.",
    verdict: "🧐 Шукає себе",
    image: "https://i.ytimg.com/vi/KOUSSV_oik8/hqdefault.jpg",
    highlight: false
  },
  {
    id: "freel",
    name: "Freel",
    tier: 2,
    tracks: ["Кім Кі Дук", "Всі як один", "НКДШК"],
    bonusTracks: ["Хочеш приїду"],
    impression: "Посередність. Щось біля пацанського репу. Взагалі нічим не примітне. Пісні для кальянок.",
    verdict: "💨 Реп для кальянок",
    image: "https://i.ytimg.com/vi/rA-XxxKKmNc/hqdefault.jpg",
    highlight: false
  },

  // ==========================================
  // --- РІВЕНЬ 3: БЕЗОДНЯ (ГЛУБИНА) ---
  // ==========================================
  {
    id: "yo",
    name: "йо",
    tier: 3,
    tracks: ["Романтика", "Спорткомплекс", "Стимул"],
    bonusTracks: ["Ельбрус"],
    impression: "Блять, досить мені пищати в навушники.. Черговий клауд-репер. Хуйня.",
    verdict: "💤 Пищить у навушники",
    image: "",
    highlight: false
  },
  {
    id: "lizzzard",
    name: "Lizzzard",
    tier: 3,
    tracks: ["The Orbiter", "Disintegrate", "Vigilent"],
    bonusTracks: [],
    impression: "Це взагалі Рок, що воно тут робить?😂\nКайфанув після однотипних клауд-реперів, дякую😂 Але таке, можна щось і краще послухати.",
    verdict: "🎸 Неочікувано Рок! Кайфанув",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/50/e8/0d/50e80df3-69fc-480a-ad92-d0a36409eb12/0.jpg/600x600bb.jpg",
    highlight: true
  },
  {
    id: "phate-xick",
    name: "Phate Xick",
    tier: 3,
    tracks: ["Rizhu", "Chomu", "PussyWagon"],
    bonusTracks: ["Catcall"],
    impression: "Клубняк / жіночий треп. Забавно, але не качає. Обкладинки.. фу.. пошлятіна (дякую, я подрочив).",
    verdict: "🔞 Пошлятіна / Забавно",
    image: "https://cdn-images.dzcdn.net/images/artist/8c8697619aff151b806ddd7211239708/1000x1000-000000-80-0-0.jpg",
    highlight: false
  },
  {
    id: "okaysammy",
    name: "OKAYSAMMY",
    tier: 3,
    tracks: ["Beyond the secrets", "X-ray", "Pills"],
    bonusTracks: ["MoneyFeed"],
    impression: "Однотипна параша.",
    verdict: "💩 Однотипна параша",
    image: "https://cdn-images.dzcdn.net/images/artist/8ea180e385beb198614a26f9997ffb42/1000x1000-000000-80-0-0.jpg",
    highlight: false
  },
  {
    id: "roma-fakti",
    name: "Рома факти",
    tier: 3,
    tracks: ["У мене лазери з очей", "Забираю тебе як те саме", "В очах у Мене 700 fps"],
    bonusTracks: ["Мені Холодно"],
    impression: "Обкладинки чисто відоси MrBeast. Жодного слова не зрозумів з того, що він співав. Дуже дивний флоу. Мені не подобається.",
    verdict: "🧐 Обкладинки MrBeast / Дивний флоу",
    image: "https://cdn-images.dzcdn.net/images/artist/1a23b0bf931eace095b5ac2e1e444878/1000x1000-000000-80-0-0.jpg",
    highlight: false
  },
  {
    id: "lil-small",
    name: "LIL SMALL",
    tier: 3,
    tracks: ["Ello", "Balmain", "Lie"],
    bonusTracks: [],
    impression: "Чергова клауд-хуйня.",
    verdict: "💤 Чергова клауд-хуйня",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/ea/5a/a1/ea5aa155-40a5-da91-f23f-52ea50e92ee4/artwork.jpg/600x600bb.jpg",
    highlight: false
  },
  {
    id: "dannyphantom",
    name: "DANNYPHANTOM",
    tier: 3,
    tracks: ["Mic Check", "Six Million", "Coast & Headphones"],
    bonusTracks: [],
    impression: "Англомовне музло. Прикольна музика, качає. Потужний голос 😂 Сильно краще цих однакових клауд-петушків.",
    verdict: "👍 Потужний голос / Качає",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/64/51/77/645177c9-e5a2-16a2-fd1a-b40ccfb321cb/06UMGIM22352.rgb.jpg/600x600bb.jpg",
    highlight: true
  },
  {
    id: "datboyjeezo",
    name: "datboyjeezo",
    tier: 3,
    tracks: ["Movie life", "Chrome kisses", "Money Rush"],
    bonusTracks: ["Улюблена"],
    impression: "Треп, загалом звучить більш-менш, але нічого вау.",
    verdict: "😐 Більш-менш",
    image: "https://cdn-images.dzcdn.net/images/artist/bcbad50fc394e5f74efdcee5734cb95e/1000x1000-000000-80-0-0.jpg",
    highlight: false
  },
  {
    id: "aquazoii",
    name: "AQUAZOII",
    tier: 3,
    tracks: ["Перкіс", "Peak!", "What should I do"],
    bonusTracks: ["Misperception"],
    impression: "Якщо хтось не чув його творчість, то знайте: нічого не втратили.",
    verdict: "💤 Нічого не втратили",
    image: "",
    highlight: false
  },
  {
    id: "deyside",
    name: "дейside",
    tier: 3,
    tracks: ["Чіжик", "Ти тіп простий", "Що ти хочеш?"],
    bonusTracks: [],
    impression: "«Що ти хочеш» качає. Нічого в цьому особливого.",
    verdict: "😐 Нічого особливого",
    image: "",
    highlight: false
  },
  {
    id: "35cake",
    name: "35cake",
    tier: 3,
    tracks: ["Starz", "Clap", "Sanna"],
    bonusTracks: [],
    impression: "Це пиздець.. Краще вже МС Петя, в ньому хоч прикол якийсь є🗿",
    verdict: "🗿 Краще вже МС Петя",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/38/de/37/38de3755-30df-4c80-bc65-60ecc0428c27/cover.jpg/600x600bb.jpg",
    highlight: false
  },
  {
    id: "lasta",
    name: "Lasta",
    tier: 3,
    tracks: ["Пагорб", "Narkotiki", "Космосы"],
    bonusTracks: [],
    impression: "«Narkotiki» — жиза, в іншому — хуєта.",
    verdict: "🧐 «Narkotiki» жиза",
    image: "https://cdn-images.dzcdn.net/images/artist/78449b53cc9f658a80daf4344a33561d/1000x1000-000000-80-0-0.jpg",
    highlight: false
  },
  {
    id: "madamprime",
    name: "MadamPrime",
    tier: 3,
    tracks: ["Sport", "Week on", "Wolfside"],
    bonusTracks: [],
    impression: "Черговий нищук, що читає про сучок, яких він трахає, і що ніхто не шарить за його стиль.",
    verdict: "💤 Черговий нищук",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/9b/8f/8f/9b8f8fb2-e8b1-217e-6270-95ba8b6d8216/7300343154228.jpg/600x600bb.jpg",
    highlight: false
  },
  {
    id: "whitejunk",
    name: "WhiteJunk",
    tier: 3,
    tracks: ["Кращий", "Coocking", "Stakan"],
    bonusTracks: ["Brat"],
    impression: "Говно, залупа, пеніс, хер, давалка, хуй, блядина…",
    verdict: "💩 Говно, залупа...",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/47/db/81/47db8138-93ba-18cd-d77d-ef1b6342e160/cover.jpg/600x600bb.jpg",
    highlight: false
  },
  {
    id: "splassheedd",
    name: "splassheedd",
    tier: 3,
    tracks: ["Kush", "Попіл", "Час"],
    bonusTracks: ["Фільм"],
    impression: "Взагалі нічим не відрізняється від конкурентів. Включи мені будь-якого — не відрізню. Посередність.",
    verdict: "😐 Посередність",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/52/06/0d/52060d20-2928-1b4c-00aa-8c0056eaa36f/cover.jpg/600x600bb.jpg",
    highlight: false
  },
  {
    id: "explein",
    name: "EXPLEIN",
    tier: 3,
    tracks: ["Blister", "Морозні Сни", "Врятуй мене"],
    bonusTracks: ["Suzuki"],
    impression: "У мене вже немає фантазії, як обізвати цей блядський унилий андеграундний клауд-реп. Залупа.",
    verdict: "💤 Унилий клауд / Залупа",
    image: "",
    highlight: false
  },
  {
    id: "lechapo",
    name: "LeChapo",
    tier: 3,
    tracks: ["Житомир не існує", "Deanon", "Вушко Печива"],
    bonusTracks: ["Джига Флоу"],
    impression: "Бля, забавний тіп. Мені сподобалось 😂\nТіп хоча б не пиздить у текстах😂\nТіп каже: «Побачив член, я знизив його»😂\n«Я не можу дропнуть альбом, їбучий укртелеком»😂😂\n«Житомир не існує» — ржачна пісня.",
    verdict: "😂 Ржака / Лайк за щирість",
    image: "https://cdn-images.dzcdn.net/images/artist/f06066fc492b80dfb5caf977266f1b0b/1000x1000-000000-80-0-0.jpg",
    highlight: true
  },
  {
    id: "waggonkid",
    name: "WAGGONKID",
    tier: 3,
    tracks: ["Antisocial", "Guap", "Tesla"],
    bonusTracks: [],
    impression: "💩💩💩💩💩",
    verdict: "💩 5 купок лайна",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/5f/70/2e/5f702e70-d8a9-8482-4a76-1c6ae0d0699d/0.jpg/600x600bb.jpg",
    highlight: false
  },
  {
    id: "mvrk21",
    name: "mvrk21",
    tier: 3,
    tracks: ["Каяття", "Mavka", "Хвилі"],
    bonusTracks: ["Відстань", "Вода", "Про тебе"],
    impression: "Це дуже навіть непогано. Як на мене, тексти слабуваті, але стиль у тіпа є. Я навіть кайфанув після нескінченного одноманітного клауд-репу🗿\nУдачі в творчості, він заслуговує на більшу увагу.",
    verdict: "👍 Кайфанув / Є стиль",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/01/6c/65/016c65db-1693-d568-286c-d4d11c56a891/198391943942.jpg/600x600bb.jpg",
    highlight: true
  },
  {
    id: "cbfire",
    name: "CBFire",
    tier: 3,
    tracks: ["Skin", "Left-Right", "Aromat"],
    bonusTracks: ["Swag Airlines"],
    impression: "Один з найкращих треп/клауд, що я слухав серед дуже маловідомих артистів. Воно хоч трішки відрізняється від інших.",
    verdict: "🔥 Найкращий у мікро-андеграунді",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/5b/9b/72/5b9b726f-4fea-e0e4-0c1b-89b3c77e767a/cover.jpg/600x600bb.jpg",
    highlight: true
  }
];

function getYouTubeMusicSearchUrl(artistName, trackName = '') {
  const query = trackName ? `${artistName} ${trackName}` : artistName;
  return `https://music.youtube.com/search?q=${encodeURIComponent(query)}`;
}

if (typeof window !== 'undefined') {
  window.RAP_DATA = { TIERS, ARTISTS, getYouTubeMusicSearchUrl };
}
})();
