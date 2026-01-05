---
description: Automatically find, download, and insert an unDraw illustration as the cover for a blog post.
---

1. Run `python scripts/add_cover.py [post-path]` to get search keywords.
    - Use `python scripts/add_cover.py <path_to_post>` to see suggested keywords.
2. Check existing posts to see which illustrations are already in use.
    - Run `grep -r "alt:" content/posts` or check `cover.image` URLs to build a list of already used unDraw illustrations.
3. Search `unDraw` for the most relevant keywords.
    - Navigate to `https://undraw.co/search/{keyword}` for each keyword if needed.
4. Select an illustration that fits the theme of the post **and is not already used in any other post**.
5. Download the SVG illustration.
    - Save it to `static/images/posts/[post-slug]/cover.svg`.
    - Create the directory if it doesn't exist.
6. Update the post's front matter:
    - Set `cover.image` to `"/images/posts/[post-slug]/cover.svg"`.
    - Set a helpful `cover.alt` and `cover.caption` (including "Illustration by unDraw").
7. Verify the changes.
