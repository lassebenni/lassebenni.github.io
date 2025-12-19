default:
    @just --list

# Run the Hugo development server with drafts enabled
serve:
    hugo server -D

# Create a new blog post: just post "my-new-post"
post title:
    hugo new "posts/{{title}}.md"

# Build the site for production
build:
    hugo --gc --minify

# Remove build artifacts
clean:
    rm -rf public resources
