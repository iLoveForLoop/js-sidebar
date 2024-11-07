const displayName = document.getElementById("name");
const displaySymbol = document.getElementById("symbol");
const displayPrice = document.getElementById("price");
const displayMarketCap = document.getElementById("market-cap");
const displayTotalVolume = document.getElementById("total_volume");
const displayPriceChangePercentage = document.getElementById(
  "price_change_percentage_24h"
);
const displayCirculatingSupply = document.getElementById("circulating_supply");
const displayTotalSupply = document.getElementById("total_supply");
const displayMaxSupply = document.getElementById("max_supply");
const displayATH = document.getElementById("ath");
const displayATL = document.getElementById("atl");
const displayATHDate = document.getElementById("ath_date");
const displayATLDate = document.getElementById("atl_date");

const displayDescription = document.getElementById("description");

function formatCurrency(num) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(num);
}

function formatDigits(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const load = async (crypto) => {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${crypto}`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    const cryptoDetails = {
      id: data.id,
      symbol: data.symbol,
      name: data.name,
      market_cap_rank: data.market_cap_rank,
      description: data.description.en,
      current_price: data.market_data.current_price.php,
      market_cap: data.market_data.market_cap.php,
      total_volume: data.market_data.total_volume.php,
      price_change_percentage_24h: data.market_data.price_change_percentage_24h,
      circulating_supply: data.market_data.circulating_supply,
      total_supply: data.market_data.total_supply,
      max_supply: data.market_data.max_supply,
      ath: data.market_data.ath.php, // All-Time High in PHP
      ath_date: data.market_data.ath_date.php, // Date of All-Time High in PHP
      atl: data.market_data.atl.php, // All-Time Low in PHP
      atl_date: data.market_data.atl_date.php,
    };

    document.getElementById("result").classList.remove("hide");
    document.getElementById("welcome").classList.add("hide");

    displayName.innerHTML = `${cryptoDetails.name}`;
    displaySymbol.innerHTML = `${cryptoDetails.symbol.toUpperCase()}`;
    displayPrice.innerHTML = `${formatCurrency(
      parseFloat(cryptoDetails.current_price)
    )}`;
    displayMarketCap.innerHTML = `${formatCurrency(
      parseFloat(cryptoDetails.market_cap)
    )}`;

    displayTotalVolume.innerHTML = `${formatDigits(
      parseFloat(cryptoDetails.total_volume)
    )}`;

    const priceChange = parseFloat(cryptoDetails.price_change_percentage_24h);
    console.log(priceChange);
    if (priceChange >= 0) {
      displayPriceChangePercentage.style.color = "green";
      displayPriceChangePercentage.innerHTML = `+${priceChange.toFixed(2)}%`;
    } else {
      displayPriceChangePercentage.style.color = "red";
      displayPriceChangePercentage.innerHTML = `${priceChange.toFixed(2)}%`;
    }

    displayCirculatingSupply.innerHTML = `${formatDigits(
      parseFloat(cryptoDetails.circulating_supply)
    )}`;
    displayTotalSupply.innerHTML = `${formatDigits(
      parseFloat(cryptoDetails.total_supply)
    )}`;

    const maxSupply = parseFloat(cryptoDetails.max_supply);

    if (!isNaN(maxSupply)) {
      displayMaxSupply.innerHTML = `${formatDigits(maxSupply)}`;
    } else {
      displayMaxSupply.innerHTML = "∞";
    }

    displayATH.innerHTML = `${formatCurrency(cryptoDetails.ath)}`;
    displayATL.innerHTML = `${formatCurrency(cryptoDetails.atl)}`;

    let athDate = new Date(cryptoDetails.ath_date);
    let atlDate = new Date(cryptoDetails.atl_date);

    const fathDate = athDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const fatlDate = atlDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    displayATHDate.innerHTML = `${fathDate}`;
    displayATLDate.innerHTML = `${fatlDate}`;

    displayDescription.innerHTML = `${cryptoDetails.description}`;
  } catch (error) {
    console.log(error.message);
  }
};

document.getElementById("go").addEventListener("click", (e) => {
  const crypto = document.getElementById("search").value.toLowerCase();
  load(crypto);
  document.getElementById("search").value = "";
});

document.getElementById("logout").addEventListener("click", (e) => {
  window.location.href = "index.html";
});
