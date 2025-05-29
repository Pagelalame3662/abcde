// 明星資料
const stars = [
    {
        id: 1,
        name: "泰勒絲",
        description: "美國流行音樂天后，榮獲多座葛萊美獎",
        image: "https://i.imgur.com/XYZ123.jpg", // 請替換為實際的泰勒絲圖片
        likes: 0,
        sns: {
            instagram: "@taylorswift",
            twitter: "@taylorswift13"
        }
    },
    {
        id: 2,
        name: "IU",
        description: "韓國國民妹妹，演員與歌手雙棲發展",
        image: "https://i.imgur.com/ABC456.jpg", // 請替換為實際的IU圖片
        likes: 0,
        sns: {
            instagram: "@dlwlrma",
            twitter: "@_IUofficial"
        }
    },
    {
        id: 3,
        name: "周杰倫",
        description: "華語樂壇天王，創作才子",
        image: "https://i.imgur.com/DEF789.jpg", // 請替換為實際的周杰倫圖片
        likes: 0,
        sns: {
            instagram: "@jaychou",
            facebook: "jay"
        }
    },
    {
        id: 4,
        name: "BLACKPINK",
        description: "全球知名女團，創下多項記錄",
        image: "https://i.imgur.com/GHI101.jpg", // 請替換為實際的BLACKPINK圖片
        likes: 0,
        sns: {
            instagram: "@blackpinkofficial",
            youtube: "@BLACKPINK"
        }
    },
    {
        id: 5,
        name: "五月天",
        description: "華語搖滾天團，演唱會場場爆滿",
        image: "https://i.imgur.com/JKL112.jpg", // 請替換為實際的五月天圖片
        likes: 0,
        sns: {
            facebook: "maydayofficial",
            instagram: "@mayday.official"
        }
    }
];

// 最新消息資料
const news = [
    {
        id: 1,
        title: "泰勒絲演唱會門票售罄",
        content: "泰勒絲世界巡迴演唱會門票在開賣後短短10分鐘內就全數售罄！粉絲敲碗加場中。",
        date: "2025-05-20",
        image: "https://i.imgur.com/NEWS1.jpg" // 請替換為實際的新聞圖片
    },
    {
        id: 2,
        title: "IU新專輯發行",
        content: "IU最新專輯將於下個月發行，此次概念充滿神秘色彩，令粉絲期待不已！",
        date: "2025-05-18",
        image: "https://i.imgur.com/NEWS2.jpg" // 請替換為實際的新聞圖片
    },
    {
        id: 3,
        title: "BLACKPINK世界巡演圓滿結束",
        content: "BLACKPINK完成史上規模最大的女團世界巡演，創下多項紀錄！",
        date: "2025-05-15",
        image: "https://i.imgur.com/NEWS3.jpg" // 請替換為實際的新聞圖片
    },
    {
        id: 4,
        title: "五月天宣布新巡演計畫",
        content: "五月天將於今年底展開新一輪巡演，票價與開賣時間近期公布。",
        date: "2025-05-10",
        image: "https://i.imgur.com/NEWS4.jpg" // 請替換為實際的新聞圖片
    }
];

// DOM 載入完成後執行
document.addEventListener('DOMContentLoaded', () => {
    renderStars();
    renderNews();
    setupLikeSystem();
    setupLazyLoading();
});

// 渲染明星卡片
function renderStars() {
    const container = document.getElementById('stars-container');
    container.innerHTML = stars.map(star => `
        <div class="col-md-4 mb-4">
            <div class="star-card">
                <img data-src="${star.image}" alt="${star.name}" class="lazy">
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
        <div class="col-md-6 mb-4">
            <div class="news-card">
                <img data-src="${item.image}" alt="${item.title}" class="lazy">
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

// 設置圖片延遲載入
function setupLazyLoading() {
    const lazyImages = document.querySelectorAll('img.lazy');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}