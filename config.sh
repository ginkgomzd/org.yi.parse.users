#!/bin/bash
set -x #echo on

cd gruntProject
npm install -g
bower install

cd ../
cordova platform add ios