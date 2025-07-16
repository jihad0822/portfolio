import * as cdk from 'aws-cdk-lib';
import * as amplify from '@aws-cdk/aws-amplify-alpha';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as iam from 'aws-cdk-lib/aws-iam'; // Added missing import
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
      role: amplifyRole, // Associate the existing role
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
                'cd portfolio',
                'npm run build',
                'echo "Copying public files to out"',
                'cp -r portfolio/public/* portfolio/out/',
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