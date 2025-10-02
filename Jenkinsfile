pipeline {
  agent any
  stages{
    stage("checkout"){
      steps{
        checkout scm
      }
    }

    stage("Test"){
      steps{
        sh 'sudo npm install'
      }
    }
    stage("build"){
      steps{
        sh 'npm run build'
      }
    }
  }
}
