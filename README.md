# The DevSecOps Checklist
The intent of this project is to create an actionable list of things that any org, of any size, can do to implement a *functioning* DevSecOps program. And by "actionable" I mean specific things you can do on a server, in your source code or in a vendor that will materially influence the security of your web application. One of my biggest pet peeves with compliance frameworks is how disconnected they are from the actual things that technical people have to do to make something better.  Compliance frameworks like APRA234 in Australia or ISO27001 talk about theoretical or often non-sensical vulnerabilities.  This is often because the person or group of people writing the framework didn't know what they were talking about.  We want this DevSecOps Checklist to be different. 

I was inspired by the recent [MVSP](https://mvsp.dev) project which I have profound respect for.  This document is NOT meant to replace that in any way.  Instead this is a separate document with a separate target audience and separate philosopy.  This document, unlike the MVSP, is meant to be the pentultimate checklist for implementing a DevSecOps program at your company.  This document is meant to provide a step by step guide on how to build better software by auditing whats in place now.

This checklist is broken down into five areas of concern:

* [Development environment](#development)  
* [Source code management](#scm)  
* [CI/CD](#cicd)  
* [Deployment](#deployment)  
* [Organization](#org)  

Every company and every application is different and that means that simplistic statements like "shift left" need to be clarified.  For many large companies, managers find it difficult to enforce security precautions on the developers laptop like the use of MFA or git hooks.  For this company, it is best shift left to the CI/CD vendor and concentrate initially there.  For smaller startups or companies with immature or non-existant CI/CD pipelines it is easier to shift left all the way to the developers laptop.  For others, it is a combination, and this is all perfectly fine.  The intent of this document is to provide a roadmap to DevSecOps nirvana and not to say what is the best journey to nirvana.  The journey is yours.  


![DevSecOps Continuous Improvement](devsecops-infinity.png)

<h2 id="development">The developers environment</h2>

The developers laptop is where most of the magic happens, but also where most of the problems are introduced.  If you want to shift as far left as you can this is where you want to land much of your embedded security.

| Name | Description | Maps to security frameworks |
| :---        | :---   | :---    |
| Secure Code Training | Implement a secure coding training program for your devs | <ul><li>SSDF1.1-PO.2.2</li><li>APRA234 ATM B-2-f</li></ul> |
| Versioning | Use a standard concurrent version system (CVS) like git in dev environments | <ul><li>SSDF1.1-PO.3.1</li><li>APRA234 ATM B-2-f</li></ul> |
| .gitignore | Limit what can be sent to repository via a .gitignore file | <ul><li>SSDF1.1-PO.3.2</li><li>APRA23 ATM D-2-d-iii</li></ul> |
| Git pre-commit hook | Utilize a pre-commit git hook to run security scans when code is commited | <ul><li>APRA23 example</li><li>NIST example</li></ul> |
| Developer SCA | Scan source code for vulnerable libraries and open source software in dev environment | <ul><li>APRA23 ATM D-2-d-ii</li><li>NIST 800-53.2a</li></ul> |
| Developer SAST | Scan source code for vulnerabilities in the source code itself in dev environment | <ul><li>APRA23 ATM D-2-d-ii</li><li>NIST 800-53.2a</li></ul> |
| Developer Credential | Scan source code for secrets, credentials, API keys and similar in dev environment | <ul><li>APRA23 ATM D-2-ii</li><li>NIST example</li></ul> |
| Baseline | Create an application baseline | <ul><li>APRA23 ATM D-2-ii</li><li>NIST example</li></ul> |

<h2 id="scm">Source code management</h2>

Most companies now store their source code in cloud based repositories like GitHub, Bitbucket or Gitlab.  Even if you don't you will use a centralized place for your software engineers to store their code.  Centralization and versioning means that these developers can work together without (mostly) stepping on each others toes.  Joe and Molly can both be working on the same component, file or function but their changes won't necessarily break the other ones changes.

| Name | Description | Maps to security frameworks |
| :---        | :---   | :---    |
| SCM | Use a centralized source code management (SCM) system like Bitbucket, GitHub or Gitlab | <ul><li>SSDF1.1-PO.3.1</li><li>APRA234 ATM B-2-f</li></ul> |
| Roles | Create unique user and team roles so that access to source code can be tailored | <ul><li>SSDF1.1-PS.1.1</li><li>APRA234 ATM B-2-f</li></ul> |
| SSH | Use the SSH protocol to access your repositories instead of HTTPS | <ul><li>APRA234 ATM D-4</li><li>NIST 800-53.2a</li></ul> |
| MFA | Make sure all developers use multi-factor authentication when pulling, commiting or pushing code | <ul><li>APRA234 ATM D-4</li><li>NIST 800-53.2a</li></ul> |
| Server side git hook | Utilize a server side git hook like update or post-receive hook to run automatic scans | <ul><li>APRA234 ATM D-2-d-iii</li><li>NIST 800-53.2a</li></ul> |
| Pull Requests | Enforce pull or merge requests so all code is verified by team lead or senior engineer | <ul><li>APRA23 ATM D</li><li>NIST 800-53.2a</li></ul> |
| Peer reviews | Enforce peer reviews by software engineers colleagues to increase code quality and security | <ul><li>APRA23 ATM G</li><li>NIST 800-53.2a</li></ul> |

<h2 id="cicd">CI/CD Pipelines & Build Environments</h2>

Modern web applications are built using modern continuous integration and deployment processes.  This means that you run tests specific to whatever environment you are pushing to whether that's DEV, STAGING or PROD.

| Name | Description | Maps to security frameworks |
| :---        | :---   | :---    |
| CI/CD pipeline | Implement a CI/CD pipeline | <ul><li>SSDF1.1-PO.5.1</li><li>APRA234 ATM D-2-d-iii</li></ul> |
| Centralized SCA | Scan source code for vulnerable libraries and open source software from within a CD stage | <ul><li>APRA23 ATM D-2-d-ii</li><li>NIST 800-53.2a</li></ul> |
| Centralized SAST | Scan source code for vulnerabilities in the source code itself from within a CD stage | <ul><li>APRA23 ATM D-2-d-ii</li><li>NIST 800-53.2a</li></ul> |
| Centralized Credential | Scan source code for secrets, credentials, API keys and similar from within a CD stage | <ul><li>APRA23 ATM D-2-ii</li><li>NIST example</li></ul> |
| DAST | Scan running application for vulnerabilities | <ul><li>APRA23 example</li><li>NIST example</li></ul> |

<h2 id="deployment">Deployment</h2>

Applications are deployed somewhere whether thats an AWS Lambda, S3 bucket or some old crusty server in the corner of the server room.  In any case, DevSecOps best practices mean that you need to include that deployment location in your processes.  

| Name | Description | Maps to security frameworks |
| :---        | :---   | :---    |
| Alternative Deployment | Have tested and working altnerative way to deploy changes to your applicaiton other than using your standard process with GitHub or Bitbucket in case they go down. This must include the ability to push to PROD from local in emergencies. | <ul><li>APRA23 example</li><li>NIST example</li></ul> |
| security.txt | Create a security.txt file in the root of your application so people know how to contact you about security issues | <ul><li>APRA23 example</li><li>NIST example</li></ul> |
| X-Forwarded-By | Configure your webservers, load balancers & web proxies to include the X-Forwarded-By header | <ul><li>APRA23 example</li><li>NIST example</li></ul> |
| Logging | Collect application logs in realtime and send to centralized storage or SIEM | <ul><li>APRA23 ATM D-2-d-i</li><li>NIST example</li></ul> |
| WAF | Implement a web application firewall (WAF) to protect your application from known attacks | <ul><li>APRA234 ATM D-2-d-iii</li><li>NIST 800-53.2a</li></ul> |
| Harden Server | Configure hosting environment to be more secure | <ul><li>APRA23 example</li><li>NIST example</li></ul> |
| SBOM | Generate a **real-time** software bill-of-materials (SBOM) | <ul><li>APRA</li><li>NIST</li></ul> |

<h2 id="org">Organization</h2>

People don't deploy applications, organizations do.  Some steps in the DevSecOps checklist need to be owned by the Organization itself.  

| Name | Description | Maps to security frameworks |
| :---        | :---   | :---    |
| Pentesting | Have your application pentested regularly | <ul><li>APRA23 example</li><li>NIST example</li></ul> |
| Disclosure | Create a security.txt file as well as procedures to let people contact you when they find security issues in your app | <ul><li>APRA23 example</li><li>NIST example</li></ul> |
| Bug Bounty | Setup a bug bounty program to incentivize security researchers to tell you about vulnerabilities they find | <ul><li>APRA23 example</li><li>NIST example</li></ul> |

![DevSecOps Continuous Improvement](devsecops-controls.jpg)

## What's left to do?

- [x] vulnerability assessment
- [ ] map all the APRA and NIST examples




- Identifies missing HTTP security headers
- Identifies whether appropriate security controls like WAF, firewalls, and CSP are being used
- Identifies vulnerabilities in your web application and public assets
- Identifies mis-configured WAF or CDN
- Finds WAF bypass attacks for Akamai, Cloudflare & Imperva
- Identifies sovereignty issues for your data or transit
- Identifies SSL/TLS misconfigurations
- Finds loadbalancing, proxy or reverse-proxy issues
- Identifies insecure or out of date dependencies in your public assets
- Identifies security and availability differences in your dev, staging and prod environments
- Track all changes to the security, techstack and availability profiles of your application environments
- Let's you schedule daily, weekly or monthly scans
- Provides historical data on your applications via API or web UI
- Notifies you when your application changes for the worse
- Notifies you when one of your environments changes relative to the others (dev changes relative to prod)
- Provides insights on how to add a missing security control to a specific application
- Identifies when it’s easier to apply a security control in cloud provider rather than on your web service

APRA 234 ATM G:
Design reviews, penetration tests, code review and scanning, network traffic analysis, fault testing, fuzzing 
