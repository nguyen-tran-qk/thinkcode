# Installation Overview

This document provides installation instructions for all the various tools and technologies used in the [development workflow](/workflow/gulp/index.html) for this template.

---

## Linux

### Required Software

* **Node.js** - required to run npm - [nodejs.org](https://nodejs.org)

	Ubuntu
	
		# Setup with Ubuntu:
		curl -sL https://deb.nodesource.com/setup | sudo bash -
		
		# Then install with Ubuntu:
		sudo apt-get install -y nodejs
		
	Debian
	
		# Setup with Debian
		apt-get install curl
		curl -sL https://deb.nodesource.com/setup | bash -
		
		# Then install with Debian
		apt-get install -y nodejs
		
	Fedora
	
		# Setup on RHEL, CentOS or Fedora
		curl -sL https://rpm.nodesource.com/setup | bash -
		
		# Then install:
		yum install -y nodejs
		

	Additionally, see [Installing Node.js via package managers](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)

* **Git client** - required by bower dependencies - via package managers:

	Debian/Ubuntu
	
		apt-get install git
		
	Fedora
	
		yum install git
		
	Additionally, see [Installing Git for Linux via package managers](https://www.git-scm.com/download/linux)

* **Subversion client** - required by some bower dependencies only available via svn:

	Fedora/CentOS
	
		yum install subversion
		
	Debian
	
		apt-get install subversion

---

## Mac OS X

### Required Software

* **Node.js** - required to run npm - [nodejs.org](https://nodejs.org)

	Simply download the **Machintosh Installer** directly from the nodejs.org website.
	
	Or, using Homebrew:
	
		brew install node

* **Git client** - required by bower dependencies:

	Install via Homebrew:
	
		brew install git

* **Subversion client** - required by some bower dependencies only available via svn:

	Install via Homebrew:
	
		brew install subversion

---

## Windows

### Required Software

* **Node.js** - required to run npm - [Download Node.js for Windows](https://nodejs.org)
* **Git client** - required by bower dependencies - [Download SourceTree for Windows](https://www.sourcetreeapp.com)
* **Subversion client** - required by some bower dependencies only available via svn - [Download SlickSvn for Windows](https://sliksvn.com/download/)
* **MinGW** and **MSYS** (replacement for cmd.exe, required by the gulp/grunt tasks provided with the package) - **only if you choose to NOT install SourceTree above, SourceTree already includes a terminal** - [Install MinGW & MSYS](http://www.mingw.org/wiki/Getting_Started)

---

## Installation

After making sure you have installed all the software dependencies for your operating system, open a terminal (for Windows, MSYS terminal or if you've installed SourceTree as we recommended, open up a terminal from within SourceTree) and change the current working directory to the downloaded item:

	cd /path/to/package/root
	
Install all the dependencies listed in package.json:

	npm install
	
**Only if you are using Gulp (recommended)**: Install Gulp:

	npm install -g gulp
	
**Only if you are using Gulp (recommended)**: Install Gulp Workflow dependencies. This will install all the packages listed in `lib/gulp/package.json` into the current working directory:
	
	node_modules/.bin/npm-install-from --path lib/gulp
	
**Only if you are using Grunt**: Install Grunt:

	npm install -g grunt-cli
	
**Only if you are using Grunt**: Install Grunt Workflow dependencies. This will install all the packages listed in `lib/grunt/package.json` into the current working directory:

	node_modules/.bin/npm-install-from --path lib/grunt
	
Install Bower:

	npm install -g bower
	
Install Bower dependencies:

	bower install
	
---

## See also

- [The build process](/workflow/gulp/index.html)
- [Structure](/code/structure/index.html)
- [Manage assets](/code/bower/index.html)
- [Include paths](/code/include-paths/index.html)
- [Loading assets](/reference/layout/index.html#loading-assets)