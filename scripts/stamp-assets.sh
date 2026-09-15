#!/bin/sh
# Rewrite the ?v= cache-busting tokens in index.html to match the current
# contents of style.css and main.js. Run before committing asset changes.
set -e
cd "$(dirname "$0")/.."

css=$(md5 -q assets/style.css | cut -c1-8)
js=$(md5 -q assets/main.js | cut -c1-8)

/usr/bin/sed -i '' \
  -e "s|assets/style\.css?v=[0-9a-f]*|assets/style.css?v=$css|g" \
  -e "s|assets/main\.js?v=[0-9a-f]*|assets/main.js?v=$js|g" \
  index.html

echo "stamped style.css?v=$css  main.js?v=$js"
