pipeline {
    agent any
    environment {
        USERNAME = "cmd"
        SONARQUBE_SERVER = "SonarQube" // Nombre del servidor configurado en Jenkins
        SONARQUBE_SCANNER_HOME = tool name: 'SonarQube Scanner' // Nombre de la herramienta configurada en Jenkins
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
                stage('SonarQube Analysis') {
                    def scannerHome = tool 'SonarScanner';
                    withSonarQubeEnv() {
                    sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }
        stage('deploy') {
            steps {
                sh 'docker build -t backend-base-entrega:latest .'
                sh 'docker tag backend-base-entrega:latest localhost:8082/backend-base-entrega:latest'
                sh 'docker push localhost:8082/backend-base-entrega:latest'
            }
        }
    }
}
