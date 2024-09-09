pipeline {
    agent any
    environment {
        USERNAME = "cmd"
    }   
    stages {
        stage('Build and test') {
            agent {
                docker {
                    image 'node:20.11.1-alpine3.19' 
                    reuseNode true
                }
            }
            stages {
               stage('Instalar dependencias') {
                   steps {
                       sh 'npm install'
                   }
               } 
                stage('ejecucion de test') {
                   steps {
                       sh 'npm run test'
                   }
               }
                stage('ejecucion de build') {
                   steps {
                       sh 'npm run build'
                   }
               } 
            }
        }
        stage('Code Quality'){
            stages {
                stage('SonarQube analysis'){
                    agent {
                        docker {
                            image 'sonarsource/sonar-scanner-cli'
                            reuseNode true
                        }
                    }
                    steps {
                        withSonarQubeEnv('sonarqube') {
                            sh 'sonar-scanner '-Dsonar.projectKey=backend-base' '-Dsonar.scm.provider=git' '-Dsonar.sources=src' '-Dsonar.host.url=http://sonarqube:8084'
'
                        }
                    }
                }
            }
        }
        stage('delivery'){
            steps {
                script {
                    docker.withRegistry('http://localhost:8082', 'nexus-key') {
                        sh 'docker build -t backend-base:latest .'
                        sh 'docker tag backend-base:latest localhost:8082/backend-base:latest'
                        //sh 'docker tag backend-base:latest localhost:8082/backend-base:${env.BRANCH_NAME}-${env.BUILD_NUMBER}'
                        sh 'docker push localhost:8082/backend-base:latest'
                        //sh 'docker push backend-base:latest localhost:8082/backend-base:${env.BRANCH_NAME}-${env.BUILD_NUMBER}'
                    }
                }
               
            }
        }
    }
}