document.addEventListener('DOMContentLoaded', () => {
    // 设置公告栏日期
    const dateEl = document.getElementById('current-date');
    if (dateEl) {
        const now = new Date();
        dateEl.textContent = now.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
    }

    // 飘落效果（音符 + 春夏秋冬）
    const container = document.getElementById('falling-container');
    const items = ['🎵', '🎶', '♩', '春', '夏', '秋', '冬'];
    const colors = ['#a8edd5', '#74c69d', '#40916c', '#52b788', '#95d5b2'];

    if (container) {
        for (let i = 0; i < 20; i++) {
            const el = document.createElement('div');
            el.className = 'falling-item';
            el.textContent = items[Math.floor(Math.random() * items.length)];
            el.style.left = Math.random() * 100 + 'vw';
            el.style.color = colors[Math.floor(Math.random() * colors.length)];
            el.style.animationDuration = (Math.random() * 5 + 5) + 's';
            el.style.animationDelay = (Math.random() * 5) + 's';
            container.appendChild(el);
        }
    }
});
