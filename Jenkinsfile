pipeline {
  agent any

  environment {
    AWS_ACCESS_KEY_ID     = credentials('jenkins-aws-secret-key-id')
    AWS_SECRET_ACCESS_KEY = credentials('jenkins-aws-secret-access-key')
    AWS_CLOUDFRONT_DISTRIBUTION_ID_PROD = credentials('jenkins-aws-cloudfront-distribution-id-prod')
    AWS_CLOUDFRONT_DISTRIBUTION_ID_STAGE = credentials('jenkins-aws-cloudfront-distribution-id-stage')
  }

  tools {
    nodejs "node-8.9.4"
  }

  options {
    buildDiscarder(logRotator(numToKeepStr: '10', daysToKeepStr: '20'))
  }

  parameters {
    booleanParam(
      defaultValue: false, 
      description: 'Production Release toggle', 
      name: 'IS_PRODUCTION_RELEASE'
    )
  }

  stages {
    
    stage('Install Dependencies') {
      steps {
        sh "yarn install"
      }
    }

    stage('Lint') {
      steps {
        sh "echo linting..."
        sh "yarn lint"
      }
    }

    stage('Test') {
      steps {
        sh "echo testing..."
        sh "export NODE_ENV=production && yarn test"

        publishHTML target: [
          allowMissing: false,
          alwaysLinkToLastBuild: false,
          keepAll: false,
          reportDir: 'reports/test-coverage',
          reportFiles: 'index.html',
          reportName: 'Coverage Report'
        ]
      }
    }

    stage('Build') {
      steps {
        sh "yarn build"
      }
    }

    // Only deploy when building from the master branch
    // stage by default, otherwise prod if IS_PRODUCTION_RELEASE is set to true manually
    stage('Deploy to Stage') {
      when {
        expression { 
          return BRANCH_NAME == 'master' && IS_PRODUCTION_RELEASE == 'false'
        }
      }
      steps {
        sh "echo deploying to STAGE"
        // sh "yarn release --release_env=stage"
      }
    }

    stage('Deploy to Prod') {
      when {
        expression { 
          return BRANCH_NAME == 'master' && IS_PRODUCTION_RELEASE == 'true'
        }
      }
      steps {
        sh "echo deploying to PROD"
        // sh "yarn release --release_env=prod"
      }
    }

  }
}