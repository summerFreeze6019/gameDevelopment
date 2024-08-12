// Get references to HTML elements
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const selectImageButton = document.getElementById('selectImageButton');
const uploadImageInput = document.getElementById('uploadImageInput');
const applyTrippyFilterButton = document.getElementById('applyTrippyFilterButton');
const saveArtButton = document.getElementById('saveArtButton');

// Variables to store the current image and whether a filter is applied
let currentImage = null;
let filterApplied = false;

// Function to draw an image on the canvas
function drawImageOnCanvas(image) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}

// Event listener for the "Select Image" button
selectImageButton.addEventListener('click', () => {
    uploadImageInput.click(); // Trigger the hidden file input
});

// Event listener for file input change (when an image is selected)
uploadImageInput.addEventListener('change', () => {
    const file = uploadImageInput.files[0];
    if (file) {
        // Load the selected image onto the canvas
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;
            img.onload = function () {
                currentImage = img;
                drawImageOnCanvas(img);
            };
        };
        reader.readAsDataURL(file);
    }
});

// Function to apply a uniform trippy filter to the entire canvas
function applyTrippyFilter() {
    if (currentImage && !filterApplied) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        // Apply the uniform trippy filter to the entire canvas
        ctx.filter = 'contrast(150%) brightness(150%) saturate(150%) hue-rotate(45deg)';

        // Draw the current image
        ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
        filterApplied = true;
    }
}

// Event listener for the "Apply Trippy Filter" button
applyTrippyFilterButton.addEventListener('click', () => {
    applyTrippyFilter();
});

// Function to save the artwork
function saveArtwork() {
    if (currentImage) {
        // Generate a unique filename using date and time
        const currentDate = new Date();
        const fileName = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}_${currentDate.getHours()}-${currentDate.getMinutes()}-${currentDate.getSeconds()}.png`;

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = fileName;
        link.click();
    }
}

// Event listener for the "Save Artwork" button
saveArtButton.addEventListener('click', () => {
    saveArtwork();
});
