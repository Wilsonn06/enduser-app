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
    image: node:20
    command:
    - cat
    tty: true
  - name: docker
    image: docker:25.0
    command:
    - cat
    tty: true
    volumeMounts:
    - name: docker-sock
      mountPath: /var/run/docker.sock
  volumes:
  - name: docker-sock
    hostPath:
      path: /var/run/docker.sock
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
            cp -r index.js package*.json routes dist/
            cp -r enduser-frontend/dist dist/public
          '''
        }
      }
    }

    stage('Archive artifacts') {
      steps {
        archiveArtifacts artifacts: 'dist/**', fingerprint: true
      }
    }

    stage('Build Docker image') {
      steps {
        container('docker') {
          sh 'docker build -t microservices-app:1.0 .'
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'dist/**', allowEmptyArchive: true
    }
  }
}
