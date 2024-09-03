
// MQTT CLIENT SETUP ////////////////////////////////////////////////////////////
const options = {
    username: 'panasonic', // Replace with your MQTT username
    password: 'NMYCfbm9mWA'  // Replace with your MQTT password
};

const client = mqtt.connect('ws://178.128.214.211:8883', options);

client.on('connect', () => {
    console.log('Connected to MQTT broker');

    // Subscribe to a topic
    const subtopic = 'mobiletest';
    client.subscribe(subtopic, (err) => {
        if (!err) {
            console.log(`Subscribed to topic: ${subtopic}`);
        } else {
            console.error(`Failed to subscribe to topic: ${subtopic}`, err);
        }
    });
});

// Handle incoming messages
client.on('message', (subtopic, message) => {
    // message is a Buffer
    const payload = message.toString();
    console.log(`Received message on topic ${subtopic}: ${payload}`);

    // Update the HTML container with the received message
    const container = document.getElementById('mqtt-messages-container');
    if (container) {
        const paragraph = document.createElement('p');
        paragraph.textContent = `${subtopic}: ${payload}`;
        container.insertBefore(paragraph, container.firstChild);
    }
});













// MOUSE AND TOUCH TRACKING	////////////////////////////////////////////////////

// Capture mouse movements and publish coordinates
document.addEventListener('mousemove', (event) => {

    // Map coordinates from 0 to 1
    const mouseX = event.clientX / window.innerWidth;
    const mouseY = event.clientY / window.innerWidth;
    // const mouseX = event.clientX;
    // const mouseY = event.clientY;
    publishMouseCoordinates(mouseX, mouseY);
});

// Capture touch movements and publish coordinates
document.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];

    // Map coordinates from 0 to 1
    // const touchX = event.clientX / window.screen.width;
    // const touchY = event.clientY / window.screen.width;

    const touchX = map(touch.clientX, 0, window.screen.width, 0, 1);
    const touchY = map(touch.clientY, 0, window.screen.width, 0, 1);
    // const touchX = touch.clientX;
    // const touchY = touch.clientY;
    publishMouseCoordinates(touchX, touchY);

    // console.log(`Touch coordinates: x=${touchX}, y=${touchY}`);
});



// P5.JS MICTRACKING ///////////////////////////////////////////////////////////
let mic;
// Capture Microphone Amplitude and publish Level
function setup() {
	// MIC
	mic = new p5.AudioIn();
	mic.start();
}

function draw() {
    //  MIC
	let level = mic.getLevel();
    publishMicLevel(level);


    console.log(`Mic level: ${level}`);
    // let fps = frameRate();
    // console.log(fps);
}


// PUBLSIHING FUNCTIONS /////////////////////////////////////////////////////////

// Function to publish mouse coordinates
function publishMouseCoordinates(x, y) {

    const topic = 'mouse';
    const message = JSON.stringify({ x: x, y: y });
    client.publish(topic, message);

    // console.log(`Mouse coordinates: x=${x}, y=${y}`);
}

// Function to publish MIC level
function publishMicLevel(level) {
    const topic = 'mic';
    const message = JSON.stringify({ level: level });
    client.publish(topic, message);

    // console.log(`Mic level: ${level}`);
}



// UI FUNCTIONS /////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    const descriptions = document.querySelectorAll('.description');
    const icons = document.querySelectorAll('.icon');
    const finalDiv = document.getElementById('final');

    function showElement(descIndex, iconIndex) {
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
    }

    // Show the first description and first image by default
    showElement(0, 0);

    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case '2':
                showElement(1, 1);
                break;
            case '3':
                showElement(2, 0);
                break;
            case '4':
                showElement(3, 1);
                break;
            case '5':
                showElement(null, null);
                break;
            default:
                showElement(0, 0);
        }
    });
});