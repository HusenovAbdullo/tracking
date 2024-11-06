async function fetchCurrencyRates() {
    try {
      const response = await fetch('https://cbu.uz/uz/arkhiv-kursov-valyut/json/');
      const data = await response.json();

      const currencyList = document.getElementById('currency-list');
      currencyList.innerHTML = ''; // Clear existing content

      const requiredCurrencies = ['USD', 'EUR', 'RUB', 'CNY', 'TRY', 'XDR'];
      const filteredData = data.filter(currency => requiredCurrencies.includes(currency.Ccy));

      filteredData.forEach(currency => {
        const listItem = document.createElement('li');
        listItem.classList.add('d-flex', 'align-items-center');

        const icon = document.createElement('i');
        icon.classList.add('bi', 'bi-currency', 'd-flex', 'align-items-center', 'justify-content-center');
        icon.dataset.currency = currency.Ccy;

        const box = document.createElement('div');
        box.classList.add('box');

        const currencyName = document.createElement('span');
        currencyName.classList.add('fz-12', 'fw-500', 'inter', 'pra', 'm-1', 'd-block');
        currencyName.textContent = `1 ${currency.CcyNm_UZ}`;

        const currencyRate = document.createElement('span');
        currencyRate.classList.add('fz-16', 'fw-400', 'inter', 'pra', 'm-1', 'd-block');
        currencyRate.textContent = currency.Rate;

        box.appendChild(currencyName);
        box.appendChild(currencyRate);
        listItem.appendChild(icon);
        listItem.appendChild(box);

        currencyList.appendChild(listItem);
      });
    } catch (error) {
      console.error('Error fetching currency rates:', error);
    }
  }

  document.addEventListener('DOMContentLoaded', fetchCurrencyRates);