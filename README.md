# visand

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=popout-square&logo=javascript&logoColor=yellow)

[![Build Status](https://travis-ci.com/chukwuemekachm/visand.svg?token=9H4eahqQoiktHg2ifh1V&branch=develop)](https://travis-ci.com/chukwuemekachm/visand)

**visand** is an e-commerce API for an online **T-Shirt shop** which allows users to search, add items to their shopping cart, create order and pay for their orders successfully.

## Getting Started
To setup **visand**, the following should be installed on your machine.

- [Node.js](https://nodejs.org/en/download/current/) 6 and above
- [MySQL](https://dev.mysql.com/downloads/mysql/)
- [Git](https://git-scm.com/downloads)

You also need to setup
- [PayPal Sandbox Account](https://developer.paypal.com/)
- [SendGrid](https://sendgrid.com/docs/for-developers)

If you don't have these already, click on any of them to install it on your local machine.

### Installation

If you have all the prerequisites you can use the steps below to setup **visand** locally.

##### Clone visand
- Open your terminal and `cd` to the directory where you will like to download **visand**, then run
```sh
git clone https://github.com/chukwuemekachm/visand.git
```
- Change to the **visand** directory
```sh
cd visand
```

##### Setup database
This section assumes your local MySQL installation has a `root` user without password
- Run the command below to create a database
```sh
npm run create:db
```
- Run the command below to to populate the database
```sh
npm run migrate:db
```

##### Create and update the env variables
- Run the command below to create a `.env` file from the sample provided
```bash
touch .env
cp .env.sample .env
```
- Now update the environmental variables with the variables you want to use for your **visand** installation.

##### Install Dependencies
- Run the command below to install `node` dependencies
```bash
npm install
```

### Usage
- To start up your newly installed **visand** run
```sh
npm run start
```

## Built With
- [express](https://expressjs.com/)
- [babel](https://babeljs.io/)
- [mysql2](https://github.com/sidorares/node-mysql2)
- [PayPal](https://developer.paypal.com/)
- [SendGrid](https://sendgrid.com/docs/for-developers)

## Author

* **Chima Chukwuemeka** [@chukwuemekachm](https://github.com/chukwuemekachm)


## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/chukwuemekachm/visand/blob/develop/LICENSE) file for details
