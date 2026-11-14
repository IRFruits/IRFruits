
/* تنظیمات ارتباطی */
const TELEGRAM_USERNAME = "YOUR_TELEGRAM_USERNAME";
const DISCORD_INVITE = "YOUR_DISCORD_INVITE";

/* لایسنس آزمایشی مدیریت */
const ADMIN_LICENSE = "IRFRUIT-ADMIN-2026";

const $ = id => document.getElementById(id);

const fruits = [
 ["Rocket","Natural","Common","🚀"],
 ["Spin","Natural","Common","🌀"],
 ["Blade","Natural","Common","🗡️"],
 ["Spring","Natural","Common","🌸"],
 ["Bomb","Natural","Common","💣"],
 ["Smoke","Elemental","Common","☁️"],
 ["Spike","Natural","Common","📌"],
 ["Flame","Elemental","Uncommon","🔥"],
 ["Ice","Elemental","Uncommon","❄️"],
 ["Sand","Elemental","Uncommon","🏜️"],
 ["Dark","Elemental","Uncommon","🌑"],
 ["Eagle","Beast","Uncommon","🦅"],
 ["Diamond","Natural","Uncommon","💎"],
 ["Light","Elemental","Rare","💡"],
 ["Rubber","Natural","Rare","🎈"],
 ["Ghost","Natural","Rare","👻"],
 ["Magma","Elemental","Rare","🌋"],
 ["Quake","Natural","Rare","🌊"],
 ["Buddha","Beast","Legendary","🪷"],
 ["Love","Natural","Legendary","💗"],
 ["Creation","Natural","Legendary","🧱"],
 ["Spider","Natural","Legendary","🕸️"],
 ["Sound","Natural","Legendary","🎵"],
 ["Phoenix","Beast","Legendary","🪽"],
 ["Portal","Natural","Legendary","🌀"],
 ["Lightning","Elemental","Legendary","⚡"],
 ["Pain","Natural","Legendary","✋"],
 ["Blizzard","Elemental","Legendary","🌨️"],
 ["Gravity","Natural","Mythical","🪐"],
 ["Mammoth","Beast","Mythical","🦣"],
 ["T-Rex","Beast","Mythical","🦖"],
 ["Dough","Elemental","Mythical","🍩"],
 ["Shadow","Natural","Mythical","🌘"],
 ["Venom","Natural","Mythical","🐍"],
 ["Gas","Elemental","Mythical","🫧"],
 ["Spirit","Natural","Mythical","👻"],
 ["Tiger","Beast","Mythical","🐅"],
 ["Yeti","Beast","Mythical","☃️"],
 ["Magnet","Natural","Mythical","🧲"],
 ["Kitsune","Beast","Mythical","🦊"],
 ["Control","Natural","Mythical","🎛️"],
 ["Dragon","Beast","Mythical","🐉"]
].map(([name,type,rarity,emoji]) => ({
  name,
  type,
  rarity,
  emoji,
  status:"available"
}));

let selectedFruit = null;
let authMode = "register";

/* بازیابی موجودی */
function loadInventory() {
  try {
    const saved = JSON.parse(
      localStorage.getItem("irfruit_inventory") || "{}"
    );

    fruits.forEach(fruit => {
      const status = saved[fruit.name];

      if (["available","unavailable","soon"].includes(status)) {
        fruit.status = status;
      }
    });
  } catch {
    console.warn("Inventory could not be loaded.");
  }
}

/* ذخیره موجودی */
function saveInventory() {
  const data = {};

  fruits.forEach(fruit => {
    data[fruit.name] = fruit.status;
  });

  localStorage.setItem("irfruit_inventory", JSON.stringify(data));
}

/* نمایش میوه‌ها */
function renderFruits() {
  const query = $("search").value.trim().toLowerCase();
  const rarity = $("rarity").value;
  const type = $("type").value;

  const filtered = fruits.filter(f =>
    f.name.toLowerCase().includes(query) &&
    (rarity === "all" || f.rarity === rarity) &&
    (type === "all" || f.type === type)
  );

  $("fruitGrid").innerHTML = "";
  $("empty").hidden = filtered.length > 0;

  filtered.forEach(f => {
    const card = document.createElement("article");
    card.className = "fruit-card";

    const emoji = document.createElement("div");
    emoji.className = "fruit-emoji";
    emoji.textContent = f.emoji;

    const title = document.createElement("h3");
    title.textContent = f.name;

    const info = document.createElement("p");
    info.className = "rarity";
    info.textContent = f.rarity + " · " + f.type;

    const status = document.createElement("span");
    status.className = "stock-status " + f.status;
    status.textContent = {
      available:"🟢 موجود",
      unavailable:"🔴 ناموجود",
      soon:"🟡 به‌زودی"
    }[f.status];

    const buy = document.createElement("button");
    buy.className = "btn primary";
    buy.textContent = "🛒 خرید این میوه";
    buy.disabled = f.status !== "available";

    buy.addEventListener("click", () => openBuy(f));

    card.append(emoji,title,info,status,buy);
    $("fruitGrid").appendChild(card);
  });
}

/* پنجره خرید */
function openBuy(fruit) {
  if (fruit.status !== "available") {
    alert("این میوه در حال حاضر موجود نیست.");
    return;
  }

  selectedFruit = fruit;

  $("buyEmoji").textContent = fruit.emoji;
  $("buyTitle").textContent = "خرید " + fruit.name;

  $("buyModal").classList.add("show");
}

/* ارتباط با تلگرام و دیسکورد */
function contact(platform) {
  if (platform === "telegram") {
    if (TELEGRAM_USERNAME === "YOUR_TELEGRAM_USERNAME") {
      alert("ابتدا نام کاربری تلگرام فروشنده را در script.js وارد کن.");
      return;
    }

    window.open(
      "tsww.ir:5266" + TELEGRAM_USERNAME,
      "_blank",
      "noopener"
    );
  }

  if (platform === "discord") {
    if (DISCORD_INVITE === "YOUR_DISCORD_INVITE") {
      alert("ابتدا لینک دعوت دیسکورد را در script.js وارد کن.");
      return;
    }

    window.open(DISCORD_INVITE, "_blank", "noopener");
  }
}

$("buyTelegram").addEventListener("click", () => contact("telegram"));
$("buyDiscord").addEventListener("click", () => contact("discord"));

/* جست‌وجو و فیلتر */
$("search").addEventListener("input", renderFruits);
$("rarity").addEventListener("change", renderFruits);
$("type").addEventListener("change", renderFruits);

/* بستن پنجره‌ها */
document.querySelectorAll("[data-close]").forEach(button => {
  button.addEventListener("click", () => {
    $(button.dataset.close).classList.remove("show");
  });
});

document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", event => {
    if (event.target === modal) {
      modal.classList.remove("show");
    }
  });
});

/* منوی موبایل */
$("menuBtn").addEventListener("click", () => {
  $("nav").classList.toggle("show");
});

document.querySelectorAll("#nav a").forEach(link => {
  link.addEventListener("click", () => {
    $("nav").classList.remove("show");
  });
});

/* ورود و ثبت‌نام نمایشی */
function updateAccount() {
  const name = sessionStorage.getItem("irfruit_user");

  $("welcome").hidden = !name;
  $("welcome").textContent = name ? "سلام، " + name : "";
  $("loginOpen").hidden = !!name;
  $("logout").hidden = !name;
}

function setAuthMode(mode) {
  authMode = mode;

  $("authTitle").textContent =
    mode === "register" ? "ثبت‌نام" : "ورود";

  $("authSubmit").textContent =
    mode === "register" ? "ثبت‌نام" : "ورود";

  $("switchText").textContent =
    mode === "register" ? "حساب داری؟" : "حساب نداری؟";

  $("switchAuth").textContent =
    mode === "register" ? "ورود" : "ثبت‌نام";

  $("authMessage").textContent = "";
}

$("loginOpen").addEventListener("click", () => {
  $("authModal").classList.add("show");
});

$("switchAuth").addEventListener("click", () => {
  setAuthMode(authMode === "register" ? "login" : "register");
});

$("authForm").addEventListener("submit", event => {
  event.preventDefault();

  const name = $("username").value.trim();
  const password = $("password").value;

  if (name.length < 3 || password.length < 4) {
    $("authMessage").textContent = "نام کاربری یا رمز کوتاه است.";
    return;
  }

  sessionStorage.setItem("irfruit_user", name);

  $("authMessage").textContent = "ورود نمایشی انجام شد.";

  updateAccount();

  setTimeout(() => {
    $("authModal").classList.remove("show");
  }, 700);
});

$("logout").addEventListener("click", () => {
  sessionStorage.removeItem("irfruit_user");
  updateAccount();
});

/* پشتیبانی */
$("supportForm").addEventListener("submit", event => {
  event.preventDefault();

  $("supportResult").textContent =
    "پیام به‌صورت آزمایشی ثبت شد؛ هنوز به تیم ارسال نشده است.";

  event.target.reset();
});

/* =========================
   اتاق مدیریت
========================= */

// باز کردن ورود مدیر
$("adminOpen").addEventListener("click", () => {
  $("adminMessage").textContent = "";
  $("adminLicense").value = "";
  $("adminLoginModal").classList.add("show");
});

// بررسی کد مدیریت
$("adminLoginBtn").addEventListener("click", () => {
  const license = $("adminLicense").value;

  if (license !== ADMIN_LICENSE) {
    $("adminMessage").textContent = "کد مدیریت اشتباه است!";
    return;
  }

  $("adminMessage").textContent = "";

  $("adminLoginModal").classList.remove("show");
  $("adminPanel").classList.add("show");

  renderAdminFruits();
});

// نمایش تمام ۴۲ میوه در پنل مدیریت
function renderAdminFruits() {
  const list = $("adminFruitList");
  list.innerHTML = "";

  fruits.forEach((fruit, index) => {
    const row = document.createElement("div");
    row.className = "admin-fruit-row";

    const name = document.createElement("strong");
    name.textContent = fruit.emoji + " " + fruit.name;

    const select = document.createElement("select");
    select.dataset.fruitIndex = index;

    const statuses = [
      ["available","موجود"],
      ["unavailable","ناموجود"],
      ["soon","به‌زودی"]
    ];

    statuses.forEach(([value,label]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      select.appendChild(option);
    });

    select.value = fruit.status;

    row.append(name,select);
    list.appendChild(row);
  });
}

// ذخیره تغییرات مدیریت
$("saveAdminChanges").addEventListener("click", () => {
  document.querySelectorAll("#adminFruitList select").forEach(select => {
    const index = Number(select.dataset.fruitIndex);

    if (fruits[index]) {
      fruits[index].status = select.value;
    }
  });

  saveInventory();
  renderFruits();

  alert("تغییرات موجودی ۴۲ میوه ذخیره شد!");
});

// اجرای اولیه سایت
loadInventory();
renderFruits();
updateAccount();
setAuthMode("register");

/* ===== IR FRUIT LOADING SYSTEM ===== */

(function () {
  const screen = document.getElementById("irLoading");
  const progress = document.getElementById("loadingProgress");
  const percent = document.getElementById("loadingPercent");

  if (!screen || !progress || !percent) return;

  let current = 0;
  let pageLoaded = document.readyState === "complete";

  window.addEventListener("load", () => {
    pageLoaded = true;
  });

  const loadingTimer = setInterval(() => {
    if (current < 90) {
      current += Math.random() * 4 + 1;
      current = Math.min(current, 90);
    }

    if (pageLoaded) {
      current = Math.min(100, current + 5);
    }

    progress.style.width = current + "%";
    percent.textContent = Math.floor(current) + "%";

    if (current >= 100) {
      clearInterval(loadingTimer);

      setTimeout(() => {
        screen.classList.add("finished");

        setTimeout(() => {
          screen.remove();
        }, 800);

      }, 400);
    }
  }, 80);
})();
