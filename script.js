// KURGAN — каталог домашней еды: меню, фильтр категорий и корзина.

const dishes = [
  {
    id: "manti-lamb",
    name: "Манты с бараниной",
    desc: "Баранина, лук, зира",
    price: 890,
    img: "assets/manti-lamb.png",
    cat: ["manti", "lamb"],
  },
  {
    id: "manti-pork",
    name: "Манты со свининой",
    desc: "Свинина, лук, перец",
    price: 790,
    img: "assets/manti-pork.png",
    cat: ["manti", "pork"],
  },
  {
    id: "manti-mix",
    name: "Манты ассорти",
    desc: "Баранина и свинина",
    price: 840,
    img: "assets/manti-mix.png",
    cat: ["manti", "lamb", "pork"],
  },
  {
    id: "khinkali-beef",
    name: "Хинкали с говядиной",
    desc: "Бульон внутри, тонкое тесто",
    price: 850,
    img: "assets/khinkali-beef.png",
    cat: ["khinkali"],
  },
  {
    id: "khinkali-lamb",
    name: "Хинкали с бараниной",
    desc: "Мясо, кинза, перец",
    price: 920,
    img: "assets/khinkali-lamb.png",
    cat: ["khinkali", "lamb"],
  },
  {
    id: "khinkali-mix",
    name: "Хинкали ассорти",
    desc: "Три вкуса в одной подаче",
    price: 880,
    img: "assets/khinkali-mix.png",
    cat: ["khinkali", "lamb", "pork"],
  },
  {
    id: "shashlik-pork",
    name: "Шашлык из свинины",
    desc: "Шея, маринад, угли",
    price: 990,
    img: "assets/shashlik-pork.png",
    cat: ["shashlik", "pork"],
  },
  {
    id: "shashlik-lamb",
    name: "Шашлык из баранины",
    desc: "Корейка и дымный аромат",
    price: 1190,
    img: "assets/shashlik-lamb.png",
    cat: ["shashlik", "lamb"],
  },
  {
    id: "shashlik-mix",
    name: "Шашлык ассорти",
    desc: "Всё с мангала",
    price: 1090,
    img: "assets/shashlik-mix.png",
    cat: ["shashlik", "lamb", "pork"],
  },
  {
    id: "lamb-rack",
    name: "Каре баранины",
    desc: "Нежное мясо на кости",
    price: 1490,
    img: "assets/lamb-rack.png",
    cat: ["lamb", "shashlik"],
  },
  {
    id: "lamb-mangal",
    name: "Баранина на мангале",
    desc: "Пряная мякоть, лук",
    price: 1250,
    img: "assets/lamb-mangal.png",
    cat: ["lamb", "shashlik"],
  },
  {
    id: "pork-neck",
    name: "Свиная шея на мангале",
    desc: "Сочная корочка",
    price: 990,
    img: "assets/pork-neck.png",
    cat: ["pork", "shashlik"],
  },
  {
    id: "pork-shashlik",
    name: "Свиной шашлык",
    desc: "Классика на углях",
    price: 950,
    img: "assets/pork-shashlik.png",
    cat: ["pork", "shashlik"],
  },
];

// Ключ корзины в localStorage.
const STORAGE_KEY = "kurgan-cart";

// Корзина восстанавливается из localStorage вида { id блюда: количество кг }.
const savedCart = (() => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
})();

const cart = new Map(
  Object.entries(savedCart)
    .map(([id, qty]) => {
      const dish = dishes.find((d) => d.id === id);
      // Неизвестные id (например, после правки каталога) отбрасываем.
      return dish ? [id, { ...dish, qty }] : null;
    })
    .filter(Boolean),
);

// Цена в формате «1 250 ₽».
const money = (n) => new Intl.NumberFormat("ru-RU").format(n) + " ₽";

// Вес: целые килограммы — без дробной части, остальные — с одним знаком.
const qtyLabel = (q) =>
  Number.isInteger(q) ? `${q} кг` : `${q.toFixed(1)} кг`;

const menuGrid = document.getElementById("menuGrid");
const cartItems = document.getElementById("cartItems");
const cartDrawer = document.getElementById("cartDrawer");

function cardButton(dish) {
  const item = cart.get(dish.id);
  if (!item) {
    return `<button class="add-btn single" data-add="${dish.id}">В корзину</button>`;
  }
  return (
    `<div class="add-btn">` +
    `<button data-minus="${dish.id}" aria-label="Убавить">−</button>` +
    `<span class="qty">${qtyLabel(item.qty)}</span>` +
    `<button data-plus="${dish.id}" aria-label="Добавить">+</button>` +
    `</div>`
  );
}

function dishCard(dish, filter) {
  const isHidden = filter !== "all" && !dish.cat.includes(filter);
  return (
    `<article class="dish-card ${isHidden ? "hidden" : ""}">` +
    `<div class="dish-photo">` +
    `<img src="${dish.img}" alt="${dish.name}" loading="lazy">` +
    `</div>` +
    `<div class="dish-body">` +
    `<div class="dish-top">` +
    `<h3 class="dish-name">${dish.name}</h3>` +
    `<span class="dish-price">` +
    `<strong>${money(dish.price).replace(" ₽", "")}</strong>` +
    `<small> / кг</small>` +
    `</span>` +
    `</div>` +
    `<p class="dish-desc">${dish.desc}</p>` +
    cardButton(dish) +
    `</div>` +
    `</article>`
  );
}

function cartRow(item) {
  return (
    `<div class="cart-row">` +
    `<img src="${item.img}" alt="${item.name}">` +
    `<div>` +
    `<h4>${item.name}</h4>` +
    `<small>${qtyLabel(item.qty)}</small>` +
    `<div class="qty-control">` +
    `<button data-minus="${item.id}">−</button>` +
    `<span>${qtyLabel(item.qty)}</span>` +
    `<button data-plus="${item.id}">+</button>` +
    `</div>` +
    `</div>` +
    `<div class="cart-row-price">${money(item.price * item.qty)}</div>` +
    `</div>`
  );
}

function persistCart() {
  // В localStorage храним только пары «id → количество», без данных о блюде.
  const entries = [...cart].map(([id, item]) => [id, item.qty]);
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(Object.fromEntries(entries)),
  );
}

// Одна привязка кнопок ±0.5 кг для карточек каталога и строк корзины.
function bindQtyControls(root) {
  root.querySelectorAll("[data-minus]").forEach((button) => {
    button.onclick = () => changeQty(button.dataset.minus, -0.5);
  });
  root.querySelectorAll("[data-plus]").forEach((button) => {
    button.onclick = () => changeQty(button.dataset.plus, 0.5);
  });
}

function renderMenu(filter = "all") {
  if (!menuGrid) return; // на главной странице сетки меню нет
  menuGrid.innerHTML = dishes.map((dish) => dishCard(dish, filter)).join("");
  menuGrid.querySelectorAll("[data-add]").forEach((button) => {
    button.onclick = () => addToCart(button.dataset.add);
  });
  bindQtyControls(menuGrid);
}

function addToCart(id) {
  const item = cart.get(id);
  if (item) {
    item.qty += 1;
  } else {
    cart.set(id, { ...dishes.find((d) => d.id === id), qty: 1 });
  }
  persistCart();
  renderCart();
  renderMenu(currentFilter);
  showToast();
}

function changeQty(id, delta) {
  const item = cart.get(id);
  if (!item) return;
  // Шаг веса — 0.5 кг; округление убирает погрешность float.
  item.qty = Math.round((item.qty + delta) * 2) / 2;
  if (item.qty <= 0) cart.delete(id);
  persistCart();
  renderCart();
  renderMenu(currentFilter);
}

function totals() {
  let total = 0;
  cart.forEach((item) => (total += item.price * item.qty));
  return { count: cart.size, total };
}

function renderCart() {
  const { count, total } = totals();

  ["headerCount", "mobileHeaderCount", "drawerCount", "mobileCartCount"].forEach(
    (id) => {
      const el = document.getElementById(id);
      if (el) {
        el.textContent = count;
        el.classList.toggle("is-empty", count === 0);
      }
    },
  );

  document.getElementById("cartTotal").textContent = money(total);
  document.getElementById("mobileCartTotal").textContent = money(total);
  document
    .getElementById("mobileCartBar")
    .classList.toggle("visible", count > 0);
  document.getElementById("cartEmpty").style.display = cart.size
    ? "none"
    : "flex";

  cartItems.innerHTML = [...cart.values()].map(cartRow).join("");
  bindQtyControls(cartItems);
}

function openCart() {
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function showToast() {
  // Таймер храним на window, чтобы новый показ сбрасывал предыдущий.
  const toast = document.getElementById("toast");
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 1500);
}

// --- Обработчики ---

let currentFilter = "all";

renderMenu();
renderCart();

// Переключение категорий каталога.
document.querySelectorAll(".category-tab").forEach((tab) => {
  tab.onclick = () => {
    currentFilter = tab.dataset.filter;
    document
      .querySelectorAll(".category-tab")
      .forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    renderMenu(currentFilter);
  };
});

// Открытие и закрытие корзины.
document.getElementById("cartTrigger").onclick = openCart;
document.getElementById("mobileCartIcon").onclick = openCart;
document.getElementById("mobileCartBar").onclick = openCart;
document.getElementById("closeCart").onclick = closeCart;
document.getElementById("cartOverlay").onclick = closeCart;

// Поповер с телефоном: клик по кнопке открывает, клик вне — закрывает.
const phoneTrigger = document.getElementById("phoneTrigger");
const phonePopover = document.getElementById("phonePopover");

phoneTrigger.onclick = (event) => {
  event.stopPropagation();
  const isOpen = phonePopover.classList.toggle("open");
  phoneTrigger.setAttribute("aria-expanded", String(isOpen));
};
phonePopover.onclick = (event) => event.stopPropagation();
document.addEventListener("click", () => {
  phonePopover.classList.remove("open");
  phoneTrigger.setAttribute("aria-expanded", "false");
});

// «Оформить заказ»: заказа как такового нет — вместо кнопки показываем телефон.
const checkoutButton = document.getElementById("checkout");
const checkoutContact = document.getElementById("checkoutContact");

checkoutButton.onclick = () => {
  if (!cart.size) {
    showToast();
    return;
  }
  checkoutContact.hidden = false;
  checkoutButton.hidden = true;
};
