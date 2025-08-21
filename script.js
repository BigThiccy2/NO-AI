var audio = new Audio('/s/boing.mp3'); // Replace with your sound file
    var button = document.getElementById('myButton'); // Replace with your button's ID

    button.addEventListener('mousehover', function() {
      audio.play();
    });

    button.addEventListener('click', function() {
      audio.play();
    });