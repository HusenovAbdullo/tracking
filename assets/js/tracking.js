async function fetchTrackingData() {
   const trackingNumber = document.getElementById('trackingNumberInput').value;
   const response = await fetch(`http://209.97.184.213/api/v1/public/track/${trackingNumber}/`);
   const data = await response.json();

   // Update header information
   document.getElementById('trackingNumberDisplay').innerText = data.header.data.order_number;
   document.getElementById('senderCountry').innerText = data.header.data.locations[0].address_city || 'O\'zbekistan';
   document.getElementById('senderAddress').innerText = data.header.data.locations[0].address;
   document.getElementById('senderPostcode').innerText = data.header.data.locations[0].postcode;
   document.getElementById('recipientCountry').innerText = data.header.data.locations[1].address_city || 'O\'zbekistan';
   document.getElementById('recipientAddress').innerText = data.header.data.locations[1].address;
   document.getElementById('recipientPostcode').innerText = data.header.data.locations[1].postcode;

   // Combine and sort Shipox and Gdeposilka data by date descending
   let combinedList = [];

   if (data.shipox && data.shipox.data && data.shipox.data.list) {
      combinedList = [
         ...data.shipox.data.list.map(item => ({
            date: new Date(item.date),
            location: item.warehouse ? item.warehouse.name : '',
            status: getStatusText(item.status_desc),
            country_code: data.header.data.locations[1].country.code
         }))
      ];
   }

   if (data.gdeposilka && data.gdeposilka.data && data.gdeposilka.data.checkpoints) {
      combinedList = [
         ...combinedList,
         ...data.gdeposilka.data.checkpoints.map(item => ({
            date: new Date(item.time),
            location: item.location_translated,
            status: getStatusText(item.status_name),
            country_code: item.courier.country_code
         }))
      ];
   }

   const sortedCombinedList = combinedList.sort((a, b) => b.date - a.date);

   const combinedHtmlList = sortedCombinedList.map(item =>
      `<li>
          <a href="#0" class="d-flex align-items-center">
             <span class="fz-12 fw-500 title inter">${item.date.toLocaleString()}</span>
             <span class="cateicon">
  <img src="assets/img/flags/${item.country_code.toLowerCase()}.svg" alt="flag" class="flag-icon">
</span>
             <span class="fz-12 fw-500 inter title d-block">${item.location}</span>
             <span class="fz-12 d-block fw-500 inter success2">${item.status}</span>
          </a>
       </li>`
   ).join('');

   document.getElementById('combinedTracking').innerHTML = combinedHtmlList;
}

function getStatusText(status) {
   switch (status) {
      case 'Issued to recipient':
         return 'Qabul qiluvchiga berilgan';
      case 'Order Received':
         return 'Tayinlanmagan';
      case 'In sorting facility':
         return 'Saralash markazida';
      case 'Ready for delivery':
         return 'Jo\'natish uchun tayyor';
      case 'In Transit':
         return 'Yo\'lda';
      case 'В пути - Покинула промежуточный пункт':
         return 'Yo\'lda - yo\'l nuqtasini tark etdi';
      case 'Проведен осмотр с использованием ТСТК':
         return 'Tekshiruv TSTC yordamida amalga oshirildi';
      case 'Прибыла на таможню':
         return 'Bojxonaga yetib keldi';
      case 'Экспорт из страны отправления':
         return 'Ishlab chiqarilgan mamlakatdan eksport qilish';
      case 'Посылка принята':
         return 'Posilka qabul qilindi';
      default:
         return status; // Return original status if no custom mapping
   }
}
