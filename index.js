const { Telegraf, Markup } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);
const ADMIN_USERNAME = "@JARVIS_support_admin";

const userLanguages = {};

const faqDatabase = {
  ky: {
    welcome:
      "Салам! Мен Жарвистин FAQ ботумун. Төмөнкү баскычтарды колдонуп сурооңузга жооп алыңыз же сурооңузду түз жазыңыз:",
    change_lang: "🔄 Тилди өзгөртүү",
    unknown: `😔 Кечириңиз, мен бул суроого статикалык базадан жооп таба алган жокмун.\n\nКолдоо кызматы (Админ) менен байланышыңыз: ${ADMIN_USERNAME}`,
    btn_start: "💡 Кантип иштетет?",
    btn_model: "📦 Модель жүктөө",
    btn_price: "💸 Акысызбы?",
    keywords: [
      {
        keys: ["кантип иштетет", "запуск", "кантип күйгүзөм"],
        ans: "💡 *Тиркемени иштетүү:* Колдонмону ачып, 'Джарвис' деп үн катсаңыз же интерфейстеги микрофон баскычын бассаңыз, ал сизди уга баштайт.",
      },
      {
        keys: ["модель", "жүктөө", "скачать"],
        ans: "📦 *Модель жүктөө:* 'Advanced Settings' (Өркүндөтүлгөн орнотуулар) бөлүмүнө өтүп, оффлайн Vosk моделдерин жүктөп алсаңыз болот.",
      },
      {
        keys: ["акысызбы", "акча", "бесплатно"],
        ans: "💸 *Баасы:* Бул долбоор толугу менен акысыз жана ачык булактуу (Open Source). Бардык процесстер локалдык түрдө иштейт.",
      },
      {
        keys: ["ката", "иштебей жатат", "ошибка"],
        ans: "🛠 *Каталарды оңдоо:* 'cargo clean' буйругун берип, тиркемени кайра куруп көрүңүз же логдорду текшериңиз.",
      },
      {
        keys: ["купуялуулук", "приватность", "безопасность"],
        ans: "🔒 *Коопсуздук:* Биздин тиркеме эч кандай булуттук (cloud) серверлерди колдонбойт. Маалыматтар сиздин Mac компьютериңизде гана сакталат.",
      },
      {
        keys: ["системалык талаптар", "минимальные требования"],
        ans: "💻 *Талаптар:* Тиркеме macOS 10.13 жана андан жогорку версияларда, айрыкча Apple Silicon (M1/M2/M3) чиптеринде идеалдуу иштейт.",
      },
      {
        keys: ["жаңыртуу", "обновление"],
        ans: "🔄 *Жаңыртуу:* Тиркеменин ичиндеги 'Check for Updates' баскычы аркылуу GitHub'тан акыркы версияны түз көчүрүп алсаңыз болот.",
      },
      // 📝 Бул жерге ушинтип каалаганча (50-60) суроо кошо берсең болот...
    ],
  },
  ru: {
    welcome:
      "Привет! Я FAQ бот Джарвиса. Используйте кнопки ниже или просто задайте свой вопрос в чат:",
    change_lang: "🔄 Смена языка",
    unknown: `😔 Извините, я не нашёл ответ на этот вопрос в базе данных.\n\nСвяжитесь с администратором напрямую: ${ADMIN_USERNAME}`,
    btn_start: "💡 Как запустить?",
    btn_model: "📦 Скачать модель",
    btn_price: "💸 Это бесплатно?",
    keywords: [
      {
        keys: ["как запустить", "запуск", "включить"],
        ans: "💡 *Запуск приложения:* Откройте приложение и произнесите 'Джарвис' или нажмите на иконку микрофона в интерфейсе.",
      },
      {
        keys: ["модель", "скачать", "установка модели"],
        ans: "📦 *Загрузка моделей:* Перейдите в 'Advanced Settings' и выберите нужную оффлайн модель Vosk для скачивания.",
      },
      {
        keys: ["бесплатно", "цена", "платный"],
        ans: "💸 *Стоимость:* Этот проект полностью бесплатный и с открытым исходным кодом. Всё работает локально на вашем устройстве.",
      },
      {
        keys: ["ошибка", "баг", "не работает"],
        ans: "🛠 *Решение проблем:* Попробуйте выполнить команду 'cargo clean' и перезапустить сборку тиркеме.",
      },
      {
        keys: ["приватность", "данные", "куда отправляются"],
        ans: "🔒 *Конфиденциальность:* Все данные обрабатываются локально. Мы не используем облачные хранилища, ваша информация в безопасности.",
      },
      {
        keys: ["требования", "характеристики"],
        ans: "💻 *Системные требования:* Поддерживается macOS 10.13 и выше. Отлично оптимизировано под процессоры Apple Silicon M1/M2/M3.",
      },
      {
        keys: ["обновление", "апдейт"],
        ans: "🔄 *Обновление:* Кнопка 'Check for Updates' проверит свежие релизы на GitHub и автоматически загрузит DMG файл.",
      },
      // 📝 Сюда также добавляются остальные вопросы...
    ],
  },
  en: {
    welcome:
      "Hello! I am Jarvis FAQ Bot. Use the buttons below or just type your question:",
    change_lang: "🔄 Change Language",
    unknown: `😔 Sorry, I couldn't find an answer to this question in my static database.\n\nPlease contact the administrator directly: ${ADMIN_USERNAME}`,
    btn_start: "💡 How to start?",
    btn_model: "📦 Download model",
    btn_price: "💸 Is it free?",
    keywords: [
      {
        keys: ["how to start", "launch", "run"],
        ans: "💡 *How to run:* Open the application and say the wake-word 'Jarvis' or click the microphone icon in the user interface.",
      },
      {
        keys: ["model", "download", "vosk"],
        ans: "📦 *Models:* Navigate to 'Advanced Settings' and select the appropriate offline Vosk model to download.",
      },
      {
        keys: ["free", "price", "cost"],
        ans: "💸 *Cost:* This project is completely free and Open Source. It values your privacy and runs entirely locally.",
      },
      {
        keys: ["error", "bug", "not working"],
        ans: "🛠 *Troubleshooting:* Try running 'cargo clean' in your terminal and rebuild the application.",
      },
      {
        keys: ["privacy", "data", "security"],
        ans: "🔒 *Privacy by default:* No cloud processing. All data is processed locally on your Mac environment.",
      },
      {
        keys: ["requirements", "specs"],
        ans: "💻 *System Requirements:* Compatible with macOS 10.13 or later. Fully optimized for Apple Silicon (M1/M2/M3) architectures.",
      },
      {
        keys: ["update", "version"],
        ans: "🔄 *Updates:* Use the 'Check for Updates' feature to trigger the update process and fetch the latest DMG from GitHub.",
      },
      // 📝 Add more English questions here...
    ],
  },
};

// Тил тандоо менюсу
function getLanguageKeyboard() {
  return Markup.keyboard([
    ["🇰🇬 Кыргызча", "🇷🇺 Русский"],
    ["🇺🇸 English"],
  ]).resize();
}

// Ботту баштаганда тил суроо
bot.start((ctx) => {
  return ctx.reply(
    "Тилди тандаңыз / Выберите язык / Choose language 👇",
    getLanguageKeyboard(),
  );
});

// Тил баскычтарын угуу
bot.hears("🇰🇬 Кыргызча", (ctx) => {
  userLanguages[ctx.from.id] = "ky";
  const lang = faqDatabase.ky;
  ctx.reply(
    lang.welcome,
    Markup.keyboard([
      [lang.btn_start, lang.btn_model],
      [lang.btn_price, lang.change_lang],
    ]).resize(),
  );
});

bot.hears("🇷🇺 Русский", (ctx) => {
  userLanguages[ctx.from.id] = "ru";
  const lang = faqDatabase.ru;
  ctx.reply(
    lang.welcome,
    Markup.keyboard([
      [lang.btn_start, lang.btn_model],
      [lang.btn_price, lang.change_lang],
    ]).resize(),
  );
});

bot.hears("🇺🇸 English", (ctx) => {
  userLanguages[ctx.from.id] = "en";
  const lang = faqDatabase.en;
  ctx.reply(
    lang.welcome,
    Markup.keyboard([
      [lang.btn_start, lang.btn_model],
      [lang.btn_price, lang.change_lang],
    ]).resize(),
  );
});

bot.hears(
  ["🔄 Тилди өзгөртүү", "🔄 Смена языка", "🔄 Change Language"],
  (ctx) => {
    return ctx.reply(
      "Тилди тандаңыз / Выберите язык / Choose language 👇",
      getLanguageKeyboard(),
    );
  },
);

bot.on("text", (ctx) => {
  const userId = ctx.from.id;
  const currentLang = userLanguages[userId] || "ky";
  const lang = faqDatabase[currentLang];
  const text = ctx.message.text.toLowerCase().trim();

  if (text === lang.btn_start.toLowerCase()) {
    return ctx.replyWithMarkdown(lang.keywords[0].ans);
  } else if (text === lang.btn_model.toLowerCase()) {
    return ctx.replyWithMarkdown(lang.keywords[1].ans);
  } else if (text === lang.btn_price.toLowerCase()) {
    return ctx.replyWithMarkdown(lang.keywords[2].ans);
  }

  let foundAnswer = null;

  for (const item of lang.keywords) {
    const match = item.keys.some((key) => text.includes(key.toLowerCase()));
    if (match) {
      foundAnswer = item.ans;
      break;
    }
  }

  if (foundAnswer) {
    ctx.replyWithMarkdown(foundAnswer);
  } else {
    ctx.reply(lang.unknown);
  }
});

bot
  .launch()
  .then(() => console.log("🤖 Бот 3 тилде 24/7 режиминде иштеп жатат..."));
