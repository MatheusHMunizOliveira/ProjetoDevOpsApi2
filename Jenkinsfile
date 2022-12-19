pipeline{

  agent any
  
  stages{
  
      stage ("Build docker image"){
        steps{
          script{
             sh 'docker build -t matheuscoffee/aplicacao2 . '
          }
        }
      }
      stage ("test"){
        steps{
            echo 'testing the application...'
        }
      }
      stage ("deploy"){
        steps{
            echo 'deplying the application...'
        }
      }
  }
}
