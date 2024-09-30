// Sample Data for Screenshots
const screenshots = [
    {
        id: 0,
        path_thumbnail: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/703080/ss_fac76f23b1b655dd0459db1a443bc8adb02e4279.600x338.jpg?t=1725365763",
        path_full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/703080/ss_fac76f23b1b655dd0459db1a443bc8adb02e4279.1920x1080.jpg?t=1725365763"
    },
    {
        id: 1,
        path_thumbnail: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/703080/ss_eac1c207cc0aebc8a03ff9d21a8c47089953176d.600x338.jpg?t=1725365763",
        path_full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/703080/ss_eac1c207cc0aebc8a03ff9d21a8c47089953176d.1920x1080.jpg?t=1725365763"
    },
    {
        id: 2,
        path_thumbnail: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/703080/ss_4e8d10e4b066b57ae8ff41be96c8fcdd7b409e90.600x338.jpg?t=1725365763",
        path_full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/703080/ss_4e8d10e4b066b57ae8ff41be96c8fcdd7b409e90.1920x1080.jpg?t=1725365763"
    },
    {
        id: 3,
        path_thumbnail: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/703080/ss_7684be29c49d74eaa0c09c8b0286777c007f5851.600x338.jpg?t=1725365763",
        path_full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/703080/ss_7684be29c49d74eaa0c09c8b0286777c007f5851.1920x1080.jpg?t=1725365763"
    },
    {
        id: 4,
        path_thumbnail: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/703080/ss_2b285fe05b1e62d167d6093f2be0570a9db12c2b.600x338.jpg?t=1725365763",
        path_full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/703080/ss_2b285fe05b1e62d167d6093f2be0570a9db12c2b.1920x1080.jpg?t=1725365763"
    }
];

// Sample Data for Videos
const videos = [
    {
        id: 256766381,
        name: "Planet Zoo Launch Trailer",
        thumbnail: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/256766381/movie.293x165.jpg?t=1686057966",
        mp4: {
            max: "http://video.akamai.steamstatic.com/store_trailers/256766381/movie_max.mp4?t=1686057966"
        }
    },
    {
        id: 256766382,
        name: "Planet Zoo Gameplay Trailer",
        thumbnail: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/256766382/movie.293x165.jpg?t=1686057967",
        mp4: {
            max: "http://video.akamai.steamstatic.com/store_trailers/256766382/movie_max.mp4?t=1686057967"
        }
    },
    {
        id: 256766383,
        name: "Planet Zoo Features Trailer",
        thumbnail: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/256766383/movie.293x165.jpg?t=1686057968",
        mp4: {
            max: "http://video.akamai.steamstatic.com/store_trailers/256766383/movie_max.mp4?t=1686057968"
        }
    },
    {
        id: 256766384,
        name: "Planet Zoo Development Update",
        thumbnail: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/256766384/movie.293x165.jpg?t=1686057969",
        mp4: {
            max: "http://video.akamai.steamstatic.com/store_trailers/256766384/movie_max.mp4?t=1686057969"
        }
    },
    {
        id: 256766385,
        name: "Planet Zoo: North America Pack Trailer",
        thumbnail: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/256766385/movie.293x165.jpg?t=1686057970",
        mp4: {
            max: "http://video.akamai.steamstatic.com/store_trailers/256766385/movie_max.mp4?t=1686057970"
        }
    }
];

// DOM Elements
const videoCarousel = document.getElementById("video-carousel");
const screenshotCarousel = document.getElementById("screenshot-carousel");
const thumbnailsContainer = document.getElementById("thumbnails");
const videoBtn = document.getElementById("video-btn");
const screenshotBtn = document.getElementById("screenshot-btn");

// Function to create video carousel
function createVideoCarousel() {
    videos.forEach((video, index) => {
        const videoElement = document.createElement("video");
        videoElement.src = video.mp4.max;
        videoElement.controls = true;
        videoElement.width = 640;
        videoElement.style.margin = "10px";
        videoElement.dataset.index = index; // Store index for later use
        videoCarousel.appendChild(videoElement);

        // Create thumbnail
        const thumbnail = document.createElement("img");
        thumbnail.src = video.thumbnail;
        thumbnail.className = "thumbnail";
        thumbnail.dataset.index = index; // Store index for later use
        thumbnail.onclick = () => selectVideo(index); // Play video on thumbnail click
        thumbnailsContainer.appendChild(thumbnail);
    });
}

// Function to create screenshot carousel
function createScreenshotCarousel() {
    screenshots.forEach((screenshot, index) => {
        const imgElement = document.createElement("img");
        imgElement.src = screenshot.path_full;
        imgElement.style.width = "640px";
        imgElement.style.margin = "10px";
        imgElement.dataset.index = index; // Store index for later use
        screenshotCarousel.appendChild(imgElement);

        // Create thumbnail
        const thumbnail = document.createElement("img");
        thumbnail.src = screenshot.path_thumbnail;
        thumbnail.className = "thumbnail";
        thumbnail.dataset.index = index; // Store index for later use
        thumbnail.onclick = () => selectScreenshot(index); // Show screenshot on thumbnail click
        thumbnailsContainer.appendChild(thumbnail);
    });
}

// Function to select a video
function selectVideo(index) {
    const videoElements = document.querySelectorAll("#video-carousel video");
    videoElements.forEach(video => video.style.display = "none"); // Hide all videos
    videoElements[index].style.display = "block"; // Show selected video

    // Update active thumbnail
    updateActiveThumbnail(index);
}

// Function to select a screenshot
function selectScreenshot(index) {
    const imgElements = document.querySelectorAll("#screenshot-carousel img");
    imgElements.forEach(img => img.style.display = "none"); // Hide all screenshots
    imgElements[index].style.display = "block"; // Show selected screenshot

    // Update active thumbnail
    updateActiveThumbnail(index);
}

// Function to update active thumbnail
function updateActiveThumbnail(index) {
    const thumbnails = document.querySelectorAll(".thumbnail");
    thumbnails.forEach(thumbnail => thumbnail.classList.remove("active-thumbnail")); // Remove active class
    thumbnails[index].classList.add("active-thumbnail"); // Add active class to current thumbnail
}

// Function to show videos
function showVideos() {
    videoCarousel.classList.add("active");
    screenshotCarousel.classList.remove("active");
    selectVideo(0); // Show the first video
}

// Function to show screenshots
function showScreenshots() {
    screenshotCarousel.classList.add("active");
    videoCarousel.classList.remove("active");
    selectScreenshot(0); // Show the first screenshot
}

// Event listeners
videoBtn.addEventListener("click", showVideos);
screenshotBtn.addEventListener("click", showScreenshots);

// Initialize carousel
createVideoCarousel();
createScreenshotCarousel();

// Show videos by default on load
showVideos();
