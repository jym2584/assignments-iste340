const listOfGames = games;

let selectedGameId = null;
let selectLayer = 0;
let selectLayerCurrMessage = "Select a Genre";

/**
 * 
 * @param currentPreview  - DOM object of the current media being previewed
 * @param thumbnailPreviews -  DOPM object of thumbnail previews
 * @param {String} type - "screenshots" or "video"  
 * @param {JSON} gameInfo - Current game info 
 */
function populateCarouselMedia(
  currentPreview,
  thumbnailPreviews,
  type,
  gameInfo
) {
  let carouselPreviews = document.createElement("div");
  carouselPreviews.id = "carousel-preview";
  carouselPreviews.style =
    "display: flex; overflow-x: auto; padding: 10px; border: 1px solid #ccc; border-radius: 5px; width: 100%;";

    // Screenshot thumbnails
  if (type === "screenshots") {
    gameInfo.media.screenshots.forEach((media) => {
      let preview = document.createElement("img");
      preview.setAttribute("src", media.path_thumbnail);
      preview.setAttribute("width", "116");
      preview.setAttribute("height", "65");
      preview.style =
        "margin-right: 5px; cursor: pointer; ";

      // Event handler to showcase the current image that is clicked
      preview.addEventListener("click", (e) => {
        // Remove any current layers being shown
        currentPreview.childNodes.forEach((e) => {
          currentPreview.removeChild(e);
        });

        // Create new image div inside of currentPreview and show it
        let imageView = document.createElement("img");
        imageView.setAttribute("src", media.path_full);
        imageView.setAttribute("width", "569");
        imageView.setAttribute("height", "320");

        currentPreview.appendChild(imageView);
      });
      carouselPreviews.appendChild(preview);
    });
  }

  // Video thumbnails
  if (type === "video") {
    gameInfo.media.movies.forEach((media) => {
      let preview = document.createElement("img");
      preview.setAttribute("src", media.thumbnail);
      preview.setAttribute("width", "116");
      preview.setAttribute("height", "65");
      preview.style =
        "margin-right: 5px; cursor: pointer;";

      // Event handler to showcase the current image that is clicked
      preview.addEventListener("click", (e) => {
        // Remove any current layers being shown
        currentPreview.childNodes.forEach((e) => {
          currentPreview.removeChild(e);
        });

        // Create new image div inside of currentPreview and show it
        let videoView = document.createElement("video");
        videoView.src = media["webm"]["480"];
        videoView.setAttribute("width", "569");
        videoView.setAttribute("height", "320");
        videoView.controls = true;
        videoView.muted = true;
        videoView.volume = 0.25;

        currentPreview.appendChild(videoView);
      });
      carouselPreviews.appendChild(preview);
    });
  }

  thumbnailPreviews.appendChild(carouselPreviews);
}

/**
 * Initializes game info DOM object
 * @returns  DOM object containing populated game info
 */
async function showGameInfo() {
  let gameInfoDiv = document.getElementById("game_info");

  // Clear previous game infos 
  gameInfoDiv.childNodes.forEach((e) => {
    // Clear previous game info before appending new one
    gameInfoDiv.removeChild(e);
  });

  let gameInfo = await fetchGameInfoFromStore(selectedGameId);

  if (!gameInfo) {
    let errorMessage = document.createElement("p");
    errorMessage.appendChild(document.createTextNode("Game information could not be retrieved."));
    gameInfoDiv.appendChild(errorMessage);
    return;
  }

  let mainDiv = document.createElement("div");
  mainDiv.style =
    "display: grid; grid-template-columns: 1fr 2fr; gap: 20px; padding: 20px; background-color: #f9f9f9; border-radius: 10px;";

  
  // ***********************
  // Carousel
  // ***********************
  let left = document.createElement("div");
  left.style = "display: flex; flex-direction: column;";

  // Current media being shown
  let currentPreview = document.createElement("div"); // main preview of what's going to be embedded
  currentPreview.style =
    "border: 1px solid #ccc; border-radius: 5px; overflow: hidden; width: 569px; height: 320px; margin-bottom: 10px;";

  // Slideshows
  let thumbnailPreviews = document.createElement("div"); // list of thumbnails
  thumbnailPreviews.style =
    "display: flex; flex-wrap: nowrap; justify-content: start;  width: 569px;";

  // Buttons
  let buttonsControls = document.createElement("div");
  buttonsControls.style = "display: flex; margin-top: 10px;";

  let videosButton = document.createElement("button");
  videosButton.appendChild(document.createTextNode("Videos"));
  videosButton.addEventListener("click", (e) => {
    thumbnailPreviews.childNodes.forEach((child) => {
      thumbnailPreviews.removeChild(child);
    });
    populateCarouselMedia(currentPreview, thumbnailPreviews, "video", gameInfo);
  });

  let screenshotsButton = document.createElement("button");
  screenshotsButton.appendChild(document.createTextNode("Screenshots"));
  screenshotsButton.style.backgroundColor = "green";
  screenshotsButton.addEventListener("click", (e) => {
    thumbnailPreviews.childNodes.forEach((child) => {
      thumbnailPreviews.removeChild(child);
    });
    populateCarouselMedia(
      currentPreview,
      thumbnailPreviews,
      "screenshots",
      gameInfo
    );
  });

  // show screenshots by default
  populateCarouselMedia(
    currentPreview,
    thumbnailPreviews,
    "screenshots",
    gameInfo
  );
  // Create new image div inside of currentPreview and show it
  let imageView = document.createElement("img");
  imageView.src = gameInfo.media.screenshots[0].path_thumbnail;
  imageView.width = "569";
  imageView.height = "320";

  currentPreview.appendChild(imageView);
  // Add button controls

  buttonsControls.appendChild(screenshotsButton);
  if (gameInfo.media.movies) {
    buttonsControls.appendChild(videosButton);
  }

  // Save as cookie/local storage button
  let saveGameButton = document.createElement("button");
  saveGameButton.textContent = "Save to History";

  saveGameButton.addEventListener("click", (e) => {
    // Check if cookie is enabled

    // Use cookie as preferred method
    console.log("button clicked");
    let savedGames = [];

    let useCookies = false;
    SetCookie("test", 1);
    if (GetCookie("test")) {
      useCookies = true;
      DeleteCookie("test");
    }

    if (useCookies) {
      let cookieGames = GetCookie("savedGames");
      savedGames = JSON.parse(GetCookie("savedGames"));
      console.log(`savedGames cookies: ${savedGames}`);
      // otherwise use local storage
    } else if (window.localStorage) {
      savedGames = JSON.parse(localStorage.getItem("savedGames"));
    }

    let gameExists = false;
    for (let i = 0; i < savedGames.length; i++) {
      if (parseInt(savedGames[i].value) === parseInt(gameInfo.value)) {
        gameExists = true;
        break; // Exit the loop if a match is found
      }
    }

    if (!gameExists) {
      // Push new game info into the array
      savedGames.push({
        text: gameInfo.name,
        value: parseInt(gameInfo.value),
      });

      if (useCookies) {
        SetCookie("savedGames", JSON.stringify(savedGames));
        console.log(`Updated cookies ${JSON.parse(GetCookie("savedGames"))}`);
      } else if (window.localStorage) {
        localStorage.setItem("savedGames", JSON.stringify(savedGames));
        console.log(`Updated local storage: ${JSON.stringify(savedGames)}`);
      }

      let dropdownButtonDiv = document.getElementById("dropdown_button_div");
      dropdownButtonDiv.childNodes.forEach((node) => {
        dropdownButtonDiv.removeChild(node);
      });

      let dropdownMenu = showHistoryDropdownMenu();
      dropdownButtonDiv.appendChild(dropdownMenu);
    } else {
      console.log("Game already added");
    }
  });

  buttonsControls.appendChild(saveGameButton);

  // ************************
  // Add to the left panel
  // ************************
  left.appendChild(currentPreview);
  left.appendChild(thumbnailPreviews);
  left.appendChild(buttonsControls);

  // ***********************
  // Game Info
  // ***********************
  let right = document.createElement("div");

  // Banner
  if (gameInfo.media && gameInfo.media.banner) {
    let gameBanner = document.createElement("img");
    gameBanner.src = gameInfo.media.banner;
    gameBanner.alt = `${gameInfo.name} banner`;
    gameBanner.style =
      "border-radius: 5px; margin-bottom: 10px; width: 306px; height: 143px; ";
    right.appendChild(gameBanner);
  }

  // Name
  let gameName = document.createElement("h2");
  gameName.textContent = gameInfo.name;
  gameName.style = "margin-bottom: 10px; color: #333;";
  right.appendChild(gameName);

  // Description
  let gameDescription = document.createElement("p");
  gameDescription.textContent = gameInfo.description;
  gameDescription.style = "color: #666; margin-bottom: 10px;";
  right.appendChild(gameDescription);

  let steamWebsite = document.createElement("a");
  steamWebsite.href = `https://store.steampowered.com/app/${selectedGameId}`;
  steamWebsite.textContent = "Steam Page";
  steamWebsite.target = "_blank";
  right.appendChild(steamWebsite);

  // Website
  if (gameInfo.website) {
    let gameWebsite = document.createElement("a");
    gameWebsite.href = gameInfo.website;
    gameWebsite.textContent = "Official Website";
    gameWebsite.target = "_blank";
    right.appendChild(gameWebsite);
  }

  // ***********************
  // Attach everything together
  // ***********************
  mainDiv.append(left);
  mainDiv.append(right);
  gameInfoDiv.appendChild(mainDiv);
  slideDown(gameInfoDiv);

  // Do background change animation
  document.getElementsByTagName('body')[0].style.backgroundImage = `url(${gameInfo.background})`;
  document.getElementsByTagName('body')[0].style.backgroundSize = "cover"; 
}


/**
 * Populates dynamic selects
 * @param {JSON} tree - Current json tree from generated data 
 * @returns 
 */
function generateSelectFromCurrentTree(tree) {
  if (!tree) {
    return;
  }

  let mainDiv = document.createElement("div");
  let currentSelectStatement = document.createElement("h3");

  let selectOptions = document.createElement("select");
  mainDiv.id = `dynamic-select-${selectLayer}`;
  selectOptions.id = `dynamic-select-${selectLayer}`;
  selectLayer += 1;

  // Default option
  let defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  selectOptions.appendChild(defaultOption);
  mainDiv.style.height = "0px";
  mainDiv.style.overflow = "hidden";

  // Populate selects if the current tree is still a map
  if (!Array.isArray(tree)) {
    for (let selection in tree) {
      let option = document.createElement("option");
      option.value = selection;
      option.textContent = selection;
      selectOptions.appendChild(option);
    }

    selectOptions.addEventListener("change", (e) => {
      // Handle select generation
      let gameSelectionsDiv = document.getElementById("game_selections");
      // Update selection tree if applicable
      while (
        gameSelectionsDiv.lastChild &&
        gameSelectionsDiv.lastChild.id !== e.target.id
      ) {
        gameSelectionsDiv.removeChild(gameSelectionsDiv.lastChild);
        selectLayer -= 1;
      }

      // Create and append the next select based on the selection
      let selectedValue = e.target.value;
      let nextTree = tree[selectedValue];
      if (!Array.isArray(nextTree)) {
        selectLayerCurrMessage = `What kind of ${selectedValue}?`;
      } else {
        selectLayerCurrMessage = `You might like these games!`;
      }
     
      // Create the new select and append it to the game selections div
      let newSelect = generateSelectFromCurrentTree(nextTree);
      gameSelectionsDiv.appendChild(newSelect);

      // Start the slide down animation
      requestAnimationFrame(() => {
        slideDown(newSelect);
      });
    });
  } else {
    // Populate select array
    tree.forEach((selection) => {
      let option = document.createElement("option");
      option.value = selection.value;
      option.textContent = selection.text;
      option.id = "lastSelect";
      selectOptions.appendChild(option);
    });

    // Event handling for choosing last selection
    selectOptions.addEventListener("change", (e) => {
      let selectedOption = e.target.options[e.target.selectedIndex];
      if (selectedOption.id === "lastSelect") {
        selectedGameId = String(selectedOption.value);
        showGameInfo(selectedGameId);
      }
    });
  }

  currentSelectStatement.textContent = selectLayerCurrMessage;
  mainDiv.appendChild(currentSelectStatement);
  mainDiv.appendChild(selectOptions);

  // Append to the game selections div
  let gameSelectionsDiv = document.getElementById("game_selections");
  gameSelectionsDiv.appendChild(mainDiv);

  // Start the slide down animation for the current mainDiv
  requestAnimationFrame(() => {
    slideDown(mainDiv);
  });

  return mainDiv;
}

/**
 * Slides down the element
 * @param {Document} element DOM object to do the slide down animation
 */
function slideDown(element) {
  // Get the height of the current div and make it hidden by default
  let targetHeight = element.scrollHeight;
  element.style.height = "0px";
  element.style.overflow = "hidden";

  // Start slidedown animation
  let startTime = null;
  function animate(timestamp) {
    if (!startTime) {
      startTime = timestamp;
    }

    // Calculate how much the div should move
    let currentHeight = ((timestamp - startTime) / 150) * targetHeight;
    element.style.height = currentHeight + "px";

    // Keep animating until currentHeight reaches the target height
    if (currentHeight < targetHeight) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

/**
 * Dropdown to show cookie/local storage history of games selected
 * @returns DOM object
 */
function showHistoryDropdownMenu() {
  let dropdown = document.createElement("div");
  dropdown.className = "dropdown";

  // Dropdown button
  let dropdownButton = document.createElement("button");
  dropdownButton.className = "dropdown-button";

  // Dropdown content
  let dropdownContent = document.createElement("div");
  dropdownContent.className = "dropdown-content";

  // Check if cookie is enabled
  let savedGames = [];
  let useCookies = false;
  SetCookie("test", 1);
  if (GetCookie("test")) {
    useCookies = true;
    DeleteCookie("test");
  }

  // Use cookie as preferred method
  if (useCookies) {
    let cookieGames = GetCookie("savedGames");
    if (!cookieGames) {
      console.log("No cookies. Initialized cookies");
      SetCookie("savedGames", JSON.stringify([]));
    }

    savedGames = JSON.parse(GetCookie("savedGames"));
    console.log(`savedGames cookies: ${savedGames}`);
    dropdownButton.textContent = "Saved Games (Cookies)";

    // otherwise use local storage
  } else if (window.localStorage) {
    try {
      let storageGames = localStorage.getItem("savedGames");
      if (!storageGames) {
        console.log("Local storage initialize");
        localStorage.setItem("savedGames", JSON.stringify([]));
      }

      savedGames = JSON.parse(storageGames);
      console.log(`Saved games local storage: ${savedGames}`);
      dropdownButton.textContent = "Saved Games (Local Storage)";
    } catch {}
  }

  // Populate dropdown with saved games
  if (savedGames.length > 0) {
    for (let i = 0; i < savedGames.length; i++) {
      let dropdownSelect = document.createElement("div");
      dropdownSelect.className = "dropdown-select";

      dropdownSelect.textContent = savedGames[i].text;
      dropdownSelect.value = savedGames[i].value;
      dropdownSelect.addEventListener("click", (e) => {
        let selectedOption = String(e.target.value);
        selectedGameId = selectedOption;

        showGameInfo();
      });

      dropdownContent.appendChild(dropdownSelect);
    }
  } else {
    let dropdownSelect = document.createElement("div");
    dropdownSelect.className = "dropdown-select";
    dropdownSelect.textContent = "Nothing to see here. Go save some games!";
    dropdownContent.appendChild(dropdownSelect);
  }

  // Append button and content to dropdown
  dropdown.appendChild(dropdownButton);
  dropdown.appendChild(dropdownContent);

  return dropdown;
}

/**
 * Button to remove cookies or local storage
 * @returns DOM object
 */
function removeHistoryButton() {
  let button = document.createElement("button");
  let useCookies = false;
  SetCookie("test", 1);
  if (GetCookie("test")) {
    useCookies = true;
    DeleteCookie("test");
  }

  if (useCookies) {
    button.textContent = "Remove History from Cookies";
    button.addEventListener("click", (e) => {
      SetCookie("savedGames", JSON.stringify([]));

      let dropdownButtonDiv = document.getElementById("dropdown_button_div");
      dropdownButtonDiv.childNodes.forEach((node) => {
        dropdownButtonDiv.removeChild(node);
      });

      let dropdownMenu = showHistoryDropdownMenu();
      dropdownButtonDiv.appendChild(dropdownMenu);
    });
  } else if (window.localStorage) {
    button.textContent = "Remove History from Local Storage";

    button.addEventListener("click", (e) => {
      localStorage.setItem("savedGames", JSON.stringify([]));

      let dropdownButtonDiv = document.getElementById("dropdown_button_div");
      dropdownButtonDiv.childNodes.forEach((node) => {
        dropdownButtonDiv.removeChild(node);
      });

      let dropdownMenu = showHistoryDropdownMenu();
      dropdownButtonDiv.appendChild(dropdownMenu);
    });
  }

  return button;
}

/**
 * Initializes web page
 */
function init() {
  let gameSelectionsDiv = document.getElementById("game_selections");
  gameSelectionsDiv.appendChild(generateSelectFromCurrentTree(listOfGames));

  let dropdownMenu = showHistoryDropdownMenu();
  let dropdownButtonDiv = document.getElementById("dropdown_button_div");
  dropdownButtonDiv.appendChild(dropdownMenu);

  document
    .getElementById("delete_button_div")
    .appendChild(removeHistoryButton());
}
