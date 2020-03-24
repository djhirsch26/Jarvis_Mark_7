## Resolution to Cutoff List issue
Had to do with not having flex set
- Typo of styles instead of style

- Had to do some stuff with Roboto font adding



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
