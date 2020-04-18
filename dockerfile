FROM ruby:2.4
ENV JEKYLL_ENV=production

RUN apt-get update \
  && apt-get install -y \
    node \
    python-pygments \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/

RUN gem install bundler --no-ri --no-rdoc

VOLUME /src
EXPOSE 4000
COPY . /src

WORKDIR /src
RUN  bundle install
ENTRYPOINT ["jekyll"]