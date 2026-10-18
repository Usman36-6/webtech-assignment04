var KEY = "mySlides";   

var defaultText =
  "# Slide 1\n## Welcome\nworld|!\n---\n" +
  "# Slide 2\n- My Name is Usman Azeem\n- I am a student\n---\n" +
  "# Slide 3\nThanks";

var slides = [];
var current = 0;
var inPresent = false;

var editor = document.getElementById("editor");
var editorScreen = document.getElementById("editorScreen");
var presentScreen = document.getElementById("presentScreen");
var previewBox = document.getElementById("previewBox");
var msg = document.getElementById("msg");

function inline(text) {
  text = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  text = text.replace(/\*(.*?)\*/g, "<i>$1</i>");
  return text;
}

function markdownToHtml(text) {
  var lines = text.split("\n");
  var html = "";
  var inList = false;

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();

    if (line.startsWith("- ")) {
      if (!inList) { html += "<ul>"; inList = true; }
      html += "<li>" + inline(line.substring(2)) + "</li>";
      continue;
    }

    if (inList) { html += "</ul>"; inList = false; }

    if (line.startsWith("### ")) html += "<h3>" + inline(line.substring(4)) + "</h3>";
    else if (line.startsWith("## ")) html += "<h2>" + inline(line.substring(3)) + "</h2>";
    else if (line.startsWith("# ")) html += "<h1>" + inline(line.substring(2)) + "</h1>";
    else if (line !== "") html += "<p>" + inline(line) + "</p>";
  }

  if (inList) html += "</ul>";
  return html;
}

function update() {
  slides = editor.value.split(/^\s*---\s*$/m);

  if (current >= slides.length) current = slides.length - 1;
  if (current < 0) current = 0;

  var html = markdownToHtml(slides[current]);
  document.getElementById("previewSlide").innerHTML = html;
  document.getElementById("presentSlide").innerHTML = html;

  var countText = (current + 1) + " / " + slides.length;
  document.getElementById("count1").textContent = countText;
  document.getElementById("count2").textContent = countText;

  var first = current === 0;
  var last = current === slides.length - 1;
  document.getElementById("leftBtn1").disabled = first;
  document.getElementById("leftBtn2").disabled = first;
  document.getElementById("rightBtn1").disabled = last;
  document.getElementById("rightBtn2").disabled = last;

  // full screen button ka text
  var text = document.fullscreenElement ? "Exit Full Screen" : "Full Screen";
  document.getElementById("fullBtn1").textContent = text;
  document.getElementById("fullBtn2").textContent = text;
}

function goLeft()  { if (current > 0) { current--; update(); } }
function goRight() { if (current < slides.length - 1) { current++; update(); } }

function toggleFullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else if (inPresent) {
    presentScreen.requestFullscreen();
  } else {
    previewBox.requestFullscreen();
  }
}

function saveSlides() {
  localStorage.setItem(KEY, editor.value);
  msg.textContent = "Saved!";
  setTimeout(function () { msg.textContent = ""; }, 1500);
}

function startPresent() {
  inPresent = true;
  current = 0;
  editorScreen.classList.add("hidden");
  presentScreen.classList.remove("hidden");
  presentScreen.requestFullscreen();
  update();
}

function stopPresent() {
  inPresent = false;
  if (document.fullscreenElement) document.exitFullscreen();
  presentScreen.classList.add("hidden");
  editorScreen.classList.remove("hidden");
  update();
}

document.getElementById("leftBtn1").onclick = goLeft;
document.getElementById("leftBtn2").onclick = goLeft;
document.getElementById("rightBtn1").onclick = goRight;
document.getElementById("rightBtn2").onclick = goRight;
document.getElementById("fullBtn1").onclick = toggleFullScreen;
document.getElementById("fullBtn2").onclick = toggleFullScreen;
document.getElementById("saveBtn").onclick = saveSlides;
document.getElementById("presentBtn").onclick = startPresent;
document.getElementById("backBtn").onclick = stopPresent;
document.getElementById("newBtn").onclick = function () {
  editor.value = defaultText;
  current = 0;
  update();
};

// text likhte hi preview badle
editor.addEventListener("input", update);
document.addEventListener("fullscreenchange", update);

document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.key.toLowerCase() === "s") {
    e.preventDefault();
    saveSlides();
  } else if (e.key === "F11") {
    e.preventDefault();
    toggleFullScreen();
  } else if (document.activeElement !== editor) {
    if (e.key === "ArrowLeft") goLeft();
    if (e.key === "ArrowRight") goRight();
  }
});

var saved = localStorage.getItem(KEY);
editor.value = saved ? saved : defaultText;
update();