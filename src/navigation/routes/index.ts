import MainRoutes from './MainRoutes';

import Home from './Home';

import FeatureEnabled from './FeatureEnabled';

import FeatureDisabled from './FeatureDisabled';

export default {
  ...MainRoutes,

  ...Home,

  ...FeatureEnabled,

  ...FeatureDisabled,
};
