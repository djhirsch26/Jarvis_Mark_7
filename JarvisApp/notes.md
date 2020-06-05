## Resolution to Cutoff List issue
Had to do with not having flex set
- Typo of styles instead of style

- Had to do some stuff with Roboto font adding

- Clear derived data:https://iosdevcenters.blogspot.com/2015/12/how-to-delete-derived-data-and-clean.html
- Can't find Derived Data file
  - Has to do with testing, change the file path for the display name

To start it:
1. `npx react-native start`
2. `npx react-native run-ios --simulator="iPhone 7"`


- Very often `pod update` then `pod install --repo-update` helps with some module linking issues
Clear Pods: `rm -rf ios/Pods && rm -rf ios/build && cd ios && pod install`
- Because of , had to run `npm install events@3.0.0`
- To add firebase auth, `yarn add @react-native-firebase/auth && cd ios/ && pod install`
- Had to readd fonts to vector icons, clear build cache and rebuild
- Some voodoo magic that resolved Events problem. Not sure?

Renamed Build
Rename the variable TEST_HOST to {app_name}.app/{app_name}

Vector Icons Directory: https://oblador.github.io/react-native-vector-icons/

How to release build to phone: https://medium.com/@tewolfe2/deploying-a-react-native-application-to-your-iphone-1d5f9757be48




### Audio Controller Frameworks
Controllers for Audio/Video are event based. Because controllers can be preempted by external systems (i.e. the spotify app, an incoming phone call), a strictly promise based architecture would fail. All Controllers may emit to `global.AudioEvent`. A base class `AudioInit` handles listening to controllers topics and updating according redux data flows.

Therfore, the following invariant shoulds be maintained
* The only class that may respond to `global.AudioEvents.on` is `AudioInit`
* The only class that may emit `global.AudioEvents.emit` are `*Controller`














---- PRE 6.1 Update v



For folly error:
- watchman watch-del-all && rm -rf ~/.rncache/* && rm -rf /tmp/metro-bundler-cache-* && rm -rf /tmp/haste-map-react-native-packager-* && rm -rf node_modules/ && npm install
Make sure to restart with reset cache:
npm start -- --reset-cache


To deal with module can not be null, you must manually link
https://reactnative.dev/docs/linking-libraries-ios.html#manual-linking
The steps are as follows:
1. Add the projects `.xcodeproj` to your `Libraries` in xcode
2. Under your Project's Build Phases, click the `+` in the bottom left and add the `.a` file with the module you want to add

To deal with missing font file:
1. Remove it from the pod file
2. react-native unlink react-native-vector-icons && npm remove react-native-vector-icons
3. react-native link react-native-vector-icons



To get command line back:
- npm install -g react-native-cli


Dealing with RNSSH issue
https://github.com/invertase/react-native-firebase/issues/1610
Removing the Firestore, DynamicLinks and CloudConfig modules from Podfile did allow
for build to complete. Putting dependencies back afterwards and running pod install again,
then running another build, restored the build issues.

You need a fixed version of NMSSH, 2.2.8


----------------

Must use js remote debug to see current file state
