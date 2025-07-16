import * as cdk from 'aws-cdk-lib';
import * as amplify from '@aws-cdk/aws-amplify-alpha';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class PortfolioInfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const amplifyRole = iam.Role.fromRoleName(this, 'AmplifyRole', 'AmplifyRole-dmnlv8duzyjjd', {
      mutable: false,
    });

    const amplifyApp = new amplify.App(this, 'PortfolioApplication', {
      appName: 'Portfolio',
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
                'npm install',
              ],
            },
            build: {
              commands: [
                'echo "building our next.js app..."',
                'npm run build',
                'echo "Copying public files to out"',
                'cp -r public/* out/',
                'echo "Build completed"',
              ],
            },
          },
          artifacts: {
            baseDirectory: 'out',
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

    amplifyApp.addBranch('main', {
      stage: 'PRODUCTION',
      autoBuild: true,
    });
  }
}
