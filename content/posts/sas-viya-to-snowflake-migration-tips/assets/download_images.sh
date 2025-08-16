#!/bin/bash

# Script to download all images from the Medium article
# "10 Tips for Migrating from SAS Viya to Snowflake + dbt"

# Set the assets directory
ASSETS_DIR="/Users/lassebenninga/Documents/github/lassebenni.github.io/content/posts/sas-viya-to-snowflake-migration-tips/assets"
cd "$ASSETS_DIR"

echo "Downloading images from Medium article..."

# Array of image URLs and their corresponding filenames
declare -a images=(
    "https://miro.medium.com/1*anAztAK-7KtlIn41KzC_zw.png|data-comparison-table.png"
    "https://miro.medium.com/0*IzYWHm3UP-ZvFqAI.png|sas-flow-complexity.png"
    "https://miro.medium.com/0*-t7DuSnrAsJBGTpG.png|dbt-audit-helper.png"
    "https://miro.medium.com/0*-1zXQMW2asCMqjiU.png|sas-debugging.png"
    "https://miro.medium.com/0*l3BHqini2tYD5sPC.png|sas-logic-mixing.png"
    "https://miro.medium.com/0*Um-hSYXA0Tyesjsy.png|sas-lineage.png"
    "https://miro.medium.com/0*jP2WFDeAamLKbJ4E.png|sas-preview-filtering.png"
    "https://miro.medium.com/0*aNprPA1Cl6AIYrMf.png|dbt-data-tests.png"
    "https://miro.medium.com/7*V1_7XP4snlmqrc_0Njontw.png|incremental-logic.png"
    "https://miro.medium.com/7*GAOKVe--MXbEJmV9230oOQ.png|analytics-engineering-book.png"
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
