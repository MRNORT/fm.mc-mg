// Loads up the statuses from the /status/index.php page onto the radio page
jQuery(function ($) {
  $('#statusMusicStream').load('/status/index.php #statusMusicStream');
  $('#statusSongDatabase').load('/status/index.php #statusSongDatabase');
  $('#statusWebserverFTP').load('/status/index.php #statusWebserverFTP');
});

// Toggle show/hide on the changelog
function toggleChangelog() {
  var old = document.getElementById("old");

  if (old.style.display === 'block') {
    old.style.display = 'none';
    document.getElementById("oldToggle").innerHTML = "Show Full History";
  } else {
    old.style.display = 'block';
    document.getElementById("oldToggle").innerHTML = "Hide Full History";
  }
}

// I'll put all the default onload stuff in here
function defaultPlayer() {
  // Selects either the localstorage volume or a default value
  var vol = localStorage.getItem('volumeKey') || 0.77;
  document.getElementById("volume").value = vol;
  var volume = document.getElementById("stream");
  volume.volume = vol;
}

// When you hit the play button
function playerToggle() {
  var stream = document.getElementById("stream");
  var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);

  if (stream.paused) {
    // Loads up the real stream again if mobile
    if (mobile) {
      stream.src = "http://169.254.131.220:8000/cadence1";
    }
    stream.load();
    stream.play();
    document.getElementById("playerToggle").innerHTML = "❚❚";
  } else {
    // Loads up nothing if mobile
    if (mobile) {
      stream.src = "";
    }
    stream.load();
    document.getElementById("playerToggle").innerHTML = "►";
  }
}

// When you change the volume
function volumeToggle(vol) {
  var volume = document.getElementById("stream");
  volume.volume = vol;

  // Sets the new set volume into localstorage
  localStorage.setItem('volumeKey', vol);
}

// GETS and displays currently playing info
function radioTitle() {
  // Located on Testament's stream client 'web' folder
  var url = 'http://169.254.131.220:8000/now-playing.xsl';

  $.ajax({
    type: 'GET',
    url: url,
    async: true,
    jsonpCallback: 'parseMusic',
    contentType: "application/json",
    dataType: 'jsonp',
    success: function (json) {
      // do not mix up id with the "title" for the page heading
      $('#artist_name').text(json['/cadence1']['artist_name']);
      $('#song_title').text(json['/cadence1']['song_title']);
    },
    error: function (e) {
      console.log(e.message);
      document.getElementById("artist_name").innerHTML = "<span style='color: red;'>Unable to locate track data. <br/> <a href='#statusTable'>Check Server Status?</a></span>";
      document.getElementById("song_title").innerHTML = "";
    }
  });
}

$(document).ready(function () {
  setTimeout(function () {
    radioTitle();
  }, 0);
  setInterval(function () {
    radioTitle();
  }, 10000);
});
