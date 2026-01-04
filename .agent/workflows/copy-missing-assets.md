---
description: Copy missing image assets from Obsidian vault to the current post's asset folder.
---

1. Identify the post directory from the user's reference (e.g., `content/posts/my-post/index.md` → `content/posts/my-post/`).
2. Read the post's markdown file to find all references:
    - **Images**: `![alt](image.png)`, `![[image.png]]`, `[[image.png]]`, `<img src="image.png">`.
    - **Note Content**: `![[Note#Heading]]`, `[[Note#Heading]]`, `![[Note#^blockid]]`, `[[Note#^blockid]]`.
3. Process each reference:
    - **For Image Assets**:
        - Check if it exists in the post's directory.
        - If missing, check locally in `$HOME/Documents/github/lasse-obsidian/assets/`.
        - If found in Obsidian assets:
            - If generic (e.g., `Pasted image`), rename to `image-N.png`.
            - Copy to the post's directory.
            - Convert `![[image.png]]` or `[[image.png]]` to standard `![](new-name.png)`.
    - **For Note Content (Headings/Blocks)**:
        - Search the vault `$HOME/Documents/github/lasse-obsidian/` for `Note.md`.
        - If found, extract the appropriate section:
            - **Heading**: Find the heading (e.g., `## Heading`) and capture all content until the next heading of the same or higher level.
            - **Block Reference**: Find the block ending with `^blockid`.
        - Replace the `[[Note#...]]` or `![[Note#...]]` reference in the post with the extracted markdown content.
        - *Tip*: If the extracted content contains images, process them as well.
4. Provide a summary of:
    - Images copied/renamed.
    - Note sections transcluded.
    - Any missing files or sections.
