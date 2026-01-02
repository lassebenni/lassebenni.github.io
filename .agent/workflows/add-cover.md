---
description: Automatically find, download, and insert an unDraw illustration as the cover for a blog post.
---

1. Run `python scripts/add_cover.py [post-path]` to get search keywords.
    - Use `python scripts/add_cover.py <path_to_post>` to see suggested keywords.
2. Search `unDraw` for the most relevant keywords.
    - Navigate to `https://undraw.co/search/{keyword}` for each keyword if needed.
3. Select an illustration that fits the theme of the post.
4. Download the SVG illustration.
    - Save it to `static/images/posts/[post-slug]/cover.svg`.
    - Create the directory if it doesn't exist.
5. Update the post's front matter:
    - Set `cover.image` to `"/images/posts/[post-slug]/cover.svg"`.
    - Set a helpful `cover.alt` and `cover.caption` (including "Illustration by unDraw").
6. Verify the changes.
