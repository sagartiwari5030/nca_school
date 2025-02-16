import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import { Box, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useAuthContext } from 'src/auth/hooks';
import { SeoIllustration } from 'src/assets/illustrations';

import { useSettingsContext } from 'src/components/settings';

import AppWelcome from '../app-welcome';
import AppMainMenu from '../app-main-menu';
import AppWidgetSummary from '../app-widget-summary';
import AppAreaInstalled from '../app-area-installed';
import AppCurrentDownload from '../app-current-download';

// ----------------------------------------------------------------------

export default function OverviewAppView() {
  const { user } = useAuthContext();
  const theme = useTheme();
  const settings = useSettingsContext();
  const navigate = useNavigate();
  const router = useRouter();


    const handleButtonClick = useCallback(
      (routeTo) => {
        router.push(routeTo);
      },
      [router]
    );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          {/* Check if the profile data is loaded and use the name field */}
          <AppWelcome
            title={`Welcome back 👋 \n ${user?.UserProfilesDetail?.firstName || 'User'}`} // Display the name dynamically from API data
            img={<SeoIllustration />}
            IconImageGirl={false}
          />
        </Grid>
      </Grid>
      <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
        <Box xs={12} md={4} sx={{ maxWidth: '300px', minWidth: { lg: '300px' } }}>
          <AppWidgetSummary
            title="Total Patient"
            percent={2.6}
            total="200"
            chart={{
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
            // loading={usersLoading}
          />
        </Box>
        <Box xs={12} md={4} sx={{ maxWidth: '300px', minWidth: { lg: '300px' } }}>
          <AppWidgetSummary
            title="Total Session Taken"
            percent={2.6}
            total="189"
            chart={{
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
            // loading={usersLoading}
          />
        </Box>
        <Box xs={12} md={4} sx={{ maxWidth: '300px', minWidth: { lg: '300px' } }}>
          <AppWidgetSummary
            title="Total Test Conducted"
            percent={2.6}
            total="120"
            chart={{
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
            // loading={usersLoading}
          />
        </Box>
      </Stack>

      <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
        <Box sx={{ width: '300px' }}>
          <AppMainMenu
            color="info"
            icon={<img alt="icon" src="/assets/icons/app/ic_quick_test.png" />}
            action={
              <Button variant="contained" color="primary" onClick={()=>handleButtonClick('/dashboard/conductTest')}>
                Quick Test
              </Button>
            }
          />
        </Box>
        <Box sx={{ width: '300px' }}>
          <AppMainMenu
            color="info"
            icon={<img alt="icon" src="/assets/icons/app/ic_profile.png" />}
            action={
              <Button variant="contained" color="primary" onClick={()=>handleButtonClick(paths.dashboard.patient.list)}>
                View Patients
              </Button>
            }
          />
        </Box>
        <Box sx={{ width: '300px' }}>
          <AppMainMenu
            color="info"
            icon={<img alt="icon" src="/assets/icons/app/ic_settings.png" />}
            action={
              <Button variant="contained" color="primary" onClick={()=>handleButtonClick(paths.dashboard.device.new)}>
                Device Settings
              </Button>
            }
          />
        </Box>
      </Stack>
      <Stack direction="row" justifyContent="space-between" sx={{width:"100%",my:2}}>
        <Box sx={{ width: '30%' }}>
          <AppCurrentDownload
            title="Your Current Stats"
            chart={{
              series: [
                { label: 'Total Patient', value: 200 },
                { label: 'Total Session Taken', value: 189 },
                { label: 'Total Test Conducted', value: 120 },
              ],
            }}
          />
        </Box>
        <Box sx={{ width: '60%' }}>
        <AppAreaInstalled
        title="Monthly Report"
        // subheader="Monthly Report"
        chart={{
          categories: [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23',
            '24',
            '25',
            '26',
            '27',
            '28',
            '29',
            '30',
          ],
          series: [
            {
              year: 'Oct 2024',
              data: [
                {
                  name: 'Patient',
                  data: [
                    10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49, 40, 55, 68,
                    72, 88, 96, 102, 18, 140, 150, 56, 17, 89, 190, 65, 89,
                    220, 230,
                  ],
                },
                {
                  name: 'Session Taken',
                  data: [
                    10, 34, 13, 56, 77, 88, 99, 77, 45, 13, 56, 77, 80, 90, 100,
                    110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220,
                    230, 240, 250,
                  ],
                },
                {
                  name: 'Test Conducted',
                  data: [
                    10, 50, 38, 48, 56, 76, 42, 67, 96, 34, 76, 86, 92, 104,
                    110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220,
                    230, 240, 250, 260,
                  ],
                },
              ],
            },
            {
              year: 'Nov 2024',
              data: [
                {
                  name: 'Patient',
                  data: [
                    51, 35, 41, 10, 91, 69, 62, 148, 91, 69, 62, 49, 70, 85,
                    72, 88, 96, 102, 18, 140, 150, 56, 17, 89, 190, 65, 89,
                    220, 230,
                  ],
                },
                {
                  name: 'Session Taken',
                  data: [
                    56, 13, 34, 10, 77, 99, 88, 45, 77, 99, 88, 77, 90, 100,
                    10, 50, 38, 48, 56, 76, 42, 67, 96, 34, 76, 86, 92, 104,
                    230, 240, 250, 260,
                  ],
                },
                {
                  name: 'Test Conducted',
                  data: [
                    56, 13, 34, 10, 77, 99, 88, 45, 77, 99, 88, 77, 92, 104,
                    51, 35, 41, 10, 91, 69, 62, 148, 91, 69, 62, 49, 70, 85,
                    230, 240, 250, 260,
                  ],
                },
              ],
            },
          ],
        }}
      />
        </Box>
      </Stack>
    </Container>
  );
}
