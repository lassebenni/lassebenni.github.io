---
description: Copy missing image assets from Obsidian vault to the current post's asset folder.
---

1. Identify the post directory from the user's reference (e.g., `content/posts/my-post/index.md` → `content/posts/my-post/`).
2. Read the post's markdown file to find all image references:
    - Match patterns like `![alt](image.png)`, `![[image.png]]`, `[[image.png]]`, `<img src="image.png">`.
    - Extract the image filenames (ignore external URLs).
3. For each referenced image:
    - Check if it exists in the post's directory.
    - If missing, check locally in `$HOME/Documents/github/lasse-obsidian/assets/`.
    - If found in Obsidian assets:
        - If generic (e.g., `Pasted image`), rename to `image-N.png` sequentially based on existing images.
        - Copy it to the post's directory.
        - Update the markdown file:
            - Replace WikiLink syntax `![[image.png]]` or `[[image.png]]` with standard markdown `![](new-name.png)`.
            - Ensure the filename in the reference matches the (potentially renamed) file.
4. Summary:
    - Images copied and renamed.
    - Images that already exist.
    - Any missing images not found in the vault.
