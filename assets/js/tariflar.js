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



// API URL
const apiUrl = 'http://10.100.0.24/api/v1/public/control-category-pages/';

// Fetch blogs from the API
fetch(apiUrl)
  .then(response => response.json())
  .then(blogs => {
      const blogsContainer = document.getElementById('blogs');
      blogs.forEach(blog => {
          const blogDiv = document.createElement('div');
          blogDiv.innerHTML = `
              <a href="sahifa.html?id=${blog.id}">
                  <p style="color: #0d47a1;">${blog.title_uz}</p>
              </a>
          `;
          blogsContainer.appendChild(blogDiv);
      });
  })
  .catch(error => console.error('Error fetching blogs:', error));