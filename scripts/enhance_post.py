import sys
from md_utils import extract_metadata

def main():
    if len(sys.argv) < 2:
        print("Usage: python scripts/enhance_post.py [path-to-post]")
        sys.exit(1)
    
    path = sys.argv[1]
    # For now, this script just verifies it can read the metadata
    # The actual summarization is done by the agent using the file content
    title, summary, tags = extract_metadata(path)
    
    with open(path, 'r') as f:
        content = f.read()
    
    # We strip the front matter for the agent to have cleaner content to analyze
    body = content.split('---', 2)[-1].strip()
    
    print(f"TITLE: {title}")
    print(f"CONTENT_PREVIEW: {body[:500]}...")

if __name__ == "__main__":
    main()
