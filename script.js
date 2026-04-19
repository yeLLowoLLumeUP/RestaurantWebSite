// Menü Verileri
const menuItems = [
    {
        id: 1,
        title: 'Izgara Köfte',
        category: 'ana-yemek',
        price: '240 TL',
        img: 'https://images.unsplash.com/photo-1555992336-03a23c687d87?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80',
        desc: 'Özel baharatlarla hazırlanmış, közlenmiş biber ve domates eşliğinde.'
    },
    {
        id: 2,
        title: 'Mercimek Çorbası',
        category: 'baslangic',
        price: '85 TL',
        img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80',
        desc: 'Tereyağlı sos ve çıtır ekmek ile servis edilir.'
    },
    {
        id: 3,
        title: 'Fıstıklı Baklava',
        category: 'tatli',
        price: '180 TL',
        img: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80',
        desc: 'Gaziantep fıstığı ve çıtır hamur ile hazırlanan klasik tatlı.'
    },
    {
        id: 4,
        title: 'Taze Sıkma Portakal Suyu',
        category: 'icecek',
        price: '95 TL',
        img: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80',
        desc: 'Günlük taze portakallardan sıkılmış, enerji veren serinletici lezzet.'
    },
    {
        id: 5,
        title: 'Kuzu İncik',
        category: 'ana-yemek',
        price: '420 TL',
        img: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80',
        desc: 'Ağır ateşte pişirilmiş ve patates püresi ile servis edilen özel tabak.'
    },
    {
        id: 6,
        title: 'Humus',
        category: 'baslangic',
        price: '110 TL',
        img: 'https://images.unsplash.com/photo-1523986371872-9d3ba2e2f5b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80',
        desc: 'Sızma zeytinyağı ve baharatlarla zenginleştirilmiş, kremamsı başlangıç.'
    }
];

const menuGrid = document.getElementById('menu-grid');
const filterBtns = document.querySelectorAll('.tab-btn');
const resForm = document.getElementById('res-form');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navAnchors = document.querySelectorAll('.nav-links a');
const revealElements = document.querySelectorAll('.reveal');
const scrollStatus = document.getElementById('scrollStatus');
const scrollText = document.getElementById('scrollText');
const scrollProgress = document.getElementById('scrollProgress');

let lastScroll = 0;
let scrollTimeout;

window.addEventListener('DOMContentLoaded', () => {
    displayMenuItems(menuItems);
    observeRevealElements();
});

function displayMenuItems(items) {
    const displayMenu = items.map((item) => {
        return `<article class="menu-item">
            <img src="${item.img}" alt="${item.title}">
            <div class="menu-item-info">
                <div class="menu-item-header">
                    <h3>${item.title}</h3>
                    <span class="price">${item.price}</span>
                </div>
                <p>${item.desc}</p>
            </div>
        </article>`;
    }).join('');

    menuGrid.innerHTML = displayMenu;
}

filterBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach((button) => button.classList.remove('active'));
        e.currentTarget.classList.add('active');

        const category = e.currentTarget.dataset.filter;
        const selectedItems = category === 'all'
            ? menuItems
            : menuItems.filter((menuItem) => menuItem.category === category);

        displayMenuItems(selectedItems);
    });
});

resForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    if (name && date && time) {
        alert(`Sayın ${name}, ${date} tarihinde saat ${time} için rezervasyon talebiniz alınmıştır. Sizinle en kısa sürede iletişime geçeceğiz.`);
        resForm.reset();
    }
});

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

navAnchors.forEach((link) => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const direction = currentScroll > lastScroll ? 'down' : 'up';
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(100, (currentScroll / maxScroll) * 100) : 0;

    scrollProgress.style.width = `${progress}%`;
    scrollStatus.classList.add('visible');
    scrollStatus.classList.toggle('down', direction === 'down');
    scrollStatus.classList.toggle('up', direction === 'up');
    scrollText.textContent = direction === 'down' ? 'Aşağı iniliyor' : 'Yukarı çıkılıyor';

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        scrollStatus.classList.remove('visible');
    }, 1700);

    lastScroll = Math.max(currentScroll, 0);
});

function observeRevealElements() {
    const options = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    revealElements.forEach((el) => observer.observe(el));
}
