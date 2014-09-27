# Include LAMP stack
FROM tutum/lamp:latest

# Install dependencies
RUN apt-get install wget unzip

# OpenNote install command
RUN rm -fr /app
RUN wget https://github.com/FoxUSA/OpenNote/releases/download/14.07.01/OpenNote.zip -P /app
RUN unzip /app/OpenNote.zip -d /app
RUN rm /app/OpenNote.zip

# Open webservice ports
EXPOSE 80 443

# Start the LAMP stack
CMD ["/run.sh"]