const produkData = [
  {
    id: "iphone",
    nama: "iPhone 15 Pro 128GB Titanium",
    kategori: "apple",
    harga: 18999000,
    keterangan:
      "Kamera utama 48MP Pro dengan sensor canggih. chip A17 Pro super cepat untuk gaming berat, bodi berbahan titanium kelas dirgantara, serta port USB-C universal berkecepatan tinggi.",
    badge: "PROMO UTAMA iBox",
    kategoriLabel: "Featured Phone",
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSeKST8mwMApwkkmIZGHVwW17vvs46Hr6Hp7JUZSQw0B54Y_skaXLVvQYJ&s=10",
    tags: [
      "A17 Pro",
      "Titanium",
      "5G Ready",
      "Dynamic Island",
      "ProRes Video",
      "USB-C 3.0",
    ],
    spesifikasi:
      "Layar 6.1 Super Retina XDR, Chipset A17 Pro, Kamera 48MP + 12MP + 12MP, USB-C mendukung USB 3.",
  },
  {
    id: "samsung",
    nama: "Samsung Galaxy S24 256GB",
    kategori: "samsung",
    harga: 13499000,
    keterangan:
      "Fitur cerdas Galaxy AI, layar Dynamic AMOLED 2X super cerah, dan performa baterai awet sepanjang hari untuk menunjang aktivitas harian.",
    badge: "GARANSI TAM",
    kategoriLabel: "Android Phone",
    imgSrc:
      "https://harperandblake.co.uk/cdn/shop/articles/Samsung_Galaxy_Cover_Image_44ff2622-3620-4260-abbd-cb1a5d6beeb9.jpg?v=1666703229",
    tags: [
      "Galaxy AI",
      "Exynos 2400",
      "AMOLED 2X",
      "50MP Camera",
      "IP68 Waterproof",
      "Super Fast Charge",
    ],
    spesifikasi:
      "Layar 6.2 inch Dynamic AMOLED 2X 120Hz, RAM 8GB, Baterai 4000 mAh, Fast Charging 25W.",
  },
  {
    id: "powerbank",
    nama: "Powerbank Anker 10k PD",
    kategori: "anker",
    harga: 349000,
    keterangan:
      "Powerbank mungil berkecepatan 30W Power Delivery dengan kabel Type-C built-in yang praktis untuk pengisian daya dimana saja.",
    badge: "PILIHAN",
    kategoriLabel: "Power Accessories",
    imgSrc:
      "https://mobile2000.com/cdn/shop/files/imgi_40_1-anker-power-bank-10k-225w-white-1744730504.webp?v=1776686429",
    tags: [
      "10000mAh",
      "30W PD",
      "Built-in Cable",
      "PowerIQ 3.0",
      "Trickle Charge",
      "Ultra Compact",
    ],
    spesifikasi:
      "Kapasitas 10000mAh, Output max 30W, Port USB-C & USB-A, Mendukung Quick Charge.",
  },
  {
    id: "tws",
    nama: "TWS Soundcore R50i",
    kategori: "audio",
    harga: 199000,
    keterangan:
      "TWS bluetooth dengan bass mantap, tahan cipratan air IPX5, dan total daya baterai awet hingga 30 jam bersama charging case.",
    badge: "STOK TERBATAS",
    kategoriLabel: "Audio Gadget",
    imgSrc:
      "https://soundcore.ph/cdn/shop/files/A3959H11-r50iBlack-ProductFrame1.webp?v=1775643893",
    tags: [
      "Bluetooth 5.3",
      "IPX5 Water",
      "30h Playtime",
      "10mm Drivers",
      "BassUp Tech",
      "Soundcore App",
    ],
    spesifikasi:
      "Driver 10mm dengan BassUp, Bluetooth 5.3, IPX5 Water Resistant, Baterai 30 jam total.",
  },
];
let state = {
  searchQuery: "",
  kategoriAktif: "semua",
  keranjang: [],
};

function updateLiveClock() {
  const clockElement = document.getElementById("live-clock");
  if (clockElement) {
    const now = new Date();
    const jam = String(now.getHours()).padStart(2, "0");
    const menit = String(now.getMinutes()).padStart(2, "0");
    const detik = String(now.getSeconds()).padStart(2, "0");
    clockElement.textContent = `${jam}:${menit}:${detik} WIB`;
  }
}
setInterval(updateLiveClock, 1000);

const bigContainer = document.querySelector(".big-container");
const catalogSection = document.querySelector(".catalog-section");
const cartBtn = document.getElementById("cart-btn");
const cartCounter = document.getElementById("cart-counter");
const cartModal = document.getElementById("cart-modal");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartItemsContainer = document.getElementById("cart-items-container");
const cartTotalPrice = document.getElementById("cart-total-price");
const checkoutBtn = document.getElementById("checkout-btn");

let searchInput, infoCounter, emptyState;
function setupSearchAndEmptyState() {
  if (catalogSection && !document.getElementById("search-input")) {
    const wrapper = document.createElement("div");
    wrapper.style.marginBlock = "1.5rem";
    wrapper.innerHTML = `
      <input type="text" id="search-input" placeholder="🔍 Cari handphone, kategori, atau tag..." style="width: 100%; padding: 0.9rem 1.2rem; border-radius: 0.8rem; border: 1px solid #cbd5e1; font-size: 1rem; outline: none; background: white; font-family: 'Inter', sans-serif;" />
      <p id="info-counter" style="margin-top: 0.5rem; font-size: 0.9rem; color: #64748b; font-weight: 500;"></p>
    `;
    catalogSection.appendChild(wrapper);
  }
  if (bigContainer && !document.getElementById("empty-state")) {
    emptyState = document.createElement("div");
    emptyState.id = "empty-state";
    emptyState.hidden = true;
    emptyState.style.cssText =
      "text-align: center; padding: 4rem; width: 100%; grid-column: 1 / -1;";
    emptyState.innerHTML = `
      <h3 style="color: #334155; font-size: 1.5rem;">Produk Tidak Ditemukan</h3>
      <p style="color: #64748b; margin-top: 0.5rem;">Coba kata kunci pencarian atau kategori lain yang sesuai.</p>
    `;
    bigContainer.parentNode.insertBefore(emptyState, bigContainer.nextSibling);
  }

  searchInput = document.getElementById("search-input");
  infoCounter = document.getElementById("info-counter");
  emptyState = document.getElementById("empty-state");
}

function renderProduk(data) {
  if (!bigContainer) return;
  bigContainer.innerHTML = "";

  const fragment = document.createDocumentFragment(); // Menggunakan DocumentFragment sesuai README[cite: 2, 5]

  if (data.length === 0) {
    if (emptyState) emptyState.hidden = false;
    if (infoCounter)
      infoCounter.textContent = `Menampilkan 0 dari ${produkData.length} produk`;
    return;
  } else {
    if (emptyState) emptyState.hidden = true;
  }

  if (infoCounter) {
    infoCounter.textContent = `Menampilkan ${data.length} dari ${produkData.length} produk`;
  }

  data.forEach((produk) => {
    const productCard = document.createElement("div");
    productCard.className = `product ${produk.id}-container`;

    const topFont = document.createElement("div");
    topFont.className = "top-font";

    const topLeft = document.createElement("span");
    topLeft.className = `topleft-font ${produk.id === "samsung" || produk.id === "tws" ? "blue-font" : ""}`;
    topLeft.textContent = produk.badge; // Menggunakan textContent sesuai README[cite: 2, 5]

    const topRight = document.createElement("p");
    topRight.className = "topright-font";
    topRight.textContent = produk.kategoriLabel;

    topFont.appendChild(topLeft);
    topFont.appendChild(topRight);

    const imageContainer = document.createElement("div");
    imageContainer.className = "image-container";
    const img = document.createElement("img");
    img.className = "image";
    img.src = produk.imgSrc;
    img.alt = produk.nama;
    imageContainer.appendChild(img);

    const keterangan = document.createElement("div");
    keterangan.className = "keterangan";

    const priceFont = document.createElement("h3");
    priceFont.className = "price-font";
    priceFont.textContent = `Rp ${produk.harga.toLocaleString("id-ID")}`;

    const kataKata = document.createElement("div");
    kataKata.className = "kata-kata";

    const strongName = document.createElement("p");
    const strongTag = document.createElement("strong");
    strongTag.textContent = produk.nama;
    strongName.appendChild(strongTag);

    const descP = document.createElement("p");
    descP.textContent = produk.keterangan;

    kataKata.appendChild(strongName);
    kataKata.appendChild(descP);
    keterangan.appendChild(priceFont);
    keterangan.appendChild(kataKata);

    const tagsDiv = document.createElement("div");
    tagsDiv.className = "tags";
    const ulTag = document.createElement("ul");
    ulTag.style.cssText =
      "display: flex; flex-wrap: wrap; gap: 8px; list-style: none; padding: 0;";

    produk.tags.forEach((t) => {
      const spanTag = document.createElement("span");
      spanTag.className = "detail-list";
      spanTag.textContent = t;
      ulTag.appendChild(spanTag);
    });
    tagsDiv.appendChild(ulTag);

    const specDetail = document.createElement("p");
    specDetail.className = "produk-spec-detail";
    specDetail.textContent = `Spesifikasi Lengkap: ${produk.spesifikasi}`;
    specDetail.hidden = true;
    specDetail.style.cssText =
      "margin-top: 1rem; padding: 0.8rem; background-color: #f8fafc; border-radius: 0.5rem; font-size: 0.9rem; color: #334155;";

    const specialInteraction = document.createElement("div");
    specialInteraction.className = "special-interaction";

    const buyBtn = document.createElement("button");
    buyBtn.className = "buy-container btn-aksi-beli";
    buyBtn.dataset.id = produk.id;
    buyBtn.style.cssText = "border: none; cursor: pointer; text-align: center;";
    buyBtn.textContent = "Beli Sekarang";

    const specBtn = document.createElement("button");
    specBtn.className = "spesifikasi-container btn-aksi-spec";
    specBtn.dataset.id = produk.id;
    specBtn.style.cssText =
      "border: 1px solid #e3e3e3; cursor: pointer; text-align: center;";
    specBtn.setAttribute("aria-expanded", "false");
    specBtn.textContent = "Spesifikasi";

    specialInteraction.appendChild(buyBtn);
    specialInteraction.appendChild(specBtn);

    productCard.appendChild(topFont);
    productCard.appendChild(imageContainer);
    productCard.appendChild(keterangan);
    productCard.appendChild(tagsDiv);
    productCard.appendChild(specDetail);
    productCard.appendChild(specialInteraction);

    fragment.appendChild(productCard);
  });

  bigContainer.appendChild(fragment);
}

function filterDanRender() {
  let hasil = produkData;

  if (state.kategoriAktif !== "semua") {
    hasil = hasil.filter((item) => item.kategori === state.kategoriAktif);
  }

  if (state.searchQuery.trim() !== "") {
    const q = state.searchQuery.toLowerCase();
    hasil = hasil.filter(
      (item) =>
        item.nama.toLowerCase().includes(q) ||
        item.kategori.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q)),
    );
  }

  renderProduk(hasil);
}

function tambahKeKeranjang(idProduk) {
  const produk = produkData.find((p) => p.id === idProduk);
  if (!produk) return;

  const itemAda = state.keranjang.find((item) => item.id === idProduk);
  if (itemAda) {
    itemAda.qty++;
  } else {
    state.keranjang.push({ ...produk, qty: 1 });
  }

  updateCartUI();
}

function ubahQty(idProduk, jumlah) {
  const item = state.keranjang.find((i) => i.id === idProduk);
  if (!item) return;

  item.qty += jumlah;
  if (item.qty <= 0) {
    state.keranjang = state.keranjang.filter((i) => i.id !== idProduk);
  }

  updateCartUI();
  renderCartModalItems();
}

function updateCartUI() {
  const totalCount = state.keranjang.reduce((sum, item) => sum + item.qty, 0);
  if (cartCounter) {
    cartCounter.textContent = totalCount;
    cartCounter.classList.add("pulse-animation");
    setTimeout(() => cartCounter.classList.remove("pulse-animation"), 300);
  }
}

function renderCartModalItems() {
  if (!cartItemsContainer) return;
  cartItemsContainer.innerHTML = "";

  if (state.keranjang.length === 0) {
    cartItemsContainer.innerHTML = `<p style="text-align: center; color: #64748b; padding: 1rem;">Keranjang belanja kamu masih kosong.</p>`;
    if (cartTotalPrice) cartTotalPrice.textContent = "Total: Rp 0";
    return;
  }

  let totalHarga = 0;

  state.keranjang.forEach((item) => {
    totalHarga += item.harga * item.qty;

    const row = document.createElement("div");
    row.style.cssText =
      "display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid #f1f5f9;";

    row.innerHTML = `
      <div style="flex: 1;">
        <p style="font-weight: 600; font-size: 0.9rem;">${item.nama}</p>
        <p style="font-size: 0.8rem; color: #64748b;">Rp ${item.harga.toLocaleString("id-ID")}</p>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <button class="btn-kurang" data-id="${item.id}" style="padding: 2px 8px; cursor: pointer; border: 1px solid #cbd5e1; border-radius: 4px;">-</button>
        <span style="font-size: 0.9rem; font-weight: bold;">${item.qty}</span>
        <button class="btn-tambah" data-id="${item.id}" style="padding: 2px 8px; cursor: pointer; border: 1px solid #cbd5e1; border-radius: 4px;">+</button>
      </div>
    `;
    cartItemsContainer.appendChild(row);
  });

  if (cartTotalPrice) {
    cartTotalPrice.textContent = `Total: Rp ${totalHarga.toLocaleString("id-ID")}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupSearchAndEmptyState();
  renderProduk(produkData);

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      filterDanRender();
    });

    searchInput.addEventListener("focus", (e) => {
      e.target.style.borderColor = "#2563eb";
      e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.15)";
    });

    searchInput.addEventListener("blur", (e) => {
      e.target.style.borderColor = "#cbd5e1";
      e.target.style.boxShadow = "none";
    });
  }

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-aksi-spec")) {
      const card = e.target.closest(".product");
      const specDetail = card.querySelector(".produk-spec-detail");

      if (specDetail) {
        const isHidden = specDetail.hidden;
        specDetail.hidden = !isHidden;
        e.target.setAttribute("aria-expanded", isHidden ? "true" : "false");
        e.target.textContent = isHidden ? "Sembunyikan" : "Spesifikasi";
      }
    }

    if (e.target.classList.contains("btn-aksi-beli")) {
      tambahKeKeranjang(e.target.dataset.id);
    }

    const brandCard = e.target.closest(".brand-card");
    if (brandCard) {
      if (brandCard.classList.contains("apple-logo"))
        state.kategoriAktif = "apple";
      else if (brandCard.classList.contains("samsung-logo"))
        state.kategoriAktif = "samsung";
      else if (
        brandCard.classList.contains("sony-logo") ||
        brandCard.classList.contains("oneplus-logo")
      )
        state.kategoriAktif = "audio";
      else state.kategoriAktif = "semua";

      filterDanRender();
    }

    if (e.target.classList.contains("btn-kurang")) {
      ubahQty(e.target.dataset.id, -1);
    }

    if (e.target.classList.contains("btn-tambah")) {
      ubahQty(e.target.dataset.id, 1);
    }
  });

  if (cartBtn && cartModal) {
    cartBtn.addEventListener("click", () => {
      renderCartModalItems();
      cartModal.hidden = false;
      cartModal.style.display = "flex";
    });
  }

  if (closeModalBtn && cartModal) {
    closeModalBtn.addEventListener("click", () => {
      cartModal.hidden = true;
      cartModal.style.display = "none";
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (state.keranjang.length === 0) {
        alert("Keranjang kamu masih kosong!");
        return;
      }
      alert(
        "Terima kasih! Pesanan gadget kamu berhasil diproses ke pembayaran.",
      );
      state.keranjang = [];
      updateCartUI();
      cartModal.hidden = true;
      cartModal.style.display = "none";
    });
  }
});
