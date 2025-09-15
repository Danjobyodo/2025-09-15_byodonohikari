document.addEventListener('DOMContentLoaded', () => {

    const hero = document.getElementById('hero');
    const heroContent = document.querySelector('.hero-content');

    // --- 1. スクロール連動のアニメーション ---

    // hero要素が存在するページでのみ、アニメーション処理を登録
    if (hero && heroContent) {

        // スクロールに応じてエフェクトを適用する関数
        const applyScrollEffects = () => {
            const isMobileSize = window.innerWidth <= 768;
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;

            if (scrollPosition >= windowHeight) return; // 画面外なら処理しない

            if (isMobileSize) {
                // 【モバイルサイズの処理】
                const textFadeEnd = windowHeight * 0.5;
                const textOpacity = Math.max(0, 1 - scrollPosition / textFadeEnd);
                heroContent.style.opacity = textOpacity;

                const zoomEnd = windowHeight * 0.8;
                const scrollRatio = Math.min(1, scrollPosition / zoomEnd);
                const initialBgSize = 180;
                const endBgSize = 100;
                const currentBgSize = initialBgSize - (initialBgSize - endBgSize) * scrollRatio;
                hero.style.backgroundSize = `${currentBgSize}%`;

            } else {
                // 【PCサイズの処理】
                const textFadeEnd = windowHeight * 0.6;
                const textOpacity = Math.max(0, 1 - scrollPosition / textFadeEnd);
                heroContent.style.opacity = textOpacity;
            }
        };

        // ウィンドウサイズに応じてヒーローセクションの初期状態を設定する関数
        const setupInitialState = () => {
            const isMobileSize = window.innerWidth <= 768;

            if (isMobileSize) {
                // モバイルサイズの場合、背景を拡大してアニメーションに備える
                const initialBgSize = 180;
                hero.style.backgroundSize = `${initialBgSize}%`;
                hero.style.backgroundPosition = 'center center';
            } else {
                // PCサイズの場合、CSSのデフォルト('cover')に戻す
                hero.style.backgroundSize = '';
                hero.style.backgroundPosition = '';
            }
            // 初期状態でのスクロールエフェクトを一度適用
            applyScrollEffects();
        };
        
        // イベントリスナーを登録
        window.addEventListener('scroll', applyScrollEffects);
        window.addEventListener('resize', setupInitialState);

        // 初期読み込み時に一度だけ実行
        setupInitialState();
    }


    // --- 2. スクロールでコンテンツをフェードインさせる処理（変更なし） ---
    const fadeElements = document.querySelectorAll('.fade-in');

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    fadeElements.forEach(element => {
        observer.observe(element);
    });
});