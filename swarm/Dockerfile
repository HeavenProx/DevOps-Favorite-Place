FROM docker:dind

# Install Python (required for Ansible to connect and run tasks)
RUN apk add --update --no-cache python3 py3-pip && ln -sf python3 /usr/bin/python

# Install sudo (required for Ansible become: yes)
RUN apk add sudo
