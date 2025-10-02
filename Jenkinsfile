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
    IMAGE_NAME = 'wilsonnn06/enduser-app'
    IMAGE_TAG = '1.0'
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
          sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
        }
      }
    }

    stage('Push Docker image') {
      steps {
        container('docker') {
          withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
            sh '''
              echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
              docker push $IMAGE_NAME:$IMAGE_TAG
              docker logout
            '''
          }
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
