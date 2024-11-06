document.addEventListener('DOMContentLoaded', function () {
    const url = new URL(window.location);
    const hash = url.hash.substring(1);

    // Show the tab based on the URL hash
    if (hash) {
       const tabButton = document.querySelector(`button[data-bs-target="#${hash}"]`);
       if (tabButton) {
          tabButton.click();
       }
    }

    // Update URL hash when a tab is shown
    document.querySelectorAll('button[data-bs-toggle="tab"]').forEach(button => {
       button.addEventListener('shown.bs.tab', function (event) {
          const target = event.target.getAttribute('data-bs-target').substring(1);
          url.hash = target;
          history.replaceState(null, null, url);
       });
    });
 });


//yozdam sahifasiniki
 document.addEventListener('DOMContentLoaded', function () {
    const url = new URL(window.location);
    const hash = url.hash.substring(1);

    // Show the tab based on the URL hash
    if (hash) {
       const tabButton = document.querySelector(`button[data-bs-target="#${hash}"]`);
       if (tabButton) {
          tabButton.click();
       }
    }

    // Update URL hash when a tab is shown
    document.querySelectorAll('button[data-bs-toggle="tab"]').forEach(button => {
       button.addEventListener('shown.bs.tab', function (event) {
          const target = event.target.getAttribute('data-bs-target').substring(1);
          url.hash = target;
          history.replaceState(null, null, url);
       });
    });
 });