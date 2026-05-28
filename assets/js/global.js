const coinsCount = document.getElementById('coins-count');
const exchangesCount = document.getElementById('exchanges-count');
const marketCap = document.getElementById('marketCap');
const marketCapChangeElement = document.getElementById('marketCapChange');
const volume = document.getElementById('volume');
const dominance = document.getElementById('dominance');

document.addEventListener("DOMContentLoaded", () => {

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme') || 'dark-theme';
    body.id = savedTheme;
    updateIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        if (body.id === 'light-theme') {
            body.id = 'dark-theme';
            localStorage.setItem('theme', 'dark-theme');
            updateIcon('dark-theme');
        } else {
            body.id = 'light-theme';
            localStorage.setItem('theme', 'light-theme');
            updateIcon('light-theme');
        }

        if (typeof initializeWidget === 'function') {
            initializeWidget();
        }
    });

    function updateIcon(currentTheme) {
        if (currentTheme === 'light-theme') {
            themeToggle.classList.remove('ri-moon-line');
            themeToggle.classList.add('ri-sun-line');
        } else {
            themeToggle.classList.remove('ri-sun-line');
            themeToggle.classList.add('ri-moon-line');
        }
    }

    const form = document.getElementById('searchForm');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const query = document.getElementById('searchInput').value.trim();
            if (!query) return;

            // Route relatively based on folder location
            const isSubPage = window.location.pathname.includes('/pages/') || window.location.pathname.includes('/pages');
            const searchPath = isSubPage ? 'search.html' : 'pages/search.html';
            window.location.href = `${searchPath}?query=${encodeURIComponent(query)}`;
        });
    }

    const openMenuBtn = document.getElementById('openMenu');
    const overlay = document.querySelector('.overlay');
    const closeMenuBtn = document.getElementById('closeMenu');

    if (openMenuBtn && overlay && closeMenuBtn) {
        openMenuBtn.addEventListener('click', () => {
            overlay.classList.add('show');
        });

        closeMenuBtn.addEventListener('click', () => {
            overlay.classList.remove('show');
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('show');
            }
        });
    }

    fetchGlobal();
});

function getLocalStorageData(key) {
    const storedData = localStorage.getItem(key);
    if (!storedData) return null;

    try {
        const parsedData = JSON.parse(storedData);
        const currentTime = Date.now();
        // Cache limit: 5 minutes (300,000ms)
        if (currentTime - parsedData.timestamp > 300000) {
            localStorage.removeItem(key);
            return null;
        }
        return parsedData.data;
    } catch (e) {
        localStorage.removeItem(key);
        return null;
    }
}

function setLocalStorageData(key, data) {
    const storedData = {
        timestamp: Date.now(),
        data: data
    };
    localStorage.setItem(key, JSON.stringify(storedData));
}

function fetchGlobal() {
    const localStorageKey = 'Global_Data';
    const localData = getLocalStorageData(localStorageKey);

    if (localData) {
        displayGlobalData(localData);
    } else {
        const options = { method: 'GET', headers: { accept: 'application/json' } };

        fetch('https://api.coingecko.com/api/v3/global', options)
            .then(response => {
                if (!response.ok) throw new Error(`Global stats API error: ${response.status}`);
                return response.json();
            })
            .then(data => {
                const globalData = data.data;
                displayGlobalData(globalData);
                setLocalStorageData(localStorageKey, globalData);
            })
            .catch(error => {
                console.warn("Global stats API fail. Using fallback data.", error);
                
                // Show floating warning banner if API limits hit
                const banner = document.getElementById('demo-banner');
                if (banner) {
                    banner.classList.remove('hidden');
                }

                if (window.MOCK_DATA && window.MOCK_DATA.global) {
                    displayGlobalData(window.MOCK_DATA.global.data);
                } else {
                    if (coinsCount) coinsCount.textContent = 'N/A';
                    if (exchangesCount) exchangesCount.textContent = 'N/A';
                    if (marketCap) marketCap.textContent = 'N/A';
                    if (marketCapChangeElement) marketCapChangeElement.textContent = 'N/A';
                    if (volume) volume.textContent = 'N/A';
                    if (dominance) dominance.textContent = 'BTC N/A% - ETH N/A%';
                }
            });
    }
}

function displayGlobalData(globalData) {
    if (!globalData) return;
    if (coinsCount) coinsCount.textContent = (globalData.active_cryptocurrencies || 'N/A').toLocaleString();
    if (exchangesCount) exchangesCount.textContent = (globalData.markets || 'N/A').toLocaleString();

    if (marketCap) {
        marketCap.textContent = globalData.total_market_cap?.usd 
            ? `$${(globalData.total_market_cap.usd / 1e12).toFixed(3)}T` 
            : 'N/A';
    }
    
    const marketCapChange = globalData.market_cap_change_percentage_24h_usd;
    if (marketCapChangeElement) {
        if (marketCapChange !== undefined && marketCapChange !== null) {
            const isPositive = marketCapChange >= 0;
            const changeText = `${marketCapChange.toFixed(1)}%`;
            const colorClass = isPositive ? 'green' : 'red';
            const arrowClass = isPositive ? 'up' : 'down';
            marketCapChangeElement.innerHTML = `${changeText} <i class="${colorClass} ri-arrow-${arrowClass}-s-fill"></i>`;
            marketCapChangeElement.className = colorClass;
        } else {
            marketCapChangeElement.textContent = 'N/A';
        }
    }

    if (volume) {
        volume.textContent = globalData.total_volume?.usd 
            ? `$${(globalData.total_volume.usd / 1e9).toFixed(3)}B` 
            : 'N/A';
    }

    if (dominance) {
        const btcDominance = globalData.market_cap_percentage?.btc ? `${globalData.market_cap_percentage.btc.toFixed(1)}%` : 'N/A';
        const ethDominance = globalData.market_cap_percentage?.eth ? `${globalData.market_cap_percentage.eth.toFixed(1)}%` : 'N/A';
        dominance.textContent = `BTC ${btcDominance} - ETH ${ethDominance}`;
    }
}

function toggleSpinner(listId, spinnerId, show) {
    const listElement = document.getElementById(listId);
    const spinnerElement = document.getElementById(spinnerId);

    if (spinnerElement) {
        spinnerElement.style.display = show ? 'block' : 'none';
    }
    if (listElement) {
        listElement.style.display = show ? 'none' : 'block';
    }
}

function createTable(headers, fixedIndex = 0) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    table.appendChild(thead);

    const headerRow = document.createElement('tr');
    headers.forEach((header, index) => {
        const th = document.createElement('th');
        th.textContent = header;
        if (index === fixedIndex) {
            th.classList.add('table-fixed-column');
        }
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    // Patch appendChild to append to tbody if it exists
    table.appendChild = function(child) {
        if (child.tagName === 'TR') {
            tbody.appendChild(child);
        } else {
            HTMLTableElement.prototype.appendChild.call(this, child);
        }
    };

    return table;
}

function createWidget(containerId, widgetConfig, widgetSrc) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    const widgetDiv = document.createElement('div');
    widgetDiv.classList.add('tradingview-widget-container__widget');
    container.appendChild(widgetDiv);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = widgetSrc;
    script.async = true;
    script.innerHTML = JSON.stringify(widgetConfig);
    container.appendChild(script);

    setTimeout(() => {
        const copyright = document.querySelector('.tradingview-widget-copyright');
        if (copyright) {
            copyright.classList.remove('hidden');
        }
    }, 5000);
}

const scrollTopBtn = document.getElementById("scrollTop");
window.onscroll = () => {
    scrollFunction();
}

function scrollFunction() {
    if (!scrollTopBtn) return;
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollTopBtn.style.display = "flex";
    } else {
        scrollTopBtn.style.display = "none";
    }
}

function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}