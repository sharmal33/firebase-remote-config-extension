import React, { useState, useEffect } from 'react';
import { AppButton } from '@/components/shared';

import { useNavigation } from '@react-navigation/native';

import { text } from '@/assets';

import { ASContainer, ASText } from '@/components';

import { StyleSheet } from 'react-native';
import { sharedStyles } from '@/components/shared/sharedStyles';

import Route from '@/navigation/routes';
import { useClearHeaderActions } from '@/utils/screen.effects';
import { executeCustomFunction } from '@/extensions';

import { STRINGS } from '@/strings';

type ScreenRouteParams = {};

type ScreenProps = {
  route: {
    params: ScreenRouteParams;
  };
};

const Home: React.FC<ScreenProps> = ({ route }) => {
  const navigation = useNavigation();

  const [extRemoteConfigFetchAndActivate, setExtRemoteConfigFetchAndActivate] =
    useState<any>(undefined);
  const [extRemoteConfigGetFeatureFlag, setExtRemoteConfigGetFeatureFlag] =
    useState<any>(undefined);
  useEffect(() => {
    (async () => {
      const __out = await executeCustomFunction(
        'RemoteConfigFunctions.fetchAndActivate',
        {},
      );
      setExtRemoteConfigFetchAndActivate(__out);
    })();
  }, []);
  const onPressCheckfeatureASButton = async () => {
    const __out = await executeCustomFunction(
      'RemoteConfigFunctions.getFeatureFlag',
      { key: 'new_checkout' },
    );
    setExtRemoteConfigGetFeatureFlag(__out);
    switch (__out?.state) {
      case 'enabled': {
        navigation.navigate(Route.FEATURE_ENABLED, {
          ext_remoteConfig_getFeatureFlag: __out,
        });
        break;
      }
      case 'disabled': {
        navigation.navigate(Route.FEATURE_DISABLED, {
          ext_remoteConfig_getFeatureFlag: __out,
        });
        break;
      }
    }
  };

  useClearHeaderActions(navigation);

  return (
    <ASContainer
      disabledSafeArea={false}
      isScrollable={true}
      backgroundImageResizeMode={'contain'}
      name={'ASContainer-561281'}
      testID={'72b5166c-53d4-424d-882a-dc530ecadc1e'}
      style={sharedStyles.container}
      testId={'ASContainer-561281'}
    >
      <ASText
        labelType={'string'}
        name={'ASText-680844'}
        dragStyle={sharedStyles.textDrag}
        style={[text.label.medium, sharedStyles.text]}
        accessibilityLabel={STRINGS.Home.ASText_680844.accessibilityLabel}
        testId={'ASText-680844'}
      >
        {STRINGS.Home.ASText_680844.label}
      </ASText>
      <AppButton
        widgetId={'ASButton-551039'}
        onPress={() => {
          onPressCheckfeatureASButton({});
        }}
        style={sharedStyles.button}
        accessibilityLabel={STRINGS.Home.ASButton_551039.accessibilityLabel}
        label={STRINGS.Home.ASButton_551039.label}
      />
    </ASContainer>
  );
};

const styles = StyleSheet.create({});

export default Home;
