function extractProjectID(url) {
    const match = url.match(/projects\/(\d+)/);
    return match ? match[1] : null;
}

function loadProject(projectId = null) {
    let input = document.getElementById("scratch-url").value;
    if (!projectId) {
        projectId = extractProjectID(input);
    }

    if (!projectId) {
        alert("Invalid Scratch project URL!");
        return;
    }

    const playerContainer = document.getElementById("player-container");
    playerContainer.innerHTML = ""; // Clear previous project

    // Create an iframe to load Forkphorus
    const iframe = document.createElement("iframe");
    iframe.src = `https://forkphorus.github.io/embed#${projectId}`;
    iframe.width = "480";
    iframe.height = "360";
    iframe.allowFullscreen = true;
    iframe.style.border = "none";
    iframe.id = "scratch-iframe";

    playerContainer.appendChild(iframe);

    // Show buttons
    document.getElementById("fullscreen-btn").style.display = "inline-block";
    document.getElementById("new-tab-btn").style.display = "inline-block";

    // Store project ID in the URL hash for direct access
    window.location.hash = `#${projectId}`;
}

function enterFullscreen() {
    const iframe = document.getElementById("scratch-iframe");
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) { // Firefox
        iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) { // Chrome, Safari, Opera
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { // IE/Edge
        iframe.msRequestFullscreen();
    }
}

function openInNewTab() {
    const projectId = window.location.hash.substring(1) || extractProjectID(document.getElementById("scratch-url").value);
    if (projectId) {
        window.open(`https://forkphorus.github.io/embed#${projectId}`, "_blank");
    }
}

// Check if the page was loaded with a project ID in the URL
window.onload = function () {
    const projectId = window.location.hash.substring(1);
    if (projectId) {
        loadProject(projectId);
    }
};
