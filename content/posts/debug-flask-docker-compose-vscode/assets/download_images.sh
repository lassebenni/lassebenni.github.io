#!/bin/bash

# Script to download all images from the Medium article
# "How to debug Flask (running in docker-compose) in VS Code"

# Set the assets directory
ASSETS_DIR="/Users/lassebenninga/Documents/github/lassebenni.github.io/content/posts/debug-flask-docker-compose-vscode/assets"
cd "$ASSETS_DIR"

echo "Downloading images from Medium article..."

# Array of image URLs and their corresponding filenames
declare -a images=(
    "https://miro.medium.com/1*6tfTVMkIMFdXeqZrwCsU0w.png|overview-diagram.png"
    "https://miro.medium.com/1*igCFc9nAjuYvsJt5pkwupg.png|debug-start.png"
    "https://miro.medium.com/1*j0NfnZpxKlygv4UvVY6xPQ.png|remote-attach.png"
    "https://miro.medium.com/1*jUBR-z2-EVMR-5tUj9xT3Q.png|run-debug-view.png"
    "https://miro.medium.com/1*SVsap3_EsjU0JGHtfCy-Yw.png|debugger-connected.png"
    "https://miro.medium.com/1*ToIs3fFaA-nH43V88NhvfA.png|breakpoint-set.png"
    "https://miro.medium.com/1*VZ4mv98IqrovbSFu6p6d0A.png|flask-homepage.png"
    "https://miro.medium.com/1*VZ4mv98IqrovbSFu6p6d0A.png|debugging-active.png"
)

# Download each image
for image_data in "${images[@]}"; do
    IFS='|' read -r url filename <<< "$image_data"
    
    echo "Downloading: $filename"
    
    # Check if file already exists and has content
    if [[ -f "$filename" && -s "$filename" ]]; then
        echo "  ✓ $filename already exists and has content, skipping..."
        continue
    fi
    
    # Download the image
    if wget -q "$url" -O "$filename"; then
        # Check if download was successful (file has content)
        if [[ -s "$filename" ]]; then
            echo "  ✓ Successfully downloaded $filename"
        else
            echo "  ✗ Failed to download $filename (empty file)"
            rm -f "$filename"
        fi
    else
        echo "  ✗ Failed to download $filename"
        rm -f "$filename"
    fi
done

echo ""
echo "Download complete! Files in assets directory:"
ls -la

echo ""
echo "Cleaning up empty files..."
find . -name "*.png" -size 0 -delete

echo "Final file list:"
ls -la *.png 2>/dev/null || echo "No PNG files found"
