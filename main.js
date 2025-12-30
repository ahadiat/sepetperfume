
    // --- Logic State ---
    let cart = [];
    const WHATSAPP_NUMBER = "601168396560";

    // --- Navigation Logic ---
    function toggleMenu() {
        const nav = document.getElementById('navLinks');
        const icon = document.querySelector('.burger i');
        nav.classList.toggle('active');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    }

    // Close menu when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('navLinks').classList.remove('active');
            const icon = document.querySelector('.burger i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });

    // --- Product Logic ---
    function updateUIPrice(id) {
        const selected = document.querySelector(`input[name="${id}"]:checked`);
        const price = selected.getAttribute('data-price');
        document.getElementById(`price-${id}`).innerText = `RM ${price}.00`;
    }

    function addToCart(name, id) {
        const selected = document.querySelector(`input[name="${id}"]:checked`);
        const size = selected.value;
        const price = parseInt(selected.getAttribute('data-price'));

        cart.push({ name, size, price });
        renderCart();
        
        // Auto-open cart on add
        const drawer = document.getElementById('cart-drawer');
        if(drawer.classList.contains('minimized')) toggleCart();
    }

    // --- Cart Logic ---
    function toggleCart() {
        const drawer = document.getElementById('cart-drawer');
        const icon = document.getElementById('cart-toggle-icon');
        drawer.classList.toggle('minimized');
        icon.classList.toggle('fa-expand-alt');
        icon.classList.toggle('fa-compress-alt');
    }

    function renderCart() {
        const container = document.getElementById('cart-items');
        const count = document.getElementById('cart-count');
        const totalDisp = document.getElementById('cart-total');
        const footer = document.getElementById('cart-footer');

        count.innerText = cart.length;
         

        if (cart.length === 0) {
            container.innerHTML = '<p style="text-align:center; color:#999; margin-top:20px;">Your bag is empty.</p>';
            footer.style.display = 'none';
        } else {
            footer.style.display = 'block';
            container.innerHTML = cart.map((item, index) => `
                <div class="cart-item">
                    <div>
                        <p style="font-weight:600; font-size:0.85rem;">${item.name}</p>
                        <p style="font-size:0.7rem; color:var(--gold)">Size: ${item.size}</p>
                    </div>
                    <div style="text-align:right">
                        <p style="font-size:0.85rem">RM ${item.price}</p>
                        <button onclick="removeItem(${index})" style="background:none; border:none; color:red; cursor:pointer; font-size:0.7rem">Remove</button>
                    </div>
                </div>
            `).join('');

            const total = cart.reduce((sum, item) => sum + item.price, 0);
            totalDisp.innerText = `RM ${total}.00`;
        }
    }

    function removeItem(index) {
        cart.splice(index, 1);
        renderCart();
    }

    // --- WhatsApp Integrations ---
    function checkoutWhatsApp() {
        if (cart.length === 0) return;
        
        let msg = "*NEW ORDER - SEPET PERFUME*%0a";
        msg += "----------------------------%0a";
        cart.forEach((item, i) => {
            msg += `${i+1}. ${item.name} (${item.size}) - RM ${item.price}%0a`;
        });
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        msg += "----------------------------%0a";
        msg += `*TOTAL: RM ${total}.00*%0a%0aSila sahkan pesanan saya. Terima kasih!`;
        
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
    }

    function sendInquiry() {
        const name = document.getElementById('contact-name').value;
        const note = document.getElementById('contact-message').value;
        const msg = `Salam Zila, saya *${name}* ingin bertanya:%0a%0a${note}`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
    }


    function setLanguage(lang) {
    // 1. Kemaskini butang aktif
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${lang}`).classList.add('active');

    // 2. Cari semua elemen yang ada atribut data-en / data-ms
    const elements = document.querySelectorAll('[data-ms]');

    elements.forEach(el => {
        const translation = el.getAttribute(`data-${lang}`);
        if (translation) {
            el.innerText = translation;
        }
    });

    // 3. Simpan pilihan user dalam browser (Local Storage)
    localStorage.setItem('preferredLang', lang);
}

// Jalankan bahasa pilihan bila website dibuka
window.onload = () => {
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    setLanguage(savedLang);
};







document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("cookieConsent")) {
        setTimeout(() => {
            document.getElementById("cookie-banner").classList.add("show");
        }, 600); // delay for smooth effect
    }
});

function acceptCookies() {
    localStorage.setItem("cookieConsent", "accepted");
    closeCookieBanner();
}

function declineCookies() {
    localStorage.setItem("cookieConsent", "declined");
    closeCookieBanner();
}

function closeCookieBanner() {
    const banner = document.getElementById("cookie-banner");
    banner.classList.remove("show");

    setTimeout(() => {
        banner.style.display = "none";
    }, 500);
}








  window.addEventListener("load", () => {
    setTimeout(() => {
      document.getElementById("promo-popup").classList.add("show");
    }, 800); // delay popup
  });

  function closePopup() {
    document.getElementById("promo-popup").classList.remove("show");
  }

