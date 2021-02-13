# Portfolio Dashboard - Front End
This repository is part of the Portfolio Dashboard application.

## 1 How to use the application
### 1.1 Production
To run the front end part of the application you need to use the docker-compose file which organize the different containers used.
You can find this file in another repository gathering the back end and the front end.


### 1.2 Development
#### 1.2.1 Prerequisites
##### 1.2.1.1 Node.js
This program is using Node.js 14, you can download and install it here: https://nodejs.org/en/download/.

##### 1.2.1.2 Yarn
To use this program you need to install yarn, all the instructions are here: https://classic.yarnpkg.com/en/docs/install/.

##### 1.2.1.3 Back end
This application is working along with the back end part of this application which is in another repository.
In order to use the front end you need the back end to be running, to do that follow the instruction in the back end README.

##### 1.2.1.4 Configuration
Before launching the front end you need to fill the configuration file according to the needed setup.

To do so you first need to copy the default configuration file:
```shell
cp env.sample .env.local
```

Then you can edit the `env.local` file with your configuration.


#### 1.2.2 Run the application
First you need to set up the project, to do that run the following command:

```shell
yarn install
```

Then run the following command to start the development server:
```shell
yarn serve
```
