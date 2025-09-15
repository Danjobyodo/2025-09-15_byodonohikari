// DOMが完全に読み込まれてからスクリプトを実行
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. スクロールで背景画像をフェードアウトさせる処理 ---
    const hero = document.getElementById('hero');

    window.addEventListener('scroll', () => {
        // スクロール量を取得
        const scrollPosition = window.scrollY;
        
        // フェードアウトを開始するスクロール量（画面の高さの半分くらい）
        const fadeOutStart = window.innerHeight / 2;

        if (scrollPosition > fadeOutStart) {
            // スクロール量に応じて不透明度を計算（1から徐々に0へ）
            // Math.max(0, ...) で0未満にならないように制御
            const opacity = Math.max(0, 1 - (scrollPosition - fadeOutStart) / (window.innerHeight / 2));
            hero.style.opacity = opacity;
        } else {
            // スクロール量が少ない場合は完全に不透明
            hero.style.opacity = 1;
        }
    });


    // --- 2. スクロールでコンテンツをフェードインさせる処理 ---
    
    // アニメーションさせたい要素を全て取得
    const fadeElements = document.querySelectorAll('.fade-in');

    // IntersectionObserverのオプション設定
    const options = {
        root: null, // ビューポートを基準にする
        rootMargin: '0px',
        threshold: 0.2 // 要素が20%見えたらコールバックを実行
    };

    // IntersectionObserverのインスタンスを作成
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // isIntersectingプロパティがtrue = 画面内に入った
            if (entry.isIntersecting) {
                // visibleクラスを追加してアニメーションを発火
                entry.target.classList.add('visible');
                // 一度表示したら、もう監視する必要はないので監視を停止
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // 各要素の監視を開始
    fadeElements.forEach(element => {
        observer.observe(element);
    });
});