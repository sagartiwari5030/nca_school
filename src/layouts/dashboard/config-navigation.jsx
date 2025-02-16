import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);


const ICONS = {
  dashboard: icon('ic_dashboard'),
  patient: icon('ic_patient'),
  quickTest: icon('ic_quick_test'),
  menuItem: icon('ic_menu_item')
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: t('overview'),
        items: [
          {
            title: t('Dashboard'),
            path: paths.dashboard.root,
            icon: ICONS.dashboard,
          }
        ],
      },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      {
        subheader: t('MANAGEMENT'),
        items: [
          {
            title: t('Patient'),
            path: paths.dashboard.patient.list,
            icon: ICONS.patient
          },
          {
            title: t('Conduct Test'),
            path: paths.dashboard.conductTest.root,
            icon: ICONS.quickTest
          }
        ],
      },
    ],
    [t]
  );

  return data;
}
