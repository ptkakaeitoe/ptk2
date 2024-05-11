const accessKey = "6y6wWRDMBJyHpe2g-VY3kL9ImlnRef73EgRJmX1WR7M";
const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("searchInput");

async function fetchImages(query = "") {
  let url = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=10`;
  if (query) {
    url = `https://api.unsplash.com/search/photos?client_id=${accessKey}&query=${query}&per_page=10`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    const images = query ? data.results : data; // Handle search results differently
    displayImages(images);
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

function displayImages(images) {
  gallery.innerHTML = ""; // Clear existing images
  images.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = image.urls.regular;
    imgElement.alt = image.alt_description;
    gallery.appendChild(imgElement);
  });
}

function searchImages() {
  const query = searchInput.value;
  fetchImages(query);
}
document
  .getElementById("searchInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents the default action of the Enter key in a form
      document.getElementById("searchButton").click();
    }
  });
