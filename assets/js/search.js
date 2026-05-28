const coinsList = document.getElementById('coins-list');
const exchangesList = document.getElementById('exchanges-list');
const nftsList = document.getElementById('nfts-list');

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');
    if (query) {
        fetchSearchResult(query, [coinsList, exchangesList, nftsList]);
    } else {
        const searchHeading = document.getElementById('searchHeading');
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer) {
            searchContainer.innerHTML = `<p style="color: var(--color-red); text-align: center; grid-column: 1 / -1; font-weight: 600; padding: 20px;">Nothing To Show...</p>`;
        }
        if (searchHeading) {
            searchHeading.innerText = 'Please search something...';
        }
    }
});

function fetchSearchResult(param, idsToToggle) {
    const searchHeading = document.getElementById('searchHeading');
    if (searchHeading) {
        searchHeading.innerText = `Search results for "${param}"`;
    }

    idsToToggle.forEach(id => {
        if (!id) return;
        const errorElement = document.getElementById(`${id.id}-error`);
        if (errorElement) {
            errorElement.style.display = 'none';
        }
        toggleSpinner(id.id, `${id.id}-spinner`, true);
    });

    if (coinsList) coinsList.innerHTML = '';
    if (exchangesList) exchangesList.innerHTML = '';
    if (nftsList) nftsList.innerHTML = '';

    const url = `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(param)}`;
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: status ' + response.status);
            }
            idsToToggle.forEach(id => toggleSpinner(id.id, `${id.id}-spinner`, false));
            return response.json();
        })
        .then(data => {
            renderSearchResults(data);
        })
        .catch(error => {
            console.warn(`Search API fail for "${param}". Falling back to mock search data.`, error);
            
            // Show floating warning banner
            const banner = document.getElementById('demo-banner');
            if (banner) {
                banner.classList.remove('hidden');
            }

            if (window.MOCK_DATA && typeof window.MOCK_DATA.getSearchResult === 'function') {
                idsToToggle.forEach(id => toggleSpinner(id.id, `${id.id}-spinner`, false));
                const mockResults = window.MOCK_DATA.getSearchResult(param);
                renderSearchResults(mockResults);
            } else {
                idsToToggle.forEach(id => {
                    toggleSpinner(id.id, `${id.id}-spinner`, false);
                    const errorElement = document.getElementById(`${id.id}-error`);
                    if (errorElement) {
                        errorElement.style.display = 'block';
                    }
                });
            }
        });
}

function renderSearchResults(data) {
    let coins = (data.coins || []).filter(coin => coin.thumb !== "missing_thumb.png");
    let exchanges = (data.exchanges || []).filter(ex => ex.thumb !== "missing_thumb.png");
    let nfts = (data.nfts || []).filter(nf => nf.thumb !== "missing_thumb.png");

    const coinsCount = coins.length;
    const exchangesCount = exchanges.length;
    const nftsCount = nfts.length;

    // Constrain counts so columns match roughly in mock mode if non-zero
    let minCount = Math.min(coinsCount, exchangesCount, nftsCount);
    if (coinsCount > 0 && exchangesCount > 0 && nftsCount > 0) {
        coins = coins.slice(0, Math.max(minCount, 5));
        exchanges = exchanges.slice(0, Math.max(minCount, 5));
        nfts = nfts.slice(0, Math.max(minCount, 5));
    }

    coinsResult(coins);
    exchangesResult(exchanges);
    nftsResult(nfts);

    if (coins.length === 0 && coinsList) {
        coinsList.innerHTML = '<p style="color: var(--color-red); text-align: center; padding: 10px;">No matching coins found.</p>';
    }

    if (exchanges.length === 0 && exchangesList) {
        exchangesList.innerHTML = '<p style="color: var(--color-red); text-align: center; padding: 10px;">No matching exchanges found.</p>';
    }

    if (nfts.length === 0 && nftsList) {
        nftsList.innerHTML = '<p style="color: var(--color-red); text-align: center; padding: 10px;">No matching NFTs found.</p>';
    }
}

function coinsResult(coins) {
    if (!coinsList) return;
    coinsList.innerHTML = '';

    const table = createTable([
        'Rank', 'Coin'
    ]);

    coins.forEach(coin => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${coin.market_cap_rank || 'N/A'}</td>
            <td class="name-column"><img src="${coin.thumb}" alt="${coin.name}"> ${coin.name} <span>(${coin.symbol.toUpperCase()})</span></td>
        `;
        table.appendChild(row);
        
        // Sibling page navigation
        row.onclick = () => {
            window.location.href = `coin.html?coin=${coin.id}`;
        };
    });
    coinsList.appendChild(table);
}

function exchangesResult(exchanges) {
    if (!exchangesList) return;
    exchangesList.innerHTML = '';

    const table = createTable([
        'Exchange', 'Market'
    ]);

    exchanges.forEach(ex => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="name-column"><img src="${ex.thumb}" alt="${ex.name}"> ${ex.name}</td>
            <td><span style="background: rgba(6, 182, 212, 0.15); color: #06B6D4; padding: 4px 8px; border-radius: 8px; font-weight: 700; font-size: 11px;">${ex.market_type}</span></td>
        `;
        table.appendChild(row);
    });
    exchangesList.appendChild(table);
}

function nftsResult(nfts) {
    if (!nftsList) return;
    nftsList.innerHTML = '';

    const table = createTable([
        'NFT', 'Symbol'
    ]);

    nfts.forEach(nf => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="name-column"><img src="${nf.thumb}" alt="${nf.name}"> ${nf.name}</td>
            <td style="font-weight:600">${nf.symbol}</td>
        `;
        table.appendChild(row);
    });
    nftsList.appendChild(table);
}