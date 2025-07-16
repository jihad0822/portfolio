import * as cdk from 'aws-cdk-lib';
import * as amplify from '@aws-cdk/aws-amplify-alpha';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class PortfolioInfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const amplifyApp = new amplify.App(this, 'PortfolioApplication', {
      appName: 'Portfolio',
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: 'jihad0822',
        repository: 'portfolio',
        oauthToken: cdk.SecretValue.secretsManager('github-token'),
      }),
    
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '1.0',
        frontend: {
          phases: {
            preBuild: {
              commands: [
                'echo "Starting pre-build phase"',
                'cd portfolio',
                'npm install',
              ],
            },
            build: {
              commands: [
                'echo "building our next.js app..."',
                'npm run build',
                
                'echo "Build completed"',
              ],
            },
          },
          artifacts: {
            baseDirectory: 'portfolio/out',
            files: ['**/*'],
          },
          cache: {
            paths: [
              'portfolio/node_modules/**/*',
              'portfolio/.next/cache/**/*',
            ],
          },
        },
      }),
    });

    amplifyApp.addBranch('main', {
      stage: 'PRODUCTION',
      autoBuild: true,
    });
  }
}
