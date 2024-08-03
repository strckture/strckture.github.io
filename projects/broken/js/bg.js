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
        contentFrame.src = "mouse.html";
        hint.style.opacity = "0";

      }
    });

  });