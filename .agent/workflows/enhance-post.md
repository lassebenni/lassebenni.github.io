---
description: Automatically generate and add an ai_summary and tags to an existing blog post.
---

1. Run `python scripts/enhance_post.py [post-path]` to get the post's context and content for analysis.
2. Analyze the output to generate:
    - **ai_summary**: A concise, high-quality summary (around 2-3 sentences) that highlights the main value and key technical points for the reader.
    - **tags**: A list of 3-6 relevant technical tags (e.g., "python", "automation", "hugo").
3. Update the YAML front matter of the post:
    - Add `ai_summary: "..."`.
    - Add `tags: [...]`.
    - Ensure you don't remove existing front matter fields (like title, date, etc.).
    - If the fields already exist, ask the user if they want to overwrite them.
4. Verify that the file remains valid Hugo content and the front matter is correctly formatted.
