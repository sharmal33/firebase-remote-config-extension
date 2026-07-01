# firebase-remote-config-extension

A **custom-extension source repo** for the App Studio custom-extension flow — it contains *only*
the user's custom code for the `remoteConfig` extension. The generator pulls this repo, overlays
the generated app, preserves the custom code, and merges `package.json`.

## Contents

```
package.json                          @react-native-firebase/{app,remote-config} (merged into the app)
src/extensions/
  RemoteConfigFunctions.ts            user code: input -> output, CALLS Firebase Remote Config
  index.ts                            registers the RemoteConfigFunctions.*
```

## Functions (input -> output)

| Function | Input | Output |
|---|---|---|
| `RemoteConfigFunctions.fetchAndActivate` | `{ }` | `{ activated: boolean }` |
| `RemoteConfigFunctions.getFeatureFlag` | `{ key }` | `{ enabled: boolean, state: string }` |
| `RemoteConfigFunctions.getConfigValue` | `{ key }` | `{ value: string }` |

`state` is `'enabled' | 'disabled'` — a **string** routing field so a branch can navigate on it
(a boolean can't match a string `case` label).

## Matching app definition

```ts
app.useExtension({
  name: "remoteConfig",
  functions: [
    { name: "fetchAndActivate", function: "RemoteConfigFunctions.fetchAndActivate",
      input: {}, output: { activated: "boolean" } },
    { name: "getFeatureFlag", function: "RemoteConfigFunctions.getFeatureFlag",
      input: { key: "string" }, output: { enabled: "boolean", state: "string" } },
    { name: "getConfigValue", function: "RemoteConfigFunctions.getConfigValue",
      input: { key: "string" }, output: { value: "string" } },
  ],
});

// Feature-flag gate: trigger getFeatureFlag, route on `state`
const flagRouting = await app.addBranch("flagRouting", false);
flagRouting.addExpression("enabled",  "${$ext.remoteConfig.getFeatureFlag.state = 'enabled'}",  EventTargetType.SCREEN, "FeatureEnabled");
flagRouting.addExpression("disabled", "${$ext.remoteConfig.getFeatureFlag.state = 'disabled'}", EventTargetType.SCREEN, "FeatureDisabled");
getFeatureFlag.setEvent(Event.ON_SUCCESS, EventTargetType.BRANCH, "flagRouting");
// read $ext.remoteConfig.getConfigValue.value on a screen
```

See the reference app definition in `app-studio-test-driver/src/userExtentions/RemoteConfigSDK`.

## Native setup (required to run)

`@react-native-firebase` needs the native Firebase config:
- iOS: `GoogleService-Info.plist`; Android: `google-services.json`.
- Follow https://rnfirebase.io/ (install `@react-native-firebase/app` + `@react-native-firebase/remote-config`, add the config files, pod install).
- Define your flags/values in the Firebase console (Remote Config).

## How it's used

Point the generator's custom-extension config at this repo:

```
yarn generate-app ReactNative 0.79.1 <appId> \
 '{"customExtension":{"repoUrl":"https://github.com/<owner>/firebase-remote-config-extension.git",
   "owner":"<owner>","repo":"firebase-remote-config-extension","branch":"main",
   "github":{"appId":"<ghAppId>","installationId":"<instId>","privateKeyPath":"<pem>"}}}' <buildName>
```

The generator generates the app, keeps `src/extensions/RemoteConfigFunctions.ts`, merges the
Firebase deps into `package.json`, and pushes a review branch.
