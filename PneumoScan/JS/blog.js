document.addEventListener("DOMContentLoaded", function () {
    fetchPosts();

    const createPostForm = document.getElementById("createPostForm");
    if (createPostForm) {
        createPostForm.addEventListener("submit", handlePostSubmit);
    }
});

// Open blog modal
function openBlogModal(post) {
    document.getElementById('blogTitle').textContent = post.title;
    document.getElementById('blogContent').textContent = post.content;
    document.getElementById('blogAuthor').textContent = `By ${post.author} on ${new Date(post.created_at).toLocaleString()}`;
    
    document.getElementById('blogModal').style.display = 'flex';
}

// Close blog modal
function closeBlogModal() {
    document.getElementById('blogModal').style.display = 'none';
}

// Fetch user info
function fetchUser() {
    fetch('/api/get-user')
        .then(response => response.json())
        .then(data => {
            document.getElementById('username').textContent = data.username;
        })
        .catch(error => console.error('Error fetching user:', error));
}

// Submit new post
document.getElementById('createPostForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    fetch('/api/create-post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content })
    })
    .then(response => response.json())
    .then(() => {
        closeModal();
        fetchPosts(); // Refresh posts after adding new one
    })
    .catch(error => console.error('Error creating post:', error));
});

function openModal() {
    document.getElementById('createPostModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('createPostModal').style.display = 'none';
    document.getElementById('createPostForm').reset();
}

