#!/usr/bin/env python3
"""
Convert Hugo blog posts to Medium-ready markdown.

Usage:
    python scripts/convert_for_medium.py content/posts/<slug>/index.md

Output is saved to public/medium/<slug>.md
"""

import re
import sys
from pathlib import Path


def parse_front_matter(content: str) -> tuple[dict, str]:
    """Extract YAML front matter and body from Hugo markdown."""
    if not content.startswith("---"):
        return {}, content

    parts = content.split("---", 2)
    if len(parts) < 3:
        return {}, content

    front_matter = {}
    for line in parts[1].strip().split("\n"):
        if ":" in line:
            key, value = line.split(":", 1)
            key = key.strip()
            value = value.strip().strip('"').strip("'")
            # Handle arrays like tags: ["a", "b"]
            if value.startswith("[") and value.endswith("]"):
                value = [
                    t.strip().strip('"').strip("'")
                    for t in value[1:-1].split(",")
                ]
            front_matter[key] = value

    return front_matter, parts[2].strip()


def convert_accordion(match: re.Match) -> str:
    """Convert accordion shortcode to heading + content."""
    # Extract attributes
    attrs = match.group(1)
    content = match.group(2).strip()

    # Parse title
    title_match = re.search(r'title="([^"]*)"', attrs)
    title = title_match.group(1) if title_match else "Section"

    # Parse level (default to 3)
    level_match = re.search(r'level="(\d)"', attrs)
    level = int(level_match.group(1)) if level_match else 3

    heading = "#" * level
    return f"\n{heading} {title}\n\n{content}\n"


def convert_youtube(match: re.Match) -> str:
    """Convert YouTube shortcode to embedded link with thumbnail."""
    video_id = match.group(1).strip()
    url = f"https://www.youtube.com/watch?v={video_id}"
    thumbnail = f"https://img.youtube.com/vi/{video_id}/maxresdefault.jpg"
    return f"[![YouTube Video]({thumbnail})]({url})\n\n🎬 **Watch on YouTube:** {url}"


def convert_callout(match: re.Match) -> str:
    """Convert callout shortcode to blockquote with emoji."""
    attrs = match.group(1)
    content = match.group(2).strip()

    type_match = re.search(r'type="([^"]*)"', attrs)
    callout_type = type_match.group(1) if type_match else "info"

    title_match = re.search(r'title="([^"]*)"', attrs)
    title = title_match.group(1) if title_match else None

    emoji_map = {
        "info": "ℹ️",
        "warning": "⚠️",
        "tip": "💡",
        "note": "📝",
        "danger": "🚨",
    }
    emoji = emoji_map.get(callout_type, "ℹ️")

    if title:
        return f"> {emoji} **{title}**\n>\n> {content}"
    return f"> {emoji} {content}"


def convert_pullquote(match: re.Match) -> str:
    """Convert pullquote shortcode to styled blockquote."""
    attrs = match.group(1) if match.group(1) else ""
    content = match.group(2).strip()

    author_match = re.search(r'author="([^"]*)"', attrs)
    author = author_match.group(1) if author_match else None

    if author:
        return f"> *\"{content}\"*\n>\n> — {author}"
    return f"> *\"{content}\"*"


def convert_images(content: str, slug: str) -> str:
    """Convert local image paths to deployed blog URLs."""
    base_url = f"https://lassebenni.github.io/posts/{slug}"

    # Match markdown images with local paths (not starting with http)
    def replace_image(match: re.Match) -> str:
        alt = match.group(1)
        path = match.group(2)
        # Skip if already absolute URL
        if path.startswith("http"):
            return match.group(0)
        # Convert to absolute URL
        return f"![{alt}]({base_url}/{path})"

    return re.sub(r"!\[([^\]]*)\]\(([^)]+)\)", replace_image, content)


def convert_linked_images(content: str, slug: str) -> str:
    """Convert linked images (images wrapped in links) with local paths."""
    base_url = f"https://lassebenni.github.io/posts/{slug}"

    def replace_linked_image(match: re.Match) -> str:
        alt = match.group(1)
        img_path = match.group(2)
        link_url = match.group(3)

        # Convert image path if local
        if not img_path.startswith("http"):
            img_path = f"{base_url}/{img_path}"

        return f"[![{alt}]({img_path})]({link_url})"

    # Match [![alt](img)](link) pattern
    return re.sub(
        r"\[\!\[([^\]]*)\]\(([^)]+)\)\]\(([^)]+)\)",
        replace_linked_image,
        content,
    )


def clean_html_tags(content: str) -> str:
    """Remove or convert HTML tags that Medium doesn't support well."""
    # Remove <br> tags (Medium handles line breaks automatically)
    content = re.sub(r"<br\s*/?>", "\n", content)
    return content


def convert_for_medium(input_path: str) -> str:
    """Convert a Hugo post to Medium-ready markdown."""
    path = Path(input_path)
    if not path.exists():
        raise FileNotFoundError(f"File not found: {input_path}")

    # Determine slug from path
    # Expected: content/posts/<slug>/index.md
    slug = path.parent.name

    content = path.read_text()
    front_matter, body = parse_front_matter(content)

    # Build output
    output_parts = []

    # Title
    title = front_matter.get("title", "Untitled")
    output_parts.append(f"# {title}\n")

    # Subtitle from ai_summary
    if "ai_summary" in front_matter:
        output_parts.append(f"*{front_matter['ai_summary']}*\n")

    # Tags (Medium allows max 5)
    tags = front_matter.get("tags", [])
    if isinstance(tags, list) and tags:
        tags = tags[:5]
        output_parts.append(f"**Tags:** {', '.join(tags)}\n")

    # Canonical URL note
    canonical = f"https://lassebenni.github.io/posts/{slug}/"
    output_parts.append(
        f"---\n\n*Originally published at [{canonical}]({canonical})*\n\n---\n"
    )

    # Process body content
    processed = body

    # Convert accordion shortcodes
    # Pattern: {{% accordion ... %}}...{{% /accordion %}}
    processed = re.sub(
        r"\{\{%\s*accordion\s+([^%]+)%\}\}(.*?)\{\{%\s*/accordion\s*%\}\}",
        convert_accordion,
        processed,
        flags=re.DOTALL,
    )

    # Convert YouTube shortcodes
    # Pattern: {{< youtube ID >}}
    processed = re.sub(
        r"\{\{<\s*youtube\s+([^>]+)>\}\}",
        convert_youtube,
        processed,
    )

    # Convert callout shortcodes
    processed = re.sub(
        r"\{\{%\s*callout\s+([^%]+)%\}\}(.*?)\{\{%\s*/callout\s*%\}\}",
        convert_callout,
        processed,
        flags=re.DOTALL,
    )

    # Convert pullquote shortcodes
    processed = re.sub(
        r"\{\{%\s*pullquote\s*([^%]*)%\}\}(.*?)\{\{%\s*/pullquote\s*%\}\}",
        convert_pullquote,
        processed,
        flags=re.DOTALL,
    )

    # Convert linked images first (before regular images)
    processed = convert_linked_images(processed, slug)

    # Convert local image paths
    processed = convert_images(processed, slug)

    # Clean HTML tags
    processed = clean_html_tags(processed)

    # Fix internal blog links (localhost references)
    processed = re.sub(
        r"http://localhost:\d+/",
        "https://lassebenni.github.io/",
        processed,
    )

    output_parts.append(processed)

    return "\n".join(output_parts)


def main():
    if len(sys.argv) < 2:
        print("Usage: python convert_for_medium.py <path-to-hugo-post>")
        print("Example: python convert_for_medium.py content/posts/week-edition-2/index.md")
        sys.exit(1)

    input_path = sys.argv[1]
    path = Path(input_path)
    slug = path.parent.name

    try:
        output = convert_for_medium(input_path)

        # Create output directory
        output_dir = Path("public/medium")
        output_dir.mkdir(parents=True, exist_ok=True)

        # Write output
        output_path = output_dir / f"{slug}.md"
        output_path.write_text(output)

        print(f"✓ Converted: {input_path}")
        print(f"✓ Output saved to: {output_path}")
        print(f"\nNext steps:")
        print(f"1. Go to Medium → Settings → Import a story")
        print(f"2. Paste the content from {output_path}")
        print(f"3. Set canonical URL to: https://lassebenni.github.io/posts/{slug}/")

    except FileNotFoundError as e:
        print(f"Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
