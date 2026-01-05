import re

def _extract_yaml_value(pattern, content):
    """
    Extract a single-line YAML scalar value supporting double-quoted, single-quoted,
    and unquoted forms. Returns an empty string if no match is found.
    """
    match = re.search(pattern, content, re.MULTILINE)
    if not match:
        return ""
    for group in match.groups():
        if group is not None:
            return group.strip()
    return ""


def extract_metadata(file_path):
    """Extracts title, summary, and tags from YAML front matter using regex."""
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Regex patterns that support double-quoted, single-quoted, and unquoted values
    title = _extract_yaml_value(
        r'^\s*title:\s*(?:"([^"]*)"|\'([^\']*)\'|([^\r\n#]+))',
        content,
    )

    summary = _extract_yaml_value(
        r'^\s*summary:\s*(?:"([^"]*)"|\'([^\']*)\'|([^\r\n#]+))',
        content,
    )
    if not summary:
        # Also support description as a fallback for summary
        summary = _extract_yaml_value(
            r'^\s*description:\s*(?:"([^"]*)"|\'([^\']*)\'|([^\r\n#]+))',
            content,
        )
    
    tags_match = re.search(r'^\s*tags:\s*\[(.*)\]', content, re.MULTILINE)
    tags = tags_match.group(1).strip() if tags_match else ""
    
    return title, summary, tags

def get_keywords(title, summary, tags):
    """Combines metadata into a space-separated string of keywords."""
    return f"{title} {summary} {tags}".replace('"', '').replace(',', ' ').strip()
