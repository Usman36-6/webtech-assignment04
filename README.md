# webtech-assignment04
Markdown Slides Maker

A browser-based presentation app built with HTML, CSS and JavaScript. Write your slides in Markdown, see them update live, save them in the browser, and present them in full screen.

Features
Create, edit, save and present slides
One Markdown file per presentation; --- separates one slide from the next
Two-section create/edit screen: Markdown editor on the left, live preview on the right
Left, Right and Full Screen buttons on both the preview and the presentation screen
Left is disabled on the first slide
Right is disabled on the last slide
The full screen button shows "Exit Full Screen" while full screen is on
Slide count at the bottom in current / total format
Slides are saved in the browser's localStorage and load again when the page is reopened
Keyboard shortcuts
Key	Action
Left Arrow	Previous slide
Right Arrow	Next slide
F11	Toggle full screen
Ctrl + S	Save slides

Arrow keys are ignored while you are typing in the editor, so they keep moving the cursor.

Technologies
HTML
CSS
JavaScript (no libraries or frameworks)
Project Structure
slides-app/
├── index.html   # page structure
├── style.css    # styling
├── script.js    # logic, Markdown conversion, saving, shortcuts
└── README.md
How to Run
Download or clone this repository.
Keep index.html, style.css and script.js in the same folder.
Open index.html in a web browser.

No installation or server is needed.

How to Use
Write your slides in the editor on the left.
Put --- on its own line between slides.
Watch the preview on the right update as you type.
Press Save (or Ctrl+S) to store the slides in the browser.
Press Present to show the slides in full screen.
Markdown Example
markdown
# Slide 1
## Heading
This is the content of slide 1
---
# Slide 2
- Point one
- Point two
---
# Slide 3
Thank you!
Supported Markdown


Notes
Slides are stored only in the browser you used to save them. Clearing the browser's site data will remove them.
Some browsers may block full screen unless it is started by a click or key press. The buttons and F11 handle this.
Author
Usman BITF24A015
