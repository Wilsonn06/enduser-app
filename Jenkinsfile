pipeline {
  agent {
    kubernetes {
      label 'nodejs-build'
      defaultContainer 'node'
      yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: node
    image: node:18
    command:
    - cat
    tty: true
"""
    }
  }

  environment {
    FRONTEND_DIR = 'enduser-frontend'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install backend deps') {
      steps {
        container('node') {
          sh 'npm ci'
        }
      }
    }

    stage('Build frontend') {
      steps {
        container('node') {
          dir("${env.FRONTEND_DIR}") {
            sh 'npm ci'
            sh 'npm run build'
          }
        }
      }
    }

    stage('Prepare dist') {
      steps {
        container('node') {
          sh '''
            set -e
            rm -rf dist || true
            mkdir -p dist
            # copy backend files
            cp -r index.js package*.json routes dist/
            # copy frontend production build to dist/public (Express biasanya serve static dari 'public')
            cp -r ${FRONTEND_DIR}/build dist/public
          '''
        }
      }
    }

    stage('Archive artifacts') {
      steps {
        archiveArtifacts artifacts: 'dist/**', fingerprint: true
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'dist/**', allowEmptyArchive: true
    }
  }
}
