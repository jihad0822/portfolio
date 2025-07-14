import * as cdk from 'aws-cdk-lib';
import * as amplify from '@aws-cdk/aws-amplify-alpha';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import { Construct } from 'constructs';

export class PortfolioInfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Amplify application
    const amplifyApp = new amplify.App(this, 'PortfolioApplication', {
      appName: 'Portfolio',
      // Connect to your GitHub repository
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: 'jihad0822',
        repository: 'portfolio',
        oauthToken: cdk.SecretValue.secretsManager('github-token'),
      }),
      // Build specification for Next.js
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
                'npm run build-and-export',
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
              'node_modules/**/*',
              '.next/cache/**/*',
            ],
          },
        },
      }),
    });

    // Add main branch for production
    amplifyApp.addBranch('main', {
      stage: 'PRODUCTION',
      autoBuild: true,
    });
  }
}