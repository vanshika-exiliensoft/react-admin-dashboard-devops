
pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
        skipDefaultCheckout(true)
        timeout(time: 30, unit: 'MINUTES')
    }

    environment {
        AWS_DEFAULT_REGION = 'ap-south-1'
        AWS_CREDENTIALS_ID = 'aws-deploy-credentials'

        S3_BUCKET = 'react-admin-dashboard-vanshika-2026'
        CLOUDFRONT_DISTRIBUTION_ID = 'ES5IBDMCJTNW0'

        TF_DIR = 'serverless/terraform'
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
                bat 'terraform --version'
            }
        }

        stage('Validate Lambda Terraform') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-deploy-credentials'
                ]]) {
                    dir('serverless/terraform') {
                        bat 'terraform init'
                        bat 'terraform fmt -check'
                        bat 'terraform validate'
                    }
                }
            }
        }

        stage('Plan Lambda Deployment') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-deploy-credentials'
                ]]) {
                    dir('serverless/terraform') {
                        bat 'aws sts get-caller-identity'
                        bat 'terraform plan -out=tfplan'
                    }
                }
            }
        }

        stage('Approve Lambda Deployment') {
            steps {
                input(
                    message: 'Review the Lambda Terraform plan before deploying. Continue?',
                    ok: 'Approve Deployment'
                )
            }
        }

        stage('Deploy Lambda and Check API') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-deploy-credentials'
                ]]) {
                    dir('serverless/terraform') {
                        bat 'terraform apply -auto-approve tfplan'

                        
script {
    def apiUrl = bat(
        script: '@echo off\r\nterraform output -raw api_url',
        returnStdout: true
    ).trim()

    // Keep only the actual HTTPS URL if command output contains extra lines.
    def urls = apiUrl.readLines()
        .collect { it.trim() }
        .findAll { it.startsWith('https://') }

    if (urls.isEmpty()) {
        error("Could not read the API URL from Terraform output: ${apiUrl}")
    }

    env.DEPLOYED_API_URL = urls.last().replaceAll('/+$', '')

    echo "API URL: ${env.DEPLOYED_API_URL}"
}


                        bat '''
                            powershell -NoProfile -ExecutionPolicy Bypass -Command "$ErrorActionPreference='Stop'; $baseUrl=$env:DEPLOYED_API_URL; if ([string]::IsNullOrWhiteSpace($baseUrl)) { throw 'DEPLOYED_API_URL is empty' }; $healthUrl=$baseUrl.TrimEnd('/') + '/api/health'; Write-Host ('Checking URL: ' + $healthUrl); $response=Invoke-RestMethod -Uri $healthUrl -TimeoutSec 30; if ($response.status -ne 'healthy') { throw ('Lambda health check failed. Response: ' + ($response | ConvertTo-Json -Compress)) }; Write-Host 'Lambda health check passed'"
                        '''
                    }
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Lint React') {
            steps {
                bat 'npm run lint'
            }
        }

        stage('Build React') {
            steps {
                script {
                    if (!env.DEPLOYED_API_URL) {
                        error('API URL was not set by the Lambda deployment stage.')
                    }
                }

                withEnv([
                    "VITE_API_BASE_URL=${env.DEPLOYED_API_URL}",
                    'VITE_USE_MOCK=false'
                ]) {
                    bat 'npm run build'
                }

                bat 'if not exist dist\\index.html (echo Build output not found & exit /b 1)'
            }
        }

        stage('Deploy React to S3') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-deploy-credentials'
                ]]) {
                    bat 'aws s3 sync dist/ s3://%S3_BUCKET%/ --delete'
                }
            }
        }

        stage('Invalidate CloudFront') {
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
            echo 'Frontend and Lambda deployment completed successfully.'
            echo 'Check the CloudFront website and dashboard API.'
        }

        failure {
            echo 'Pipeline failed. Review the Jenkins Console Output.'
        }

        always {
            echo 'Pipeline execution finished.'
        }
    }
}
