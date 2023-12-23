document.addEventListener('DOMContentLoaded', function() {
    const toggleCheckbox = document.getElementById('toggleCheckbox');
    const contentFrame = document.getElementById('contentFrame');

    const hint = document.getElementById('hint');
  
    toggleCheckbox.addEventListener('change', function() {
      if (toggleCheckbox.checked) {
        // Execute your function when the toggle is in the "on" state
        // onToggleOn();
        contentFrame.src = "song.html";
        hint.style.opacity = "1";
      } else {
        // Execute your function when the toggle is in the "off" state
        // onToggleOff();
        contentFrame.src = "mic.html";
        hint.style.opacity = "0";

      }
    });
  
//     // Your custom function for the "on" state
//     function onToggleOn() {
//       console.log('Toggle is ON');
//       // Add your custom code here
//     }
  
//     // Your custom function for the "off" state
//     function onToggleOff() {
//       console.log('Toggle is OFF');
//       // Add your custom code here
//     }
  });