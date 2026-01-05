---
description: Add AI-generated summaries to accordion sections in a post.
---

1. Ensure you have the `GEMINI_API_KEY` environment variable set.
2. Run the generation script on the target post:
   `python scripts/generate_accordion_summaries.py [post-path]`
   
   Example:
   `python scripts/generate_accordion_summaries.py content/posts/week-edition-1/index.md`

3. The script will:
   - Scan the markdown file for `{{% accordion ... %}}` shortcodes.
   - Extract the content within each accordion.
   - Generate a concise 1-sentence summary using Gemini.
   - Update the shortcode to include `summary="AI Summary: ..."` which will be displayed as a subtitle in the collapsed view.

4. Verify the changes by previewing the site.
