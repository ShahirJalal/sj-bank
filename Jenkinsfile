pipeline {
    agent any

    stages {
        stage('Deploy') {
            steps {
                sh 'docker compose up -d --build --remove-orphans'
            }
        }

        stage('Health check') {
            steps {
                sh 'curl --fail --silent --show-error http://localhost:8086/'
            }
        }
    }
}
