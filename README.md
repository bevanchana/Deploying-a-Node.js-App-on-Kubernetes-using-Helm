🚀 Node.js App Deployment with Helm on AKS

This project demonstrates how to deploy a Dockerized Node.js application to Azure Kubernetes Service (AKS) using Helm and GitHub Actions. It’s designed for beginners who want to learn how CI/CD works with Kubernetes in the cloud.

📦 Project Structure

.
├── node-app/                # Node.js application
│   └── Dockerfile
├── helm-chart/
│   └── node-helm-chart/    # Helm chart for Kubernetes deployment
│       ├── templates/
│       │   ├── deployment.yaml
│       │   ├── service.yaml
│       │   └── ...
│       └── values.yaml
├── .github/
│   └── workflows/
│       └── deploy.yaml      # GitHub Actions CI/CD pipeline
└── README.md

✅ Features

Build and containerize a Node.js app

Push image to Docker Hub

Use Helm to deploy the app to AKS

Set up GitHub Actions for full CI/CD

Kubernetes Secret management included

Platform-compatible builds for Linux/AMD64 (avoids Apple Silicon issues)

🧠 Prerequisites

Before getting started, you’ll need:

Azure CLI (az)

An Azure subscription with AKS enabled

A Docker Hub account

A GitHub repository

kubectl and helm installed locally (for testing)

GitHub Secrets configured (see below)

🔐 Required GitHub Secrets

Secret Name

Description

DOCKER_USERNAME

Docker Hub username

DOCKER_PASSWORD

Docker Hub password

KUBECONFIG

Base64-encoded kubeconfig for your AKS cluster

APP_SECRET_KEY

Your app’s secret key (used in K8s secret)

🧠 Setup Instructions

1. Clone the Repo

git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

2. Base64 Encode Your Kubeconfig

If you don’t already have a base64-encoded kubeconfig:

cat ~/.kube/config | base64 | tr -d '\n' > kubeconfig.b64

Copy the contents and add it to GitHub Secrets as KUBECONFIG.

🚀 Deployment Pipeline (CI/CD)

The CI/CD pipeline is defined in .github/workflows/deploy.yaml. It includes:

Build and push Docker image to Docker Hub.

Decode and configure the kubeconfig.

Create a Kubernetes secret from GitHub Secrets.

Deploy the Helm chart to AKS.

Triggered On:

Push to the main branch.

📦 Dockerfile

FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "index.js"]

Ensure your node-app/ directory has index.js or your main file.

🔧 Helm Chart Overview

In helm-chart/node-helm-chart:

deployment.yaml: Defines the container, image, and environment.

service.yaml: Exposes the app on a Kubernetes service.

values.yaml: Allows easy config overrides.

Example values.yaml

image:
  repository: <your-docker-username>/node-helm-app
  tag: latest
  pullPolicy: Always

service:
  type: LoadBalancer
  port: 80

✅ Validate the Setup

After pushing to main, monitor GitHub Actions for CI/CD logs.

Check Kubernetes:

kubectl get pods
kubectl get services
kubectl logs <pod-name>

🔍 Troubleshooting

ImagePullBackOff: Ensure the image is available on Docker Hub and matches platform: linux/amd64.

CrashLoopBackOff: Check your container logs.

Kubeconfig Errors: Confirm base64 decode and file permissions.

Secret Errors: Validate app-secrets exists or is created dynamically.

💡 Tips for Beginners

Start with local testing: build your image and run with docker run.

Use helm template to preview what Helm will generate.

Monitor your AKS cluster with kubectl get all.

🤝 Contributions

Contributions, issues, and feature requests are welcome! Open a PR or file an issue.

📄 License

This project is licensed under the MIT License.

Let us know if you'd like a version tailored for another audience, like DevOps engineers or advanced Kubernetes practitioners.

