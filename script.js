// 明星資料
const stars = [
    {
        id: 1,
        name: "泰勒絲",
        description: "美國流行音樂天后",
        image: "https://picsum.photos/400/500",
        likes: 0,
        sns: {
            instagram: "@taylorswift",
            twitter: "@taylorswift13"
        }
    },
    {
        id: 2,
        name: "IU",
        description: "韓國國民妹妹",
        image: "https://picsum.photos/401/500",
        likes: 0,
        sns: {
            instagram: "@dlwlrma",
            twitter: "@_IUofficial"
        }
    },
    {
        id: 3,
        name: "周杰倫",
        description: "華語樂壇天王",
        image: "https://picsum.photos/402/500",
        likes: 0,
        sns: {
            instagram: "@jaychou",
            facebook: "jay"
        }
    }
];

// 最新消息資料
const news = [
    {
        id: 1,
        title: "泰勒絲演唱會門票售罄",
        content: "泰勒絲世界巡迴演唱會門票在開賣後短短10分鐘內就全數售罄！",
        date: "2025-05-20",
        image: "https://picsum.photos/600/400"
    },
    {
        id: 2,
        title: "IU新專輯發行",
        content: "IU最新專輯將於下個月發行，請密切關注！",
        date: "2025-05-18",
        image: "https://picsum.photos/601/400"
    }
];

// DOM 載入完成後執行
document.addEventListener('DOMContentLoaded', () => {
    renderStars();
    renderNews();
    setupLikeSystem();
});

// 渲染明星卡片
function renderStars() {
    const container = document.getElementById('stars-container');
    container.innerHTML = stars.map(star => `
        <div class="col-md-4">
            <div class="star-card">
                <img src="${star.image}" alt="${star.name}">
                <div class="star-info">
                    <h3>${star.name}</h3>
                    <p>${star.description}</p>
                    <div class="social-links">
                        ${Object.entries(star.sns).map(([platform, handle]) => `
                            <a href="#" class="me-2">
                                <i class="fab fa-${platform}"></i> ${handle}
                            </a>
                        `).join('')}
                    </div>
                    <div class="mt-3">
                        <i class="fas fa-heart like-btn" data-id="${star.id}"></i>
                        <span class="likes-count">${star.likes}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// 渲染最新消息
function renderNews() {
    const container = document.getElementById('news-container');
    container.innerHTML = news.map(item => `
        <div class="col-md-6">
            <div class="news-card">
                <img src="${item.image}" alt="${item.title}">
                <div class="news-content">
                    <h4>${item.title}</h4>
                    <p class="text-muted">${item.date}</p>
                    <p>${item.content}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// 設置按讚系統
function setupLikeSystem() {
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const starId = parseInt(e.target.dataset.id);
            const star = stars.find(s => s.id === starId);
            if (star) {
                star.likes++;
                e.target.classList.add('active');
                e.target.nextElementSibling.textContent = star.likes;
                
                // 移除動畫效果後重新添加，以便重複點擊時都能看到動畫
                setTimeout(() => {
                    e.target.classList.remove('active');
                }, 500);
            }
        });
    });
}