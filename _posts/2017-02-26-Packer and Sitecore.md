---
layout: post
title: "Using Packer to Create Immutable servers to deploy Sitecore or other asp.net app"
description: "Using Packer to Create Immutable servers"
comments: false
category: "Sitecore"
keywords: "Hashicorp, Packer, Sitecore"
redirect_from: "/2017/Packer-and-Sitecore/"
---
```
Work in progress
```
# Abstract #
Well I think it is interesting to see how we can utilize different tool to build and deploy Sitecore. Sitecore is in nature not a very kind deployable unit, but i will try to sketch up a few different way to create this immutable deployment.
We should strive to get rid of [snowflake servers](https://martinfowler.com/bliki/SnowflakeServer.html)

In this article i will not use a Sitecore website, but a simple html page to demonstrate the building of virtual server images. 
If i where to use Sitecore i would disablethings like the xDb to make the Content Delivery instances as deployable as possible, and i would not make the Database part of the deployment. 

But to get a real benefit from immutablity you should look into how you can deploy everything needed for a Sitecore CD, making the whole infrastructure immutable, this will open the doors for [Canary release](https://martinfowler.com/bliki/CanaryRelease.html){:target="_blank"} or [Blue/green deployment](https://martinfowler.com/bliki/BlueGreenDeployment.html){:target="_blank"}.

## More reading ##
* [Immutableserver](https://martinfowler.com/bliki/ImmutableServer.html){:target="_blank"}

# Packer? #
> Packer is a tool for creating machine and container images for multiple platforms from a single source configuration.[*](https://www.packer.io/)
Simply put this is a tool you can use to define your server images with. 

First we'll look at the `template.json` this is our entry point to generate "images". The definition of how we will create our server. 
We will take advantage of Variables, Builders and Provisioners. 
*Builders* are components that are able to create a image for a platform
*Provisioners* are components that install and configure software within a running machine prior to that machine being turned into a static image. 
*Variables* are just that.

We could also use Docker, this i will look at another day.

## Builders ##
in this post we will look at:
* [Amazon-ebs](https://www.packer.io/docs/builders/amazon.html){:target="_blank"}
* [Azure-arm](https://www.packer.io/docs/builders/azure-arm.html){:target="_blank"}

The builder(s) will have different formats and you can have multiple builders in your template-file below is an example for at template for AWS. 

```
"builders": [
    {
      "type": "amazon-ebs",    
      "region": "eu-west-1",
      "source_ami": "ami-29f7dd5a",
      "instance_type": "t2.micro",
      "communicator": "winrm",
      "winrm_username": "Administrator",
      "winrm_use_ssl": true,
      "winrm_insecure": true,
      "user_data_file": "bootstrap-aws.txt",
      "ami_name": "Sitecore AMI version"
    }
  ]
```

## Provisioners ##
This is basically the why we cconfigure our images for all cloud vendors
```
 "provisioners": [
    {
      "type": "file",
      "source": "../Website.zip",
      "destination": "c:\\temp\\Website.zip"
    },
    {
      "type": "powershell",
      "scripts": [
        "./install-feature.ps1",
        "./configure-website.ps1"
      ]
    }
    
  ]
```

# Packer and AWS #
This is "quite" simpel, You need a set of credentials for your AWS account(s). To set the correct policy see [Using An IAM Instance Profile](https://www.packer.io/docs/builders/amazon.html#using-an-iam-instance-profile)

For more information on "Amazon Ami Builder" see [here](https://www.packer.io/docs/builders/amazon.html#using-an-iam-instance-profile){:target="_blank"}.
First we create 4 files:
* `template.json` - The Packer template file.
* `Bootstrap.txt` - File to bootstrap the AMI builder machine, this ensure that we can use this machine to build the new AMI.
* `Install-feature.ps1` - Powershell script to configure your AMI with IIS and ASP.Net.
* `configure-website.ps1` - Powershell script to configure the website.

```
"builders": [
    {
      "type": "amazon-ebs",    
      "region": "eu-west-1",
      "source_ami": "ami-29f7dd5a",
      "instance_type": "t2.micro",
      "communicator": "winrm",
      "winrm_username": "Administrator",
      "winrm_use_ssl": true,
      "winrm_insecure": true,
      "user_data_file": "bootstrap-aws.txt",
      "ami_name": "Sitecore AMI version"
    }
  ]
```

I am using Windows Remote Management to connect to the image, I don't know if there is a smarter why maybe remote powershell.

## Ressources: ##
* [Getting Packer To Work For Windows On Aws](http://blog.petegoo.com/2016/05/10/packer-aws-windows/){:target="_blank"}
* All the code for this is [here](https://github.com/magudb/packer-sitecore)