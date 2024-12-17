# Base image using Alpine for a lightweight build
FROM alpine:latest

# Install dependencies
RUN apk update && apk add --no-cache \
    chromium \
    chromium-chromedriver \
    xvfb \
    curl \
    && rm -rf /var/cache/apk/*

# Set PATH and environment variables for Chromium and ChromeDriver
ENV CHROME_BIN=/usr/bin/chromium-browser \
    CHROME_DRIVER=/usr/bin/chromedriver

# Expose the default port for ChromeDriver
EXPOSE 4444

# Entry command to run ChromeDriver in a headless mode
ENTRYPOINT ["chromedriver"]
CMD ["--port=4444", "--whitelisted-ips", "--disable-dev-shm-usage"]
