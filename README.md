![dvna logo](https://github.com/quantumfoam/dvna/blob/master/public/images/dvna.png)

[![Join the chat at https://gitter.im/quantumfoam/dvna](https://badges.gitter.im/quantumfoam/dvna.svg)](https://gitter.im/quantumfoam/dvna?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

- - -

Damn Vulnerable Node Application (DVNA) is a Node.js web application that is damn vulnerable. Its intended purpose is to teach secure coding concepts to web developers who use Node, and to explore web application vulnerabilities in a controlled class environment or to serve as a cyber range for capture the flag events. It's loaded with **common web vulnerabilities** and **various levels of complexity.**
- - -

## Installation

### Ubuntu 15.10

Install git, a node version manager and the latest stable release

```
sudo apt-get install git
wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh
source ~/.bashrc
nvm install 5.3.0
nvm use 5.3.0
git clone https://github.com/quantumfoam/dvna.git
cd dvna/
npm set progress=false
npm install
node dvna.js
navigate to http://localhost:3000/
```

Go read the source files and find out how to exploit each flaw!
- - -

## License
[GNU GPL](http://www.gnu.org/licenses/)
