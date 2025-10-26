#!/bin/bash

# Create folders
mkdir -p styles
mkdir -p scripts
mkdir -p assets/templates
mkdir -p assets/stickers
mkdir -p assets/watermarks
mkdir -p assets/fonts
mkdir -p assets/icons

# Create HTML entry point
cat <<EOF > index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Quick Infographic</title>
  <link rel="stylesheet" href="styles/base.css" />
  <link rel="stylesheet" href="styles/layout.css" />
  <link rel="stylesheet" href="styles/editor.css" />
  <link rel="stylesheet" href="styles/modal.css" />
  <link rel="stylesheet" href="styles/responsive.css" />
  <link rel="stylesheet" href="styles/layers.css" />
</head>
<body>
  <div id="app"></div>
  <script src="scripts/app.js"></script>
</body>
</html>
EOF

# Create empty CSS files
touch styles/base.css
touch styles/layout.css
touch styles/editor.css
touch styles/modal.css
touch styles/responsive.css
touch styles/layers.css

# Create empty JS modules
touch scripts/app.js
touch scripts/layoutManager.js
touch scripts/photoManager.js
touch scripts/textStickerManager.js
touch scripts/watermarkManager.js
touch scripts/layerManager.js
touch scripts/dragDrop.js
touch scripts/modal.js
touch scripts/exportImage.js
touch scripts/utils.js

# Create README
cat <<EOF > README.md
# Quick Infographic

A responsive browser-based photo layout editor built with HTML5, CSS, and JavaScript.

## Features
- Layout templates
- Drag-and-drop photo placement
- Text, stickers, and watermark support
- Layer control and export to PNG/JPG

## Structure
- \`index.html\`: Entry point
- \`styles/\`: Modular CSS
- \`scripts/\`: JS modules
- \`assets/\`: Templates, stickers, watermarks, fonts, icons
EOF

echo "✅ Quick Infographic project structure created."
