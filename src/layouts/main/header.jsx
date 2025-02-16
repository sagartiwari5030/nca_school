// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
// import Stack from '@mui/material/Stack';
// import AppBar from '@mui/material/AppBar';
// import Button from '@mui/material/Button';
// import Toolbar from '@mui/material/Toolbar';
// import { useTheme } from '@mui/material/styles';
// import Container from '@mui/material/Container';
// import Badge, { badgeClasses } from '@mui/material/Badge';

// import { useEffect } from 'react';

// import { paths } from 'src/routes/paths';

// import { useOffSetTop } from 'src/hooks/use-off-set-top';
// import { useResponsive } from 'src/hooks/use-responsive';

// import { bgBlur } from 'src/theme/css';

// import Logo from 'src/components/logo';
// import Label from 'src/components/label';

// import NavMobile from './nav/mobile';
// import NavDesktop from './nav/desktop';
// import { HEADER } from '../config-layout';
// import { navConfig } from './config-navigation';
// import LoginButton from '../common/login-button';
// import HeaderShadow from '../common/header-shadow';
// import SettingsButton from '../common/settings-button';

// // ----------------------------------------------------------------------

// export default function Header() {
//   const theme = useTheme();

//   const mdUp = useResponsive('up', 'md');

//   const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
//     script.setAttribute('data-payment_button_id', 'pl_PrW1n5NEhimtvh');
//     script.async = true;
//     document.getElementById('razorpay-button-container').appendChild(script);
//   }, []);

//   return (
//     <AppBar>
//       <Toolbar
//         disableGutters
//         sx={{
//           height: {
//             xs: HEADER.H_MOBILE,
//             md: HEADER.H_DESKTOP,
//           },
//           transition: theme.transitions.create(['height'], {
//             easing: theme.transitions.easing.easeInOut,
//             duration: theme.transitions.duration.shorter,
//           }),
//           ...(offsetTop && {
//             ...bgBlur({
//               color: theme.palette.background.default,
//             }),
//             height: {
//               md: HEADER.H_DESKTOP_OFFSET,
//             },
//           }),
//         }}
//       >
//         <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
//           <Badge
//             sx={{
//               [`& .${badgeClasses.badge}`]: {
//                 top: 8,
//                 right: -16,
//               },
//             }}
//           >
//             <Logo />
//           </Badge>

//           <Box sx={{ flexGrow: 1 }} />

//           {mdUp && <NavDesktop data={navConfig} />}

//           <Stack alignItems="center" direction={{ xs: 'row', md: 'row-reverse' }}>
//             <Box id="razorpay-button-container" component="form">
//               {/* <Button variant="contained" target="_blank" rel="noopener" href="#">
//                 Buy SemenAlytica Now
//               </Button> */}
//             </Box>

//             {/* {mdUp && <LoginButton />} */}

//             <SettingsButton
//               sx={{
//                 ml: { xs: 1, md: 0 },
//                 mr: { md: 2 },
//               }}
//             />

//             {!mdUp && <NavMobile data={navConfig} />}
//           </Stack>
//         </Container>
//       </Toolbar>

//       {offsetTop && <HeaderShadow />}
//     </AppBar>
//   );
// }






import React, { useState } from "react";

import { styled } from "@mui/system";
import { AppBar, Button } from "@mui/material";

const GreenButton = styled(Button)({
  backgroundColor: "#4CAF50",
  color: "white",
  "&:hover": {
    backgroundColor: "#388E3C",
  },
  padding: "10px 20px",
});

const Header = () => {
  const [opacity, setOpacity] = useState(1);



  return (
    <AppBar
      position="sticky"
      sx={{
       
        color: "#333",
        boxShadow: "none",
        transition: "background-color 0.3s ease-in-out",
      }}
    >
      {/* <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", color: "#4CAF50" }}>
          SemenAlytica®
        </Typography>
        <Button color="inherit">About Us</Button>
        <Button color="inherit">About The Product</Button>
        <Button color="inherit">Using SemenAlytica</Button>
        <Button color="inherit">Where To Buy</Button>
        <Button color="inherit">FAQ's</Button>
        <Button color="inherit">Contact Us</Button>
        <GreenButton>Buy SemenAlytica®</GreenButton>
      </Toolbar> */}
    </AppBar>
  );
};

export default Header;
