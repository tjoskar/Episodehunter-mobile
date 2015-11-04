Episodehunter Mobile [![Build Status](https://travis-ci.org/tjoskar/Episodehunter-mobile.png?branch=master)](https://travis-ci.org/tjoskar/Episodehunter-mobile)
===================

## This project is not under development, see [episodehunter.tv](https://github.com/tjoskar/episodehunter.tv) instead.

A complementary APP for EpisodeHunter.tv

This app is written in javascript and HTML with [PhoneGap](http://phonegap.com/) and [Angular](http://angularjs.org/).

###Wanna help?
1. Fork this repo
2. Clone your fork of the repo: `git clone https://github.com/<username>/Episodehunter-mobile.git`
3. Add an "upstream" remote: `git remote add upstream https://github.com/tjoskar/Episodehunter-mobile.git`
4. Install packet dependency: `npm install`

####Build it for ios
1. Create a cordova project `cordova create . tv.mobie.episodehunter EH`
2. Replace the www folder with this repo.
3. Add a platform `cordova platform add ios`
4. Build that thing `cordova build ios`
5. Launch the iOS simulator `cordova emulate ios`
6. Contact me at info@episodehunter.tv
