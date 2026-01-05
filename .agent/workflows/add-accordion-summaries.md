---
description: Add AI-generated summaries to accordion sections in a post.
---

1. Ask the AI assistant to "Perform the accordion summarization for this post: [path-to-post]".
2. The AI assistant will:
   - Read the file content.
   - Internally generate a concise summary for each accordion section.
   - Update the `{{% accordion ... %}}` shortcodes in the file with a `summary="..."` attribute.
3. Verify the changes by previewing the site.