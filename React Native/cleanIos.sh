#!/bin/bash
# Program:
#       Clean the folder caching and make the start the app debug
# To make the xcode derived data folder location please refer to this location
# http://stackoverflow.com/questions/13761934/xcode-derived-data-location/13762600
#
# History:
# 2015/07/16	VBird	First release

watchman watch-del-all
npm cache clean
rm -f /ios/build
