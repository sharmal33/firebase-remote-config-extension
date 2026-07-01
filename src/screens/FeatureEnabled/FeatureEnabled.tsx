import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { text } from '@/assets';

import { ASContainer, ASText } from '@/components';

import { StyleSheet } from 'react-native';
import { sharedStyles } from '@/components/shared/sharedStyles';

import { useClearHeaderActions } from '@/utils/screen.effects';

import { STRINGS } from '@/strings';

type ScreenRouteParams = {};

type ScreenProps = {
  route: {
    params: ScreenRouteParams;
  };
};

const FeatureEnabled: React.FC<ScreenProps> = ({ route }) => {
  const navigation = useNavigation();

  useClearHeaderActions(navigation);

  return (
    <ASContainer
      disabledSafeArea={false}
      isScrollable={true}
      backgroundImageResizeMode={'contain'}
      name={'ASContainer-114839'}
      testID={'7e518898-6dd1-448c-922e-231bcb051cb2'}
      style={sharedStyles.container}
      testId={'ASContainer-114839'}
    >
      <ASText
        labelType={'string'}
        name={'ASText-967501'}
        dragStyle={sharedStyles.textDrag}
        style={[text.label.medium, sharedStyles.text]}
        accessibilityLabel={
          STRINGS.FeatureEnabled.ASText_967501.accessibilityLabel
        }
        testId={'ASText-967501'}
      >
        {STRINGS.FeatureEnabled.ASText_967501.label}
      </ASText>
    </ASContainer>
  );
};

const styles = StyleSheet.create({});

export default FeatureEnabled;
