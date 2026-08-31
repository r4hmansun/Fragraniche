/**
 * FRAGRANICHE - HAUTE PARFUMERIE JAVASCRIPT
 * 
 * CARA MENGEDIT DATA & GAMBAR PARFUM:
 * Anda dapat mengedit judul, harga, aroma notes, atau mengganti path gambar
 * pada daftar array `PRODUCTS` di bawah ini.
 * Contoh mengganti gambar lokal: image: 'images/nama-foto.jpg'
 */

// ==========================================
// 1. DATA KATALOG PARFUM (EDITABLE)
// ==========================================
const PRODUCTS = [
    {
        id: 'frag-1',
        title: 'Midnight Amber',
        category: 'Woody & Oud',
        concentration: 'Extrait de Parfum',
        price: 285,
        subtitle: 'A deep, intoxicating blend of rare agarwood and dark velvet rose.',
        image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
        topNotes: 'Black Pepper, Italian Bergamot, Saffron',
        heartNotes: 'Turkish Damask Rose, Smoked Cedarwood',
        baseNotes: 'Aged Cambodian Oud, Ambergris, Bourbon Vanilla',
        description: 'Midnight Amber captures the mystical allure of twilight in the Orient. Formulated with exceptional 30% fragrance oil concentration, it reveals smoldering resinous oud kissed with dark floral elegance.'
    },
    {
        id: 'frag-2',
        title: 'Velvet Vanilla',
        category: 'Gourmand & Vanilla',
        concentration: 'Eau de Parfum Intense',
        price: 240,
        subtitle: 'Warm Madagascar bourbon vanilla laced with spiced cardamom and honeyed tonka.',
        image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80',
        topNotes: 'Cardamom, Bitter Almond, Candied Orange',
        heartNotes: 'Bourbon Vanilla Bean, Heliotrope, Cacao',
        baseNotes: 'Tonka Bean, Creamy Sandalwood, White Musk',
        description: 'An opulent gourmand masterpiece that balances comforting warmth with sophisticated spice. Velvet Vanilla envelops the wearer in an intoxicating, edible golden aura.'
    },
    {
        id: 'frag-3',
        title: 'Citrus Solstice',
        category: 'Fresh & Citrus',
        concentration: 'Extrait de Parfum',
        price: 220,
        subtitle: 'Bright sun-drenched bergamot and neroli capturing the luminous warmth of summer.',
        image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=600&q=80',
        topNotes: 'Calabrian Bergamot, Pink Grapefruit, Mandarin',
        heartNotes: 'Tunisian Neroli, Petitgrain, Orange Blossom',
        baseNotes: 'Haitian Vetiver, Cedar, Solar Ambroxan',
        description: 'A burst of high-noon radiance. Citrus Solstice elevates Mediterranean citrus botanicals with a mineral woody foundation that stays vibrant on skin for over 10 hours.'
    },
    {
        id: 'frag-4',
        title: 'Oud Royale',
        category: 'Woody & Oud',
        concentration: 'Pure Extrait de Parfum',
        price: 340,
        subtitle: 'The majestic complexity of 20-year aged wild agarwood and golden labdanum.',
        image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80',
        topNotes: 'Smoked Frankincense, Nutmeg, Thyme',
        heartNotes: 'Wild Assam Oud, Patchouli, Leather',
        baseNotes: 'Labdanum, Civet Accord, Birch Tar, Myrrh',
        description: 'Revered across royal courts, Oud Royale is the pinnacle of artisanal perfumery. Dark, noble, and multi-faceted with dry woods, warm resin, and deep balsamic undertones.'
    },
    {
        id: 'frag-5',
        title: 'White Jasmine',
        category: 'Floral',
        concentration: 'Eau de Parfum',
        price: 260,
        subtitle: 'A delicate, ethereal white floral arrangement harvested under moonlight in Grasse.',
        image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80',
        topNotes: 'Grasse Jasmine Petals, Dewy Green Leaves',
        heartNotes: 'Tuberose Absolute, Magnolia, Gardenia',
        baseNotes: 'Silk Musk, Cashmeran, Virginia Cedar',
        description: 'A poetic celebration of fresh white petals kissed by morning dew. Clean, romantic, yet strikingly sensual with its lush floral heart.'
    },
    {
        id: 'frag-6',
        title: 'Smoked Leather',
        category: 'Leather & Smoky',
        concentration: 'Extrait de Parfum',
        price: 295,
        subtitle: 'Rich Italian saddle leather infused with wisps of smoky cade and dark plum.',
        image: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=600&q=80',
        topNotes: 'Dark Plum, Saffron, Thyme Leaf',
        heartNotes: 'Tuscan Leather, Smoked Cade, Violet',
        baseNotes: 'Birch Tar, Amberwood, Vetiver Roots',
        description: 'Daring, raw, and undeniably charismatic. Smoked Leather wraps supple antique leather in aromatic incense and sweet liqueur nuances.'
    }
];

// ==========================================
// 2. STATE MANAGEMENT
// ==========================================
let activeCategory = 'all';
let currentQuickViewProduct = null;
let currentQuickViewSize = 50;

// ==========================================
// 3. RENDER CATALOG
// ==========================================
function renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    let filtered = PRODUCTS;

    if (activeCategory !== 'all') {
        filtered = filtered.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
    }

    grid.innerHTML = filtered.map(p => {
        const notesArr = (p.topNotes || '').split(',').slice(0, 2).map(n => n.trim()).filter(Boolean);
        const notesHtml = notesArr.map(n => `<span class="note-tag">${escapeHtml(n)}</span>`).join('');

        return `
            <div class="product-card fade-in" data-id="${p.id}">
                <div class="product-card-img-wrap">
                    <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" loading="lazy">
                    <span class="product-category-tag">${escapeHtml(p.category)}</span>
                    <div class="product-overlay-actions">
                        <button class="btn btn-gold btn-sm flex-1" onclick="openQuickView('${p.id}')">
                            Detail Aroma
                        </button>
                    </div>
                </div>
                <div class="product-card-body">
                    <span class="product-card-conc">${escapeHtml(p.concentration || 'Extrait de Parfum')}</span>
                    <h3 class="product-card-title">${escapeHtml(p.title)}</h3>
                    <p class="product-card-desc">${escapeHtml(p.subtitle)}</p>
                    <div class="product-card-notes-preview">
                        ${notesHtml}
                    </div>
                    <div class="product-card-footer">
                        <span class="product-card-price">$${p.price}</span>
                        <button class="btn btn-outline btn-sm" onclick="openQuickView('${p.id}')">
                            Lihat Notes
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ==========================================
// 4. QUICK VIEW / FRAGRANCE PYRAMID MODAL
// ==========================================
function openQuickView(productId) {
    const p = PRODUCTS.find(item => item.id === productId);
    if (!p) return;

    currentQuickViewProduct = p;
    currentQuickViewSize = 50;

    document.getElementById('qvImage').src = p.image;
    document.getElementById('qvCategoryBadge').textContent = p.category;
    document.getElementById('qvConcentration').textContent = p.concentration || 'EXTRAIT DE PARFUM';
    document.getElementById('qvTitle').textContent = p.title;
    document.getElementById('qvSubtitle').textContent = p.subtitle;
    document.getElementById('qvTopNotes').textContent = p.topNotes || 'Spices, Fresh Citrus';
    document.getElementById('qvHeartNotes').textContent = p.heartNotes || 'Floral Absolutes, Precious Woods';
    document.getElementById('qvBaseNotes').textContent = p.baseNotes || 'Amber, Musk, Fine Resins';
    document.getElementById('qvDescription').textContent = p.description || p.subtitle;

    const sizePills = document.querySelectorAll('.size-pill-group .size-pill');
    sizePills.forEach((pill, idx) => {
        if (idx === 0) pill.classList.add('active');
        else pill.classList.remove('active');
    });

    updateQuickViewPrice();
    openModal('quickViewModal');
}

function selectQuickViewSize(size, btnElement) {
    currentQuickViewSize = size;
    const parent = btnElement.parentElement;
    parent.querySelectorAll('.size-pill').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');
    updateQuickViewPrice();
}

function updateQuickViewPrice() {
    if (!currentQuickViewProduct) return;
    const basePrice = currentQuickViewProduct.price;
    const finalPrice = currentQuickViewSize === 100 ? Math.round(basePrice * 1.55) : basePrice;
    document.getElementById('qvPrice').textContent = `$${finalPrice}`;
}

// ==========================================
// 5. MODAL & TOAST HELPERS
// ==========================================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
    }, 2800);
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// ==========================================
// 6. INITIALIZATION & EVENT LISTENERS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();

    // Theme Toggle Handler (Header Sun / Moon Icon)
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const htmlElement = document.documentElement;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        htmlElement.setAttribute('data-theme', 'dark');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            showToast(`Tema diubah ke ${newTheme === 'dark' ? 'Dark Mode (Obsidian)' : 'Light Mode (Alabaster)'}.`);
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.getElementById('mainNav');
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // Category Filters
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeCategory = chip.getAttribute('data-category');
            renderProducts();
        });
    });

    // Close modals on backdrop click
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // Contact Form Submit Demo
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Mengirim Pesan...';
            btn.disabled = true;

            setTimeout(() => {
                showToast('Pesan konsultasi Anda berhasil dikirim.');
                btn.textContent = 'Pesan Terkirim';
                contactForm.reset();

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                }, 3000);
            }, 1000);
        });
    }
});
