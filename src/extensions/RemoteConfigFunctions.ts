// @react-native-firebase/remote-config is a dependency (see package.json). This user-owned custom
// code CALLS the SDK. The extension contract is input -> output (no navigation / app internals).
import remoteConfig from '@react-native-firebase/remote-config';

/**
 * RemoteConfigFunctions — Firebase Remote Config + feature flags.
 *
 * Matches the app-definition declaration for the `remoteConfig` extension:
 *   fetchAndActivate() -> { activated }
 *   getFeatureFlag({ key }) -> { enabled, state }   // `state` is the string routing field
 *   getConfigValue({ key }) -> { value }
 * Registered in ./index.ts.
 */
export class RemoteConfigFunctions {
  /**
   * Fetch the latest values and activate them. Run once (e.g. on screen load) before reading.
   * `minimumFetchIntervalMillis: 0` disables throttling for dev; raise it in production.
   */
  static fetchAndActivate = async (input: {
    minimumFetchIntervalMillis?: number;
  }): Promise<{ activated: boolean }> => {
    await remoteConfig().setConfigSettings({
      minimumFetchIntervalMillis: input?.minimumFetchIntervalMillis ?? 0,
    });
    const activated = await remoteConfig().fetchAndActivate();
    console.log('[RemoteConfigFunctions] fetchAndActivate ->', activated);
    return { activated };
  };

  /**
   * Read a boolean feature flag by key. `state` ('enabled' | 'disabled') is the string field a
   * branch can route on (a boolean can't match a string case label).
   */
  static getFeatureFlag = async (input: {
    key: string;
  }): Promise<{ enabled: boolean; state: string }> => {
    const enabled = remoteConfig().getValue(input.key).asBoolean();
    return { enabled, state: enabled ? 'enabled' : 'disabled' };
  };

  /** Read a string config value by key. */
  static getConfigValue = async (input: {
    key: string;
  }): Promise<{ value: string }> => {
    return { value: remoteConfig().getValue(input.key).asString() };
  };
}
