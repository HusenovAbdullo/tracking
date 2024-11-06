document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');

    phoneInput.addEventListener('focus', function() {
        if (phoneInput.value === '') {
            phoneInput.value = '+998';
        }
    });

    phoneInput.addEventListener('input', function() {
        if (!phoneInput.value.startsWith('+998')) {
            phoneInput.value = '+998';
        }
    });

    phoneInput.addEventListener('keydown', function(event) {
        if (phoneInput.selectionStart < 4 && (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight' && event.key !== 'Backspace' && event.key !== 'Delete')) {
            event.preventDefault();
            phoneInput.setSelectionRange(4, 4);
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const signUpForm = document.querySelector(".sign-up-form");
  
    signUpForm.addEventListener("submit", async function (e) {
      e.preventDefault(); // Prevent default form submission
  
      // Collect form data
      const fish = signUpForm.querySelector("input[name='fish']").value;
      const viloyat = signUpForm.querySelector("select[name='viloyat']").value;
      const manzil = signUpForm.querySelector("input[name='manzil']").value;
      const phone = signUpForm.querySelector("input[name='phone']").value;
      const parol = signUpForm.querySelector("input[name='parol']").value;
  
      // Create the payload for the API
      const requestBody = {
        fish: fish,
        viloyat: viloyat,
        manzil: manzil,
        phone: phone,
        password: parol,
      };
  
      try {
        // Send the POST request to the registration API
        const response = await fetch("http://10.100.0.24/api/v1/public/register/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
  
        // Handle the response
        if (response.ok) {
          const data = await response.json();
          alert("Ro'yxatdan muvaffaqiyatli o'tildi!"); // Success message
          console.log("Registration successful:", data);
  
          // Optionally, redirect to the login page or another page
          window.location.href = "profile.html"; // Redirect to profile page after successful registration
        } else {
          const errorData = await response.json();
          alert(`Xatolik yuz berdi: ${errorData.message}`); // Show error message
          console.error("Registration error:", errorData);
        }
      } catch (error) {
        console.error("Network error:", error);
        alert("Tarmoq xatosi. Keyinroq urinib ko'ring.");
      }
    });
  });
  
