document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    if (postId) {
        fetch(`/api/get-post?id=${postId}`)
            .then(response => response.json())
            .then(post => {
                document.getElementById("blogTitle").textContent = post.title;
                document.getElementById("blogAuthor").textContent = `By ${post.author}`;
                document.getElementById("blogDate").textContent = `Published on ${new Date(post.created_at).toLocaleDateString()}`;
                document.getElementById("blogContent").textContent = post.content;
            })
            .catch(error => console.error("Error fetching post:", error));
    }
});
