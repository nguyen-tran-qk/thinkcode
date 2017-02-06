FROM lazabogdan/nginx-gulp-bower:latest

# install subversion (required by some bower packages)
RUN apt-get install -y \
	subversion

# install mkdocs
RUN curl https://bootstrap.pypa.io/get-pip.py | python && \
    rm -rf get-pip.py && \
    pip install mkdocs

# add app files
COPY . /app/www

# permissions
RUN chmod +x build.sh

# build
RUN ./build.sh

# mount volume to allow using external data
VOLUME ["/app/www"]