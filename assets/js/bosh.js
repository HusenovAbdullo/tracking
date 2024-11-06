async function fetchTrackingData() {
   // Loader'ni ko'rsatish
   document.getElementById('loader').classList.remove('hidden');

   const trackingNumber = document.getElementById('trackingNumberInput').value;

   try {
      const response = await fetch(`https://new.pochta.uz/api/v1/public/track/${trackingNumber}/`);
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0 && data[0].OperationalMailitems) {
         const mailItem = data[0].OperationalMailitems.TMailitemInfoFromScanning[0];
         document.getElementById('trackingNumberDisplay').innerText = mailItem.InternationalId;
         document.getElementById('senderCountry').innerText = mailItem.OrigCountry.Name || 'O\'zbekistan';
         document.getElementById('senderAddress').innerText = mailItem.OrigAddress || '';
         document.getElementById('senderPostcode').innerText = mailItem.OrigPostcode || '';
         document.getElementById('recipientCountry').innerText = mailItem.DestCountry.Name || 'O\'zbekistan';
         document.getElementById('recipientAddress').innerText = mailItem.DestAddress || ''; // Yangi ma'lumot
         document.getElementById('recipientPostcode').innerText = mailItem.DestPostcode || ''; // Yangi ma'lumot

         // Ko'rinishni boshqarish
         toggleVisibility('senderAddress');
         toggleVisibility('senderPostcode');
         toggleVisibility('recipientAddress');
         toggleVisibility('recipientPostcode');

         // Voqealarni ro'yxatga birlashtirish
         let combinedList = mailItem.Events.TMailitemEventScanning.map(event => ({
            date: new Date(event.LocalDateTime),
            location: event.EventOffice.Name,
            status: event.IPSEventType.Name,
            country_code: mailItem.DestCountry.Code
         }));

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
      } else {
         document.getElementById('trackingNumberDisplay').innerText = data.header.data.order_number;
         document.getElementById('senderCountry').innerText = data.header.data.locations[0].address_city || 'O\'zbekistan';
         document.getElementById('senderAddress').innerText = data.header.data.locations[0].address;
         document.getElementById('senderPostcode').innerText = data.header.data.locations[0].postcode;
         document.getElementById('recipientCountry').innerText = data.header.data.locations[1].address_city || 'O\'zbekistan';
         document.getElementById('recipientAddress').innerText = data.header.data.locations[1].address;
         document.getElementById('recipientPostcode').innerText = data.header.data.locations[1].postcode;

         // Ko'rinishni boshqarish
         toggleVisibility('senderAddress');
         toggleVisibility('senderPostcode');
         toggleVisibility('recipientAddress');
         toggleVisibility('recipientPostcode');

         // Shipox va Gdeposilka ma'lumotlarini birlashtirish va tartiblash
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

         if (sortedCombinedList.length > 0) {
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
         } else {
            document.getElementById('combinedTracking').innerHTML = '<li>No tracking events found.</li>';
         }
      }

      document.getElementById('trackingPopup').classList.remove('hidden');
   } catch (error) {
      console.error('Tracking ma\'lumotlarini olishda xato:', error);
   } finally {
      document.getElementById('loader').classList.add('hidden');
   }
}

// Helper function to toggle visibility based on content
function toggleVisibility(elementId) {
   const element = document.getElementById(elementId);
   if (element.innerText.trim() === '') {
      element.parentElement.style.display = 'none'; // Yashirish
   } else {
      element.parentElement.style.display = 'block'; // Ko'rsatish
   }
}

// Helper function to map status descriptions
function getStatusText(statusDesc) {
   return statusDesc || 'Status noaniq';
}
