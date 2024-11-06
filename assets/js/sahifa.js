
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


// Get the blog ID from the URL
const params = new URLSearchParams(window.location.search);
const blogId = params.get('id');

// Fetch all blogs from the API (again)
const apiUrl = 'http://10.100.0.24/api/v1/public/rates/';

fetch(apiUrl)
  .then(response => response.json())
  .then(blogs => {
      // Find the blog with the matching ID
      const blog = blogs.find(b => b.id == blogId);

      if (blog) {
          // Display the blog's title and full content
          document.getElementById('blog-title').textContent = blog.title_uz;
          document.getElementById('blog-content').innerHTML = blog.description_uz;
          document.getElementById('blog-image').src = blog.save_image;
      } else {
          document.getElementById('blog-content').textContent = 'Blog not found!';
      }
  })
  .catch(error => console.error('Error fetching blog details:', error));