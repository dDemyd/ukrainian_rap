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
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/ef/5a/c3/ef5ac369-9802-65fd-d55c-79b0b885dfb8/886449072347.jpg/600x600bb.jpg",
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
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/6f/3a/50/6f3a5078-a61f-f7ef-694e-a5a247ba2f44/886449305230.jpg/600x600bb.jpg",
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
    image: "https://i.ytimg.com/vi/kYJv8Z1kK8Q/hqdefault.jpg",
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
    image: "https://i.ytimg.com/vi/ABx69lnYWFE/hqdefault.jpg",
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
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/aa/25/5f/aa255feb-df98-1e56-e30b-34bb2119b956/197188538880.jpg/600x600bb.jpg",
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
    image: "https://i.ytimg.com/vi/s2_zH0fKq54/hqdefault.jpg",
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
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/7f/f0/22/7ff0227e-eb8b-76b0-0b7d-68816bb19b59/19UM1IM14544.rgb.jpg/600x600bb.jpg",
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
    image: "https://i.ytimg.com/vi/eG2Z410m-3Q/hqdefault.jpg",
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
    image: "https://i.ytimg.com/vi/1u4jN_S1_pE/hqdefault.jpg",
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
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/a6/8b/65/a68b657c-cac6-68e6-3bde-b79d58fbc795/18UMGIM30762.rgb.jpg/600x600bb.jpg",
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
    image: "https://i.ytimg.com/vi/nq2yVSrNOJA/hqdefault.jpg",
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
    image: "https://i.ytimg.com/vi/32e2YhT2O5c/hqdefault.jpg",
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
    image: "https://i.ytimg.com/vi/m4gH6x1v3uQ/hqdefault.jpg",
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
    image: "https://i.ytimg.com/vi/kYv9GqM72aU/hqdefault.jpg",
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
    image: "https://i.ytimg.com/vi/0kUo8X9lT0U/hqdefault.jpg",
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
    image: "https://i.ytimg.com/vi/k4T0h9w3U-c/hqdefault.jpg",
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
    image: "https://i.ytimg.com/vi/lGg8K-CEbLY/hqdefault.jpg",
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
    image: "https://i.ytimg.com/vi/4b7P6a9n_o0/hqdefault.jpg",
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
    image: "https://i.ytimg.com/vi/5aM1QjS8s-I/hqdefault.jpg",
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
    image: "https://i.ytimg.com/vi/525u_s5f_9s/hqdefault.jpg",
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
    image: "https://i.ytimg.com/vi/gT5a793k8V0/hqdefault.jpg",
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
    image: "https://i.ytimg.com/vi/sU14z7qX550/hqdefault.jpg",
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
    image: "https://i.ytimg.com/vi/kYJ5o-v-Z0s/hqdefault.jpg",
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
    image: "https://i.ytimg.com/vi/kYJ7L2JpWbA/hqdefault.jpg",
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
    image: "https://i.ytimg.com/vi/KLenTVwQ1A0/hqdefault.jpg",
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
    image: "https://i.ytimg.com/vi/R9Z8X_k0ZcQ/hqdefault.jpg",
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
    image: "https://i.ytimg.com/vi/kYJj6S0gQcE/hqdefault.jpg",
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
    image: "https://i.ytimg.com/vi/kYJ-wG7Q5iA/hqdefault.jpg",
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
    image: "https://i.ytimg.com/vi/kYJjT-m-u2Q/hqdefault.jpg",
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
    image: "",
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
    image: "https://i.ytimg.com/vi/i4n-YvU0N9M/hqdefault.jpg",
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
    image: "https://i.ytimg.com/vi/xG1Qj0uR41M/hqdefault.jpg",
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
    image: "https://i.ytimg.com/vi/eL1u_mJ-84U/hqdefault.jpg",
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
    image: "https://i.ytimg.com/vi/64l2M4z9u8Y/hqdefault.jpg",
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
