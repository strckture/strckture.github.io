// testing
// const clientID = 'test';

// MQTT CLIENT SETUP ////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// MQTT Client ID
const url = new URL(window.location.href);
const searchParams = url.searchParams;
const clientID = searchParams.get('client_id') || 'japan_test';

// Global Client ID
console.log(`Client ID: ${clientID}`);

const options = {
    username: 'panasonic', 
    password: 'NMYCfbm9mWA', 
    clientId: clientID, 
    clean: true, // Ensure only one session per client ID
    reconnectPeriod: 0, // Disable reconnection to avoid duplicate sessions
    will: {
        topic: clientID + '/Disconnect',
        payload: 'Client disconnected',
        qos: 1,
        retain: false
    },
    resubscribe: true // Automatically resubscribe after reconnection
};

let client; // Declare client in global scope
let mqttConnected = false;

window.onload = function () {
    // Ensure MQTT connection is established only once
    if (!mqttConnected) {
        // Connect to MQTT broker on page load
        connectToMQTT();
        mqttConnected = true; // Mark connection as established
    }
};

// Connect to the MQTT broker
function connectToMQTT() {
    client = mqtt.connect('ws://178.128.214.211:8883', options);

    client.on('connect', () => {
        console.log('Connected to MQTT broker');

        // Subscribe to a topic
        const subtopic = '/Season';
        client.subscribe(clientID + subtopic, (err) => {
            if (!err) {
                console.log(`Subscribed to topic: ${clientID + subtopic}`);
            } else {
                console.error(`Failed to subscribe to topic: ${clientID + subtopic}`, err);
            }
        });

        // Publish a message based on the current HTML file
        const currentPath = window.location.pathname;
        if (currentPath.includes('index.html')) {
            client.publish(clientID + '/Page', '0');
            console.log('Published page 0');
        } else if (currentPath.includes('experience.html')) {
            client.publish(clientID + '/Page', '1');
            console.log('Published page 1');
        } else if (currentPath.includes('video.html')) {
            client.publish(clientID + '/Page', '2');
            console.log('Published page 2');
        }
    });


    // Handle incoming messages
    client.on('message', (subtopic, message) => {
        const payload = message.toString();
        console.log(`Received message on topic ${subtopic}: ${payload}`);

        // Handle the display based on the received message
        switch (payload) {
            case '1':
                showElement(1, 1);
                micLevelPublishingActive = true;
                break;
            case '2':
                showElement(2, 0);
                micLevelPublishingActive = false;
                break;
            case '3':
                showElement(3, 1);
                micLevelPublishingActive = true;
                break;
            case '4':
                showElement(null, null);
                micLevelPublishingActive = false;
                break;
            default:
                showElement(0, 0);
                micLevelPublishingActive = false;
        }
    });

    client.on('close', () => {
        console.log('MQTT connection closed');
        mqttConnected = false;
    });

    client.on('error', (error) => {
        console.error('MQTT Error:', error);
    });
}

// Close the connection when the window is unloaded
window.onbeforeunload = function () {
    if (client && mqttConnected) {
        client.end();
        console.log('MQTT connection ended');
    }
};


// MOUSE AND TOUCH TRACKING	////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// Swipe tracking variables
let touchStartX = 0;
let touchStartY = 0;
let touchStartTime = 0;
let swipeActive = false;
const swipeMinThreshold = 50;  // Minimum swipe distance in pixels
const swipeMaxThreshold = 250; // Maximum swipe distance in pixels

// Attach event listeners
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
document.addEventListener('touchend', handleTouchEnd, false);

function handleTouchStart(event) {
    const touch = event.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    touchStartTime = new Date().getTime(); // Capture the time swipe starts
    swipeActive = true;  // Start tracking the swipe
}

function handleTouchMove(event) {
    event.preventDefault(); // Prevent scrolling while swiping

    if (!swipeActive) return; // If swipe is already finished, ignore

    const touch = event.touches[0];
    const touchEndX = touch.clientX;
    const touchEndY = touch.clientY;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance >= swipeMaxThreshold) {
        // Trigger function when max distance is reached
        logSwipeDetails(touchEndX, touchEndY);
        swipeActive = false;  // Stop further swipe tracking
    }
}

function handleTouchEnd(event) {
    if (!swipeActive) return; // If swipe is already finished, ignore

    const touch = event.changedTouches[0];
    const touchEndX = touch.clientX;
    const touchEndY = touch.clientY;

    logSwipeDetails(touchEndX, touchEndY);
    swipeActive = false;  // Stop swipe tracking after touch end
}

function logSwipeDetails(touchEndX, touchEndY) {
    const touchEndTime = new Date().getTime(); // Capture the time swipe ends
    const deltaTime = touchEndTime - touchStartTime; // Time difference in ms

    const deltaX = touchEndX - touchStartX; // Difference in X-axis
    const deltaY = touchEndY - touchStartY; // Difference in Y-axis

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY); // Swipe distance in pixels
    if (distance >= swipeMinThreshold) {
        // const angle = Math.atan2(deltaY, deltaX); 
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI); // Swipe angle in degrees
        const velocity = distance / deltaTime; // Velocity in px/ms

        console.log(`Swipe Detected`);
        console.log(`Direction: ${angle.toFixed(2)} degrees`);
        console.log(`Distance: ${distance.toFixed(2)} pixels`);
        console.log(`Velocity: ${velocity.toFixed(4)} px/ms`);

        // Publish the swipe details
        // const swipeDetails = { angle, distance, velocity };
        // client.publish(clientID + '/Swipe', swipeDetails, { qos: 1 });
        const swipeAngle = angle.toFixed(0);
        const swipeDistance = distance.toFixed(2);
        const swipeVelocity = velocity.toFixed(4);
        client.publish(clientID + '/SwipeAng', swipeAngle, { qos: 1 });
        client.publish(clientID + '/SwipeDist', swipeDistance, { qos: 1 });
        client.publish(clientID + '/SwipeVel', swipeVelocity, { qos: 1 });
    } else {
        console.log(`Swipe too short: ${distance.toFixed(2)} pixels. Minimum threshold is ${swipeMinThreshold}px.`);
    }
}


// PUBLSIHING FUNCTIONS /////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// Function to publish MIC level
function publishMicLevel(level) {
    // const topic = 'mic';
    // const message = JSON.stringify({ level: level });
    client.publish(clientID + '/Blow', level);

    console.log(`Mic level: ${level}`);
}

// UI FUNCTIONS /////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// EXPERIENCE UI ////////////////////////////////////////////////////////////////
// Add a flag to track the active state
let micLevelPublishingActive = false;

// document.addEventListener('DOMContentLoaded', () => {


function showElement(descIndex, iconIndex) {
    const descriptions = document.querySelectorAll('.description');
    const icons = document.querySelectorAll('.icon');
    const finalDiv = document.getElementById('final');
    descriptions.forEach((desc, index) => {

    if (index === descIndex) {
            desc.classList.add('active');
        } else {
            desc.classList.remove('active');
        }
    });

    icons.forEach((icon, index) => {
        if (index === iconIndex) {
            icon.classList.add('active');
        } else {
            icon.classList.remove('active');
        }
    });

    if (descIndex === null && iconIndex === null) {
        finalDiv.classList.add('active');
    } else {
        finalDiv.classList.remove('active');
    }

        // Check if elements 2 or 4 are active
    // if (descIndex === 2 || descIndex === 4) {
    //     micLevelPublishingActive = true;
    // } else {
    //     micLevelPublishingActive = false;
    // }
}

document.addEventListener('DOMContentLoaded', () => {
    // Show the first description and first image by default
    showElement(0, 0);
});

// P5.JS MICTRACKING ///////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
const BLOW_DURATION_THRESHOLD = 3; // 3 seconds
const MIN_BLOW_DURATION_THRESHOLD = 0.15; // 0.15 seconds

let mic;
let blowThreshold = 0.05;
let isBlowing = false;
let blowStartTime = 0;
let blowLevels = [];

// Capture Microphone Amplitude and publish Level
function setup() {
    // MIC
    mic = new p5.AudioIn();
    mic.start();
}

function draw() {
    // MIC
    let level = mic.getLevel();
    level = parseFloat(level.toFixed(5));

    if (micLevelPublishingActive) {
        if (level > blowThreshold) {
            if (!isBlowing) {
                // Start a new blow
                isBlowing = true;
                blowStartTime = millis();
                blowLevels = [level];
            } else {
                // Continue tracking the blow
                blowLevels.push(level);

                // Check if blow duration exceeds the threshold
                let currentBlowDuration = (millis() - blowStartTime) / 1000; // Duration in seconds
                if (currentBlowDuration >= BLOW_DURATION_THRESHOLD) {
                    // End the blow
                    isBlowing = false;
                    let averageIntensity = blowLevels.reduce((a, b) => a + b, 0) / blowLevels.length;

                    // Publish the blow data
                    publishBlowData(currentBlowDuration, averageIntensity);
                }
            }
        } else {
            if (isBlowing) {
                // End the blow
                isBlowing = false;
                let blowEndTime = millis();
                let blowDuration = (blowEndTime - blowStartTime) / 1000; // Duration in seconds
                if (blowDuration >= MIN_BLOW_DURATION_THRESHOLD) {
                    let averageIntensity = blowLevels.reduce((a, b) => a + b, 0) / blowLevels.length;

                    // Publish the blow data
                    publishBlowData(blowDuration, averageIntensity);
                }
            }
        }
    }
}

function publishBlowData(duration, intensity) {
    client.publish(clientID + '/BlowDuration', duration.toFixed(2), { qos: 1 });
    client.publish(clientID + '/BlowIntensity', intensity.toFixed(5), { qos: 1 });

    console.log(`Blow duration: ${duration.toFixed(2)} seconds`);
    console.log(`Blow intensity: ${intensity.toFixed(5)}`);
}

// VIDEO UI /////////////////////////////////////////////////////////////////////
// Overlay click event listener
document.addEventListener('DOMContentLoaded', function() {
    const videoWrappers = document.querySelectorAll('.video-wrapper');

    videoWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', function() {
            // Remove the 'active' class from all .video-overlay elements
            document.querySelectorAll('.video-overlay.active').forEach(activeOverlay => {
                activeOverlay.classList.remove('active');
            });

            // Add the 'active' class to the clicked .video-overlay element
            const overlay = wrapper.querySelector('.video-overlay');
            overlay.classList.add('active');
        });
    });
});

// Function to toggle play-pause state
function togglePlayPause(button) {
    const isPlaying = button.classList.contains('playing');
    const buttonId = button.getAttribute('data-id');

    if (!isPlaying) {
        play(buttonId);
        button.classList.add('playing');
    } else {
        pause(buttonId);
        button.classList.remove('playing');
    }

    // Pause all other buttons
    const allButtons = document.querySelectorAll('.play-pause-button');
    allButtons.forEach((btn) => {
        if (btn !== button && btn.classList.contains('playing')) {
            pause(btn.getAttribute('data-id'));
            btn.classList.remove('playing');
        }
    });
}

// Play function
function play(buttonId) {
    console.log(`Play button ${buttonId}`);
    // Add your play logic here
}

// Pause function
function pause(buttonId) {
    console.log(`Pause button ${buttonId}`);
    // Add your pause logic here
}