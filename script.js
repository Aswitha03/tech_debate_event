// Debate topics
const topics = [
    { id: 1, title: "Ethics of Surveillance Capitalism", description: "Is it a violation of human rights?" },
    { id: 2, title: "Technology and Social Divides", description: "Does technology create or widen social divides?" },
    { id: 3, title: "AI in Public Opinion", description: "Should AI be used to influence elections and public opinion?" },
    { id: 4, title: "AI Accountability", description: "Should AI be held accountable for its actions?" },
    { id: 5, title: "AI and Human Intelligence", description: "Can AI surpass human intelligence? What are the consequences?" },
    { id: 6, title: "Social Media & Cyberbullying", description: "Should social media companies protect users from cyberbullying?" },
    { id: 7, title: "Social Media and Political Polarization", description: "Is social media responsible for increasing political divides?" },
    { id: 8, title: "Social Media Algorithms", description: "Are social media algorithms manipulating users?" },
    { id: 9, title: "AI in Cybersecurity", description: "Can AI and ML algorithms be trusted to detect and respond to cyber threats?" },
    { id: 10, title: "Innovation vs. Sustainability", description: "Should engineering prioritize innovation or sustainability?" },
    { id: 11, title: "Cloud Computing Security", description: "Can cloud computing provide a secure way to store sensitive data?" },
    { id: 12, title: "Robots in Surgery", description: "Should robots completely replace human surgeons in the operating room?" },
    { id: 13, title: "Low Code Development", description: "How will low-code development benefit you in the future?" },
    { id: 14, title: "Technology vs. Human Creativity", description: "Does technology reduce the need for human creativity?" },
    { id: 15, title: "Electric Vehicles and Climate Change", description: "Are EVs truly the best way to combat climate change?" },
    { id: 16, title: "Soft Skills vs. Technical Expertise", description: "Will soft skills become more important than technical expertise for engineers?" },
    { id: 17, title: "VR and Remote Work", description: "Can virtual reality make remote work as effective as in-office work?" },
    { id: 18, title: "IoT in Home Security", description: "Are IoT devices a worthwhile investment for home security?" },
    { id: 19, title: "Online Learning", description: "Do online learning platforms provide equal educational opportunities as traditional education?" },
    { id: 20, title: "IoT and Job Market", description: "What are the consequences of widespread IoT adoption on industries?" },
    { id: 21, title: "Engineers and Skill Updates", description: "Should engineers constantly update their skills to remain employable?" },
    { id: 22, title: "IoT and Living Conditions", description: "Will IoT improve or worsen living conditions?" },
    { id: 23, title: "Self-Driving Cars vs. Public Transport", description: "Should self-driving cars be prioritized over public transportation?" },
    { id: 24, title: "Technology and Environmental Issues", description: "Can technology alone solve the world's environmental problems?" },
    { id: 25, title: "5G vs. Renewable Energy", description: "Is 5G technology more beneficial than renewable energy development?" },
    { id: 26, title: "Biometric Authentication", description: "Is biometric authentication better than passwords?" },
    { id: 27, title: "Theoretical vs. Practical Knowledge", description: "Should engineers focus more on theory or practical knowledge?" },
    { id: 28, title: "AI in Warfare", description: "Can AI replace human soldiers in warfare?" },
    { id: 29, title: "India and a Cashless Economy", description: "Is India truly ready for a cashless economy?" }
];

// DOM Elements
const flipButton = document.getElementById('flipButton');
const coin = document.querySelector('.coin');
const resultDiv = document.getElementById('result');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const timerDisplay = document.getElementById('timer');
const topicSection = document.getElementById('topicSection');
const topicTitle = document.getElementById('topicTitle');
const topicDescription = document.getElementById('topicDescription');
const warningMessage = document.getElementById('warningMessage');

// Timer variables
let time = 600;
let timerInterval = null;
let isRunning = false;
let isFlipping = false;

// Coin flip functionality
function playFlipSound() {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2043/2043-preview.mp3');
    audio.play().catch(e => console.log('Audio play failed:', e));
}

function flipCoin() {
    flipButton.disabled = true;
    coin.style.animation = 'flip 0.6s ease-out infinite';
    resultDiv.textContent = '';
    resultDiv.classList.remove('show');
    playFlipSound();
    
    let flips = 0;
    const flipInterval = setInterval(() => {
        flips++;
        if (flips >= 10) {
            clearInterval(flipInterval);
            const result = Math.random() < 0.5 ? 'HEADS' : 'TAILS';
            coin.style.animation = '';
            coin.style.transform = result === 'HEADS' ? 'rotateY(0)' : 'rotateY(180deg)';
            resultDiv.textContent = `Result: ${result}`;
            resultDiv.classList.add('show');
            flipButton.disabled = false;
            selectRandomTopic();
        }
    }, 150);
}

// Topic selection
function selectRandomTopic() {
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    topicTitle.textContent = randomTopic.title;
    topicDescription.textContent = randomTopic.description;
    topicSection.classList.remove('hidden');
}

// Timer functionality
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startButton.textContent = 'Pause';
        startButton.classList.remove('success-button');
        startButton.classList.add('primary-button');
        timerInterval = setInterval(() => {
            if (time > 0) {
                time--;
                timerDisplay.textContent = formatTime(time);
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                startButton.textContent = 'Start';
                startButton.classList.remove('primary-button');
                startButton.classList.add('success-button');
            }
        }, 1000);
    } else {
        clearInterval(timerInterval);
        isRunning = false;
        startButton.textContent = 'Start';
        startButton.classList.remove('primary-button');
        startButton.classList.add('success-button');
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    time = 600;
    isRunning = false;
    timerDisplay.textContent = formatTime(time);
    startButton.textContent = 'Start';
    startButton.classList.remove('primary-button');
    startButton.classList.add('success-button');
}

// Event listeners
flipButton.addEventListener('click', flipCoin);
startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
