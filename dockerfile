FROM ruby:2.1


RUN apt-get update \
  && apt-get install -y \
    node \
    python-pygments \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/

RUN gem install \
  github-pages \
  jekyll \
  jekyll-paginate \
  jekyll-redirect-from \
  kramdown \
  rdiscount \
  rouge \
  html-proofer \
  bourbon \
  sass \
  pygments.rb
  

VOLUME /src
EXPOSE 4000
COPY . /src

WORKDIR /src
ENTRYPOINT ["jekyll"]