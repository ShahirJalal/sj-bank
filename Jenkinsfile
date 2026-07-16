pipeline {
    agent { label 'ubuntu' }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Stop Existing Stack') {
            steps {
                sh '''
                    docker compose down || true
                '''
            }
        }

        stage('Build & Deploy') {
            steps {
                sh '''
                    docker compose up -d --build --remove-orphans
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    curl --fail --silent --show-error http://localhost:8086/
                '''
            }
        }
    }

    post {
        success {
            echo 'SJ Bank deployed successfully!'
        }

        failure {
            echo 'Deployment failed.'
        }

        always {
            sh '''
                docker image prune -f || true
            '''
        }
    }
}