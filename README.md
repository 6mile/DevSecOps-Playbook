# The DevSecOps Checklist
The intent of this project is to create an actionable list of things that any org, of any size, can do to implement a *functioning* DevSecOps program. Or more simply: this project is meant to be a list of actionable steps that engineers can follow that will give them a better, more secure application in the ned.  And by "actionable" I mean specific things you can do on a server, in your source code or in a vendor platform that will materially influence the security of your web application. 

# Some background

I have been hardening applications environments for more than 20 years and one of my biggest frustrations is how abstracted the language of compliance frameworks are.  They are too disconnected from the actual technical things that technical people have to do to make something better.  Following compliance guidelines is really important but frameworks like the NIST Secure Software Development Framework (SSDF) talk about theoretical or often non-sensical vulnerabilities.  For example, here's a line from the SSDF section PO item 3.2: "Follow recommended security practices to deploy and maintain tools and toolchains."  Then in the implementation examples section there are 9 examples that range from evaluating tools and acquiring tools for the developer environment to collecting evidence for an audit. Like, WTF?!  How is an engineer supposed to know what to do with that?  This is often because the person or group of people writing the framework are technically aligned becasue they come from a risk or GRC background.  We want this DevSecOps Checklist to be different. This document is for engineers!

I was inspired by the recent [MVSP](https://mvsp.dev) project which I have profound respect for.  But, the MVSP is a framework for defining what a minimally viable secure product is, and not a true checklist of "do this, now do that". This document is NOT meant to replace the MVSP in any way.  Instead this is a separate document with a separate target audience and separate philosopy.  This document, unlike the MVSP, is meant to be the pentultimate checklist for implementing a DevSecOps program at your company.  This document is meant to provide a step by step guide on how to build better software by auditing whats in place now. Finally, I'm selfish and I want a document I can use myself to quickly and efficiently secure an estate of applications.

# Shift Left

Every company and every application is different and that means that simplistic statements like "shift left" need to be clarified.  For many large companies, managers find it difficult to enforce security precautions on the developers laptop like the use of MFA or git hooks.  For this company, it is best to shift left to the CI/CD solution(s) and concentrate initially there.  For smaller startups or companies with immature or non-existant CI/CD pipelines it is easier to shift left all the way to the developers laptop.  If you can define what secure looks like at this early stage, you are saving time and money.  For other organizations, it is a combination, depending on group and maturity, and this is all perfectly fine.  The intent of this document is to provide a roadmap to DevSecOps nirvana and not to say what is the best journey to nirvana.  The journey is yours.  

This checklist is broken down into five areas of concern which will often map to different technocal roles within an org:

* [Development environment](#development)  
* [Source code management](#scm)  
* [CI/CD](#cicd)  
* [Deployment](#deployment)  
* [Organization](#org)  


![DevSecOps Continuous Improvement](devsecops-infinity.png)

<h2 id="development">The developers environment</h2>

The developers laptop is where most of the magic happens, but also where most of the problems are introduced.  If you want to shift as far left as you can this is where you want to land much of your embedded security.

| Name | Description | Difficulty | Maps to security frameworks |
| :---        | :---   | :---    | :---    |
| Secure Code Training | Implement a secure coding training program for your devs | <span style="color: orange">Medium</span> | <ul><li>SSDF1.1-PO.2.2</li><li>[NIST 800-53B SA-16](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-16)</li><li>APRA234 ATM B-2-f</li></ul> |
| Versioning | Use a standard concurrent version system (CVS) like git in dev environments | <span style="color: green">Easy</span> | <ul><li>SSDF1.1-PS.3.1</li><li>[NIST 800-53B SA-15(10)](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-15)</li><li>SSDF1.1-PO.3.1</li><li>APRA234 ATM B-2-f</li></ul> |
| .gitignore | Limit what can be sent to repository via a .gitignore file | <span style="color: green">Easy</span> | <ul><li>SSDF1.1-PW.8.2</li><li>[NIST 800-53B SA-15(12)](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-15)</li><li>APRA234 ATM D-2-d-iii</li></ul> |
| Git pre-commit hook | Utilize a pre-commit git hook to run security scans when code is commited | <span style="color: green">Easy</span> | <ul><li>SSDF1.1-PW.8.2</li><li>APRA234 ATM D-2-d-ii</li><li>[NIST 800-53B SA-11(1)](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-11)</li></ul> |
| Developer SCA | Scan source code for vulnerable libraries and open source software in dev environment | <span style="color: orange">Medium</span> | <ul><li>APRA234 ATM D-2-d-ii</li><li>SSDF1.1-PW.8.2</li><li>[NIST 800-53B SA-15(7)](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-15)</li></ul> |
| Developer SAST | Scan source code for vulnerabilities in the source code itself in dev environment | <span style="color: green">Easy</span> | <ul><li>APRA234 ATM D-2-d-ii</li><li>SSDF1.1-PW.8.2</li><li>[NIST 800-53B SA-11(1)](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-11)</li></ul> |
| Developer Credential | Scan source code for secrets, credentials, API keys and similar in dev environment | <span style="color: green">Easy</span> | <ul><li>APRA234 ATM D-2-ii</li><li>SSDF1.1-PW.8.2</li><li>[NIST 800-53B SA-15(2)](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-15)</li></ul> |
| Baseline | Create an application baseline | <span style="color: orange">Medium</span> | <ul><li>APRA234 ATM D-2-ii</li><li>SSDF1.1-PW.9.1</li><li>[NIST 800-53B SA-17(1)](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-17)</li></ul> |

<h2 id="scm">Source code management</h2>

Most companies now store their source code in cloud based repositories like GitHub, Bitbucket or Gitlab.  Even if you don't you will use a centralized place for your software engineers to store their code.  Centralization and versioning means that these developers can work together without (mostly) stepping on each others toes.  Joe and Molly can both be working on the same component, file or function but their changes won't necessarily break the other ones changes.

| Name | Description | Difficulty | Maps to security frameworks |
| :---        | :---   | :---    | :--- |
| SCM | Use a centralized source code management (SCM) system like Bitbucket, GitHub or Gitlab | <span style="color: green">Easy</span> | <ul><li>SSDF1.1-PS.1.1</li><li>[NIST 800-53B SA-15(6)](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-15)</li><li>APRA234 ATM B-2-f</li></ul> |
| Roles | Create unique user and team roles so that access to source code can be tailored | <span style="color: green">Easy</span> | <ul><li>SSDF1.1-PO.2.1</li><li>[NIST 800-53B AC-2(7)](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=AC-2)</li><li>APRA234 ATM B-2-f</li></ul> |
| SSH | Use the SSH protocol to access your repositories instead of HTTPS | <span style="color: green">Easy</span> | <ul><li>SSDF1.1-PO.5.2</li><li>APRA234 ATM C.6b</li>[NIST 800-53B AC-17(4)](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=AC-17)</li></ul> |
| MFA | Make sure all developers use multi-factor authentication when pulling, commiting or pushing code | <span style="color: green">Easy</span> | <ul><li>SSDF1.1-PO.5.2</li><li>APRA234 ATM C.7j</li><li>[NIST 800-53B AC-17](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=AC-17)</li></ul> |
| Server side git hook | Utilize a server side git hook like update or post-receive hook to run automatic scans | <span style="color: orange">Medium</span> | <ul><li>SSDF1.1-PW.8.2</li><li>APRA234 ATM D-2-d-ii</li><li>[NIST 800-53B SA-10(1)](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-10)</li></ul> |
| Developer Collaboration | Use collaboration tools to document the changes to a software application | <span style="color: red">Difficult</span> | <ul><li>SSDF1.1-PW.8.2</li><li>APRA234 ATM D</li><li>[NIST 800-53B SA-15(2)](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-15)</li></ul> |
| Pull Requests | Enforce pull or merge requests so all code is verified by team lead or senior engineer | <span style="color: orange">Medium</span> | <ul><li>APRA234 ATM D-2-d-ii</li><li>SSDF1.1-PO.3.3</li><li>[NIST 800-53B SA-15(3)](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-15)</li></ul> |
| Peer reviews | Enforce peer reviews by software engineers colleagues to increase code quality and security | <span style="color: orange">Medium</span> | <ul><li>APRA234 ATM D-2-d-ii</li><li>SSDF1.1-PW.7.2</li><li>[NIST 800-53B SA-11(4)](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-11)</li></ul> |

<h2 id="cicd">CI/CD Pipelines & Build Environments</h2>

Modern web applications are built using modern continuous integration and deployment processes.  This means that you run tests specific to whatever environment you are pushing to whether that's DEV, STAGING or PROD.

| Name | Description | Difficulty | Maps to security frameworks |
| :---        | :---   | :---    | :---    |
| CI/CD pipeline | Implement a CI/CD pipeline | <span style="color: orange">Medium</span> | <ul><li>SSDF1.1-PO.5.1</li><li>APRA234 ATM D-2-d-iii</li></ul> |
| Centralized SCA | Scan source code for vulnerable libraries and open source software from within a CD stage | <span style="color: green">Easy</span> | <ul><li>APRA234 ATM D-2-d-ii</li><li>SSDF1.1-PW.4.4</li><li>NIST 800-53.2a</li></ul> |
| Centralized SAST | Scan source code for vulnerabilities in the source code itself from within a CD stage | <span style="color: green">Easy</span> | <ul><li>APRA234 ATM D-2-d-ii</li><li>SSDF1.1-PW.4.4</li><li>[NIST 800-53.2b SA-11.1](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-11)</li></ul> |
| Centralized Credential | Scan source code for secrets, credentials, API keys and similar from within a CD stage | <span style="color: green">Easy</span> | <ul><li>APRA234 ATM D-2-ii</li><li>SSDF1.1-PW.5.1</li><li>[NIST 800-53B SA-15(2)](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-15)</li></ul> |
| DAST | Scan running application for vulnerabilities | <span style="color: orange">Medium</span> | <ul><li>SSDF1.1-PW.6.2</li><li>NIST 800-53B SA-15(7)</li><li>[NIST 800-53B SA-11(8)](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-11)</ul> |

<h2 id="deployment">Deployment</h2>

Applications are deployed somewhere whether thats an AWS Lambda, S3 bucket or some old crusty server in the corner of the server room.  In any case, DevSecOps best practices mean that you need to include that deployment location in your processes.  

| Name | Description | Difficulty | Maps to security frameworks |
| :---        | :---   | :---    | :---    |
| Encrypt Traffic | Encrypt all traffic that's public facing | <span style="color: orange">Medium</span> | <ul><li>APRA234 ATM E-1-a</li><li>[NIST 800-53B SC-8](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-8)</li></ul> |
| Redirect to HTTPS | Configure web service to redirect all inbound requests to port 80 to the secure HTTPS endpoint | <span style="color: green">Easy</span> | <ul><li>[NIST 800-53B SC-8](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-8)</li></ul> |
| HSTS | Enable HSTS in your webserver, load balancer or CDN | <span style="color: green">Easy</span> | <ul><li>[NIST 800-53B SC-8](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-8)</li></ul> |
| Use Current Software | Use the most recent versions of application components, languages, frameworks and operating systems | <span style="color: red">Difficult</span> | <ul><li>NIST</li></ul> |
| Alternative Deployment | Have tested and working altnerative way to deploy changes to your applicaiton other than using your standard process with GitHub or Bitbucket in case they go down. This must include the ability to push to PROD from local in emergencies. | <span style="color: red">Difficult</span> | <ul><li>[NIST 800-53B SA-10(2)](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-10)</li></ul> |
| security.txt | Create a security.txt file in the root of your application so people know how to contact you about security issues | <span style="color: green">Easy</span> | <ul><li>NIST</li></ul> |
| X-Forwarded-By | Configure your webservers, load balancers & web proxies to include the X-Forwarded-By: header | <span style="color: green">Easy</span> | <ul><li>APRA234 ATM D-2-d-i</li><li>[NIST 800-92.2.1.3](https://csrc.nist.gov/publications/detail/sp/800-92/final)</li></ul> |
| Logging | Collect application logs in realtime and send to centralized storage or SIEM | <span style="color: orange">Medium</span> | <ul><li>APRA234 ATM D-2-d-i</li><li>SSDF1.1-PW.5.1</li><li>[NIST 800-92.2.3.2](https://csrc.nist.gov/publications/detail/sp/800-92/final)</li></ul> |
| WAF | Implement a web application firewall (WAF) to protect your application from known attacks | <span style="color: orange">Medium</span> | <ul><li>APRA234 ATM D-2-d-iii</li><li>NIST 800-53.2a</li></ul> |
| CDN | Use a content delivery network (CDN) whenever possible to add availability and security to you applications | <span style="color: orange">Medium</span> | <ul><li>APRA234 ATM D-2-d-iii</li><li>NIST 800-53.2a</li></ul> |
| Harden Operating System | Harden operating system using CIS benchmarks | <span style="color: red">Difficult</span> | <ul><li>SSDF1.1-PO.5.2</li><li>NIST</li></ul> |
| Encrypt Storage | Encrypt all filesystems, disks and cloud storage | <span style="color: orange">Medium</span> | <ul><li>NIST 800-50b SC-28</li></ul> |
| SBOM | Generate a **real-time** software bill-of-materials (SBOM) | <span style="color: orange">Medium</span> | <ul><li>SSDF1.1-PS.3.2</li><li>[NIST 800-53B SA-17](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-17)</li></ul> |
| Monitor Application | Monitor your application in real-time so you know when its state changes for the worse (or better). This includes uptime, performance and security monitoring | <span style="color: orange">Medium</span> | <ul><li>SSDF1.1-PO.3.2</li><li>[NIST 800-53B CA-7(5)](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=CA-7)</li></ul> |

<h2 id="org">Organization</h2>

People don't deploy applications, organizations do.  Some steps in the DevSecOps checklist need to be owned by the Organization itself.  

| Name | Description | Difficulty | Maps to security frameworks |
| :---        | :---   | :---    | :---    |
| Pentesting | Have your application pentested regularly | <span style="color: orange">Medium</span> | <ul><li>[NIST 800-53B SA-11(5)](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-11)</li></ul> |
| Threat-modeling | Build a collaborative way for developers and security staff to understand the threat landscape for an individual application | <span style="color: orange">Medium</span> | <ul><li>[NIST 800-53B SA-11(2)](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-11)</li></ul> |
| SIEM | Implement a SIEM and send all application, system and cloud logs to it | <span style="color: orange">Medium</span> | <ul><li>[NIST 800-53B SI-4(2)](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SI-4)</li></ul> |
| Attack Surface Management | Identify public facing resources via automation | <span style="color: orange">Medium</span> | <ul><li>[NIST 800-53B SA-17(5)](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-17)</li><li>[NIST 800-53B SA-11(6)](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-11)</ul> |
| Vulnerability Disclosure | Create a security.txt file as well as procedures to let people contact you when they find security issues in your app | <span style="color: green">Easy</span> | <ul><li>NIST </li></ul> |
| Bug Bounty | Setup a bug bounty program to incentivize security researchers to tell you about vulnerabilities they find | <span style="color: orange">Medium</span> | <ul><li>NIST</li></ul> |

![DevSecOps Continuous Improvement](devsecops-controls.jpg)

## Security Framework Reference Material  
I am personally most experienced with the CIS set of controls as they are really prescriptive and I've implemented them in the past.  But I'm also interested in aligning with NIST 800, and Soc2 as we will have to tackle these both at SecureStack soon.  I had a number of friends suggest that I tackle APRA CPS 234 as well so you will see me attempt to map it as well when it makes sense.  This is a work in progress and once I've gotten a couple frameworks mapped I'll probably stop and let others take over.

# NIST
NIST Secure Software Development Framework (SSDF) version 1.1: https://csrc.nist.gov/publications/detail/sp/800-218/draft  

NIST 800-53B (2021): https://csrc.nist.gov/publications/detail/sp/800-53b/final   
1. [SA-11: Developer Testing and Evaluation](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-11)   
2. [SA-15: Development Process, Standards, and Tools](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-15)  
3. [SA-16: Developer-Provided Training](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-16) 
4. [SA-17: Developer Security and Privacy Architecture and Design](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-17)  

NIST 800-92: https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-92.pdf   
NIST 800-95, Guide to Secure Web Services (2007): https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-95.pdf   

# APRA
APRA 234 ATM G:
Design reviews, penetration tests, code review and scanning, network traffic analysis, fault testing, fuzzing 
APRA 234: https://www.apra.gov.au/sites/default/files/cpg_234_information_security_june_2019_0.pdf   

## What's left to do?

- [x] vulnerability assessment
- [ ] map all the APRA and NIST examples

