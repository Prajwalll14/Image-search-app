let currentPage = 1;
let currentQuery = "";

function searchImages() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();

    if (query === '') {
        alert('Please enter a search term.');
        return;
    }

    // Reset results if it's a new search
    if (currentQuery !== query) {
        currentPage = 1;
        document.getElementById('imageContainer').innerHTML = '';
    }

    currentQuery = query;

    const apiKey = 'Fa1U4fP53h508vwQ-3heXRlmxknIisgNfZID6-kTFrA'; // Replace with your Unsplash API key
    const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&page=${currentPage}&per_page=12&client_id=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayImages(data.results);
            document.querySelector('.button-container').style.display = 'block';
        })
        .catch(error => console.error('Error fetching images:', error));
}

function displayImages(images) {
    const imageContainer = document.getElementById('imageContainer');

    if (currentPage === 1) {
        imageContainer.innerHTML = '';
    }

    images.forEach(image => {
        // Create card
        const cardElement = document.createElement('div');
        cardElement.classList.add('image-card');

        // Image
        const imgElement = document.createElement('img');
        imgElement.src = image.urls.regular;
        imgElement.alt = image.alt_description || "Image";

        // Open modal on click
        imgElement.addEventListener('click', () => openModal(image));

        // Append image to card
        cardElement.appendChild(imgElement);
        imageContainer.appendChild(cardElement);
    });

    currentPage++;
}

// ✅ Open modal with image + download button
function openModal(image) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const downloadBtn = document.getElementById('downloadBtn');

    modal.style.display = "flex";  // Flex centers the modal
    modalImg.src = image.urls.full;

    // Set working download link
    downloadBtn.href = image.urls.full + "&force=true";
    downloadBtn.download = "unsplash-image.jpg";
}

// ✅ Close modal
function closeModal() {
    document.getElementById('imageModal').style.display = "none";
}

// Show more results
function showMore() {
    searchImages();
}

// Hide "Show More" button on first load
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.button-container').style.display = 'none';
});
