pipeline {
    agent { 
        docker { 
            image 'node:lts-alpine',
            args '-p 3000:3000' 
        } 
    }
    stages {
        stage('build') {
            steps {
                sh 'npm install' 
            }
        }
    }
}