# Eureka! Clinical Admin Web Client
[Atlanta Clinical and Translational Science Institute (ACTSI)](http://www.actsi.org), [Emory University](http://www.emory.edu), Atlanta, GA

## What does it do?
This project contains the web client for Eureka! Clinical
Admin Services. It is an Angular 4/5 single-page site.

## Version 1.0 development series
Latest release:

## Version history
No final releases yet.

## Build requirements
* [Oracle Java JDK 8](http://www.oracle.com/technetwork/java/javase/overview/index.html)
* [Maven 3.2.5 or greater](https://maven.apache.org)

## Runtime requirements
* Any web browser that is supported by Angular 4/5 (see
  https://angular.io/guide/browser-support).
* `eurekaclinical-admin-webapp` version 1.0-Alpha-18 from
  https://oss.sonatype.org/content/groups/public/org/eurekaclinical/eurekaclinical-admin-webapp/1.0-Alpha-18/eurekaclinical-admin-webapp-1.0-Alpha-18.war,
  accessible over the internet from your web browser. See
  https://github.com/eurekaclinical/eureka for installation instructions. 
* `eurekaclinical-user-service` version 1.0 from
  https://oss.sonatype.org/content/groups/public/org/eurekaclinical/eurekaclinical-user-service/1.0/eurekaclinical-user-service-1.0.war,
  accessible over the internet from your web browser. See
  https://github.com/eurekaclinical/eureka for installation instructions.
* `eurekaclinical-user-agreement-service` version 1.0 from
  https://oss.sonatype.org/content/groups/public/org/eurekaclinical/eurekaclinical-user-agreement-service/1.0/eurekaclinical-user-agreement-service-1.0.war,
  accessible over the internet from your web browser. See
  https://github.com/eurekaclinical/eureka for installation
  instructions.

## Building it
We use maven, node, and gulp to build the project. You need to install
maven on your computer. Maven handles downloading and installing node
and gulp for you. Maven installs node in the .eurekaclinical/dev
directory in your home directory. It installs the node modules that
are needed to build this project in the node_modules directory at the
root of this project.

To build the project and bring up the webserver, execute `mvn clean install` 
at the command line. For simple file changes, not additions or deletions, 
you can usually use `mvn install`. To create a zipfile suitable for
distribution, execute `mvn install -Pprod`.

## Performing system tests
To run the web client on your machine for testing purposes, do the
following:

1. Clone the [eureka](https://github.com/eurekaclinical/eurekaclinical-admin-webapp)
project from GitHub, and execute `mvn clean install`
followed by `mvn tomcat7:run` in the root directory of the eureka
project on the command line to run the server-side Eureka! Clinical
Analytics code in embedded tomcat. The backend services must be
listening on port 8443, which is the default.
2. Back in the root directory of the web client project, execute
`mvn clean install`. It will open the web client in your
default web browser at https://localhost:8000 in an embedded web
server. You can leave the backend eureka code running while you
repeatedly build and run the web client.

## Installation
Copy the contents of the `dist` directory into your web server's
content directory in the folder of your choice.

### Configuration
This web client is configured using a JSON file, `config.json`, that
should be in the src/assets directory in your project. It supports 
specifying the following options:
* `casLoginUrl`: The URL for logging into your CAS server. The default
  value is `/cas-mock/login`.
* `casLogoutUrl`: The URL that the web client will go to when the user
  clicks the `Logout` click in the upper right corner of the
  page. Before going to this URL, the web client will destroy the
  user's session. The default value is
  `/cas-mock/logout`, which logs the user out
  of CAS.
* `adminWebappUrl`: The URL for eureka-webapp. The default value is
  `https://localhost:8000/eurekaclinical-admin-webapp`.
* `webClientUrl`: The URL for eurekaclinical-admin-webclient. 
   The default value is `https://localhost:8000/`.
* `adminWebappContextPath`: The folder which serves as the root for 
   the webclient. The default value is `/eurekaclinical-admin-webapp`.
* `proxyResourcePath`: The path to append to the webapp context prior 
   to making calls to the API. The default value is `/proxy-resource/`.

Specify the options as properties of a single JSON object. See the
default `config.json` file in the src/assets under the root directory
of this project for a sample. The assets folder is copied into the `dist` 
directory during the build process.

## Developer documentation


## Getting help
Feel free to contact us at help@eurekaclinical.org.
