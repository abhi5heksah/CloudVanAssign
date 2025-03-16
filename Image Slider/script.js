const mainImage = document.getElementById("mainImage");
const thumbnailContainer = document.getElementById("thumbnailContainer");
const imageURLInput = document.getElementById("imageURL");
const addImageButton = document.getElementById("addImage");
const uploadInput = document.getElementById("uploadImage");
const uploadButton = document.getElementById("uploadButton");

let images = [
  "https://c4.wallpaperflare.com/wallpaper/591/844/1024/spider-man-spider-video-games-superhero-wallpaper-preview.jpg",
  "https://images.hdqwalls.com/wallpapers/doctor-strange-in-the-multiverse-of-madness-2022-4k-p5.jpg",
  "https://free-3dtextureshd.com/wp-content/uploads/2025/01/396.jpg.webp",
  "https://wallpapers.com/images/hd/wanda-red-eyes-4k-gpknc8zmxs486c1s.jpg",
  "https://wallpapercat.com/w/full/4/e/b/54552-3840x2160-desktop-4k-marvel-heroes-wallpaper-photo.jpg",
  "https://4kwallpapers.com/images/wallpapers/spider-man-marvel-superheroes-marvel-comics-2560x1440-4508.jpg",
  "https://wallpapersmug.com/download/3840x2160/fe17e5/avengers-endgame-marvel-superheroes.jpg",
  "https://images.hdqwalls.com/wallpapers/marvels-avengers-spiderman-4k-5w.jpg",
  "https://wallpapers.com/images/hd/4k-hulk-marvel-super-war-wpaqv8lyemtuaeh6.jpg",
  "https://wallpapercave.com/wp/wp8354951.jpg",
  "https://wallpapercat.com/w/full/0/e/a/461091-3840x2160-desktop-4k-groot-wallpaper.jpg",
  "https://wallpaper.dog/large/20547267.jpg",
  "https://4kwallpapers.com/images/wallpapers/doctor-strange-in-the-multiverse-of-madness-elizabeth-olsen-2880x1800-8222.jpg",
];
let currentIndex = [0];

function updateGallery() {
  if (images.length > 0) {
    mainImage.src = images[currentIndex]; // Update main image
    thumbnailContainer.innerHTML = ""; // Clear previous thumbnails

    images.map((img, index) => {
      const thumb = document.createElement("img");
      thumb.src = img;
      thumb.onclick = () => {
        currentIndex = index;
        updateGallery();
      };

      thumb.ondblclick = () => {
        images.splice(index, 1); // Remove clicked image

        if (images.length === 0) {
          mainImage.src = ""; // Clear main image
          thumbnailContainer.innerHTML = ""; // Clear thumbnails
          return;
        }

        currentIndex = Math.min(currentIndex, images.length - 1); // Ensure valid index
        updateGallery(); // Refresh UI
      };

      thumbnailContainer.appendChild(thumb);
    });
  } else {
    mainImage.src = ""; // If no images left, clear main image
    thumbnailContainer.innerHTML = ""; // Clear thumbnails
  }
}

addImageButton.addEventListener("click", () => {
  const url = imageURLInput.value;
  if (url) {
    images.push(url);
    currentIndex = images.length - 1;
    updateGallery();
    imageURLInput.value = "";
  }
});

uploadButton.addEventListener("click", () => {
  uploadInput.click();
});

uploadInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      images.push(e.target.result);
      currentIndex = images.length - 1;
      updateGallery();
    };
    reader.readAsDataURL(file);
  }
});

document.querySelector(".prev").addEventListener("click", () => {
  if (images.length > 0) {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateGallery();
  }
});


document.querySelector(".next").addEventListener("click", () => {
  if (images.length > 0) {
    currentIndex = (currentIndex + 1) % images.length;
    updateGallery();
  }
});

updateGallery();
