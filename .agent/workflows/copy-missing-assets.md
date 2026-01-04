---
description: Copy missing image assets from Obsidian vault to the current post's asset folder.
---

1. Identify the post directory from the user's reference (e.g., `content/posts/my-post/index.md` → `content/posts/my-post/`).
2. Read the post's markdown file to find all image references:
    - Match patterns like `![alt](image.png)`, `![[image.png]]`, `[[image.png]]`, `<img src="image.png">`.
    - Extract the image filenames (ignore external URLs).
3. For each referenced image:
    - Check if it exists in the post's directory.
    - If missing, check if it exists in locally in `$HOME/Documents/github/lasse-obsidian/assets/`.
    - If found in Obsidian assets:
        - If the filename is generic (e.g., starts with `Pasted image`), rename it to a sequential format like `image-N.png` based on existing images in the directory.
        - Copy it to the post's directory with the (potentially new) name.
        - Update the markdown file:
            - Replace WikiLink syntax `![[image.png]]` with standard markdown `![](new-image-name.png)`.
            - Update the filename if it was renamed.
    - Report which images were copied, renamed, and which are still missing.
4. Provide a summary of:
    - Images successfully copied and renamed.
    - Images that are missing from both locations.
    - Images that already exist in the post directory.
