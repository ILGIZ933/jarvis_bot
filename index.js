const { Telegraf, Markup } = require("telegraf");
const http = require("http");

const bot = new Telegraf(process.env.BOT_TOKEN);
const ADMIN_USERNAME = "@JARVIS_support_admin";

const userLanguages = {};

const faqDatabase = {
  ky: {
    welcome:
      "Салам! Мен Жарвистин колдоо көрсөтүү ботумун. Сизге кантип жардам бере алам? Төмөнкү баскычтар аркылуу сурооңузга жооп алсаңыз болот же мага түз кат жазсаңыз болот:",
    change_lang: "🔄 Тилди өзгөртүү",
    btn_restart: "🔝 Башкы меню",
    ans_restart:
      "Башкы менюга кайттыңыз. Төмөндөн кайрадан тил тандасаңыз болот 👇",
    unknown: `😔 Кечириңиз, мен бул суроого жооп таба алган жокмун.\n\nБиздин колдоо кызматынын адисине (Админге) түз кайрылып, сурооңузду берсеңиз болот: ${ADMIN_USERNAME}`,

    btn_start: "💡 Кантип колдонуу керек?",
    btn_model: "📦 Үн моделдерин орнотуу",
    btn_price: "💸 Лицензия сатып алуу",
    btn_error: "🛠 Техникалык жардам",
    btn_privacy: "🔒 Маалыматтардын коопсуздугу",
    btn_specs: "💻 Компьютерге болгон талаптар",
    btn_update: "🔄 Программаны жаңыртуу",

    ans_start:
      "💡 *Программаны колдонуу:* \nТиркемени ачып, 'Джарвис' деп үн катсаңыз же интерфейстеги микрофон сүрөтүн бассаңыз, жардамчыңыз сизди уга баштайт.",
    ans_model:
      "📦 *Үн моделдерин жүктөө:* \nТиркеменин ичиндеги 'Advanced Settings' (Өркүндөтүлгөн орнотуулар) бөлүмүнө өтүп, оффлайн режиминде иштөөчү тил моделдерин оңой жүктөп алсаңыз болот.",
    ans_price:
      "💸 *Сатып алуу жана Баасы:* \nБул программа коммерциялык долбоор болуп саналат. Бардык мүмкүнчүлүктөрдү толук колдонуу үчүн лицензиялык ачкыч сатып алууга туура келет. Толук маалыматты жана бааларын билүү үчүн админге жазыңыз: " +
      ADMIN_USERNAME,
    ans_error:
      "🛠 *Каталарды чечүү:* \nЭгерде тиркеменин иштешинде кандайдыр бир мүчүлүштүктөр же суроолор жаралса, биздин колдоо кызматынын адисине түз жазыңыз, сизге дароо жардам беришет: " +
      ADMIN_USERNAME,
    ans_privacy:
      "🔒 *Купуялуулук кепилдиги:* \nСиздин коопсуздугуңуз биз үчүн абдан маанилүү. Программа эч кандай булуттук серверлерди колдонбойт. Бардык үн маалыматтарыңыз сиздин Mac компьютериңизде гана локалдык түрдө иштетилет.",
    ans_specs:
      "💻 *Компьютерге болгон талаптар:* \nПрограмма macOS 10.13 жана андан жогорку версияларда туруктуу иштейт. Өзгөчө Apple Silicon (M1/M2/M3) чиптери бар заманбап түзмөктөр үчүн толук оптималдаштырылган.",
    ans_update:
      "🔄 *Программаны жаңыртуу:* \nТиркеменин ичиндеги 'Check for Updates' (Жаңыртууларды текшерүү) баскычын бассаңыз, тутум автоматтык түрдө акыркы жаңы версиясын таап, өзү жаңыртып алат.",

    keywords: [
      {
        keys: ["кантип", "күйгүз", "колдонуу", "иштетүү"],
        ans_index: "ans_start",
      },
      {
        keys: ["модель", "жүктөө", "орнотуу", "скачать"],
        ans_index: "ans_model",
      },
      {
        keys: [
          "сатып",
          "баасы",
          "акча",
          "купить",
          "лицензия",
          "бекер",
          "бесплатно",
        ],
        ans_index: "ans_price",
      },
      {
        keys: ["ката", "ошибка", "жардам", "иштебей", "помощь"],
        ans_index: "ans_error",
      },
      {
        keys: ["купуя", "безопасность", "коопсуз", "данные"],
        ans_index: "ans_privacy",
      },
      {
        keys: ["талап", "требования", "мак", "mac", "колдойбу"],
        ans_index: "ans_specs",
      },
      {
        keys: ["жаңыртуу", "обновление", "апдейт", "жаңы"],
        ans_index: "ans_update",
      },
    ],
  },
  ru: {
    welcome:
      "Привет! Я бот поддержки Джарвиса. Как я могу вам помочь? Выберите один из пунктов меню ниже или просто напишите мне свой вопрос:",
    change_lang: "🔄 Смена языка",
    btn_restart: "🔝 Главное меню",
    ans_restart: "Вы вернулись в главное меню. Выберите язык заново 👇",
    unknown: `😔 Извините, я не нашёл ответ на этот вопрос.\n\nВы можете напрямую связаться с нашей службой поддержки для консультации: ${ADMIN_USERNAME}`,

    btn_start: "💡 Как использовать?",
    btn_model: "📦 Установка языковых моделей",
    btn_price: "💸 Купить лицензию",
    btn_error: "🛠 Техническая поддержка",
    btn_privacy: "🔒 Безопасность данных",
    btn_specs: "💻 Системные требования",
    btn_update: "🔄 Обновление программы",

    ans_start:
      "💡 *Использование программы:* \nОткройте приложение и просто произнесите команду 'Джарвис' либо нажмите на иконку микрофона в интерфейсе, чтобы активировать ассистента.",
    ans_model:
      "📦 *Загрузка моделей:* \nПерейдите в раздел 'Advanced Settings' (Расширенные настройки) внутри приложения и выберите подходящую оффлайн-модель для скачивания.",
    ans_price:
      "💸 *Покупка и Стоимость:* \nЭто коммерческий проект. Для получения полного доступа ко всем функциям искусственного интеллекта необходимо приобрести лицензионный ключ. Для покупки свяжитесь с нами: " +
      ADMIN_USERNAME,
    ans_error:
      "🛠 *Техническая помощь:* \nЕсли у вас возникли вопросы по работе приложения или проблемы с активацией, напишите нашему специалисту напрямую: " +
      ADMIN_USERNAME,
    ans_privacy:
      "🔒 *Конфиденциальность:* \nМы заботимся о вашей безопасности. Программа не отправляет данные в облако. Все процессы обрабатываются локально на вашем устройстве Mac.",
    ans_specs:
      "💻 *Системные требования:* \nПоддерживается операционная система macOS 10.13 и выше. Приложение идеально оптимизировано под процессоры Apple Silicon (M1/M2/M3).",
    ans_update:
      "🔄 *Обновление программы:* \nПросто нажмите на кнопку 'Check for Updates' (Проверить обновления) внутри самого интерфейса, и система автоматически обновится до актуальной версии.",

    keywords: [
      {
        keys: ["как", "запуск", "включить", "работает"],
        ans_index: "ans_start",
      },
      {
        keys: ["модель", "скачать", "загрузить", "установка"],
        ans_index: "ans_model",
      },
      {
        keys: [
          "купить",
          "цена",
          "стоимость",
          "платный",
          "лицензия",
          "бесплатно",
        ],
        ans_index: "ans_price",
      },
      {
        keys: ["ошибка", "сломалось", "не работает", "помощь", "поддержка"],
        ans_index: "ans_error",
      },
      {
        keys: ["приватность", "безопасность", "данные", "конфиденциальность"],
        ans_index: "ans_privacy",
      },
      {
        keys: ["требования", "характеристики", "система", "мак"],
        ans_index: "ans_specs",
      },
      { keys: ["обновление", "обновить", "апдейт"], ans_index: "ans_update" },
    ],
  },
  en: {
    welcome:
      "Hello! I am Jarvis support bot. How can I help you today? Please choose an option below or type your question directly:",
    change_lang: "🔄 Change Language",
    btn_restart: "🔝 Main Menu",
    ans_restart:
      "Returned to the main menu. Please choose your language again 👇",
    unknown: `😔 Sorry, I couldn't find an answer to your question.\n\nPlease contact our official support administrator directly: ${ADMIN_USERNAME}`,

    btn_start: "💡 How to use?",
    btn_model: "📦 Download language models",
    btn_price: "💸 Purchase license",
    btn_error: "🛠 Technical Support",
    btn_privacy: "🔒 Data Privacy & Security",
    btn_specs: "💻 System Requirements",
    btn_update: "🔄 Update application",

    ans_start:
      "💡 *How to use:* \nOpen the application and simply say the wake-word 'Jarvis' or click the microphone icon in the user interface to start working.",
    ans_model:
      "📦 *Downloading models:* \nNavigate to the 'Advanced Settings' screen within the app and select the preferred offline voice model to download.",
    ans_price:
      "💸 *Pricing and Licensing:* \nThis is a commercial product. To unlock all features and services, a license key purchase is required. Contact our sales admin for more details: " +
      ADMIN_USERNAME,
    ans_error:
      "🛠 *Technical Assistance:* \nIf you face any issues or errors regarding activation, feel free to reach out to our customer help desk directly: " +
      ADMIN_USERNAME,
    ans_privacy:
      "🔒 *Privacy & Security:* \nYour security is our top priority. The application does not use cloud servers; all data and processing stay completely local on your Mac environment.",
    ans_specs:
      "💻 *System Specs:* \nCompatible with macOS 10.13 or later. It is fully native and optimized for Apple Silicon (M1/M2/M3) system architectures.",
    ans_update:
      "🔄 *Application Update:* \nClick the 'Check for Updates' button inside the app interface. The system will look for the newest release and update itself automatically.",

    keywords: [
      { keys: ["how", "run", "start", "use"], ans_index: "ans_start" },
      { keys: ["model", "download", "install"], ans_index: "ans_model" },
      {
        keys: ["buy", "price", "cost", "money", "license", "free"],
        ans_index: "ans_price",
      },
      {
        keys: ["error", "bug", "issue", "help", "support"],
        ans_index: "ans_error",
      },
      {
        keys: ["privacy", "security", "safe", "data"],
        ans_index: "ans_privacy",
      },
      {
        keys: ["specs", "requirements", "system", "mac"],
        ans_index: "ans_specs",
      },
      { keys: ["update", "version", "upgrade"], ans_index: "ans_update" },
    ],
  },
};

function getLanguageKeyboard() {
  return Markup.keyboard([
    ["🇰🇬 Кыргызча", "🇷🇺 Русский"],
    ["🇺🇸 English"],
  ]).resize();
}

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

const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Bot is running safely...");
});

server.listen(PORT, () => {
  console.log(`🤖 Жасалма сервер ${PORT}-портунда ишке кирди.`);
});

bot.launch().then(() => console.log("🤖 Бот ийгиликтүү иштеп жатат..."));
