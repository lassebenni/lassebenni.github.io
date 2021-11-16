# Personal blog
Repo for blog website lasse.be using [Hugo](https://gohugo.io/).

## Run the site:
1. Install hugo `brew install hugo`.
2. Make sure you clone the `themes/ink` submodule too: `git submodule init` && `git submodule update`.
3. Run `hugo server -D` and go to [localhost:1313](http://localhost:1313).

# RSS feed
In order to track new posts and send subscribers an email when a new post is out, RSS can be used:

- Override default RSS feed configuration at `./themes/ink/layouts/_default/rss.xml` to add full post content to the feed.