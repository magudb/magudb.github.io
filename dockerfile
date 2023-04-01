FROM ruby:2.4
ENV JEKYLL_ENV=production

RUN apt-get update \
  && apt-get install -y \
    nodejs \
    python-pygments \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/
RUN gem install bundler -v 2.3.26

VOLUME /src
EXPOSE 4000
COPY . /src

WORKDIR /src
RUN  bundle install
RUN bundle update
ENTRYPOINT ["jekyll"]
