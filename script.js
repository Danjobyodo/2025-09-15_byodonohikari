document.addEventListener('DOMContentLoaded', () => {

    const hero = document.getElementById('hero');
    const heroContent = document.querySelector('.hero-content');
    const isMobile = window.innerWidth <= 768; // 画面幅が768px以下か判定

    // --- 1. スクロール連動のアニメーション ---

    if (isMobile) {
        // 【モバイル向けの処理】
        // 初期状態として背景を少し拡大しておく（左右が切れるのを防ぎつつ高さを埋めるため）
        const initialBgSize = 180; // この数値は画像の縦横比によって調整するとより綺麗になります
        hero.style.backgroundSize = `${initialBgSize}%`;
        hero.style.backgroundPosition = 'center center';


        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;

            if (scrollPosition < windowHeight) {
                // テキストのフェードアウト (画面の50%スクロールで完了)
                const textFadeEnd = windowHeight * 0.5;
                const textOpacity = Math.max(0, 1 - scrollPosition / textFadeEnd);
                heroContent.style.opacity = textOpacity;

                // 背景のズームアウト (画面の80%スクロールで完了)
                const zoomEnd = windowHeight * 0.8;
                const scrollRatio = Math.min(1, scrollPosition / zoomEnd); // 0から1の進捗率
                const endBgSize = 100; // 最終的に画面幅に合わせるサイズ
                
                // 進捗率に応じて背景サイズを計算 (180% -> 100%)
                const currentBgSize = initialBgSize - (initialBgSize - endBgSize) * scrollRatio;
                hero.style.backgroundSize = `${currentBgSize}%`;
            }
        });

    } else {
        // 【PC向けの処理】
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;

            // PCでは従来通りテキストのみフェードアウトさせる
            if (scrollPosition < windowHeight) {
                const textFadeEnd = windowHeight * 0.6;
                const textOpacity = Math.max(0, 1 - scrollPosition / textFadeEnd);
                heroContent.style.opacity = textOpacity;
            }
        });
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