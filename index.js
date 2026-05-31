const { Telegraf, Markup } = require("telegraf");

// Боттун токенин ушул жерге экиге бөлүп жазабыз (Коопсуздук үчүн)
const tokenPart1 = "ӨЗҮҢДҮН_БОТ_ТОКЕНИҢДИН_БИРИНЧИ_ЖАРЫМЫ";
const tokenPart2 = "ӨЗҮҢДҮН_БОТ_ТОКЕНИҢДИН_ЭКИНЧИ_ЖАРЫМЫ";

const bot = new Telegraf(tokenPart1 + tokenPart2);
const ADMIN_USERNAME = "@сенин_жаңы_юзернеймиң"; // Өзүңдүн жаңы юзернеймиңди жаз

const userLanguages = {};

// 🤖 ЖАРДЫМЧЫ БОТТУН КАТАСЫЗ СУРОО-ЖООП БАЗАСЫ
const faqDatabase = {
  ky: {
    welcome:
      "Салам! Мен Жарвистин жардамчы ботумун. Сизге кантип жардам бере алам? Төмөнкү баскычтар аркылуу сурооңузга жооп ала аласыз же мага түз жазсаңыз болот:",
    change_lang: "🔄 Тилди өзгөртүү",
    unknown: `😔 Кечириңиз, мен бул суроого жооп таба алган жокмун.\n\nКолдоо кызматы (Админ) менен байланышып, сурооңузду түз берсеңиз болот: ${ADMIN_USERNAME}`,

    // Баскычтардын аттары
    btn_start: "💡 Кантип иштетүү керек?",
    btn_restart: "🔝 Башына кайтуу",

    btn_model: "📦 Моделди жүктөө",
    btn_price: "💸 Бул акысызбы?",
    btn_error: "🛠 Ката келип чыкты",
    btn_privacy: "🔒 Купуялуулук коопсуздугу",
    btn_specs: "💻 Системалык талаптар",
    btn_update: "🔄 Тиркемени жаңыртуу",

    // Баскычтар басылгандагы адамча сылык жооптор
    ans_restart:
      "Башкы менюга кайттыңыз. Төмөндөн кайрадан тил тандасаңыз болот 👇",
    ans_start:
      "💡 *Тиркемени иштетүү:* \nКолдонмону ачып, 'Джарвис' деп үн катсаңыз же интерфейстеги микрофон сүрөтүн бассаңыз, система сизди дароо уга баштайт.",
    ans_model:
      "📦 *Моделди жүктөө тартиби:* \nТиркеменин ичинен 'Advanced Settings' (Өркүндөтүлгөн орнотуулар) бөлүмүнө өтүп, оффлайн режиминде иштөөчү Vosk моделдерин оңой жүктөп алсаңыз болот.",
    ans_price:
      "💸 *Долбоордун баасы:* \nБул долбоор толугу менен акысыз жана ачык булактуу болуп саналат. Сиздин купуялуулугуңузду коргоо максатында бардык процесстер локалдык түрдө гана аткарылат.",
    ans_error:
      "🛠 *Каталарды чечүү:* \nЭгерде тиркемеде туура эмес иштөө байкалса, терминалдан 'cargo clean' буйругун берип, долбоорду кайрадан куруп көрүүнү сунуштайм.",
    ans_privacy:
      "🔒 *Купуялуулук саясаты:* \nБиздин тиркеме эч кандай булуттук (cloud) серверлерди колдонбойт. Бардык маалыматтар сиздин Mac компьютериңиздин ичинде гана сакталат жана сыртка эч качан чыкпайт.",
    ans_specs:
      "💻 *Системалык талаптар:* \nТиркеме macOS 10.13 жана андан жогорку версияларда туруктуу иштейт. Өзгөчө Apple Silicon (M1/M2/M3) чиптери бар түзмөктөр үчүн толук оптималдаштырылган.",
    ans_update:
      "🔄 *Тиркемени жаңыртуу:* \nТиркеменин ичиндеги 'Check for Updates' (Жаңыртууларды текшерүү) баскычын бассаңыз, тутум автоматтык түрдө акыркы жаңы версиясын таап, өзү жаңыртып алат.",

    // Текст түрүндө жазганда издей турган сөздөр
    keywords: [
      { keys: ["кантип", "күйгүз", "иштетүү"], ans_index: "ans_start" },
      { keys: ["модель", "жүктөө", "скачать"], ans_index: "ans_model" },
      {
        keys: ["акысыз", "акча", "бесплатно", "баасы"],
        ans_index: "ans_price",
      },
      { keys: ["ката", "ошибка", "баг", "иштебей"], ans_index: "ans_error" },
      {
        keys: ["купуя", "безопасность", "коопсуз", "данные"],
        ans_index: "ans_privacy",
      },
      { keys: ["талап", "требования", "мак", "mac"], ans_index: "ans_specs" },
      { keys: ["жаңыртуу", "обновление", "апдейт"], ans_index: "ans_update" },
    ],
  },
  ru: {
    welcome:
      "Привет! Я помощник Джарвиса. Как я могу вам помочь? Выберите один из пунктов меню ниже или просто напишите мне свой вопрос:",
    change_lang: "🔄 Смена языка",
    unknown: `😔 Извините, я не нашёл ответ на этот вопрос.\n\nВы можете напрямую связаться с нашей службой поддержки (Админом): ${ADMIN_USERNAME}`,

    btn_start: "💡 Как запустить?",
    btn_model: "📦 Загрузка модели",
    btn_price: "💸 Это бесплатно?",
    btn_error: "🛠 Произошла ошибка",
    btn_privacy: "🔒 Конфиденциальность",
    btn_specs: "💻 Системные требования",
    btn_update: "🔄 Обновление приложения",
    btn_restart: "🔝 Главное меню",

    ans_restart: "Вы вернулись в главное меню. Выберите язык заново 👇",
    ans_start:
      "💡 *Запуск приложения:* \nОткройте приложение и просто произнесите 'Джарвис' либо нажмите на иконку микрофона в интерфейсе, чтобы начать работу.",
    ans_model:
      "📦 *Загрузка моделей:* \nПерейдите в раздел 'Advanced Settings' (Расширенные настройки) и выберите подходящую оффлайн-модель Vosk для скачивания.",
    ans_price:
      "💸 *Стоимость проекта:* \nЭтот проект полностью бесплатный и с открытым исходным кодом. Он создан для защиты ваших данных и работает исключительно локально.",
    ans_error:
      "🛠 *Решение проблем:* \nЕсли приложение работает некорректно, попробуйте выполнить команду 'cargo clean' в терминале и перезапустить сборку проекта.",
    ans_privacy:
      "🔒 *Безопасность данных:* \nМы не используем облачные серверы. Все процессы и данные обрабатываются локально на вашем устройстве Mac, обеспечивая полную приватность.",
    ans_specs:
      "💻 *Системные требования:* \nПоддерживается операционная система macOS 10.13 и выше. Приложение идеально оптимизировано под архитектуру Apple Silicon (M1/M2/M3).",
    ans_update:
      "🔄 *Обновление приложения:* \nПросто нажмите на кнопку 'Check for Updates' (Проверить обновления) внутри самого приложения, и система автоматически обновится до последней версии.",

    keywords: [
      {
        keys: ["как", "запуск", "включить", "работать"],
        ans_index: "ans_start",
      },
      { keys: ["модель", "скачать", "загрузить"], ans_index: "ans_model" },
      {
        keys: ["бесплатно", "цена", "стоимость", "платный"],
        ans_index: "ans_price",
      },
      {
        keys: ["ошибка", "баг", "сломалось", "не работает"],
        ans_index: "ans_error",
      },
      {
        keys: ["приватность", "безопасность", "данные", "конфиденциальность"],
        ans_index: "ans_privacy",
      },
      {
        keys: ["требования", "характеристики", "система"],
        ans_index: "ans_specs",
      },
      { keys: ["обновление", "обновить", "апдейт"], ans_index: "ans_update" },
    ],
  },
  en: {
    welcome:
      "Hello! I am Jarvis assistant bot. How can I help you today? Please use the buttons below or feel free to type your question directly:",
    change_lang: "🔄 Change Language",
    unknown: `😔 Sorry, I couldn't find an answer to this question.\n\nPlease contact our support administrator directly: ${ADMIN_USERNAME}`,

    btn_start: "💡 How to run?",
    btn_restart: "🔝 Main Menu",
    btn_model: "📦 Download model",
    btn_price: "💸 Is it free?",
    btn_error: "🛠 Troubleshooting",
    btn_privacy: "🔒 Privacy & Security",
    btn_specs: "💻 System Requirements",
    btn_update: "🔄 Update application",
    ans_restart:
      "Returned to the main menu. Please choose your language again 👇",

    ans_start:
      "💡 *How to run:* \nOpen the application and simply say the wake-word 'Jarvis' or click the microphone icon in the user interface to start voice recognition.",
    ans_model:
      "📦 *Downloading models:* \nNavigate to the 'Advanced Settings' screen and select the preferred offline Vosk model to download directly.",
    ans_price:
      "💸 *Project Cost:* \nThis project is completely free and open-source. It requires no subscriptions and operates strictly locally on your machine.",
    ans_error:
      "🛠 *Fixing issues:* \nIf you encounter any unexpected bugs, try running 'cargo clean' in your project terminal and rebuild the environment.",
    ans_privacy:
      "🔒 *Privacy by default:* \nWe do not utilize cloud processing. All voice logs and data remain locally on your Mac, keeping your information secure.",
    ans_specs:
      "💻 *System Specs:* \nCompatible with macOS 10.13 or later. It is fully native and optimized for Apple Silicon (M1/M2/M3) system architectures.",
    ans_update:
      "🔄 *Application Update:* \nClick the 'Check for Updates' button inside the app interface. The system will look for the newest release and update itself automatically.",

    keywords: [
      { keys: ["how", "run", "start", "launch"], ans_index: "ans_start" },
      { keys: ["model", "download", "vosk"], ans_index: "ans_model" },
      { keys: ["free", "price", "cost", "money"], ans_index: "ans_price" },
      {
        keys: ["error", "bug", "issue", "not working"],
        ans_index: "ans_error",
      },
      {
        keys: ["privacy", "security", "safe", "data"],
        ans_index: "ans_privacy",
      },
      { keys: ["specs", "requirements", "system"], ans_index: "ans_specs" },
      { keys: ["update", "version", "upgrade"], ans_index: "ans_update" },
    ],
  },
};

// Тил тандоо клавиатурасы
function getLanguageKeyboard() {
  return Markup.keyboard([
    ["🇰🇬 Кыргызча", "🇷🇺 Русский"],
    ["🇺🇸 English"],
  ]).resize();
}

// Колдонуучунун тилине жараша бардык баскычтарды чыгаруу (Эми баары көрүнөт!)
function getFaqKeyboard(lang) {
  return Markup.keyboard([
    [lang.btn_start, lang.btn_model],
    [lang.btn_price, lang.btn_error],
    [lang.btn_privacy, lang.btn_specs],
    [lang.btn_update, lang.change_lang],
    [lang.btn_restart],
  ]).resize();
}

bot.start((ctx) => {
  return ctx.reply(
    "Тилди тандаңыз / Выберите язык / Choose language 👇",
    getLanguageKeyboard(),
  );
});

// Тил баскычтарын кабыл алуу
bot.hears("🇰🇬 Кыргызча", (ctx) => {
  userLanguages[ctx.from.id] = "ky";
  ctx.reply(faqDatabase.ky.welcome, getFaqKeyboard(faqDatabase.ky));
});

bot.hears("🇷🇺 Русский", (ctx) => {
  userLanguages[ctx.from.id] = "ru";
  ctx.reply(faqDatabase.ru.welcome, getFaqKeyboard(faqDatabase.ru));
});

bot.hears("🇺🇸 English", (ctx) => {
  userLanguages[ctx.from.id] = "en";
  ctx.reply(faqDatabase.en.welcome, getFaqKeyboard(faqDatabase.en));
});

// Смена языка
bot.hears(
  ["🔄 Тилди өзгөртүү", "🔄 Смена языка", "🔄 Change Language"],
  (ctx) => {
    return ctx.reply(
      "Тилди тандаңыз / Выберите язык / Choose language 👇",
      getLanguageKeyboard(),
    );
  },
);

// Ботко текст келгендеги акылдуу логика
bot.on("text", (ctx) => {
  const userId = ctx.from.id;
  const currentLang = userLanguages[userId] || "ky";
  const lang = faqDatabase[currentLang];
  const text = ctx.message.text;
  const textLower = text.toLowerCase().trim();

  // 1. Түз баскыч басылганын текшерүү
  if (text === lang.btn_start) return ctx.replyWithMarkdown(lang.ans_start);
  if (text === lang.btn_model) return ctx.replyWithMarkdown(lang.ans_model);
  if (text === lang.btn_price) return ctx.replyWithMarkdown(lang.ans_price);
  if (text === lang.btn_error) return ctx.replyWithMarkdown(lang.ans_error);
  if (text === lang.btn_privacy) return ctx.replyWithMarkdown(lang.ans_privacy);
  if (text === lang.btn_specs) return ctx.replyWithMarkdown(lang.ans_specs);
  if (text === lang.btn_update) return ctx.replyWithMarkdown(lang.ans_update);
  if (text === lang.btn_restart) {
    return ctx.reply(lang.ans_restart, getLanguageKeyboard());
  }

  let foundAnsKey = null;
  for (const item of lang.keywords) {
    const match = item.keys.some((key) => textLower.includes(key));
    if (match) {
      foundAnsKey = item.ans_index;
      break;
    }
  }

  if (foundAnsKey && lang[foundAnsKey]) {
    ctx.replyWithMarkdown(lang[foundAnsKey]);
  } else {
    ctx.reply(lang.unknown);
  }
});

bot.launch().then(() => console.log("🤖 Бот ийгиликтүү иштеп жатат..."));
