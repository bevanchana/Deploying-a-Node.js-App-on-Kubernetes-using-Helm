# 🚀 Node.js App Deployment with Helm on AKS

This project demonstrates how to deploy a Dockerized **Node.js application** to **Azure Kubernetes Service (AKS)** using **Helm** and **GitHub Actions**. It’s designed for beginners eager to learn how CI/CD pipelines work with Kubernetes in the cloud.

---

## 📦 Project Structure

.
├── node-app/ # Node.js application
│ └── Dockerfile
├── helm-chart/
│ └── node-helm-chart/ # Helm chart for Kubernetes deployment
│ ├── templates/
│ │ ├── deployment.yaml
│ │ ├── service.yaml
│ │ └── ingress.yaml
│ └── values.yaml
├── .github/
│ └── workflows/
│ └── deploy.yaml # GitHub Actions CI/CD pipeline
└── README.md


---

## ✅ Features

- 🏗️ Build and containerize a Node.js app
- 🚀 Push image to Docker Hub
- ⛵ Deploy the app to AKS using Helm
- 🔁 Set up GitHub Actions for full CI/CD
- 🔐 Kubernetes Secret management included
- 💻 Platform-compatible builds (Linux/amd64 — avoids Apple Silicon issues)

---

## 🧠 Prerequisites

Make sure you have the following:

- [Azure CLI (`az`)](https://learn.microsoft.com/en-us/cli/azure/)
- An **Azure subscription** with **AKS** enabled
- A **Docker Hub** account
- A **GitHub** repository
- [`kubectl`](https://kubernetes.io/docs/tasks/tools/) and [`helm`](https://helm.sh/docs/intro/install/) installed locally

---

## 🔐 Required GitHub Secrets

| Secret Name       | Description                              |
|-------------------|------------------------------------------|
| `DOCKER_USERNAME` | Docker Hub username                      |
| `DOCKER_PASSWORD` | Docker Hub password                      |
| `KUBECONFIG`      | Base64-encoded kubeconfig for your AKS   |
| `APP_SECRET_KEY`  | Your app’s secret key (K8s secret)       |

---

## 🧰 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo> 
```

2. Encode Your Kubeconfig
cat ~/.kube/config | base64 | tr -d '\n' > kubeconfig.b64
Copy the contents of kubeconfig.b64 and paste it into GitHub Secrets as KUBECONFIG.

🚀 Deployment Pipeline (CI/CD)

The pipeline is defined in .github/workflows/deploy.yaml and includes:

🔧 Build and push Docker image to Docker Hub
🔐 Decode kubeconfig and set up Kubernetes access
🔑 Create a Kubernetes secret from GitHub Secrets
📦 Deploy the Helm chart to AKS
Triggered on: push to main branch

📦 Dockerfile (Minimal Setup)

FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "index.js"]
Ensure your node-app/ directory contains index.js or the correct entry point.

🛠️ Helm Chart Overview

Located in helm-chart/node-helm-chart/:

File	Purpose
deployment.yaml	Defines the container, image, env vars
service.yaml	Exposes the app inside the cluster
ingress.yaml	Optional Ingress setup
values.yaml	Central config for image, ports, etc.
Example values.yaml
image:
  repository: <your-dockerhub-username>/node-helm-app
  tag: latest
  pullPolicy: Always

service:
  type: LoadBalancer
  port: 80
✅ Validate Deployment

After pushing to main, you can monitor the rollout:

kubectl get pods
kubectl get svc
kubectl logs <pod-name>
🧪 Troubleshooting

Issue	Solution
ImagePullBackOff	Ensure image is pushed to Docker Hub and tag/platform match
CrashLoopBackOff	Check container logs for errors (kubectl logs)
Kubeconfig errors	Validate base64 encoding and correct use of secrets
Secret not found	Ensure secret is created dynamically or pre-created in the cluster
💡 Tips for Beginners

🧪 Test locally: docker build and docker run your app before deploying
🔍 Use helm template to preview rendered manifests
🔄 Monitor your cluster using kubectl get all -A
🤝 Contributions

Contributions, issues, and feature requests are welcome!
Feel free to open an issue or submit a pull request.

📄 License

This project is licensed under the MIT License.
