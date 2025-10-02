pipeline {
  agent {
    docker {
      image 'node:18-alpine'   // node yang cukup baru
      args '-u root:root'
    }
  }
  stages {
    stage("Checkout") {
      steps {
        checkout scm
      }
    }

    stage("Install Dependencies") {
      steps {
        sh 'npm install'
      }
    }

    stage("Build React") {
      steps {
        // build frontend React
        sh 'npm run build'
      }
    }

    stage("Package App") {
      steps {
        // kalau express dipakai untuk serve React build:
        sh '''
          mkdir -p dist
          cp -r build dist/frontend
          cp -r server.js dist/
        '''
      }
    }

    stage("Archive Artifacts") {
      steps {
        archiveArtifacts artifacts: 'dist/**', fingerprint: true
      }
    }
  }
}
