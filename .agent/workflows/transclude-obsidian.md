---
description: Transclude content from Obsidian notes into the current post.
---

1. Identify the post's markdown file.
2. Search for transclusion references:
    - Patterns: `![[Note#Heading]]`, `[[Note#Heading]]`, `![[Note#^blockid]]`, `[[Note#^blockid]]`.
3. For each reference:
    - Search the vault `$HOME/Documents/github/lasse-obsidian/` for `Note.md`.
    - If found, extract the appropriate section (Heading or Block).
    - **Raindrop/Quote Refinement**:
        - Check if the source note is a Raindrop bookmark (contains `raindrop_id` or `raindrop_highlights` in YAML).
        - If it is a Raindrop note:
            - Wrap the body of the extracted content in **literal double quotes** (`"..."`).
            - Wrap the entire section in markdown blockquotes (`> `).
            - If it has a `Source URL:: https://...` line, use it as a clickable header link: `> [URL](URL)`.
            - If the extracted content contains Obsidian callouts like `[!quote]+ Updated on ...`, replace that line entirely with the URL header.
        - Otherwise, transclude the content as-is.
    - Replace the reference in the post with the refined content.
    - *Proactive Tip*: If the transcluded content contains image references, run the `/copy-missing-assets` workflow on the post afterwards.
4. Summary:
    - Sections transcluded.
    - Notes found/missing.
