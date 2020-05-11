export const siriOpts = [{
  activityType: "org.reactjs.native.example.JarvisApp2.playRecent", // This activity type needs to be set in `NSUserActivityTypes` on the Info.plist
  title: "Say Hi",
  userInfo: {
    foo: 1,
    bar: "baz",
    baz: 34.5
  },
  keywords: ["kek", "foo", "bar"],
  persistentIdentifier: "yourPersistentIdentifier",
  isEligibleForSearch: true,
  isEligibleForPrediction: true,
  suggestedInvocationPhrase: "Say something",
}];
