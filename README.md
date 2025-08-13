## Amplify Portfolio Website 




Project Details
This repository contains the code and infrastructure definition for a modern, professional cloud engineer portfolio website. The project demonstrates a full CI/CD pipeline using Next.js, AWS Amplify, and AWS Cloud Development Kit (CDK).

Prerequisites
Before you begin, ensure you have the following installed and configured:

```
Download & Install Git
Download & Install Node.js (npm is included)
Install & Configure AWS CLI with your AWS credentials.
AWS CDK CLI: Install globally: npm install -g aws-cdk
Domain (Optional): If you wish to use a custom domain managed by AWS Route 53

```
Quick Start Guide
Ready to get this project running quickly? Follow these steps:

Clone the Repository: Clone this GitHub repository to your local machine using git clone.

GitHub Token: Generate a GitHub Fine-Grained Personal Access Token (PAT) with Read and write access for this repository and store it securely in AWS Secrets Manager under the name github-token-portfolio-website.

Install Dependencies:

Navigate to the portfolio-website directory and run npm install.
Navigate to the infrastructure directory and run npm install @aws-cdk/aws-amplify-alpha aws-cdk-lib.
Deploy Infrastructure: From the infrastructure directory, run cdk deploy to provision your AWS Amplify application.

Verify: Check the AWS Amplify console for deployment status and visit your live website at the deployed URL.
