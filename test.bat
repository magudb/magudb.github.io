docker rm jekyll -f
docker build -t jekyll .
docker run --name jekyll -p 4000:4000 jekyll serve -H 0.0.0.0