// Crypto Tracker Fallback / Demo Mock Data
// Exposes window.MOCK_DATA containing realistic responses for all CoinGecko endpoints used in this app.

window.MOCK_DATA = {
    // 1. Global Data Fallback
    global: {
        data: {
            active_cryptocurrencies: 14820,
            markets: 1142,
            total_market_cap: { usd: 2482910283720 },
            market_cap_change_percentage_24h_usd: 3.42,
            total_volume: { usd: 84920192830 },
            market_cap_percentage: {
                btc: 52.8,
                eth: 17.5
            }
        }
    },

    // 2. Trending Coins and NFTs Fallback
    trending: {
        coins: [
            {
                item: {
                    id: "bitcoin",
                    name: "Bitcoin",
                    symbol: "BTC",
                    thumb: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png",
                    price_btc: 1.0,
                    data: {
                        market_cap: "$1,340,102,839",
                        total_volume: "$31,420,910,201",
                        price_change_percentage_24h: { usd: 2.45 }
                    }
                }
            },
            {
                item: {
                    id: "ethereum",
                    name: "Ethereum",
                    symbol: "ETH",
                    thumb: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png",
                    price_btc: 0.0514,
                    data: {
                        market_cap: "$412,982,019",
                        total_volume: "$18,921,048,291",
                        price_change_percentage_24h: { usd: 4.82 }
                    }
                }
            },
            {
                item: {
                    id: "solana",
                    name: "Solana",
                    symbol: "SOL",
                    thumb: "https://assets.coingecko.com/coins/images/4128/thumb/solana.png",
                    price_btc: 0.00245,
                    data: {
                        market_cap: "$78,920,381",
                        total_volume: "$4,102,948,019",
                        price_change_percentage_24h: { usd: 8.91 }
                    }
                }
            },
            {
                item: {
                    id: "ripple",
                    name: "Ripple",
                    symbol: "XRP",
                    thumb: "https://assets.coingecko.com/coins/images/44/thumb/xrp-symbol-white-128.png",
                    price_btc: 0.0000084,
                    data: {
                        market_cap: "$31,902,840",
                        total_volume: "$1,042,918,290",
                        price_change_percentage_24h: { usd: -1.25 }
                    }
                }
            },
            {
                item: {
                    id: "dogecoin",
                    name: "Dogecoin",
                    symbol: "DOGE",
                    thumb: "https://assets.coingecko.com/coins/images/5/thumb/dogecoin.png",
                    price_btc: 0.0000021,
                    data: {
                        market_cap: "$22,482,901",
                        total_volume: "$892,102,940",
                        price_change_percentage_24h: { usd: 14.21 }
                    }
                }
            }
        ],
        nfts: [
            {
                name: "Bored Ape Yacht Club",
                symbol: "BAYC",
                thumb: "https://i.seadn.io/gae/Ju9C1gK4114g5mX5nCW7c7n58f7000g.png?w=500&auto=format",
                native_currency_symbol: "ETH",
                data: {
                    floor_price: "12.8",
                    h24_volume: "420.5",
                    floor_price_in_usd_24h_percentage_change: "5.42"
                }
            },
            {
                name: "Mutant Ape Yacht Club",
                symbol: "MAYC",
                thumb: "https://i.seadn.io/gae/lHexK5On7Fpgn2V2U1.png?w=500&auto=format",
                native_currency_symbol: "ETH",
                data: {
                    floor_price: "2.4",
                    h24_volume: "185.2",
                    floor_price_in_usd_24h_percentage_change: "-2.15"
                }
            },
            {
                name: "Pudgy Penguins",
                symbol: "PUDGY",
                thumb: "https://i.seadn.io/gae/yNiU4B23.png?w=500&auto=format",
                native_currency_symbol: "ETH",
                data: {
                    floor_price: "8.5",
                    h24_volume: "310.8",
                    floor_price_in_usd_24h_percentage_change: "12.80"
                }
            },
            {
                name: "Azuki",
                symbol: "AZUKI",
                thumb: "https://i.seadn.io/gae/H-8gtt.png?w=500&auto=format",
                native_currency_symbol: "ETH",
                data: {
                    floor_price: "4.12",
                    h24_volume: "98.4",
                    floor_price_in_usd_24h_percentage_change: "1.05"
                }
            },
            {
                name: "DeGods",
                symbol: "DEGODS",
                thumb: "https://i.seadn.io/gae/M9.png?w=500&auto=format",
                native_currency_symbol: "SOL",
                data: {
                    floor_price: "34.5",
                    h24_volume: "1205.1",
                    floor_price_in_usd_24h_percentage_change: "-4.80"
                }
            }
        ]
    },

    // 3. Asset Markets Fallback (Top 20 Assets)
    markets: [
        {
            market_cap_rank: 1,
            id: "bitcoin",
            name: "Bitcoin",
            symbol: "btc",
            image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
            current_price: 68420.50,
            price_change_24h: 1540.20,
            price_change_percentage_24h: 2.30,
            total_volume: 28492019280,
            market_cap: 1340102839401,
            sparkline_in_7d: {
                price: [66100, 66300, 65900, 67200, 67800, 68100, 68420.5]
            }
        },
        {
            market_cap_rank: 2,
            id: "ethereum",
            name: "Ethereum",
            symbol: "eth",
            image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
            current_price: 3450.75,
            price_change_24h: 135.25,
            price_change_percentage_24h: 4.08,
            total_volume: 17402910390,
            market_cap: 412982019200,
            sparkline_in_7d: {
                price: [3200, 3250, 3210, 3320, 3390, 3420, 3450.75]
            }
        },
        {
            market_cap_rank: 3,
            id: "binancecoin",
            name: "BNB",
            symbol: "bnb",
            image: "https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png",
            current_price: 585.20,
            price_change_24h: -12.40,
            price_change_percentage_24h: -2.07,
            total_volume: 2042918300,
            market_cap: 89402910480,
            sparkline_in_7d: {
                price: [598, 595, 590, 584, 588, 589, 585.2]
            }
        },
        {
            market_cap_rank: 4,
            id: "solana",
            name: "Solana",
            symbol: "sol",
            image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
            current_price: 168.45,
            price_change_24h: 11.20,
            price_change_percentage_24h: 7.12,
            total_volume: 4892019280,
            market_cap: 78920381048,
            sparkline_in_7d: {
                price: [152, 155, 153, 161, 163, 166, 168.45]
            }
        },
        {
            market_cap_rank: 5,
            id: "ripple",
            name: "Ripple",
            symbol: "xrp",
            image: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
            current_price: 0.542,
            price_change_24h: 0.004,
            price_change_percentage_24h: 0.74,
            total_volume: 982019280,
            market_cap: 31902840192,
            sparkline_in_7d: {
                price: [0.531, 0.533, 0.530, 0.538, 0.540, 0.539, 0.542]
            }
        },
        {
            market_cap_rank: 6,
            id: "dogecoin",
            name: "Dogecoin",
            symbol: "doge",
            image: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
            current_price: 0.148,
            price_change_24h: 0.015,
            price_change_percentage_24h: 11.28,
            total_volume: 1204910280,
            market_cap: 22482901204,
            sparkline_in_7d: {
                price: [0.131, 0.133, 0.130, 0.138, 0.141, 0.143, 0.148]
            }
        },
        {
            market_cap_rank: 7,
            id: "cardano",
            name: "Cardano",
            symbol: "ada",
            image: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
            current_price: 0.465,
            price_change_24h: -0.008,
            price_change_percentage_24h: -1.69,
            total_volume: 482019280,
            market_cap: 16902840192,
            sparkline_in_7d: {
                price: [0.478, 0.475, 0.472, 0.468, 0.470, 0.467, 0.465]
            }
        },
        {
            market_cap_rank: 8,
            id: "shiba-inu",
            name: "Shiba Inu",
            symbol: "shib",
            image: "https://assets.coingecko.com/coins/images/11939/large/shiba.png",
            current_price: 0.0000248,
            price_change_24h: 0.0000012,
            price_change_percentage_24h: 5.08,
            total_volume: 820192830,
            market_cap: 14592019280,
            sparkline_in_7d: {
                price: [0.0000231, 0.0000235, 0.0000230, 0.0000242, 0.0000245, 0.0000244, 0.0000248]
            }
        },
        {
            market_cap_rank: 9,
            id: "avalanche-2",
            name: "Avalanche",
            symbol: "avax",
            image: "https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png",
            current_price: 36.80,
            price_change_24h: 1.25,
            price_change_percentage_24h: 3.52,
            total_volume: 382019280,
            market_cap: 14492019280,
            sparkline_in_7d: {
                price: [35.10, 35.40, 35.20, 35.90, 36.30, 36.50, 36.80]
            }
        },
        {
            market_cap_rank: 10,
            id: "polkadot",
            name: "Polkadot",
            symbol: "dot",
            image: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png",
            current_price: 7.15,
            price_change_24h: -0.12,
            price_change_percentage_24h: -1.65,
            total_volume: 184902810,
            market_cap: 10192083920,
            sparkline_in_7d: {
                price: [7.32, 7.28, 7.21, 7.18, 7.20, 7.17, 7.15]
            }
        }
    ],

    // 4. Exchanges Fallback
    exchanges: [
        {
            trust_score_rank: 1,
            name: "Binance",
            image: "https://assets.coingecko.com/exchanges/images/104/small/binance.png",
            trust_score: 10,
            trade_volume_24h_btc: 248201.482,
            trade_volume_24h_btc_normalized: 248201.482,
            country: "Cayman Islands",
            url: "https://www.binance.com",
            year_established: 2017
        },
        {
            trust_score_rank: 2,
            name: "Coinbase Exchange",
            image: "https://assets.coingecko.com/exchanges/images/23/small/Coinbase.png",
            trust_score: 10,
            trade_volume_24h_btc: 84920.103,
            trade_volume_24h_btc_normalized: 84920.103,
            country: "United States",
            url: "https://www.coinbase.com",
            year_established: 2012
        },
        {
            trust_score_rank: 3,
            name: "OKX",
            image: "https://assets.coingecko.com/exchanges/images/283/small/okx.png",
            trust_score: 9,
            trade_volume_24h_btc: 74201.092,
            trade_volume_24h_btc_normalized: 74201.092,
            country: "Seychelles",
            url: "https://www.okx.com",
            year_established: 2017
        },
        {
            trust_score_rank: 4,
            name: "Bybit",
            image: "https://assets.coingecko.com/exchanges/images/518/small/bybit.png",
            trust_score: 9,
            trade_volume_24h_btc: 68102.482,
            trade_volume_24h_btc_normalized: 68102.482,
            country: "British Virgin Islands",
            url: "https://www.bybit.com",
            year_established: 2018
        },
        {
            trust_score_rank: 5,
            name: "Kraken",
            image: "https://assets.coingecko.com/exchanges/images/29/small/kraken.png",
            trust_score: 9,
            trade_volume_24h_btc: 34910.820,
            trade_volume_24h_btc_normalized: 34910.820,
            country: "United States",
            url: "https://www.kraken.com",
            year_established: 2011
        }
    ],

    // 5. Categories Fallback
    categories: [
        {
            name: "Layer 1 (L1)",
            top_3_coins: [
                "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png",
                "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png",
                "https://assets.coingecko.com/coins/images/825/thumb/binance-coin-logo.png"
            ],
            market_cap: 1849201928300,
            market_cap_change_24h: 3.42,
            volume_24h: 54920182900
        },
        {
            name: "Smart Contract Platform",
            top_3_coins: [
                "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png",
                "https://assets.coingecko.com/coins/images/4128/thumb/solana.png",
                "https://assets.coingecko.com/coins/images/975/thumb/cardano.png"
            ],
            market_cap: 582910283910,
            market_cap_change_24h: 4.85,
            volume_24h: 24810293810
        },
        {
            name: "DeFi",
            top_3_coins: [
                "https://assets.coingecko.com/coins/images/13442/thumb/steth_logo.png",
                "https://assets.coingecko.com/coins/images/12559/thumb/Avalanche_Circle_RedWhite_Trans.png",
                "https://assets.coingecko.com/coins/images/8246/thumb/link.png"
            ],
            market_cap: 89102839201,
            market_cap_change_24h: 1.25,
            volume_24h: 4892018290
        },
        {
            name: "Meme Coins",
            top_3_coins: [
                "https://assets.coingecko.com/coins/images/5/thumb/dogecoin.png",
                "https://assets.coingecko.com/coins/images/11939/thumb/shiba.png",
                "https://assets.coingecko.com/coins/images/29850/thumb/pepe-token.jpeg"
            ],
            market_cap: 52910482910,
            market_cap_change_24h: 12.42,
            volume_24h: 8901293810
        }
    ],

    // 6. Companies Treasuries (BTC Holders) Fallback
    companies: {
        companies: [
            {
                name: "MicroStrategy Inc.",
                total_holdings: 214246,
                total_entry_value_usd: 7520000000,
                total_current_value_usd: 14658711300,
                percentage_of_total_supply: 1.02
            },
            {
                name: "Marathon Digital Holdings",
                total_holdings: 16930,
                total_entry_value_usd: 485000000,
                total_current_value_usd: 1158350000,
                percentage_of_total_supply: 0.08
            },
            {
                name: "Tesla, Inc.",
                total_holdings: 9720,
                total_entry_value_usd: 336000000,
                total_current_value_usd: 665040000,
                percentage_of_total_supply: 0.05
            },
            {
                name: "Coinbase Global, Inc.",
                total_holdings: 9480,
                total_entry_value_usd: 210000000,
                total_current_value_usd: 648620000,
                percentage_of_total_supply: 0.04
            },
            {
                name: "Hut 8 Corp.",
                total_holdings: 9110,
                total_entry_value_usd: 198000000,
                total_current_value_usd: 623290000,
                percentage_of_total_supply: 0.04
            }
        ]
    },

    // 7. Coin Details Mock List (Detailed specs for popular coins)
    coinDetails: {
        bitcoin: {
            id: "bitcoin",
            name: "Bitcoin",
            symbol: "btc",
            market_cap_rank: 1,
            image: { thumb: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png" },
            market_data: {
                current_price: { usd: 68420.50 },
                market_cap: { usd: 1340102839401 },
                ath: { usd: 73737.94 },
                atl: { usd: 67.81 },
                total_volume: { usd: 28492019280 },
                total_supply: 21000000,
                max_supply: 21000000,
                circulating_supply: 19702839,
                high_24h: { usd: 68900.00 },
                low_24h: { usd: 66420.10 }
            },
            tickers: [
                { market: { name: "Binance" }, trade_url: "https://www.binance.com/en/trade/BTC_USDT", trust_score: "green" },
                { market: { name: "Coinbase" }, trade_url: "https://pro.coinbase.com/trade/BTC-USD", trust_score: "green" },
                { market: { name: "OKX" }, trade_url: "https://www.okx.com/trade-spot/btc-usdt", trust_score: "green" }
            ],
            links: {
                homepage: ["https://bitcoin.org"],
                whitepaper: "https://bitcoin.org/bitcoin.pdf",
                twitter_screen_name: "bitcoin",
                facebook_username: "bitcoins"
            },
            description: {
                en: "Bitcoin is the first decentralized digital currency. It was created in 2009 by an anonymous person or group under the pseudonym Satoshi Nakamoto. Transactions are verified by network nodes through cryptography and recorded in a public distributed ledger called a blockchain. Bitcoin is designed to have a maximum supply of 21 million coins, making it a deflationary asset."
            }
        },
        ethereum: {
            id: "ethereum",
            name: "Ethereum",
            symbol: "eth",
            market_cap_rank: 2,
            image: { thumb: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png" },
            market_data: {
                current_price: { usd: 3450.75 },
                market_cap: { usd: 412982019200 },
                ath: { usd: 4878.26 },
                atl: { usd: 0.42 },
                total_volume: { usd: 17402910390 },
                total_supply: 120102938,
                max_supply: null,
                circulating_supply: 120102938,
                high_24h: { usd: 3480.00 },
                low_24h: { usd: 3290.00 }
            },
            tickers: [
                { market: { name: "Binance" }, trade_url: "https://www.binance.com/en/trade/ETH_USDT", trust_score: "green" },
                { market: { name: "Coinbase" }, trade_url: "https://pro.coinbase.com/trade/ETH-USD", trust_score: "green" },
                { market: { name: "OKX" }, trade_url: "https://www.okx.com/trade-spot/eth-usdt", trust_score: "green" }
            ],
            links: {
                homepage: ["https://ethereum.org"],
                whitepaper: "https://ethereum.org/en/whitepaper/",
                twitter_screen_name: "ethereum",
                facebook_username: "ethereumproject"
            },
            description: {
                en: "Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether (ETH) is the native cryptocurrency of the platform. Among cryptocurrencies, Ether is second only to Bitcoin in market capitalization. It was conceived in 2013 by programmer Vitalik Buterin."
            }
        },
        solana: {
            id: "solana",
            name: "Solana",
            symbol: "sol",
            market_cap_rank: 4,
            image: { thumb: "https://assets.coingecko.com/coins/images/4128/thumb/solana.png" },
            market_data: {
                current_price: { usd: 168.45 },
                market_cap: { usd: 78920381048 },
                ath: { usd: 259.96 },
                atl: { usd: 0.50 },
                total_volume: { usd: 4892019280 },
                total_supply: 578029103,
                max_supply: null,
                circulating_supply: 448201928,
                high_24h: { usd: 171.20 },
                low_24h: { usd: 154.50 }
            },
            tickers: [
                { market: { name: "Binance" }, trade_url: "https://www.binance.com/en/trade/SOL_USDT", trust_score: "green" },
                { market: { name: "Coinbase" }, trade_url: "https://pro.coinbase.com/trade/SOL-USD", trust_score: "green" },
                { market: { name: "Bybit" }, trade_url: "https://www.bybit.com/en-US/trade/spot/SOL/USDT", trust_score: "green" }
            ],
            links: {
                homepage: ["https://solana.com"],
                whitepaper: "https://solana.com/solana-whitepaper.pdf",
                twitter_screen_name: "solana",
                facebook_username: "solanalabs"
            },
            description: {
                en: "Solana is a high-performance blockchain platform designed for decentralized applications and smart contracts. It utilizes a unique consensus mechanism called Proof of History (PoH) combined with Proof of Stake (PoS) to achieve high transaction throughput and low fees."
            }
        }
    },

    // 8. Search Results Mock Logic
    getSearchResult: function(query) {
        const q = query.toLowerCase();
        const coins = [
            { market_cap_rank: 1, id: "bitcoin", name: "Bitcoin", symbol: "BTC", thumb: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png" },
            { market_cap_rank: 2, id: "ethereum", name: "Ethereum", symbol: "ETH", thumb: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png" },
            { market_cap_rank: 4, id: "solana", name: "Solana", symbol: "SOL", thumb: "https://assets.coingecko.com/coins/images/4128/thumb/solana.png" }
        ].filter(coin => coin.name.toLowerCase().includes(q) || coin.symbol.toLowerCase().includes(q));

        const exchanges = [
            { id: "binance", name: "Binance", market_type: "Spot/Derivatives", thumb: "https://assets.coingecko.com/exchanges/images/104/small/binance.png" },
            { id: "coinbase", name: "Coinbase Exchange", market_type: "Spot", thumb: "https://assets.coingecko.com/exchanges/images/23/small/Coinbase.png" }
        ].filter(ex => ex.name.toLowerCase().includes(q));

        const nfts = [
            { id: "bayc", name: "Bored Ape Yacht Club", symbol: "BAYC", thumb: "https://i.seadn.io/gae/Ju9C1gK4114g5mX5nCW7c7n58f7000g.png?w=500&auto=format" },
            { id: "pudgy", name: "Pudgy Penguins", symbol: "PUDGY", thumb: "https://i.seadn.io/gae/yNiU4B23.png?w=500&auto=format" }
        ].filter(nf => nf.name.toLowerCase().includes(q) || nf.symbol.toLowerCase().includes(q));

        return { coins, exchanges, nfts };
    }
};
