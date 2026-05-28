const tabDataLoaded = {
    tab1: false,
    tab2: false,
    tab3: false,
    tab4: false
};

function openTab(event, tabName) {
    const tabContent = document.querySelectorAll(".tab-content");
    const tabButtons = document.querySelectorAll(".tab-button");

    tabContent.forEach(content => content.style.display = "none");
    tabButtons.forEach(button => button.classList.remove("active"));

    document.getElementById(tabName).style.display = "block";
    event.currentTarget.classList.add("active");

    if (!tabDataLoaded[tabName]) {
        switch (tabName) {
            case 'tab1':
                fetchAndDisplay('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true', ['asset-list'], displayAssets, tabName, 'Crypto_Data');
                break;
            case 'tab2':
                fetchAndDisplay('https://api.coingecko.com/api/v3/exchanges', ['exchange-list'], displayExchanges, tabName, 'Exchanges_Data');
                break;
            case 'tab3':
                fetchAndDisplay('https://api.coingecko.com/api/v3/coins/categories', ['category-list'], displayCategories, tabName, 'Categories_Data');
                break;
            case 'tab4':
                fetchAndDisplay('https://api.coingecko.com/api/v3/companies/public_treasury/bitcoin', ['company-list'], displayCompanies, tabName, 'Companies_Data');
                break;
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Click the first tab to load asset data
    const firstTabBtn = document.querySelector(".tab-button");
    if (firstTabBtn) {
        firstTabBtn.click();
    }
    fetchData();
});

async function fetchData() {
    await Promise.all([
        fetchAndDisplay('https://api.coingecko.com/api/v3/search/trending', ['coins-list', 'nfts-list'], displayTrends, null, 'Trending_data'),
        fetchAndDisplay('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true', ['asset-list'], displayAssets, null, 'Crypto_Data'),
    ]);
}

async function fetchAndDisplay(url, idsToToggle, displayFunction, tabName = null, localKey) {
    idsToToggle.forEach(id => {
        const errorElement = document.getElementById(`${id}-error`);
        if (errorElement) {
            errorElement.style.display = 'none';
        }
        toggleSpinner(id, `${id}-spinner`, true);
    });

    const localStorageKey = localKey;
    const localData = getLocalStorageData(localStorageKey);

    if (localData) {
        idsToToggle.forEach(id => toggleSpinner(id, `${id}-spinner`, false));
        displayFunction(localData);
        if (tabName) {
            tabDataLoaded[tabName] = true;
        }
    } else {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`API returned status ${response.status}`);
            const data = await response.json();
            idsToToggle.forEach(id => toggleSpinner(id, `${id}-spinner`, false));
            displayFunction(data);
            setLocalStorageData(localStorageKey, data);
            if (tabName) {
                tabDataLoaded[tabName] = true;
            }
        } catch (error) {
            console.warn(`Failed to fetch API from CoinGecko for ${localKey}. Falling back to demo data.`, error);
            
            // Show floating Demo Banner at top of page
            const banner = document.getElementById('demo-banner');
            if (banner) {
                banner.classList.remove('hidden');
            }

            // Map local storage key to MOCK_DATA key
            let mockKey = '';
            if (localKey === 'Trending_data') mockKey = 'trending';
            else if (localKey === 'Crypto_Data') mockKey = 'markets';
            else if (localKey === 'Exchanges_Data') mockKey = 'exchanges';
            else if (localKey === 'Categories_Data') mockKey = 'categories';
            else if (localKey === 'Companies_Data') mockKey = 'companies';

            if (mockKey && window.MOCK_DATA && window.MOCK_DATA[mockKey]) {
                const fallbackData = window.MOCK_DATA[mockKey];
                idsToToggle.forEach(id => toggleSpinner(id, `${id}-spinner`, false));
                displayFunction(fallbackData);
                if (tabName) {
                    tabDataLoaded[tabName] = true;
                }
            } else {
                idsToToggle.forEach(id => {
                    toggleSpinner(id, `${id}-spinner`, false);
                    const errorElement = document.getElementById(`${id}-error`);
                    if (errorElement) {
                        errorElement.style.display = 'block';
                    }
                });
                if (tabName) {
                    tabDataLoaded[tabName] = false;
                }
            }
        }
    }
}

function displayTrends(data) {
    if (data.coins) displayTrendCoins(data.coins.slice(0, 5));
    if (data.nfts) displayTrendNfts(data.nfts.slice(0, 5));
}

function displayTrendCoins(coins) {
    const coinsList = document.getElementById('coins-list');
    if (!coinsList) return;
    coinsList.innerHTML = '';
    const table = createTable(['Coin', 'Price', 'Market Cap', 'Volume', '24h%']);

    coins.forEach(coin => {
        const coinData = coin.item;
        const row = document.createElement('tr');
        
        // Clean prices
        let price = coinData.price_btc;
        if (typeof price === 'number') {
            price = price.toFixed(6) + ' BTC';
        } else if (typeof price === 'string') {
            price = parseFloat(price).toFixed(6) + ' BTC';
        } else {
            price = 'N/A';
        }

        // Determine price change class
        const changePercent = coinData.data.price_change_percentage_24h.usd;
        const isPositive = changePercent >= 0;
        const changeText = typeof changePercent === 'number' ? changePercent.toFixed(2) + '%' : 'N/A';
        const changeClass = isPositive ? 'green' : 'red';
        const arrow = isPositive ? 'ri-arrow-up-s-fill' : 'ri-arrow-down-s-fill';

        row.innerHTML = `
            <td class="name-column table-fixed-column"><img src="${coinData.thumb}" alt="${coinData.name}"> ${coinData.name} <span>(${coinData.symbol.toUpperCase()})</span></td>
            <td>${price}</td>
            <td>${coinData.data.market_cap || 'N/A'}</td>
            <td>${coinData.data.total_volume || 'N/A'}</td>
            <td class="${changeClass}"><span><i class="${arrow} ${changeClass}"></i> ${changeText}</span></td>
        `;
        row.onclick = () => window.location.href = `pages/coin.html?coin=${coinData.id}`;
        table.appendChild(row);
    });
    coinsList.appendChild(table);
}

function displayTrendNfts(nfts) {
    const nftsList = document.getElementById('nfts-list');
    if (!nftsList) return;
    nftsList.innerHTML = '';
    const table = createTable(['NFT', 'Market', 'Price', '24h Vol', '24h%']);

    nfts.forEach(nft => {
        const row = document.createElement('tr');
        const changePercent = parseFloat(nft.data.floor_price_in_usd_24h_percentage_change);
        const isPositive = changePercent >= 0;
        const changeClass = isPositive ? 'green' : 'red';
        const arrow = isPositive ? 'ri-arrow-up-s-fill' : 'ri-arrow-down-s-fill';

        row.innerHTML = `
            <td class="name-column table-fixed-column"><img src="${nft.thumb}" alt="${nft.name}"> ${nft.name} <span>(${nft.symbol.toUpperCase()})</span></td>
            <td>${nft.native_currency_symbol.toUpperCase()}</td>
            <td>${nft.data.floor_price}</td>
            <td>${nft.data.h24_volume}</td>
            <td class="${changeClass}"><span><i class="${arrow} ${changeClass}"></i> ${changePercent.toFixed(2)}%</span></td>
        `;
        table.appendChild(row);
    });
    nftsList.appendChild(table);
}

function displayAssets(data) {
    const cryptoList = document.getElementById('asset-list');
    if (!cryptoList) return;
    cryptoList.innerHTML = '';
    const table = createTable(['Rank', 'Coin', 'Price', '24h Price', '24h Price %', 'Total Vol', 'Market Cap', 'Last 7 Days'], 1);

    const sparklineData = [];
    data.forEach(asset => {
        const row = document.createElement('tr');
        const changePercent = asset.price_change_percentage_24h;
        const isPositive = changePercent >= 0;
        const changeClass = isPositive ? 'green' : 'red';
        const arrow = isPositive ? 'ri-arrow-up-s-fill' : 'ri-arrow-down-s-fill';

        row.innerHTML = `
            <td class="rank">${asset.market_cap_rank}</td>
            <td class="name-column table-fixed-column"><img src="${asset.image}" alt="${asset.name}"> ${asset.name} <span>(${asset.symbol.toUpperCase()})</span></td>
            <td>$${asset.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td class="${changeClass}">$${asset.price_change_24h ? asset.price_change_24h.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}</td>
            <td class="${changeClass}"><span><i class="${arrow} ${changeClass}"></i> ${changePercent ? changePercent.toFixed(2) : '0.00'}%</span></td>
            <td>$${asset.total_volume.toLocaleString()}</td>
            <td>$${asset.market_cap.toLocaleString()}</td>
            <td><canvas id="chart-${asset.id}" width="100" height="40"></canvas></td>
        `;
        table.appendChild(row);
        
        if (asset.sparkline_in_7d && asset.sparkline_in_7d.price) {
            sparklineData.push({
                id: asset.id,
                sparkline: asset.sparkline_in_7d.price,
                color: asset.sparkline_in_7d.price[0] <= asset.sparkline_in_7d.price[asset.sparkline_in_7d.price.length - 1] ? '#10B981' : '#EF4444'
            });
        }
        
        row.onclick = () => window.location.href = `pages/coin.html?coin=${asset.id}`;
    });
    cryptoList.appendChild(table);

    // Draw sparklines
    sparklineData.forEach(({ id, sparkline, color }) => {
        const canvas = document.getElementById(`chart-${id}`);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: sparkline.map((_, index) => index),
                datasets: [
                    {
                        data: sparkline,
                        borderColor: color,
                        borderWidth: 1.5,
                        fill: false,
                        pointRadius: 0,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: false,
                scales: {
                    x: { display: false },
                    y: { display: false }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                }
            }
        });
    });
}

function displayExchanges(data) {
    const exchangeList = document.getElementById('exchange-list');
    if (!exchangeList) return;
    exchangeList.innerHTML = '';
    const table = createTable(['Rank', 'Exchange', 'Trust Score', '24h Trade', '24h Trade (Normal)', 'Country', 'Website', 'Year'], 1);

    data = data.slice(0, 20);

    data.forEach(exchange => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="rank">${exchange.trust_score_rank}</td>
            <td class="name-column table-fixed-column"><img src="${exchange.image}" alt="${exchange.name}"> ${exchange.name}</td>
            <td>
                <span style="background: rgba(16, 185, 129, 0.15); color: #10B981; padding: 4px 8px; border-radius: 8px; font-weight: 700;">
                    ${exchange.trust_score}/10
                </span>
            </td>
            <td>${exchange.trade_volume_24h_btc.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} BTC</td>
            <td>${exchange.trade_volume_24h_btc_normalized.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} BTC</td>
            <td class="name-column">${exchange.country || 'N/A'}</td>
            <td><a href="${exchange.url}" target="_blank" class="green" style="font-weight: 600; text-decoration: underline;">Link <i class="ri-external-link-line"></i></a></td>
            <td>${exchange.year_established || 'N/A'}</td>
        `;
        table.appendChild(row);
    });
    exchangeList.appendChild(table);
}

function displayCategories(data) {
    const categoriesList = document.getElementById('category-list');
    if (!categoriesList) return;
    categoriesList.innerHTML = '';
    const table = createTable(['Top Coins', 'Category', 'Market Cap', '24h Market Cap %', '24h Volume'], 1);

    data = data.slice(0, 20);

    data.forEach(category => {
        const row = document.createElement('tr');
        const capChange = category.market_cap_change_24h;
        const isPositive = capChange >= 0;
        const changeClass = isPositive ? 'green' : 'red';
        const arrow = isPositive ? 'ri-arrow-up-s-fill' : 'ri-arrow-down-s-fill';

        row.innerHTML = `
            <td>
                <div style="display: flex; gap: 4px;">
                    ${category.top_3_coins.map(coin => `<img src="${coin}" alt="coin" style="width: 20px; height: 20px; border-radius: 50%;">`).join('')}
                </div>
            </td>
            <td class="name-column table-fixed-column">${category.name}</td>
            <td>$${category.market_cap ? category.market_cap.toLocaleString(undefined, { maximumFractionDigits: 0 }) : 'N/A'}</td>
            <td class="${changeClass}"><span><i class="${arrow} ${changeClass}"></i> ${capChange ? capChange.toFixed(2) : "0.00"}%</span></td>
            <td>$${category.volume_24h ? category.volume_24h.toLocaleString(undefined, { maximumFractionDigits: 0 }) : "N/A"}</td>
        `;
        table.appendChild(row);
    });
    categoriesList.appendChild(table);
}

function displayCompanies(data) {
    const companyList = document.getElementById('company-list');
    if (!companyList) return;
    companyList.innerHTML = '';
    const table = createTable(['Company', 'Total BTC', 'Entry Value', 'Total Current Value', 'Percentage of Supply']);

    data.companies.forEach(company => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="name-column table-fixed-column">${company.name}</td>
            <td>${company.total_holdings.toLocaleString()} BTC</td>
            <td>$${company.total_entry_value_usd.toLocaleString()}</td>
            <td>$${company.total_current_value_usd.toLocaleString()}</td>
            <td class="green" style="font-weight: 600;">${company.percentage_of_total_supply}%</td>
        `;
        table.appendChild(row);
    });
    companyList.appendChild(table);
}