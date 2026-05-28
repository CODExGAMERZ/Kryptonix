const wdigetConfig1 = {
    "symbol": "BINANCE:BTCUSDT",
    "width": "100%",
    "isTransparent": true,
    "colorTheme": "dark",
    "locale": "en"
};

const widgetConfig2 = {
    "symbols": [
        [
            "BINANCE:BTCUSDT|1D"
        ]
    ],
    "chartOnly": false,
    "width": "100%",
    "height": "100%",
    "locale": "en",
    "colorTheme": "dark",
    "autosize": true,
    "showVolume": false,
    "showMA": false,
    "hideDateRanges": false,
    "hideMarketStatus": false,
    "hideSymbolLogo": true,
    "scalePosition": "right",
    "scaleMode": "Normal",
    "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
    "fontSize": "10",
    "noTimeScale": false,
    "valuesTracking": "1",
    "changeMode": "price-and-percent",
    "chartType": "area",
    "maLineColor": "#2962FF",
    "maLineWidth": 1,
    "maLength": 9,
    "headerFontSize": "medium",
    "backgroundColor": "rgba(14, 18, 24, 1)",
    "gridLineColor": "rgba(76, 175, 80, 0.06)",
    "lineWidth": 2,
    "lineType": 0,
    "dateRanges": [
        "1d|15",
        "1m|30",
        "3m|60",
        "12m|1D",
        "60m|1W",
        "all|1M"
    ],
    "dateFormat": "yyyy-MM-dd"
}

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('coin');

    if (query) {
        getCoinInfo(query);
    } else {
        window.location.href = "../index.html";
    }
});

async function getCoinInfo(query) {
    const cacheKey = `Coin_Detail_${query}`;
    const cachedData = getLocalStorageData(cacheKey);

    if (cachedData) {
        loadCoinData(cachedData);
    } else {
        fetchCoinInfo(query);
    }
}

async function fetchCoinInfo(query) {
    const coinInfoError = document.getElementById('coin-info-error');
    if (coinInfoError) coinInfoError.style.display = 'none';
    const apiUrl = `https://api.coingecko.com/api/v3/coins/${query}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('API limit reached.');
        const data = await response.json();
        
        // Cache detail data
        setLocalStorageData(`Coin_Detail_${query}`, data);
        loadCoinData(data);
    } catch (error) {
        console.warn(`Failed to fetch coin info for "${query}". Checking local mock fallback data.`, error);
        
        // Show demo warning banner
        const banner = document.getElementById('demo-banner');
        if (banner) {
            banner.classList.remove('hidden');
        }

        if (window.MOCK_DATA && window.MOCK_DATA.coinDetails && window.MOCK_DATA.coinDetails[query]) {
            const mockCoin = window.MOCK_DATA.coinDetails[query];
            loadCoinData(mockCoin);
        } else {
            // Generate basic mock layout on-the-fly for clean layout in demo mode
            const generatedMock = generateDynamicMockCoin(query);
            loadCoinData(generatedMock);
        }
    }
}

function generateDynamicMockCoin(query) {
    const formattedName = query.charAt(0).toUpperCase() + query.slice(1);
    const symbol = query.slice(0, 3).toUpperCase();
    return {
        id: query,
        name: formattedName,
        symbol: symbol,
        market_cap_rank: 99,
        image: { thumb: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png" },
        market_data: {
            current_price: { usd: 1.25 },
            market_cap: { usd: 125000000 },
            ath: { usd: 5.80 },
            atl: { usd: 0.12 },
            total_volume: { usd: 42019380 },
            total_supply: 100000000,
            max_supply: 100000000,
            circulating_supply: 85000000,
            high_24h: { usd: 1.35 },
            low_24h: { usd: 1.18 }
        },
        tickers: [
            { market: { name: "Binance" }, trade_url: "#", trust_score: "green" },
            { market: { name: "Coinbase" }, trade_url: "#", trust_score: "green" },
            { market: { name: "OKX" }, trade_url: "#", trust_score: "green" }
        ],
        links: {
            homepage: ["#"],
            whitepaper: "#",
            twitter_screen_name: query,
            facebook_username: query
        },
        description: {
            en: `${formattedName} (${symbol}) is a cryptographic digital token loaded as dynamic fallback demo profile. No custom profile is stored locally for this query.`
        }
    };
}

function loadCoinData(data) {
    // Setup symbol for widgets
    let cleanSymbol = data.symbol.toUpperCase();
    
    // TradingView Quote configuration
    wdigetConfig1.symbol = `BINANCE:${cleanSymbol}USDT`;

    // Symbol overview chart configuration
    widgetConfig2.symbols = [
        [`BINANCE:${cleanSymbol}USDT|1D`]
    ];

    initializeWidget();
    displayCoinInfo(data);
}

function initializeWidget() {
    const themeConfig = getThemeConfig();
    wdigetConfig1.colorTheme = themeConfig.theme;
    widgetConfig2.colorTheme = themeConfig.theme;
    widgetConfig2.backgroundColor = themeConfig.backgroundColor;
    widgetConfig2.gridLineColor = themeConfig.gridColor;

    createWidget('ticker-widget', wdigetConfig1, 'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js');
    createWidget('mini-chart-widget', widgetConfig2, 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js');
}

function displayCoinInfo(coin) {
    const coinInfo = document.querySelector('.coin-info');
    const rightSec = document.querySelector('.coin-container .right-section');
    const coinDesc = document.getElementById('coin-desc-p');

    if (coinInfo) {
        coinInfo.innerHTML = `
            <div class="logo">
                <img src="${coin.image.thumb}" alt="${coin.name}">
                <h4>${coin.name} <span>(${coin.symbol.toUpperCase()})</span></h4>
                <p>#${coin.market_cap_rank}</p>
            </div>
            <div class="status">
                <div class="item">
                    <p class="str">Current Price</p>
                    <p class="num">$${coin.market_data.current_price.usd != null ? coin.market_data.current_price.usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 }) : "N/A"}</p>
                </div>
                <div class="item">
                    <p class="str">Market Cap</p>
                    <p class="num">$${coin.market_data.market_cap.usd != null ? coin.market_data.market_cap.usd.toLocaleString(undefined, { maximumFractionDigits: 0 }) : "N/A"}</p>
                </div>
                <div class="item">
                    <p class="str">Total Volume</p>
                    <p class="num">$${coin.market_data.total_volume.usd != null ? coin.market_data.total_volume.usd.toLocaleString(undefined, { maximumFractionDigits: 0 }) : "N/A"}</p>
                </div>
                <div class="item">
                    <p class="str">Circulating Supply</p>
                    <p class="num">${coin.market_data.circulating_supply != null ? coin.market_data.circulating_supply.toLocaleString(undefined, { maximumFractionDigits: 0 }) : "N/A"}</p>
                </div>
                <div class="item">
                    <p class="str">Total Supply</p>
                    <p class="num">${coin.market_data.total_supply != null ? coin.market_data.total_supply.toLocaleString(undefined, { maximumFractionDigits: 0 }) : "N/A"}</p>
                </div>
                <div class="item">
                    <p class="str">Max Supply</p>
                    <p class="num">${coin.market_data.max_supply != null ? coin.market_data.max_supply.toLocaleString(undefined, { maximumFractionDigits: 0 }) : "N/A"}</p>
                </div>
            </div>
        `;
    }

    if (rightSec) {
        let tickerRows = '';
        if (coin.tickers && coin.tickers.length > 0) {
            const count = Math.min(coin.tickers.length, 3);
            for (let i = 0; i < count; i++) {
                const ticker = coin.tickers[i];
                const trustColor = ticker.trust_score === 'green' ? '#10B981' : (ticker.trust_score === 'yellow' ? '#F59E0B' : '#EF4444');
                tickerRows += `
                    <div class="item">
                        <p class="str" style="font-weight:600">${ticker.market.name.replace('Exchange', '')}</p>
                        <div class="links">
                            <a href="${ticker.trade_url}" target="_blank">Trade</a>
                            <p style="background-color: ${trustColor}">Score</p>
                        </div>
                    </div>
                `;
            }
        } else {
            tickerRows = `<p style="color:var(--color-text-secondary); font-size:13px">No exchanges found.</p>`;
        }

        rightSec.innerHTML = `
            <div class="status">
                <h3>Historical Info</h3>
                <div class="container">
                    <div class="item">
                        <p class="str">24h High</p>
                        <p class="num">$${coin.market_data.high_24h?.usd != null ? coin.market_data.high_24h.usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 }) : "N/A"}</p>
                    </div>
                    <div class="item">
                        <p class="str">24h Low</p>
                        <p class="num">$${coin.market_data.low_24h?.usd != null ? coin.market_data.low_24h.usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 }) : "N/A"}</p>
                    </div>
                    <div class="item">
                        <p class="str">ATH</p>
                        <p class="num">$${coin.market_data.ath?.usd != null ? coin.market_data.ath.usd.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "N/A"}</p>
                    </div>
                    <div class="item">
                        <p class="str">ATL</p>
                        <p class="num">$${coin.market_data.atl?.usd != null ? coin.market_data.atl.usd.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "N/A"}</p>
                    </div>
                </div>
            </div>

            <div class="status">
                <h3>Top Markets</h3>
                <div class="container">
                    ${tickerRows}
                </div>
            </div>

            <div class="status">
                <h3>Info Links</h3>
                <div class="container">
                    <div class="item">
                        <p class="str">Website</p>
                        <div class="links">
                            <a target="_blank" href="${coin.links.homepage?.[0] || '#'}">Visit</a>
                            <a target="_blank" href="${coin.links.whitepaper || '#'}">Whitepaper</a>
                        </div>
                    </div>
                    <div class="item">
                        <p class="str">Community</p>
                        <div class="links">
                            <a target="_blank" href="https://x.com/${coin.links.twitter_screen_name || ''}">Twitter</a>
                            <a target="_blank" href="https://facebook.com/${coin.links.facebook_username || ''}">Facebook</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    if (coinDesc) {
        coinDesc.innerHTML = coin.description.en || '<p class="red">Asset description not available!</p>';
    }
}

function getThemeConfig() {
    const root = getComputedStyle(document.documentElement);
    const isDarkTheme = localStorage.getItem('theme') === 'light-theme' ? false : true;

    return {
        theme: isDarkTheme ? 'dark' : 'light',
        backgroundColor: root.getPropertyValue(isDarkTheme ? '--chart-dark-bg' : '--chart-light-bg').trim(),
        gridColor: root.getPropertyValue(isDarkTheme ? '--chart-dark-border' : '--chart-light-border').trim()
    };
}