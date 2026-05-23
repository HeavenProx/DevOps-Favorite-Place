FROM docker:dind

# Install Python (required for Ansible to connect and run tasks) and sudo (required for Ansible become: yes)
# --no-cache avoids storing the apk index, keeping the image smaller
RUN apk add --update --no-cache python3 py3-pip sudo && ln -sf python3 /usr/bin/python
