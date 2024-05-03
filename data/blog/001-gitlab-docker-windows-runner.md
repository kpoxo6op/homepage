---
title: 'GitLab runners for Docker for Windows'
date: '2019-10-11'
tags: ['github', 'gitlab', 'guide', 'terraform', 'gcp']
draft: true
summary: 'How to provision GitLab runners with executor on Docker for Windows.'
---

## Introduction

Recently I was tasked to provision a new GitLab Runner on a Windows machine in
Google Cloud.

The Runner Executor needed to be Docker for Windows because my customer required
to build a specific Windows app.

The runner also needed to be provisioned in uninterrupted mode with Terraform.

I met some interesting challenges while working on the task.

I found that GitLab documentation had a few mistakes or was outdated here and
there.

I read a few similar guides posted by other people. This tells me that quite a
few people were struggling with the same task. Apparently, they decided to share
their experience to help others.

While other guides greatly explain the matter, they explain how to provision a
runner manually step by step. My guide will provide a more automated way to
complete the same goal. We will be using Google Cloud shell, Terraform and
PowerShell to achieve that.

This guide is aimed to be a complete and practical example. We will start from
the ground up without any infrastructure anf finish with a working Runner.

## Before you begin

### GitHub

Clone the GitHub repository
<!-- TODO rename gitlab-agent-pwsh-->

```sh
git clone https://github.com/kpoxo6op/gitlab-agent-pwsh.git
cd gitlab-agent-pwsh
```

### Terraform

Install [Terraform](https://developer.hashicorp.com/terraform/install).

### Google Cloud

Install [Google Cloud SDK](https://cloud.google.com/sdk/docs/install).

Create a new project with a unique name. I'll be using `runner-demo-xxxx` in this article. Note that project names are globally unique, so your project name will be different from mine.

Enable [Billing](https://cloud.google.com/billing/docs/how-to/verify-billing-enabled#console) for your project.

Create Service account and the key for Terraform.

```sh
PROJECT_ID=$(gcloud config get-value project)

gcloud iam service-accounts create terraform-admin \
    --description="Service account for Terraform operations" \
    --display-name="Terraform Admin"

gcloud projects add-iam-policy-binding ${PROJECT_ID} \
    --member=serviceAccount:terraform-admin@${PROJECT_ID}.iam.gserviceaccount.com \
    --role="roles/editor"

gcloud iam service-accounts keys create ~/terraform-admin-key.json \
    --iam-account terraform-admin@${PROJECT_ID}.iam.gserviceaccount.com

# verify the key
cat ~/terraform-admin-key.json
```

Terraform will use the key we have created to provision Google Cloud resources.

Enable Storage API because we will store our Terraform State in a Google Cloud Bucket. Enable Compute API because we will provision a Windows machine.

```sh
gcloud services enable storage.googleapis.com
gcloud services enable compute.googleapis.com
```

<!-- TODO test creating the bucket via terraform -->

### Gitlab

Sign up for a [GitLab](https://gitlab.com/users/sign_up) account.

Create any Group and Project names during the sign up process. We will create another group with terraform later.

Create a [Personal Access Token](https://gitlab.com/-/user_settings/personal_access_tokens) with `api` scope.

Save the token on disk, we will use it later.

## Prepare the environment

## Review the Terraform files

## Create the Runner

## Verify the Runner is working

## Clean Up

<!-- gilab mistakes:
-> backslashes in powreshell
-> --tag-list

links to other people's guies

add notes about security and account structure:

- separate account for terraform state and resource
- encrypt terraform state
- use federation instead of access keys for GCP

-->
