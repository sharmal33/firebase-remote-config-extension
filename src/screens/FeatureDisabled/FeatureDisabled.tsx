import React from 'react';
import { AppButton } from '@/components/shared';
import { useNavigation } from '@react-navigation/native';

import { text } from '@/assets';

import { ASContainer, ASText } from '@/components';

import { StyleSheet } from 'react-native';
import { sharedStyles } from '@/components/shared/sharedStyles';

import Route from '@/navigation/routes';
import { useClearHeaderActions } from '@/utils/screen.effects';

import { STRINGS } from '@/strings';

type ScreenRouteParams = {};

type ScreenProps = {
  route: {
    params: ScreenRouteParams;
  };
};

const FeatureDisabled: React.FC<ScreenProps> = ({ route }) => {
  const navigation = useNavigation();

  const onPressBackASButton = async () => {
    navigation.navigate(Route.HOME, {});
  };

  useClearHeaderActions(navigation);

  return (
    <ASContainer
      disabledSafeArea={false}
      isScrollable={true}
      backgroundImageResizeMode={'contain'}
      name={'ASContainer-604990'}
      testID={'7b26963c-4c20-40a6-bd83-5252190cf60c'}
      style={sharedStyles.container}
      testId={'ASContainer-604990'}
    >
      <ASText
        labelType={'string'}
        name={'ASText-925486'}
        dragStyle={sharedStyles.textDrag}
        style={[text.label.medium, sharedStyles.text]}
        accessibilityLabel={
          STRINGS.FeatureDisabled.ASText_925486.accessibilityLabel
        }
        testId={'ASText-925486'}
      >
        {STRINGS.FeatureDisabled.ASText_925486.label}
      </ASText>
      <AppButton
        widgetId={'ASButton-410106'}
        onPress={() => {
          onPressBackASButton({});
        }}
        style={sharedStyles.button}
        accessibilityLabel={
          STRINGS.FeatureDisabled.ASButton_410106.accessibilityLabel
        }
        label={STRINGS.FeatureDisabled.ASButton_410106.label}
      />
    </ASContainer>
  );
};

const styles = StyleSheet.create({});

export default FeatureDisabled;
