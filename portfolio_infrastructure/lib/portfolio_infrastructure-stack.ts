import * as cdk from 'aws-cdk-lib';
import * as amplify from '@aws-cdk/aws-amplify-alpha';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class PortfolioInfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Reference the existing Amplify role
    const amplifyRole = iam.Role.fromRoleName(this, 'AmplifyRole', 'AmplifyRole-dmnlv8duzyjjd', {
      mutable: false,
    });

    // Amplify application
    const amplifyApp = new amplify.App(this, 'PortfolioApplication', {
      appName: 'Portfolio',
      // Connect to your GitHub repository
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: 'jihad0822',
        repository: 'portfolio',
        oauthToken: cdk.SecretValue.secretsManager('github-token'),
      }),
      role: amplifyRole,
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '1.0',
        frontend: {
          phases: {
            preBuild: {
              commands: [
                'echo "Starting pre-build phase"',
                'cd portfolio', // Navigate to portfolio directory
                'npm install',
              ],
            },
            build: {
              commands: [
                'echo "building our next.js app..."',
                'if [ -d "portfolio" ]; then cd portfolio; else echo "portfolio directory not found"; exit 1; fi', // Check and navigate
                'npm run build',
                'echo "Copying public files to out"',
                'cp -r public/* out/', // Use relative path from within portfolio
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