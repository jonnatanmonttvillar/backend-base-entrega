pipeline {
    agent any
    environment {
        USERNAME = "cmd"
    }   
    stages {
        stage('Build and Test') {
            agent {
                docker {
                    image 'node:20.11.1-alpine3.19' 
                    reuseNode true
                }
            }
            stages {
                stage('Install Dependencies') {
                    steps {
                        sh 'npm install'
                    }
                } 
                stage('Run Tests') {
                    steps {
                        sh 'npm run test'
                    }
                }
                stage('Build') {
                    steps {
                        sh 'npm run build'
                    }
                } 
            }
        }
        
        stage('Code Quality') {
            agent {
                docker {
                    image 'sonarsource/sonar-scanner-cli'
                    reuseNode true
                }
            }
            steps {
                withSonarQubeEnv('sonarqube') {
                    sh '''
                    sonar-scanner \
                      -Dsonar.projectKey=backend-base \
                      -Dsonar.scm.provider=git \
                      -Dsonar.sources=src \
                      -Dsonar.host.url=http://sonarqube:8084
                    '''
                }
            }
        }
        
        stage('Delivery') {
            steps {
                script {
                    docker.withRegistry('http://localhost:8082', 'nexus-key') {
                        sh 'docker build -t backend-base:latest .'
                        sh 'docker tag backend-base:latest localhost:8082/backend-base:latest'
                        sh 'docker push localhost:8082/backend-base:latest'
                    }
                }
            }
        }
    }
}
