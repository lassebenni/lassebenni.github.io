import re

def extract_metadata(file_path):
    """Extracts title, summary, and tags from YAML front matter using regex."""
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Simple regex to get title, summary, and tags from YAML front matter
    title_match = re.search(r'^title:\s*"(.*)"', content, re.MULTILINE)
    summary_match = re.search(r'^summary:\s*"(.*)"', content, re.MULTILINE)
    # Also support description as a fallback for summary
    if not summary_match:
        summary_match = re.search(r'^description:\s*"(.*)"', content, re.MULTILINE)
    
    tags_match = re.search(r'^tags:\s*\[(.*)\]', content, re.MULTILINE)
    
    title = title_match.group(1) if title_match else ""
    summary = summary_match.group(1) if summary_match else ""
    tags = tags_match.group(1) if tags_match else ""
    
    return title, summary, tags

def get_keywords(title, summary, tags):
    """Combines metadata into a space-separated string of keywords."""
    return f"{title} {summary} {tags}".replace('"', '').replace(',', ' ').strip()
