
pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
        skipDefaultCheckout(true)
    }

    parameters {
        booleanParam(
            name: 'DEPLOY_TO_AWS',
            defaultValue: false,
            description: 'Enable only when CloudFront is enabled and deployed.'
        )
    }

    environment {
        AWS_DEFAULT_REGION = 'ap-south-1'
        S3_BUCKET = 'react-admin-dashboard-vanshika-2026'
        CLOUDFRONT_DISTRIBUTION_ID = 'ES5IBDMCJTNW0'
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
                bat 'aws --version'
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
                bat 'if not exist dist\\index.html (echo Build output not found & exit /b 1)'
            }
        }

        stage('Verify AWS Credentials') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-deploy-credentials'
                ]]) {
                    bat 'aws sts get-caller-identity'
                }
            }
        }

        stage('Deploy to S3') {
            when {
                expression { params.DEPLOY_TO_AWS == true }
            }
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-deploy-credentials'
                ]]) {
                    bat 'aws s3 sync dist/ s3://%S3_BUCKET%/ --delete'
                }
            }
        }

        stage('Invalidate CloudFront Cache') {
            when {
                expression { params.DEPLOY_TO_AWS == true }
            }
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-deploy-credentials'
                ]]) {
                    bat 'aws cloudfront create-invalidation --distribution-id %CLOUDFRONT_DISTRIBUTION_ID% --paths "/*"'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed. Review the Console Output.'
        }
    }
}
