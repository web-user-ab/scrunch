function loadProject() {
    const projectId = document.getElementById("scratch-id").value.trim();

    if (!projectId || isNaN(projectId)) {
        alert("Please enter a valid Scratch project ID!");
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
    const projectId = document.getElementById("scratch-id").value.trim();
    if (projectId) {
        window.open(`https://forkphorus.github.io/embed#${projectId}`, "_blank");
    }
}

function openScratchPage() {
    const projectId = document.getElementById("scratch-id").value.trim();
    if (projectId) {
        window.open(`https://scratch.mit.edu/projects/${projectId}/`, "_blank");
    }
}

// Auto-load project if URL contains a hash
window.onload = function () {
    const projectId = window.location.hash.substring(1);
    if (projectId) {
        document.getElementById("scratch-id").value = projectId;
        loadProject();
    }
};
