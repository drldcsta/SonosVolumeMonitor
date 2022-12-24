# Use the Node.js 12.x runtime as the base image
FROM node:12
ENV SONOS_LISTENER=192.168.1.3
# Install git
RUN apt-get update && apt-get install -y git

# Set the working directory to the newly created directory
WORKDIR /usr/src/app

# Clone the repository from GitHub and checkout the desired branch
RUN git clone https://github.com/drldcsta/SonosVolumeMonitor.git .


RUN npm install


# Expose port 3000 to the host machine
EXPOSE 3000
EXPOSE 4000

# Run the server when the container is started
CMD ["sh", "-c", "git remote update && git status -uno | grep -q 'Your branch is behind' && git pull && npm install && node /usr/src/app/server.js"]
