#!/bin/bash

# Script to download all images from the Medium article
# "Setup free webscraping in less than 5 minutes using GitHub Actions"

# Set the assets directory
ASSETS_DIR="/Users/lassebenninga/Documents/github/lassebenni.github.io/content/posts/setup-free-webscraping-github-actions/assets"
cd "$ASSETS_DIR"

echo "Downloading images from Medium article..."

# Array of image URLs and their corresponding filenames
declare -a images=(
    "https://miro.medium.com/1*_Y5clg_v58p5916CoxlrtA.png|github-new-repository.png"
    "https://miro.medium.com/1*0nD6fl4G5hM-iaPMskuxUw.png|github-repo-created.png"
    "https://miro.medium.com/1*5RsIcgcygNwbHGWgG3P-EA.png|github-upload-files.png"
    "https://miro.medium.com/1*6MN_RmxaaRRufS9ZG6bwsw.png|github-create-file.png"
    "https://miro.medium.com/1*6u3p1rXEtNPJHIjc2euvEA.png|github-workflows-folder.png"
    "https://miro.medium.com/1*7OU3vxBz5LVMH5zl2ECejQ.png|github-commit-changes.png"
    "https://miro.medium.com/1*9WxxDteUd2Is5TFcnp5guQ.png|github-actions-running.png"
    "https://miro.medium.com/1*aGI2TP_4VbHfbEK7bgj5tw.png|github-action-details.png"
    "https://miro.medium.com/1*aiEUhNSBegqmLW9Osi9K3g.png|github-action-output.png"
    "https://miro.medium.com/1*amno_hm-M32X8y-aVmYWww.png|json-data-output.png"
    "https://miro.medium.com/1*av7BGErRWMSS7HAQoqXNoQ.png|github-artifacts.png"
    "https://miro.medium.com/1*C8GE-GiCIfN_pRsLT0FRhA.png|github-action-success.png"
    "https://miro.medium.com/1*dgvTUiCf-KyU8ILXKkG0CA.png|nu-nl-website.png"
    "https://miro.medium.com/1*hhwIFjX11g-5Jf52MX7Fyg.png|github-scheduled-runs.png"
    "https://miro.medium.com/1*IJXYSV9NIcfryTO-ZKM60g.png|github-schedule-syntax.png"
    "https://miro.medium.com/1*joyNytYS1qZ5inKgxLLXXA.png|github-workflow-schedule.png"
    "https://miro.medium.com/1*kHi-A_GE_P5YjnalUGuxAg.png|github-actions-tab.png"
    "https://miro.medium.com/1*lMdswd4uYqYN1I6cIgvqCw.png|github-workflow-yaml.png"
    "https://miro.medium.com/1*M9WuvTLwveu40i-j5uFVUg.png|github-action-logs.png"
    "https://miro.medium.com/1*mVBGT2SH_3bNAqB0czJTpQ.png|github-action-manual-run.png"
    "https://miro.medium.com/1*NAK-jtrx8Kq-LgGjPMP2hw.png|github-workflow-dispatch.png"
    "https://miro.medium.com/1*NrzJNq991AijnmrX9AHHkA.png|github-action-input.png"
    "https://miro.medium.com/1*QjwazVfJcBp9cfyHuRzg0g.png|github-manual-trigger.png"
    "https://miro.medium.com/1*SWSN0EO-0KVxbp8_NvHLnw.png|python-scraping-code.png"
    "https://miro.medium.com/1*TlF_SnSx71ggONPM265J8Q.png|github-workflow-file.png"
    "https://miro.medium.com/1*X7okntV8w33f9SYsdy8rSw.png|github-action-trigger.png"
    "https://miro.medium.com/1*XG4353C2uBJkZcK0yTGATA.png|github-workflow-permissions.png"
    "https://miro.medium.com/1*yX2DoHEUN1OjyZw9VKHEZw.png|github-workflow-complete.png"
    "https://miro.medium.com/1*ZYw-Tx4htQWmD61Jlyl5gQ.png|github-scraping-result.png"
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
