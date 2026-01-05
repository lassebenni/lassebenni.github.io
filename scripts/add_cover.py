import sys
from md_utils import extract_metadata, get_keywords

def main():
    if len(sys.argv) < 2:
        print("Usage: python scripts/add_cover.py [path-to-post]")
        sys.exit(1)
    
    path = sys.argv[1]
    title, summary, tags = extract_metadata(path)
    keywords = get_keywords(title, summary, tags)
    print(keywords)

if __name__ == "__main__":
    main()
