#!/usr/bin/env bash

apt-get update

sudo apt-get install -y openjdk-7-jdk # Install JDK
sudo apt-get install -y unzip

# Closure Compiler
wget http://closure-compiler.googlecode.com/files/compiler-latest.zip 
unzip compiler-latest.zip
mv compiler.jar closure-compiler.jar
mkdir closure
mv closure-compiler.jar closure

# NodeJS
sudo apt-get install -y nodejs
sudo apt-get install -y npm

sudo npm install -g grunt     
sudo npm install -g grunt-closure-tools --save-dev
