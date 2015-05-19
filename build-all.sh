#!/bin/bash
set -x #echo on

rsync -rl plugins gruntProject/vendor/cordova

# note:  run config before this script
cd gruntProject;
echo "*********Compiling*********"
grunt;
echo "Note:  Abort is expected"
cd ../;
echo "*********Copying Cordova vendor files to build**********"
cp -rf gruntProject/vendor/cordova gruntProject/build/vendor/;
echo "*********Updating Cordova www*************"
rm -rf www/*;
cp -rf gruntProject/build/* www/;
echo "*********Updating Cordova apps*************"
cordova prepare
echo "*********Updating benevolentweb server demo**********"
#rsync -rl gruntProject/build benev:/var/www/benevolentweb.com/www/ngbp/