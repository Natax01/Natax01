// Sample product data
const products = [
    {
        id: 1,
        title: "لپ‌تاپ ASUS VivoBook",
        description: "لپ‌تاپ قدرتمند برای کار و تفریح با صفحه‌نمایش ۱۵.۶ اینچی",
        price: 25000000,
        image: "💻",
        category: "لپ‌تاپ",
        stock: 10,
        features: ["پردازنده Intel Core i5", "رم ۸ گیگابایت", "SSD ۲۵۶ گیگابایت", "کارت گرافیک مجتمع"]
    },
    {
        id: 2,
        title: "گوشی Samsung Galaxy S23",
        description: "گوشی هوشمند پیشرفته با دوربین حرفه‌ای و کیفیت بالا",
        price: 18000000,
        image: "📱",
        category: "گوشی موبایل",
        stock: 15,
        features: ["دوربین ۵۰ مگاپیکسلی", "رم ۸ گیگابایت", "حافظه ۱۲۸ گیگابایت", "باتری ۳۹۰۰ میلی‌آمپر"]
    },
    {
        id: 3,
        title: "هدفون Sony WH-1000XM4",
        description: "هدفون بی‌سیم با قابلیت حذف نوز و کیفیت صدای فوق‌العاده",
        price: 8500000,
        image: "🎧",
        category: "صوتی",
        stock: 20,
        features: ["حذف نوز فعال", "۳۰ ساعت پخش موسیقی", "اتصال بلوتوث", "کنترل لمسی"]
    },
    {
        id: 4,
        title: "ساعت هوشمند Apple Watch",
        description: "ساعت هوشمند با امکانات سلامتی و ورزشی پیشرفته",
        price: 12000000,
        image: "⌚",
        category: "پوشیدنی",
        stock: 8,
        features: ["مانیتور ضربان قلب", "GPS داخلی", "مقاوم در برابر آب", "صفحه‌نمایش رتینا"]
    },
    {
        id: 5,
        title: "تبلت iPad Air",
        description: "تبلت قدرتمند برای کار، تحصیل و سرگرمی",
        price: 22000000,
        image: "📟",
        category: "تبلت",
        stock: 12,
        features: ["صفحه ۱۰.۹ اینچی", "پردازنده A14 Bionic", "پشتیبانی از Apple Pencil", "۶۴ گیگابایت حافظه"]
    },
    {
        id: 6,
        title: "کیبورد مکانیکی Razer",
        description: "کیبورد گیمینگ مکانیکی با نورپردازی RGB",
        price: 3500000,
        image: "⌨️",
        category: "لوازم جانبی",
        stock: 25,
        features: ["سوئیچ مکانیکی", "نورپردازی RGB", "ضد آب", "طراحی ارگونومیک"]
    }
];

// Shopping cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const cartModal = document.getElementById('cartModal');
const productModal = document.getElementById('productModal');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartUI();
    
    // Handle contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav a, .footer-section a');
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            toggleCart();
        }
        if (e.target === productModal) {
            closeProductModal();
        }
    });
});

// Load and display products
function loadProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">${formatPrice(product.price)} تومان</div>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> افزودن به سبد
                    </button>
                    <button class="btn btn-secondary" onclick="showProductDetails(${product.id})">
                        جزئیات بیشتر
                    </button>
                </div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

// Format price with thousand separators
function formatPrice(price) {
    return new Intl.NumberFormat('fa-IR').format(price);
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity++;
            showNotification('محصول به سبد خرید اضافه شد', 'success');
        } else {
            showNotification('موجودی کافی نیست', 'error');
        }
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
        showNotification('محصول به سبد خرید اضافه شد', 'success');
    }
    
    updateCartUI();
    saveCart();
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCart();
    showNotification('محصول از سبد خرید حذف شد', 'info');
}

// Update product quantity in cart
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    const product = products.find(p => p.id === productId);
    
    if (item && product) {
        const newQuantity = item.quantity + change;
        
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else if (newQuantity <= product.stock) {
            item.quantity = newQuantity;
            updateCartUI();
            saveCart();
        } else {
            showNotification('موجودی کافی نیست', 'error');
        }
    }
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items display
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666;">سبد خرید شما خالی است</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.image} ${item.title}</h4>
                    <p>${formatPrice(item.price)} تومان</p>
                </div>
                <div class="cart-item-actions">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span style="margin: 0 10px; font-weight: bold;">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="btn btn-secondary" style="margin-right: 10px; padding: 5px 10px;" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
    }
    
    // Update total price
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = formatPrice(total);
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Toggle cart modal
function toggleCart() {
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
}

// Clear cart
function clearCart() {
    if (cart.length === 0) {
        showNotification('سبد خرید شما خالی است', 'info');
        return;
    }
    
    if (confirm('آیا مطمئن هستید که می‌خواهید سبد خرید را پاک کنید؟')) {
        cart = [];
        updateCartUI();
        saveCart();
        showNotification('سبد خرید پاک شد', 'info');
    }
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        showNotification('سبد خرید شما خالی است', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const message = `سفارش شما با مبلغ ${formatPrice(total)} تومان ثبت شد.\nجزئیات سفارش به ایمیل شما ارسال می‌شود.`;
    
    alert(message);
    
    // Clear cart after successful checkout
    cart = [];
    updateCartUI();
    saveCart();
    toggleCart();
    
    showNotification('سفارش شما با موفقیت ثبت شد', 'success');
}

// Show product details modal
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modalTitle = document.getElementById('productModalTitle');
    const modalBody = document.getElementById('productModalBody');
    
    modalTitle.textContent = product.title;
    modalBody.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <div style="font-size: 4rem; margin-bottom: 10px;">${product.image}</div>
            <h3>${product.title}</h3>
        </div>
        <div style="margin-bottom: 20px;">
            <h4>توضیحات:</h4>
            <p>${product.description}</p>
        </div>
        <div style="margin-bottom: 20px;">
            <h4>ویژگی‌ها:</h4>
            <ul style="list-style-type: none; padding-right: 0;">
                ${product.features.map(feature => `<li style="margin-bottom: 5px;"><i class="fas fa-check" style="color: #667eea; margin-left: 10px;"></i>${feature}</li>`).join('')}
            </ul>
        </div>
        <div style="margin-bottom: 20px;">
            <h4>قیمت: <span style="color: #667eea;">${formatPrice(product.price)} تومان</span></h4>
            <p style="color: #666;">موجودی: ${product.stock} عدد</p>
        </div>
        <div style="text-align: center;">
            <button class="btn btn-primary" onclick="addToCart(${product.id}); closeProductModal();">
                <i class="fas fa-cart-plus"></i> افزودن به سبد خرید
            </button>
        </div>
    `;
    
    productModal.style.display = 'block';
}

// Close product modal
function closeProductModal() {
    productModal.style.display = 'none';
}

// Scroll to products section
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Smooth scroll for navigation links
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    
    if (targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ 
                behavior: 'smooth' 
            });
        }
    }
}

// Handle contact form submission
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name') || e.target.querySelector('input[type="text"]').value;
    const email = formData.get('email') || e.target.querySelector('input[type="email"]').value;
    const message = formData.get('message') || e.target.querySelector('textarea').value;
    
    // Simulate form submission
    showNotification('پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.', 'success');
    e.target.reset();
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 20px;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 3000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        animation: slideInLeft 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove notification after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutLeft 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 4000);
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInLeft {
        from {
            transform: translateX(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutLeft {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(-100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Search functionality (can be enhanced later)
function searchProducts(query) {
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    
    displayProducts(filteredProducts);
}

// Display filtered products
function displayProducts(productsToShow) {
    productsGrid.innerHTML = '';
    
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = '<p style="text-align: center; color: #666; grid-column: 1 / -1;">محصولی یافت نشد</p>';
        return;
    }
    
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">${formatPrice(product.price)} تومان</div>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> افزودن به سبد
                    </button>
                    <button class="btn btn-secondary" onclick="showProductDetails(${product.id})">
                        جزئیات بیشتر
                    </button>
                </div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

// Initialize cart from localStorage on page load
window.addEventListener('load', function() {
    updateCartUI();
});