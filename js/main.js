/**
 * 雅 MIYABI - メインJavaScript
 * モバイルナビゲーション、ライトボックス、フォーム検証、スムーススクロール
 * アクセシビリティ対応
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初期化
    initMobileNavigation();
    initLightbox();
    initFormValidation();
    initSmoothScroll();
    initScrollEffects();
});

/**
 * モバイルナビゲーションの初期化
 */
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navToggle || !navMenu) return;
    
    // ハンバーガーメニューのクリックイベント
    navToggle.addEventListener('click', function() {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        
        // ハンバーガーアイコンのアニメーション
        const hamburger = navToggle.querySelector('.hamburger');
        if (hamburger) {
            hamburger.style.transform = navMenu.classList.contains('active') 
                ? 'rotate(45deg)' 
                : 'rotate(0deg)';
        }
        
        // フォーカス管理
        if (navMenu.classList.contains('active')) {
            navLinks[0]?.focus();
        }
    });
    
    // ナビリンククリック時にメニューを閉じる（モバイルのみ）
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 639) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                
                const hamburger = navToggle.querySelector('.hamburger');
                if (hamburger) {
                    hamburger.style.transform = 'rotate(0deg)';
                }
            }
        });
    });
    
    // ESCキーでメニューを閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.focus();
        }
    });
    
    // ウィンドウリサイズ時の処理
    window.addEventListener('resize', function() {
        if (window.innerWidth > 639 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

/**
 * ライトボックスの初期化
 */
function initLightbox() {
    // ライトボックス要素を作成
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" aria-label="ライトボックスを閉じる">&times;</button>
            <img src="" alt="" />
        </div>
    `;
    document.body.appendChild(lightbox);
    
    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    
    // ギャラリー画像のクリックイベント
    document.addEventListener('click', function(e) {
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem) {
            const img = galleryItem.querySelector('img');
            if (img) {
                openLightbox(img.src, img.alt);
            }
        }
    });
    
    // ライトボックスを開く
    function openLightbox(src, alt) {
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // フォーカスをライトボックスに移動
        lightboxClose.focus();
        
        // フォーカストラップ
        trapFocus(lightbox);
    }
    
    // ライトボックスを閉じる
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        lightboxImg.src = '';
        lightboxImg.alt = '';
    }
    
    // 閉じるボタンのクリック
    lightboxClose.addEventListener('click', closeLightbox);
    
    // 背景クリックで閉じる
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // ESCキーで閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

/**
 * フォーカストラップ（アクセシビリティ）
 */
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });
}

/**
 * フォーム検証の初期化
 */
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    const fields = {
        name: {
            element: contactForm.querySelector('#name'),
            required: true,
            minLength: 2,
            message: 'お名前は2文字以上で入力してください。'
        },
        phone: {
            element: contactForm.querySelector('#phone'),
            required: true,
            pattern: /^[\d\-\(\)\+\s]+$/,
            message: '正しい電話番号を入力してください。'
        },
        email: {
            element: contactForm.querySelector('#email'),
            required: false,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: '正しいメールアドレスを入力してください。'
        },
        date: {
            element: contactForm.querySelector('#visit-date'),
            required: true,
            validate: function(value) {
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return selectedDate >= today;
            },
            message: '今日以降の日付を選択してください。'
        },
        guests: {
            element: contactForm.querySelector('#guests'),
            required: true,
            min: 1,
            max: 20,
            message: '来店人数は1名以上20名以下で入力してください。'
        },
        message: {
            element: contactForm.querySelector('#message'),
            required: false,
            maxLength: 500,
            message: 'メッセージは500文字以内で入力してください。'
        }
    };
    
    // 各フィールドにイベントリスナーを追加
    Object.keys(fields).forEach(fieldName => {
        const field = fields[fieldName];
        if (field.element) {
            field.element.addEventListener('blur', () => validateField(fieldName, field));
            field.element.addEventListener('input', () => clearError(field.element));
        }
    });
    
    // フォーム送信時の検証
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // 全フィールドを検証
        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];
            if (field.element && !validateField(fieldName, field)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            submitForm(contactForm);
        }
    });
    
    /**
     * フィールドの検証
     */
    function validateField(fieldName, field) {
        const value = field.element.value.trim();
        
        // 必須チェック
        if (field.required && !value) {
            showError(field.element, 'この項目は必須です。');
            return false;
        }
        
        // 値がある場合のみ以下をチェック
        if (value) {
            // 最小文字数チェック
            if (field.minLength && value.length < field.minLength) {
                showError(field.element, field.message);
                return false;
            }
            
            // 最大文字数チェック
            if (field.maxLength && value.length > field.maxLength) {
                showError(field.element, field.message);
                return false;
            }
            
            // パターンチェック
            if (field.pattern && !field.pattern.test(value)) {
                showError(field.element, field.message);
                return false;
            }
            
            // 数値範囲チェック
            if (field.min !== undefined || field.max !== undefined) {
                const numValue = parseInt(value);
                if (isNaN(numValue) || 
                    (field.min !== undefined && numValue < field.min) ||
                    (field.max !== undefined && numValue > field.max)) {
                    showError(field.element, field.message);
                    return false;
                }
            }
            
            // カスタム検証
            if (field.validate && !field.validate(value)) {
                showError(field.element, field.message);
                return false;
            }
        }
        
        clearError(field.element);
        return true;
    }
    
    /**
     * エラー表示
     */
    function showError(element, message) {
        element.classList.add('error');
        element.setAttribute('aria-invalid', 'true');
        
        let errorElement = element.parentNode.querySelector('.form-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'form-error';
            errorElement.setAttribute('role', 'alert');
            element.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }
    
    /**
     * エラー削除
     */
    function clearError(element) {
        element.classList.remove('error');
        element.removeAttribute('aria-invalid');
        
        const errorElement = element.parentNode.querySelector('.form-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    /**
     * フォーム送信処理（フェイク実装）
     */
    function submitForm(form) {
        // 送信ボタンを無効化
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = '送信中...';
        
        // フェイク送信処理（実際のバックエンド処理をシミュレート）
        setTimeout(() => {
            // 成功メッセージを表示
            showSuccessMessage();
            
            // フォームをリセット
            form.reset();
            
            // 送信ボタンを元に戻す
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            
            // メール送信の代替案を提示
            showMailtoOption(form);
        }, 2000);
    }
    
    /**
     * 成功メッセージ表示
     */
    function showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #10b981;
            color: white;
            padding: 20px;
            border-radius: 8px;
            z-index: 10000;
            text-align: center;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        `;
        message.innerHTML = `
            <h3>送信完了</h3>
            <p>お問い合わせありがとうございます。<br>3営業日以内にご連絡いたします。</p>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }
    
    /**
     * メール送信の代替案表示
     */
    function showMailtoOption(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        const subject = '居酒屋雅へのお問い合わせ';
        const body = `
お名前: ${data.name || ''}
電話番号: ${data.phone || ''}
メールアドレス: ${data.email || ''}
来店希望日: ${data['visit-date'] || ''}
来店人数: ${data.guests || ''}名様
ご要望・お問い合わせ内容:
${data.message || ''}
        `.trim();
        
        const mailtoLink = `mailto:info@example-izakaya.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // メールリンクを含む案内を表示
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: white;
            border: 2px solid #1a365d;
            border-radius: 8px;
            padding: 15px;
            max-width: 300px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            z-index: 10000;
        `;
        notification.innerHTML = `
            <p style="margin-bottom: 10px; font-size: 14px;">メールでも直接お問い合わせいただけます：</p>
            <a href="${mailtoLink}" style="color: #c53030; text-decoration: underline;">メールアプリで開く</a>
            <button onclick="this.parentElement.remove()" style="float: right; background: none; border: none; font-size: 18px; cursor: pointer;">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 10000);
    }
}

/**
 * スムーススクロールの初期化
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * スクロールエフェクトの初期化
 */
function initScrollEffects() {
    // ヘッダーの背景透明度変更
    const header = document.querySelector('.header');
    if (!header) return;
    
    let ticking = false;
    
    function updateHeaderOnScroll() {
        const scrolled = window.pageYOffset;
        const opacity = Math.min(scrolled / 100, 1);
        
        header.style.backgroundColor = `rgba(26, 54, 93, ${0.7 + (opacity * 0.3)})`;
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeaderOnScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Intersection Observer for fade-in animations
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // 対象要素を監視
        document.querySelectorAll('.feature-card, .menu-item, .info-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

/**
 * ユーティリティ関数: デバウンス
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * ユーティリティ関数: スロットル
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// パフォーマンス最適化: 画像の遅延読み込み（ネイティブサポートがない場合）
if ('loading' in HTMLImageElement.prototype === false) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// エラーハンドリング
window.addEventListener('error', function(e) {
    console.error('JavaScript エラー:', e.error);
    // 本番環境では適切なエラー報告サービスに送信
});

// パフォーマンス監視（開発用）
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.addEventListener('load', function() {
        if ('performance' in window) {
            setTimeout(() => {
                const timing = performance.timing;
                const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
                console.log(`ページ読み込み時間: ${pageLoadTime}ms`);
            }, 0);
        }
    });
}
