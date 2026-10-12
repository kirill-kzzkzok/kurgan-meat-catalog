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
const savedCart = (() => {
  try {
    return JSON.parse(localStorage.getItem("kurgan-cart") || "{}");
  } catch {
    return {};
  }
})();
const cart = new Map(
    Object.entries(savedCart)
      .map(([id, qty]) => {
        const dish = dishes.find((d) => d.id === id);
        return dish ? [id, { ...dish, qty }] : null;
      })
      .filter(Boolean),
  ),
  money = (n) => new Intl.NumberFormat("ru-RU").format(n) + " ₽",
  qtyLabel = (q) => (Number.isInteger(q) ? `${q} кг` : `${q.toFixed(1)} кг`);
const menuGrid = document.getElementById("menuGrid"),
  cartItems = document.getElementById("cartItems");
function cardButton(d) {
  const item = cart.get(d.id);
  if (!item)
    return `<button class="add-btn single" data-add="${d.id}">В корзину</button>`;
  return `<div class="add-btn"><button data-minus="${d.id}" aria-label="Убавить">−</button><span class="qty">${qtyLabel(item.qty)}</span><button data-plus="${d.id}" aria-label="Добавить">+</button></div>`;
}
function persistCart() {
  localStorage.setItem(
    "kurgan-cart",
    JSON.stringify(
      Object.fromEntries([...cart].map(([id, item]) => [id, item.qty])),
    ),
  );
}
function renderMenu(filter = "all") {
  if (!menuGrid) return;
  menuGrid.innerHTML = dishes
    .map(
      (d) =>
        `<article class="dish-card ${filter !== "all" && !d.cat.includes(filter) ? "hidden" : ""}"><div class="dish-photo"><img src="${d.img}" alt="${d.name}" loading="lazy"></div><div class="dish-body"><div class="dish-top"><h3 class="dish-name">${d.name}</h3><span class="dish-price"><strong>${money(d.price).replace(" ₽", "")}</strong><small> / кг</small></span></div><p class="dish-desc">${d.desc}</p>${cardButton(d)}</div></article>`,
    )
    .join("");
  menuGrid
    .querySelectorAll("[data-add]")
    .forEach((b) => (b.onclick = () => addToCart(b.dataset.add)));
  menuGrid
    .querySelectorAll("[data-minus]")
    .forEach((b) => (b.onclick = () => changeQty(b.dataset.minus, -0.5)));
  menuGrid
    .querySelectorAll("[data-plus]")
    .forEach((b) => (b.onclick = () => changeQty(b.dataset.plus, 0.5)));
}
function addToCart(id) {
  const item = cart.get(id);
  if (item) item.qty += 1;
  else cart.set(id, { ...dishes.find((d) => d.id === id), qty: 1 });
  persistCart();
  renderCart();
  renderMenu(currentFilter);
  showToast();
}
function changeQty(id, delta) {
  const item = cart.get(id);
  if (!item) return;
  item.qty = Math.round((item.qty + delta) * 2) / 2;
  if (item.qty <= 0) cart.delete(id);
  persistCart();
  renderCart();
  renderMenu(currentFilter);
}
function totals() {
  let total = 0;
  cart.forEach((i) => (total += i.price * i.qty));
  return { count: cart.size, total };
}
function renderCart() {
  const { count, total } = totals();
  [
    "headerCount",
    "mobileHeaderCount",
    "drawerCount",
    "mobileCartCount",
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = count;
      el.classList.toggle("is-empty", count === 0);
    }
  });
  document.getElementById("cartTotal").textContent = money(total);
  document.getElementById("mobileCartTotal").textContent = money(total);
  document
    .getElementById("mobileCartBar")
    .classList.toggle("visible", count > 0);
  document.getElementById("cartEmpty").style.display = cart.size
    ? "none"
    : "flex";
  cartItems.innerHTML = [...cart.values()]
    .map(
      (i) =>
        `<div class="cart-row"><img src="${i.img}" alt="${i.name}"><div><h4>${i.name}</h4><small>${qtyLabel(i.qty)}</small><div class="qty-control"><button data-minus="${i.id}">−</button><span>${qtyLabel(i.qty)}</span><button data-plus="${i.id}">+</button></div></div><div class="cart-row-price">${money(i.price * i.qty)}</div></div>`,
    )
    .join("");
  cartItems
    .querySelectorAll("[data-minus]")
    .forEach((b) => (b.onclick = () => changeQty(b.dataset.minus, -0.5)));
  cartItems
    .querySelectorAll("[data-plus]")
    .forEach((b) => (b.onclick = () => changeQty(b.dataset.plus, 0.5)));
}
function openCart() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("cartDrawer").setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartDrawer").setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
function showToast() {
  const t = document.getElementById("toast");
  t.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => t.classList.remove("show"), 1500);
}
let currentFilter = "all";
renderMenu();
renderCart();
document.querySelectorAll(".category-tab").forEach(
  (tab) =>
    (tab.onclick = () => {
      currentFilter = tab.dataset.filter;
      document
        .querySelectorAll(".category-tab")
        .forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      renderMenu(currentFilter);
    }),
);
document.getElementById("cartTrigger").onclick = openCart;
document.getElementById("mobileCartIcon").onclick = openCart;
document.getElementById("mobileCartBar").onclick = openCart;
document.getElementById("closeCart").onclick = closeCart;
document.getElementById("cartOverlay").onclick = closeCart;
const phoneTrigger = document.getElementById("phoneTrigger"),
  phonePopover = document.getElementById("phonePopover");
phoneTrigger.onclick = (e) => {
  e.stopPropagation();
  const isOpen = phonePopover.classList.toggle("open");
  phoneTrigger.setAttribute("aria-expanded", String(isOpen));
};
phonePopover.onclick = (e) => e.stopPropagation();
document.addEventListener("click", () => {
  phonePopover.classList.remove("open");
  phoneTrigger.setAttribute("aria-expanded", "false");
});
const checkoutContact = document.getElementById("checkoutContact");
document.getElementById("checkout").onclick = () => {
  if (!cart.size) {
    showToast();
    return;
  }
  checkoutContact.hidden = false;
  document.getElementById("checkout").hidden = true;
};
