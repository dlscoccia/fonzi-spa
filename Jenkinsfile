@Library('ceiba-jenkins-library') _
pipeline {
  //Donde se va a ejecutar el Pipeline
  agent {
    label 'Slave_Induccion'
  }

  //Opciones específicas de Pipeline dentro del Pipeline
  options {
    buildDiscarder(logRotator(numToKeepStr: '3'))
 	  disableConcurrentBuilds()
  }

  tools {
  nodejs 'NodeJS18'
}

  //Aquí comienzan los “items” del Pipeline
  stages{
    stage('Checkout') {
      steps{
        echo "------------>Checkout<------------"
        checkout scm
      }
    }


stage('NPM Install') {
      steps {
        echo "------------>Installing<------------"
      sh 'npm install'
    }
}
    stage('Unit Test') {
      steps {
        echo "------------>Testing<------------"
        sh 'npm run test'
      }
    }

        stage('Test end-to-end') {
      steps{
        echo "------------>Testing Protractor<------------"
      }
    }


stage('Static Code Analysis') {
    steps{
        sonarqubeMasQualityGatesP(sonarKey:'ADN-FonziSpaFront-daniel.lorenzo',
        sonarName:'ADN-FonziSpaFront-daniel.lorenzo',
        sonarPathProperties:'./sonar-project.properties')
    }
}



    stage('Build') {
      steps {
        echo "------------>Build<------------"
        sh 'npm run build'
      }
    }
  }

  post {

    always {
      echo 'This will always run'
    }
    success {
      echo 'This will run only if successful'
      junit allowEmptyResults: true, testResults: '**/test-results/*.xml'
    }
    failure {
      echo 'This will run only if failed'
      mail (to: 'daniel.lorenzo@ceiba.com.co',subject: "Failed Pipeline:${currentBuild.fullDisplayName}",body: "Something is wrong with ${env.BUILD_URL}")
    }
    unstable {
      echo 'This will run only if the run was marked as unstable'
    }
    changed {
      echo 'This will run only if the state of the Pipeline has changed'
      echo 'For example, if the Pipeline was previously failing but is now successful'
    }
  }
}
