let currentScene = 1;
const totalScenes = 4;
let audioPlaying = false;

function startReading() {
    document.getElementById('bookCover').classList.add('hidden');
    document.getElementById('storyPage').classList.remove('hidden');
    updatePageNumbers();
}

function nextPage() {
    if (currentScene < totalScenes) {
        document.getElementById(`scene${currentScene}`).classList.remove('active');
        currentScene++;
        document.getElementById(`scene${currentScene}`).classList.add('active');
        updateNavigation();
        updatePageNumbers();
        
        // Add a gentle page turn sound effect
        playPageTurnSound();
    }
}

function previousPage() {
    if (currentScene > 1) {
        document.getElementById(`scene${currentScene}`).classList.remove('active');
        currentScene--;
        document.getElementById(`scene${currentScene}`).classList.add('active');
        updateNavigation();
        updatePageNumbers();
        
        // Add a gentle page turn sound effect
        playPageTurnSound();
    }
}

function updateNavigation() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    prevBtn.disabled = currentScene === 1;
    
    if (currentScene === totalScenes) {
        nextBtn.textContent = 'Back to Cover';
        nextBtn.onclick = () => {
            document.getElementById('storyPage').classList.add('hidden');
            document.getElementById('bookCover').classList.remove('hidden');
            currentScene = 1;
            document.getElementById(`scene${currentScene}`).classList.add('active');
            updateNavigation();
            updatePageNumbers();
        };
    } else {
        nextBtn.textContent = 'Next →';
        nextBtn.onclick = nextPage;
    }
}

function updatePageNumbers() {
    document.getElementById('currentPage').textContent = currentScene;
    document.getElementById('totalPages').textContent = totalScenes;
}

function toggleAudio() {
    const audio = document.getElementById('backgroundMusic');
    const button = document.querySelector('.audio-btn');
    
    if (audioPlaying) {
        audio.pause();
        button.textContent = '🔊';
        audioPlaying = false;
    } else {
        audio.play();
        button.textContent = '🔇';
        audioPlaying = true;
    }
}

async function playPageTurnSound() {
    try {
        const result = await websim.textToSpeech({
            text: "",
            voice: "en-female"
        });
        // We'll use a subtle page turn sound effect instead
    } catch (error) {
        console.log("Audio not available");
    }
}

// Keyboard navigation
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault();
        if (currentScene < totalScenes) {
            nextPage();
        }
    } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        if (currentScene > 1) {
            previousPage();
        }
    }
});

// Initialize
updateNavigation();

