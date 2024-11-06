function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
       tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
       tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
 }

 // Get the element with id="defaultOpen" and click on it
 document.getElementById("defaultOpen").click();




 function openCity1(evt, cityName) {
    var i, tabcontent1, tablinks1;
    tabcontent1 = document.getElementsByClassName("tabcontent1");
    for (i = 0; i < tabcontent1.length; i++) {
       tabcontent1[i].style.display = "none";
    }
    tablinks1 = document.getElementsByClassName("tablinks1");
    for (i = 0; i < tablinks1.length; i++) {
       tablinks1[i].className = tablinks1[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
 }

 // Get the element with id="firstTab" and click on it to open the default tab
 window.onload = function () {
    document.getElementById("firstTab").click();
 };






 let map, marker;

      // Xarita modalini ochish tugmasi bosilganda
      document.getElementById('map-btn').addEventListener('click', function () {
         const modal = document.getElementById('mapModal');
         modal.classList.add('show'); // modalni ko'rsatish uchun 'show' klassi qo'shiladi

         // Geolokatsiya so'rash


         // Modal ko'rinadigan holatga o'tgandan keyin xaritani qayta o'lchash
         setTimeout(function () {
            google.maps.event.trigger(map, 'resize');
            if (marker) {
               map.setCenter(marker.getPosition());
            }
         }, 500);
      });

      // Modalni yopish tugmasi bosilganda
      document.getElementById('closeModal').addEventListener('click', function () {
         document.getElementById('mapModal').classList.remove('show'); // modalni yashirish
      });

      // Xarita boshlang'ich holati
      function initMap(location) {
         if (!map) {
            map = new google.maps.Map(document.getElementById('google-map'), {
               center: location,
               zoom: 12
            });

            // Xaritada bosilgan joyga marker qo'yish
            map.addListener('click', function (event) {
               placeMarkerAndPanTo(event.latLng, map);
            });

            // Boshlang'ich joylashuvda marker qo'yish
            placeMarkerAndPanTo(location, map);
         }
      }

      // Marker joylashuvi va manzilni yangilash
      function placeMarkerAndPanTo(latLng, map) {
         if (marker) {
            marker.setPosition(latLng);
         } else {
            marker = new google.maps.Marker({
               position: latLng,
               map: map,
               draggable: true // Foydalanuvchi markerni harakatlantirishi mumkin
            });
         }
         map.panTo(latLng);
         geocodeLatLng(latLng);
      }

      // Koordinatalarni manzilga o'zgartirish (reverse geocoding)
      function geocodeLatLng(latLng) {
         const geocoder = new google.maps.Geocoder();
         geocoder.geocode({ location: latLng }, function (results, status) {
            if (status === 'OK') {
               if (results[0]) {
                  document.getElementById('address').value = results[0].formatted_address;
               } else {
                  alert('Manzil topilmadi');
               }
            } else {
               alert('Geocoder xatosi: ' + status);
            }
         });
      }
      navigator.geolocation.getCurrentPosition(
         function (position) {
            const userLocation = {
               lat: position.coords.latitude,
               lng: position.coords.longitude
            };
            map.setCenter(userLocation);  // User lokatsiyasini xarita markaziga joylashtirish
            initMap(userLocation);  // Xarita userLocation bilan boshlanadi
         },
         function () {
            alert("Geolokatsiyaga ruxsat berilmagan.");
            const defaultLocation = { lat: 41.2995, lng: 69.2401 }; // Toshkent koordinatalari
            map.setCenter(defaultLocation);
            initMap(defaultLocation);
         }
      );



      // Modalni yopish tugmasi bosilganda
      document.getElementById('closeModal').addEventListener('click', function () {
        document.getElementById('mapModal').classList.remove('show'); // modalni yashirish
     });