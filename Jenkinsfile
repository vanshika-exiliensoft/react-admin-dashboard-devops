
pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
        skipDefaultCheckout(true)
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Check Tools') {
            steps {
                bat 'node --version'
                bat 'npm --version'
                bat 'git --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                bat 'npm run lint'
            }
        }

        stage('Build React App') {
            steps {
                bat 'npm run build'
                bat 'if not exist dist\\index.html exit /b 1'
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: React application built successfully.'
        }

        failure {
            echo 'FAILED: Check the Console Output for the error.'
        }
    }
}
