FROM jenkins/jenkins:lts

ENV JENKINS_USER admin
ENV JENKINS_PASS admin123

ENV JAVA_OPTS -Djenkins.install.runSetupWizard=false

COPY plugins.txt /usr/share/jenkins/plugins.txt
RUN jenkins-plugin-cli -f /usr/share/jenkins/plugins.txt

USER root
RUN apt update 
RUN apt install -y apt-transport-https ca-certificates curl software-properties-common
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
RUN add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
RUN apt-cache policy docker-ce
RUN apt -y install docker-ce docker-compose
RUN apt-get clean
RUN gpasswd -a jenkins docker 
RUN usermod -aG docker jenkins
