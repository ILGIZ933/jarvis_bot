const { Telegraf, Markup } = require("telegraf");

const bot = new Telegraf("8916328028:AAHyrwl_8zZFeVSkiYPtYEFaliUZhEo22gk");

const ADMIN_USERNAME = "@your_telegram_username";

const userLanguages = {};

const faqDatabase = {
  ky: {
    welcome:
      "Салам! Мен Жарвистин FAQ ботумун. Мага тиркеме боюнча сурооңузду бериңиз.",
    btn_start: "💡 Кнтип иштетет?",
    btn_model: "📦 Модель жүктөө",
    btn_price: "💸 Акысызбы?",
    ans_start:
      "💡 *Кантип иштетүү керек:* \nТиркемени ачып, 'Джарвис' деп айтсаңыз, ал сизди уга баштайт. Же интерфейстен микрофонду басыңыз.",
    ans_model:
      "📦 *Модель жүктөө боюнча:* \nAdvanced Settings бөлүмүнө өтүп, оффлайн моделди жүктөп алып, иштетсеңиз болот.",
    ans_price:
      "💸 Бул долбоор толугу менен акысыз жана ачык булактуу. Маалыматтар локалдык түрдө сакталат.",
    unknown: `😔 Кечириңиз, мен бул суроого жооп таба алган жокмун.\n\nАдминге түз кайрылсаңыз болот: ${ADMIN_USERNAME}`,
  },
  ru: {
    welcome: "Привет! Я FAQ бот Джарвиса. Задайте мне вопросы по приложению.",
    btn_start: "💡 Как запустить?",
    btn_model: "📦 Скачать модель",
    btn_price: "💸 Это бесплатно?",
    ans_start:
      "💡 *Как запустить:* \nОткройте приложение и скажите 'Джарвис', чтобы он начал слушать. Или нажмите на микрофон в интерфейсе.",
    ans_model:
      "📦 *Скачивание модели:* \nПерейдите в Advanced Settings, выберите оффлайн модель и скачайте её.",
    ans_price:
      "💸 Этот проект полностью бесплатный и с открытым исходным кодом. Всё работает локально.",
    unknown: `😔 Извините, я не нашёл ответ на этот вопрос.\n\nВы можете связаться с админом напрямую: ${ADMIN_USERNAME}`,
  },
};

bot.start((ctx) => {
  return ctx.reply(
    "Салам! Тилди тандаңыз / Выберите язык 👇",
    Markup.keyboard([["🇰🇬 Кыргызча", "🇷🇺 Русский"]]).resize(),
  );
});

bot.hears("🇰🇬 Кыргызча", (ctx) => {
  userLanguages[ctx.from.id] = "ky";
  const lang = faqDatabase.ky;
  ctx.reply(
    lang.welcome,
    Markup.keyboard([
      [lang.btn_start, lang.btn_model],
      [lang.btn_price, "🔄 Тилди өзгөртүү / Смена языка"],
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
      [lang.btn_price, "🔄 Тилди өзгөртүү / Смена языка"],
    ]).resize(),
  );
});

bot.hears("🔄 Тилди өзгөртүү / Смена языка", (ctx) => {
  return ctx.reply(
    "Тилди тандаңыз / Выберите язык 👇",
    Markup.keyboard([["🇰🇬 Кыргызча", "🇷🇺 Русский"]]).resize(),
  );
});

bot.on("text", (ctx) => {
  const userId = ctx.from.id;
  const currentLang = userLanguages[userId] || "ky"; 
  const lang = faqDatabase[currentLang];
  const text = ctx.message.text;

  if (text === lang.btn_start) {
    ctx.replyWithMarkdown(lang.ans_start);
  } else if (text === lang.btn_model) {
    ctx.replyWithMarkdown(lang.ans_model);
  } else if (text === lang.btn_price) {
    ctx.replyWithMarkdown(lang.ans_price);
  } else {
    ctx.reply(lang.unknown);
  }
});

bot.launch().then(() => console.log("🤖 Бот 24/7 режиминде иштеп жатат..."));