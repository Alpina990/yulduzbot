export type Lang = 'ru' | 'uz' | 'en';
export type PageKey = 'privacy' | 'terms' | 'prices' | 'support';

export interface Section {
  title: string;
  body: string[];
}

export interface Company {
  name: string;
  taxId: string;
  address: string;
  email: string;
  telegram: string;
}

// {brand}, {company}, {taxId}, {address}, {email}, {telegram} are filled from
// the live legal config; an empty value stays a visible [placeholder].
export const UI: Record<
  Lang,
  {
    nav: Record<PageKey, string>;
    home: string;
    updated: string;
    seller: string;
    taxId: string;
    address: string;
    email: string;
    support: string;
    loading: string;
    placeholder: { name: string; taxId: string; address: string; email: string };
  }
> = {
  ru: {
    nav: {
      privacy: 'Политика конфиденциальности',
      terms: 'Пользовательское соглашение',
      prices: 'Цены и тарифы',
      support: 'Поддержка',
    },
    home: 'На главную',
    updated: 'Редакция от',
    seller: 'Продавец',
    taxId: 'ИНН',
    address: 'Адрес',
    email: 'Email',
    support: 'Поддержка',
    loading: 'Загрузка…',
    placeholder: {
      name: '[НАЗВАНИЕ ЮРЛИЦА]',
      taxId: '[ИНН]',
      address: '[ЮРИДИЧЕСКИЙ АДРЕС]',
      email: '[EMAIL ПОДДЕРЖКИ]',
    },
  },
  uz: {
    nav: {
      privacy: 'Maxfiylik siyosati',
      terms: 'Foydalanuvchi kelishuvi',
      prices: 'Narxlar va tariflar',
      support: "Qo'llab-quvvatlash",
    },
    home: 'Bosh sahifa',
    updated: 'Tahrir sanasi',
    seller: 'Sotuvchi',
    taxId: 'STIR',
    address: 'Manzil',
    email: 'Email',
    support: "Qo'llab-quvvatlash",
    loading: 'Yuklanmoqda…',
    placeholder: {
      name: '[YURIDIK SHAXS NOMI]',
      taxId: '[STIR]',
      address: '[YURIDIK MANZIL]',
      email: '[QOʻLLAB-QUVVATLASH EMAIL]',
    },
  },
  en: {
    nav: {
      privacy: 'Privacy policy',
      terms: 'Terms of service',
      prices: 'Prices',
      support: 'Support',
    },
    home: 'Home',
    updated: 'Version of',
    seller: 'Seller',
    taxId: 'Tax ID',
    address: 'Address',
    email: 'Email',
    support: 'Support',
    loading: 'Loading…',
    placeholder: {
      name: '[COMPANY NAME]',
      taxId: '[TAX ID]',
      address: '[LEGAL ADDRESS]',
      email: '[SUPPORT EMAIL]',
    },
  },
};

export const EDITION = '25.10.2026';

export const PRIVACY: Record<Lang, Section[]> = {
  ru: [
    {
      title: '1. Общие положения',
      body: [
        'Настоящая политика описывает, какие данные обрабатывает сервис {brand} (Telegram-бот, мини-приложение и сайт), управляемый {company} (ИНН {taxId}, адрес: {address}), зачем и как долго.',
        'Пользуясь сервисом, вы соглашаетесь с этой политикой. Если вы не согласны, не пользуйтесь сервисом.',
      ],
    },
    {
      title: '2. Какие данные мы получаем',
      body: [
        'Данные Telegram, которые Telegram передаёт боту и мини-приложению: идентификатор пользователя, имя, username, язык интерфейса, фото профиля.',
        'Данные заказа: товар, сумма, способ оплаты, username получателя, статус и время оплаты и доставки.',
        'Технические данные: IP-адрес, тип устройства и браузера, журналы обращений к серверу.',
        'Мы не получаем и не храним номера банковских карт: оплату принимают платёжные провайдеры на своей стороне. При сохранении карты мы храним только токен провайдера и маску номера.',
      ],
    },
    {
      title: '3. Зачем мы обрабатываем данные',
      body: [
        'Чтобы оформить, оплатить и доставить заказ (Telegram Stars, Telegram Premium, подарки).',
        'Чтобы отвечать на обращения в поддержку и разбирать спорные платежи.',
        'Чтобы предотвращать мошенничество и соблюдать требования банков и платёжных провайдеров.',
        'Чтобы отправлять сообщения о заказе и, если вы не отказались, о бонусах и акциях. От рекламных сообщений можно отказаться в любой момент, заблокировав бота или написав в поддержку.',
      ],
    },
    {
      title: '4. Кому мы передаём данные',
      body: [
        'Telegram и Fragment: для доставки купленного товара на ваш аккаунт.',
        'Платёжным провайдерам и банкам: в объёме, необходимом для проведения и проверки платежа.',
        'Государственным органам: только по законному требованию.',
        'Мы не продаём персональные данные третьим лицам.',
      ],
    },
    {
      title: '5. Хранение и защита',
      body: [
        'Данные хранятся на защищённых серверах, доступ к ним есть только у уполномоченных сотрудников с двухфакторной аутентификацией.',
        'Данные заказов хранятся не дольше, чем этого требуют бухгалтерский и налоговый учёт и правила платёжных систем, после чего удаляются или обезличиваются.',
      ],
    },
    {
      title: '6. Ваши права',
      body: [
        'Вы можете запросить сведения о ваших данных, их исправление или удаление, а также отозвать согласие на рекламные сообщения. Для этого напишите в поддержку {telegram} или на {email}.',
        'Удаление данных о совершённых платежах может быть ограничено требованиями закона.',
      ],
    },
    {
      title: '7. Изменения политики',
      body: [
        'Мы можем обновлять политику; актуальная редакция всегда опубликована на этой странице с датой изменения.',
      ],
    },
  ],
  uz: [
    {
      title: '1. Umumiy qoidalar',
      body: [
        "Ushbu siyosat {company} (STIR {taxId}, manzil: {address}) boshqaradigan {brand} xizmati (Telegram bot, mini-ilova va sayt) qaysi ma'lumotlarni, nima uchun va qancha muddat qayta ishlashini tavsiflaydi.",
        "Xizmatdan foydalanib, siz ushbu siyosatga rozilik bildirasiz. Rozi bo'lmasangiz, xizmatdan foydalanmang.",
      ],
    },
    {
      title: "2. Qanday ma'lumotlarni olamiz",
      body: [
        "Telegram bot va mini-ilovaga uzatadigan ma'lumotlar: foydalanuvchi identifikatori, ism, username, interfeys tili, profil rasmi.",
        "Buyurtma ma'lumotlari: mahsulot, summa, to'lov usuli, qabul qiluvchining username'i, to'lov va yetkazish holati va vaqti.",
        "Texnik ma'lumotlar: IP-manzil, qurilma va brauzer turi, server jurnallari.",
        "Biz bank kartalari raqamlarini olmaymiz va saqlamaymiz: to'lovni to'lov provayderlari o'z tomonida qabul qiladi. Kartani saqlaganda faqat provayder tokeni va karta raqami niqobi saqlanadi.",
      ],
    },
    {
      title: "3. Ma'lumotlarni nima uchun qayta ishlaymiz",
      body: [
        "Buyurtmani rasmiylashtirish, to'lash va yetkazish uchun (Telegram Stars, Telegram Premium, sovg'alar).",
        "Qo'llab-quvvatlash murojaatlariga javob berish va bahsli to'lovlarni ko'rib chiqish uchun.",
        "Firibgarlikning oldini olish va bank hamda to'lov provayderlari talablariga rioya qilish uchun.",
        "Buyurtma haqida va, agar rad etmagan bo'lsangiz, bonus va aksiyalar haqida xabar yuborish uchun. Reklama xabarlaridan istalgan vaqtda botni bloklab yoki qo'llab-quvvatlashga yozib voz kechish mumkin.",
      ],
    },
    {
      title: "4. Ma'lumotlarni kimga uzatamiz",
      body: [
        "Telegram va Fragment: sotib olingan mahsulotni akkauntingizga yetkazish uchun.",
        "To'lov provayderlari va banklarga: to'lovni o'tkazish va tekshirish uchun zarur hajmda.",
        "Davlat organlariga: faqat qonuniy talab bo'yicha.",
        "Biz shaxsiy ma'lumotlarni uchinchi shaxslarga sotmaymiz.",
      ],
    },
    {
      title: '5. Saqlash va himoya',
      body: [
        "Ma'lumotlar himoyalangan serverlarda saqlanadi, ularga faqat ikki bosqichli autentifikatsiyaga ega vakolatli xodimlar kira oladi.",
        "Buyurtma ma'lumotlari buxgalteriya va soliq hisobi hamda to'lov tizimlari qoidalari talab qiladigan muddatdan ortiq saqlanmaydi, so'ng o'chiriladi yoki anonimlashtiriladi.",
      ],
    },
    {
      title: '6. Sizning huquqlaringiz',
      body: [
        "Ma'lumotlaringiz haqida ma'lumot, ularni tuzatish yoki o'chirishni so'rashingiz, reklama xabarlariga rozilikni qaytarib olishingiz mumkin. Buning uchun {telegram} yoki {email} manziliga yozing.",
        "Amalga oshirilgan to'lovlar ma'lumotlarini o'chirish qonun talablari bilan cheklanishi mumkin.",
      ],
    },
    {
      title: "7. Siyosatdagi o'zgarishlar",
      body: ["Siyosatni yangilashimiz mumkin; amaldagi tahrir doimo ushbu sahifada o'zgartirish sanasi bilan e'lon qilinadi."],
    },
  ],
  en: [
    {
      title: '1. General',
      body: [
        'This policy describes what data the {brand} service (Telegram bot, mini app and website), operated by {company} (tax ID {taxId}, address: {address}), processes, why and for how long.',
        'By using the service you agree to this policy. If you do not agree, do not use the service.',
      ],
    },
    {
      title: '2. Data we receive',
      body: [
        'Data Telegram passes to the bot and the mini app: user ID, name, username, interface language, profile photo.',
        'Order data: product, amount, payment method, recipient username, payment and delivery status and time.',
        'Technical data: IP address, device and browser type, server access logs.',
        'We never receive or store card numbers: payment providers take the payment on their side. A saved card is kept only as the provider token and a masked number.',
      ],
    },
    {
      title: '3. Why we process data',
      body: [
        'To place, pay for and deliver an order (Telegram Stars, Telegram Premium, gifts).',
        'To answer support requests and handle disputed payments.',
        'To prevent fraud and meet the requirements of banks and payment providers.',
        'To send order messages and, unless you opted out, bonus and promotion messages. You can opt out of promotional messages at any time by blocking the bot or writing to support.',
      ],
    },
    {
      title: '4. Who we share data with',
      body: [
        'Telegram and Fragment: to deliver the purchased item to your account.',
        'Payment providers and banks: as far as needed to process and verify the payment.',
        'Authorities: only on a lawful request.',
        'We do not sell personal data to third parties.',
      ],
    },
    {
      title: '5. Storage and protection',
      body: [
        'Data is kept on protected servers; only authorised staff with two-factor authentication can access it.',
        'Order data is kept no longer than accounting, tax and payment-network rules require, then deleted or anonymised.',
      ],
    },
    {
      title: '6. Your rights',
      body: [
        'You can request access to, correction or deletion of your data, and withdraw consent to promotional messages. To do so, write to {telegram} or {email}.',
        'Deleting records of completed payments may be limited by law.',
      ],
    },
    {
      title: '7. Changes',
      body: ['We may update this policy; the current version is always published on this page with its date.'],
    },
  ],
};

export const TERMS: Record<Lang, Section[]> = {
  ru: [
    {
      title: '1. Стороны и предмет',
      body: [
        'Соглашение заключается между {company} (ИНН {taxId}, адрес: {address}), далее «Продавец», и пользователем сервиса {brand}, далее «Покупатель».',
        'Продавец оказывает услуги по приобретению и передаче на Telegram-аккаунт цифровых товаров: Telegram Stars, подписки Telegram Premium и подарков Telegram (далее, «Товар»).',
        'Оформляя заказ, Покупатель подтверждает, что ознакомился с соглашением, политикой конфиденциальности и ценами и принимает их.',
      ],
    },
    {
      title: '2. Оформление заказа',
      body: [
        'Заказ оформляется в Telegram-боте или мини-приложении {brand}. Покупатель выбирает Товар и указывает username получателя, свой или другого пользователя Telegram.',
        'Покупатель отвечает за правильность username получателя. Товар, доставленный на указанный username, считается переданным надлежащим образом.',
      ],
    },
    {
      title: '3. Цена и оплата',
      body: [
        'Цена каждого Товара указывается до оплаты в боте, мини-приложении и на странице «Цены и тарифы». Итоговая сумма к оплате показывается на экране оплаты; скрытых комиссий нет.',
        'Оплата производится через подключённых платёжных провайдеров (банковские карты, системы быстрых платежей и другие доступные способы). Данные карты вводятся на стороне провайдера.',
        'Обязательство Покупателя по оплате считается исполненным с момента подтверждения платежа провайдером.',
      ],
    },
    {
      title: '4. Доставка',
      body: [
        'Товар доставляется автоматически на Telegram-аккаунт получателя, как правило, в течение нескольких минут после подтверждения оплаты. В отдельных случаях (проверка платежа, сбой Telegram или Fragment) срок может увеличиться до 24 часов.',
        'О статусе заказа Продавец сообщает в Telegram-боте.',
      ],
    },
    {
      title: '5. Возврат средств',
      body: [
        'Товар является цифровым и после доставки на аккаунт получателя возврату не подлежит.',
        'Если Товар не был доставлен по вине Продавца, Покупатель вправе получить возврат полной суммы на исходный способ оплаты. Для этого нужно написать в поддержку с номером заказа.',
        'Возврат производится в срок до 10 рабочих дней с момента решения; фактическое зачисление зависит от банка Покупателя.',
      ],
    },
    {
      title: '6. Ограничения',
      body: [
        'Запрещено использовать сервис для мошенничества, оплаты чужими картами без согласия владельца и иных противоправных действий. Продавец вправе приостановить заказ для проверки и отказать в обслуживании при признаках нарушений с возвратом средств.',
        'Продавец не является Telegram и не отвечает за действия Telegram, в том числе за ограничения аккаунтов, установленные Telegram.',
      ],
    },
    {
      title: '7. Ответственность и споры',
      body: [
        'Ответственность Продавца ограничена суммой оплаченного заказа.',
        'Споры решаются путём переговоров через поддержку {telegram} / {email}; срок ответа на претензию: до 10 рабочих дней. При недостижении согласия спор рассматривается в порядке, предусмотренном законодательством по месту регистрации Продавца.',
      ],
    },
    {
      title: '8. Изменения соглашения',
      body: ['Продавец может изменять соглашение; новая редакция действует с момента публикации на этой странице и применяется к заказам, оформленным после неё.'],
    },
  ],
  uz: [
    {
      title: '1. Tomonlar va predmet',
      body: [
        "Kelishuv {company} (STIR {taxId}, manzil: {address}), keyingi o'rinlarda «Sotuvchi», va {brand} xizmati foydalanuvchisi, keyingi o'rinlarda «Xaridor», o'rtasida tuziladi.",
        "Sotuvchi Telegram akkauntiga raqamli mahsulotlarni sotib olish va yetkazish xizmatini ko'rsatadi: Telegram Stars, Telegram Premium obunasi va Telegram sovg'alari (keyingi o'rinlarda, «Mahsulot»).",
        "Buyurtma berib, Xaridor kelishuv, maxfiylik siyosati va narxlar bilan tanishganini va ularni qabul qilishini tasdiqlaydi.",
      ],
    },
    {
      title: '2. Buyurtma berish',
      body: [
        "Buyurtma {brand} Telegram boti yoki mini-ilovasida beriladi. Xaridor Mahsulotni tanlaydi va qabul qiluvchining username'ini, o'zinikini yoki boshqa Telegram foydalanuvchisinikini ko'rsatadi.",
        "Qabul qiluvchi username'ining to'g'riligi uchun Xaridor javobgar. Ko'rsatilgan username'ga yetkazilgan Mahsulot lozim darajada topshirilgan hisoblanadi.",
      ],
    },
    {
      title: "3. Narx va to'lov",
      body: [
        "Har bir Mahsulot narxi to'lovdan oldin bot, mini-ilova va «Narxlar va tariflar» sahifasida ko'rsatiladi. To'lanadigan yakuniy summa to'lov ekranida ko'rinadi; yashirin komissiyalar yo'q.",
        "To'lov ulangan to'lov provayderlari orqali amalga oshiriladi (bank kartalari, tezkor to'lov tizimlari va boshqa mavjud usullar). Karta ma'lumotlari provayder tomonida kiritiladi.",
        "Xaridorning to'lov majburiyati provayder to'lovni tasdiqlagan paytdan bajarilgan hisoblanadi.",
      ],
    },
    {
      title: '4. Yetkazish',
      body: [
        "Mahsulot qabul qiluvchining Telegram akkauntiga avtomatik ravishda, odatda to'lov tasdiqlangandan keyin bir necha daqiqada yetkaziladi. Ayrim hollarda (to'lovni tekshirish, Telegram yoki Fragment nosozligi) muddat 24 soatgacha uzayishi mumkin.",
        'Buyurtma holati haqida Sotuvchi Telegram botida xabar beradi.',
      ],
    },
    {
      title: "5. Mablag'ni qaytarish",
      body: [
        "Mahsulot raqamli bo'lib, qabul qiluvchi akkauntiga yetkazilgandan keyin qaytarilmaydi.",
        "Agar Mahsulot Sotuvchi aybi bilan yetkazilmagan bo'lsa, Xaridor to'liq summani dastlabki to'lov usuliga qaytarib olish huquqiga ega. Buning uchun buyurtma raqami bilan qo'llab-quvvatlashga yozish kerak.",
        "Qaytarish qaror qabul qilingandan keyin 10 ish kunigacha amalga oshiriladi; haqiqiy tushish Xaridor bankiga bog'liq.",
      ],
    },
    {
      title: '6. Cheklovlar',
      body: [
        "Xizmatdan firibgarlik, egasining roziligisiz boshqalarning kartalari bilan to'lash va boshqa noqonuniy harakatlar uchun foydalanish taqiqlanadi. Sotuvchi buyurtmani tekshirish uchun to'xtatib turish va qoidabuzarlik belgilari bo'lsa, mablag'ni qaytargan holda xizmat ko'rsatishni rad etish huquqiga ega.",
        "Sotuvchi Telegram emas va Telegram harakatlari, jumladan Telegram tomonidan akkauntlarga qo'yilgan cheklovlar uchun javobgar emas.",
      ],
    },
    {
      title: '7. Javobgarlik va nizolar',
      body: [
        "Sotuvchining javobgarligi to'langan buyurtma summasi bilan cheklanadi.",
        "Nizolar {telegram} / {email} qo'llab-quvvatlash orqali muzokaralar yo'li bilan hal qilinadi; da'voga javob muddati: 10 ish kunigacha. Kelishuvga erishilmasa, nizo Sotuvchi ro'yxatdan o'tgan joy qonunchiligida nazarda tutilgan tartibda ko'rib chiqiladi.",
      ],
    },
    {
      title: "8. Kelishuvdagi o'zgarishlar",
      body: ["Sotuvchi kelishuvni o'zgartirishi mumkin; yangi tahrir ushbu sahifada e'lon qilingan paytdan kuchga kiradi va undan keyin berilgan buyurtmalarga qo'llaniladi."],
    },
  ],
  en: [
    {
      title: '1. Parties and subject',
      body: [
        'This agreement is made between {company} (tax ID {taxId}, address: {address}), the "Seller", and the user of the {brand} service, the "Buyer".',
        'The Seller buys and delivers to a Telegram account digital goods: Telegram Stars, Telegram Premium subscriptions and Telegram gifts (the "Goods").',
        'By placing an order the Buyer confirms having read and accepted this agreement, the privacy policy and the prices.',
      ],
    },
    {
      title: '2. Placing an order',
      body: [
        'Orders are placed in the {brand} Telegram bot or mini app. The Buyer picks the Goods and the recipient username, their own or another Telegram user.',
        'The Buyer is responsible for the recipient username. Goods delivered to the username given are deemed duly delivered.',
      ],
    },
    {
      title: '3. Price and payment',
      body: [
        'The price of every item is shown before payment in the bot, the mini app and on the "Prices" page. The final amount is shown on the payment screen; there are no hidden fees.',
        'Payment is made through connected payment providers (bank cards, fast payment systems and other available methods). Card details are entered on the provider side.',
        'The Buyer has paid once the provider confirms the payment.',
      ],
    },
    {
      title: '4. Delivery',
      body: [
        'Goods are delivered automatically to the recipient Telegram account, usually within minutes of payment confirmation. In some cases (payment review, a Telegram or Fragment outage) it may take up to 24 hours.',
        'The Seller reports the order status in the Telegram bot.',
      ],
    },
    {
      title: '5. Refunds',
      body: [
        'The Goods are digital and are not refundable once delivered to the recipient account.',
        "If the Goods were not delivered through the Seller's fault, the Buyer is entitled to a full refund to the original payment method. To request it, write to support with the order number.",
        "Refunds are made within 10 business days of the decision; the actual credit depends on the Buyer's bank.",
      ],
    },
    {
      title: '6. Restrictions',
      body: [
        "The service must not be used for fraud, paying with someone else's card without consent or other unlawful acts. The Seller may hold an order for review and refuse service, with a refund, where there are signs of abuse.",
        'The Seller is not Telegram and is not responsible for actions of Telegram, including account restrictions imposed by Telegram.',
      ],
    },
    {
      title: '7. Liability and disputes',
      body: [
        "The Seller's liability is limited to the amount of the paid order.",
        "Disputes are settled through support {telegram} / {email}; a claim is answered within 10 business days. Failing agreement, the dispute is handled under the law of the Seller's place of registration.",
      ],
    },
    {
      title: '8. Changes',
      body: ['The Seller may change this agreement; a new version applies from its publication on this page to orders placed after it.'],
    },
  ],
};

export const PRICES_TEXT: Record<Lang, { intro: string; stars: string; premium: string; months: string; gifts: string; fees: string; pack: string; price: string }> = {
  ru: {
    intro: 'Актуальные цены {brand}. Сумма к оплате всегда показывается до оплаты; комиссий сверху нет.',
    stars: 'Telegram Stars',
    premium: 'Telegram Premium',
    months: 'мес.',
    gifts: 'Подарки Telegram: цена указана на карточке подарка в боте и мини-приложении до оплаты.',
    fees: 'Цены указаны в узбекских сумах (UZS), включают все комиссии сервиса. Оплата в рублях производится по сумме, показанной на экране оплаты.',
    pack: 'Пакет',
    price: 'Цена',
  },
  uz: {
    intro: "{brand} amaldagi narxlari. To'lanadigan summa doimo to'lovdan oldin ko'rsatiladi; ustidan komissiya yo'q.",
    stars: 'Telegram Stars',
    premium: 'Telegram Premium',
    months: 'oy',
    gifts: "Telegram sovg'alari: narx bot va mini-ilovadagi sovg'a kartochkasida to'lovdan oldin ko'rsatilgan.",
    fees: "Narxlar o'zbek so'mida (UZS) ko'rsatilgan va barcha xizmat komissiyalarini o'z ichiga oladi.",
    pack: 'Paket',
    price: 'Narx',
  },
  en: {
    intro: 'Current {brand} prices. The amount to pay is always shown before payment; no fees on top.',
    stars: 'Telegram Stars',
    premium: 'Telegram Premium',
    months: 'months',
    gifts: 'Telegram gifts: the price is shown on the gift card in the bot and mini app before payment.',
    fees: 'Prices are in Uzbek som (UZS) and include all service fees. Payment in roubles uses the amount shown on the payment screen.',
    pack: 'Package',
    price: 'Price',
  },
};

export const SUPPORT_TEXT: Record<Lang, { intro: string; telegram: string; email: string; hours: string; tip: string }> = {
  ru: {
    intro: 'Мы отвечаем на вопросы по заказам, оплате и возвратам.',
    telegram: 'Telegram',
    email: 'Email',
    hours: 'Ежедневно, ответ обычно в течение 1 часа (09:00-23:00 по Ташкенту), письма в течение 1 рабочего дня.',
    tip: 'Чтобы мы помогли быстрее, укажите номер заказа и username получателя.',
  },
  uz: {
    intro: "Buyurtmalar, to'lov va qaytarish bo'yicha savollarga javob beramiz.",
    telegram: 'Telegram',
    email: 'Email',
    hours: "Har kuni, javob odatda 1 soat ichida (Toshkent vaqti bilan 09:00-23:00), xatlar 1 ish kuni ichida.",
    tip: "Tezroq yordam berishimiz uchun buyurtma raqami va qabul qiluvchi username'ini yozing.",
  },
  en: {
    intro: 'We answer questions about orders, payments and refunds.',
    telegram: 'Telegram',
    email: 'Email',
    hours: 'Daily, usually within 1 hour (09:00-23:00 Tashkent time); emails within 1 business day.',
    tip: 'To help faster, include the order number and the recipient username.',
  },
};
