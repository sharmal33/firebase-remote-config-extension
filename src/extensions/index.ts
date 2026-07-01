/**
 * Custom Function Registry (custom-extension source).
 *
 * In a generated Sympler app this file is generator-owned; here it's the minimal version that
 * registers just the remoteConfig extension. The function file alongside it
 * (RemoteConfigFunctions.ts) is user-owned and preserved across regeneration.
 */
import { RemoteConfigFunctions } from './RemoteConfigFunctions';

export const CustomFunctionRegistry: Record<
  string,
  (input: any) => Promise<any>
> = {
  'RemoteConfigFunctions.fetchAndActivate':
    RemoteConfigFunctions.fetchAndActivate,
  'RemoteConfigFunctions.getFeatureFlag': RemoteConfigFunctions.getFeatureFlag,
  'RemoteConfigFunctions.getConfigValue': RemoteConfigFunctions.getConfigValue,
};

/**
 * Execute a custom function by name. Contract: input -> output (the runtime resolves a function by
 * name and calls it with the mapped inputs; no navigation / app internals are passed).
 */
export async function executeCustomFunction(
  functionName: string,
  input: any,
): Promise<any> {
  const fn = CustomFunctionRegistry[functionName];
  if (!fn) {
    throw new Error(`Custom function not found: ${functionName}`);
  }
  return fn(input);
}
