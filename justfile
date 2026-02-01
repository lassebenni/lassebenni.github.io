default:
    @just --list

# Run the Hugo development server with drafts enabled
serve:
    hugo server -D

# Create a new blog post: just post "my-new-post"
post title:
    @if [ -f "content/posts/{{title}}.md" ]; then \
        echo "Error: content/posts/{{title}}.md already exists. Please delete or move it first."; \
        exit 1; \
    elif [ -e "content/posts/{{title}}/index.md" ]; then \
        echo "Error: content/posts/{{title}}/index.md already exists. Please delete or move it first."; \
        exit 1; \
    fi
    hugo new "posts/{{title}}/index.md"

# Build the site for production
build:
    hugo --gc --minify

# Remove build artifacts
clean:
    rm -rf public resources

# Convert a Hugo post for Medium import
medium-prep slug:
    python scripts/convert_for_medium.py content/posts/{{slug}}/index.md
