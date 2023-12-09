const $rates = document.getElementById("rates");
let rates = {
  GBP: 0.8577039975,
  ILS: 3.983855367,
};

async function main() {
  const newRates = await fetchRates();

  if (newRates) {
    rates = newRates;
  }

  displayRates(rates);

  updateCurrencyOptions();

  initConverter();
}

async function fetchRates() {
  return fetch("/api/exchange/rates")
    .then((res) => res.json())
    .then((json) => json.data)
    .catch((err) => {
      console.error(err);
    });
}

function displayRates(rates) {
  $rates.innerText = JSON.stringify(rates, null, 2);
}

function updateCurrencyOptions() {
  const $targetCurrenciesSelect = document.getElementById("targetCurrency");
  const newOptions = Object.keys(rates).map((currency) => {
    return `<option value="${currency}">${currency}</option>`;
  });

  $targetCurrenciesSelect.innerHTML = newOptions.join("");
}

function initConverter() {
  const $sourceAmount = document.getElementById("sourceAmount");
  const $targetCurrenciesSelect = document.getElementById("targetCurrency");
  const $targetAmount = document.getElementById("targetAmount");

  $sourceAmount.addEventListener("input", (e) => {
    const sourceAmount = e.target.value;
    const targetCurrency = $targetCurrenciesSelect.value;

    $targetAmount.value = caclulateTargetAmount(sourceAmount, targetCurrency);
  });

  $targetCurrenciesSelect.addEventListener("change", (e) => {
    const sourceAmount = $sourceAmount.value;
    const targetCurrency = e.target.value;

    $targetAmount.value = caclulateTargetAmount(sourceAmount, targetCurrency);
  });
}

function caclulateTargetAmount(sourceAmount, targetCurrency) {
  return (sourceAmount * rates[targetCurrency]).toFixed(2);
}

main();
