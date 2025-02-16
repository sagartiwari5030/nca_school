import { React, useState } from "react";
import Carousel from "react-material-ui-carousel";

import { styled } from "@mui/system";
import { ArrowBackIos,ArrowDropDown, ArrowForwardIos,Menu as MenuIcon } from "@mui/icons-material";
import { Box, Grid, Card, Menu, List, AppBar, Button, Drawer,Toolbar,MenuItem, ListItem, Container, Typography,IconButton,CardContent, ToggleButton, ListItemText,ToggleButtonGroup } from "@mui/material";

// Import images

import banner2 from "./assets/2.png"
import banner1 from  "./assets/1.png"
import img3 from "./assets/child1.png"
import img1 from "./assets/teacher.png"
import img2 from "./assets/teacher2.png"
import banner3 from "./assets/School.png"
import img4 from "./assets/allbanner.png"
import img8 from "./assets/olybanner.png"
import img5 from "./assets/neetbanner.png"
import img6 from "./assets/10thbanner.png"
import img7 from "./assets/12thbanner.png"
import principle from "./assets/principle.jpg"

const GreenButton = styled(Button)({
    backgroundColor: "#4CAF50",
    color: "white",
    "&:hover": {
        backgroundColor: "#388E3C",
    },
    padding: "10px 20px",
});

// ✅ Sticky Header with Transparency
const Header = () => {
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [submenuAnchor, setSubmenuAnchor] = useState(null);
    const [jeeAnchor, setJeeAnchor] = useState(null);
    const [neetAnchor, setNeetAnchor] = useState(null);
    const [boardAnchor, setBoardAnchor] = useState(null);
    const [revisionAnchor, setRevisionAnchor] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
  
    const handleMenuOpen = (event, setter) => {
      setter(event.currentTarget);
    };
    const handleMenuClose = (setter) => {
      setter(null);
    };
  
    const toggleDrawer = (open) => (event) => {
      if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
        return;
      }
      setMobileOpen(open);
    };
  
    const menuItems = [
      { label: "Courses", submenu: menuAnchor, setSubmenu: setMenuAnchor },
      { label: "Free Study Material", submenu: submenuAnchor, setSubmenu: setSubmenuAnchor },
      { label: "JEE", submenu: jeeAnchor, setSubmenu: setJeeAnchor },
      { label: "NEET", submenu: neetAnchor, setSubmenu: setNeetAnchor },
      { label: "Board ", submenu: boardAnchor, setSubmenu: setBoardAnchor },
      { label: "Revision Notes", submenu: revisionAnchor, setSubmenu: setRevisionAnchor },
      { label: "Offline Centres", submenu: null, setSubmenu: null },
    ];
  
    return (
      <AppBar position="sticky" sx={{ backgroundColor: "rgba(255, 255, 255, 0.9)", backdropFilter: "blur(10px)", color: "#333", boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)", py: 1 }}>
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h7" sx={{ flexGrow: 1, fontWeight: "bold", color: "#FF5722" }}>
              NCA SCHOOL
            </Typography>
            
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  color="inherit"
                  onClick={(e) => item.setSubmenu && handleMenuOpen(e, item.setSubmenu)}
                >
                  {item.label} {item.setSubmenu && <ArrowDropDown />}
                </Button>
              ))}
              <GreenButton>Sign In</GreenButton>
            </Box>
            
            <IconButton sx={{ display: { xs: "block", md: "none" } }} onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
        
        {menuItems.map((item, index) => (
          item.setSubmenu && (
            <Menu
              key={index}
              anchorEl={item.submenu}
              open={Boolean(item.submenu)}
              onClose={() => handleMenuClose(item.setSubmenu)}
            >
              <MenuItem onClick={() => handleMenuClose(item.setSubmenu)}>Option 1</MenuItem>
              <MenuItem onClick={() => handleMenuClose(item.setSubmenu)}>Option 2</MenuItem>
            </Menu>
          )
        ))}
        
        <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer(false)}>
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index} onClick={(e) => item.setSubmenu && handleMenuOpen(e, item.setSubmenu)}>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
            <ListItem>
              <GreenButton fullWidth>Sign In</GreenButton>
            </ListItem>
          </List>
        </Drawer>
      </AppBar>
    );
  };



// ✅ Hero Section (1224×414 with Carousel)
const HeroSection = () => {
  const imgb=[banner1,banner2,banner3]
  return (
    <Container sx={{ my: 4, textAlign: "center", maxWidth: "lg", position: "relative" }}>
      <Carousel 
        navButtonsAlwaysVisible 
        indicators 
        autoPlay 
        animation="slide" 
        swipe
      >
        {imgb.map((image, index) => (
          <Box 
            key={index} 
            sx={{ 
              position: "relative", 
              width: "100%", 
              height: { xs: "240px", sm: "320px", md: "414px" }, // Adjust height for different screens
              overflow: "hidden"
            }}
          >
            <img
              src={image}
              alt={`banner-${index}`}
              style={{ 
                width: "100%", 
                height: "100%", 
                objectFit: "contain",  // Ensures full image visibility without cropping
                borderRadius: "10px" 
              }}
            />
          </Box>
        ))}
      </Carousel>
    </Container>
);
};

// ✅ Styled Image with Circular 3D Effect
const StyledImage = styled("img")({
  width: "200px",
  height: "200px",
  borderRadius: "50%",
  objectFit: "cover",
  boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.2)", // 3D shadow effect
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)", // Slight hover zoom effect
  },
});

// ✅ Testimonial Section
const TestimonialSection = () => (
    <Container sx={{ my: 8, textAlign: "left", ml: { xs: 2, md: 10 } }}> 
      <Grid container spacing={4} alignItems="center">
        
        {/* Circular Image (Right Aligned) */}
        <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
          <StyledImage src={principle} alt="Student Success" />
        </Grid>

        {/* Motivational Content (Shifted Right) */}
        <Grid item xs={12} md={6} sx={{ pl: { xs: 2, md: 8 } }}> 
          <Typography variant="h4" fontWeight="bold" sx={{ color: "#FF5722" }}>
            “Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.”
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, fontStyle: "italic", color: "#555" }}>
            - SM Sir
          </Typography>
        </Grid>

      </Grid>
    </Container>
  );





// ✅ Popular Courses Section (Overlapping Banner)
const PopularCourses = () => {
    const courses = [
        { title: "2-Year JEE", color: "#EDE7F6", icon: "⏳" },
        { title: "2-Year NEET", color: "#FFF9C4", icon: "🎥" },
        { title: "Offline Centres", color: "#B2DFDB", icon: "🎓" },
        { title: "Olympiad", color: "#F8BBD0", icon: "✏️" },
        { title: "Early Learning (LKG - Class 5)", color: "#FFE0B2", icon: "❓" },
        { title: "One to One Classes", color: "#BBDEFB", icon: "👥" },
    ];

    return (
        <Container sx={{ position: "relative", mt: "-80px", zIndex: 2, px: { xs: 2, sm: 4, md: 6 } }}>
            <Box
                sx={{
                    backgroundColor: "#0047AB",
                    borderRadius: "16px",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                    p: 4,
                    textAlign: "left",
                }}
            >
                {/* Popular Courses Heading */}
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 3, backgroundColor: "#FFD700", px: 2, py: 1, borderRadius: "10px", display: "inline-block" }}>
                    Popular Courses
                </Typography>

                {/* Courses Grid */}
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    {courses.map((course, index) => (
                        <Grid item xs={6} sm={4} md={2} key={index}>
                            <Card
                                sx={{
                                    backgroundColor: course.color,
                                    borderRadius: "12px",
                                    transition: "0.3s",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "110px", // Maintain square shape
                                    width: "110px",  // Maintain square shape
                                    textAlign: "center",
                                    "&:hover": { transform: "scale(1.05)" },
                                }}
                            >
                                <CardContent sx={{ p: 1 }}>
                                    <Typography variant="body2" fontWeight="bold">
                                        {course.icon}
                                    </Typography>
                                    <Typography variant="caption" fontWeight="bold" sx={{ fontSize: "12px" }}>
                                        {course.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};
// ✅ ExploreCourses  Section 
const ExploreCourses = () => {
    const courses = [
        {
            title: "Competitive Exams",
            classes: "Class 3 - 13",
            subjects: ["JEE/NEET", "Olympiad", "JEE Books", "NEET Books"],
            color: "#E3F2FD",
            image: img1, // Replace with correct path
        },
        {
            title: "School Tuition",
            classes: "Class 3 - 12",
            subjects: ["CBSE Board", "ICSE Board", "UP Board"],
            color: "#F3E5F5",
            image: img2, // Replace with correct path
        },
        {
            title: "Courses for Kids",
            classes: "Class 1 - 5",
            subjects: ["Spoken English Program", "Learn English", "Learn Math", "Learn Code"],
            color: "#FFF3E0",
            image: img3, // Replace with correct path
        },
    ];

    return (
        <Container sx={{ my: 6 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 4, textAlign: "center" }}>
                Explore courses <Typography component="span" sx={{ fontSize: "16px", color: "gray" }}>(Class 3 - 13)</Typography>
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                {courses.map((course, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ backgroundColor: course.color, borderRadius: "12px", display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", textAlign: "center", height: "400px", justifyContent: "space-between" }}>
                            <img src={course.image} alt={course.title} style={{ width: "150px", height: "150px", borderRadius: "10px" }} />
                            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                <Typography variant="body2" sx={{ color: "#5C6BC0", fontWeight: "bold" }}>{course.classes}</Typography>
                                <Typography variant="h6" fontWeight="bold" sx={{ mt: 1, mb: 1 }}>{course.title}</Typography>
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "5px", justifyContent: "center" }}>
                                    {course.subjects.map((subject, idx) => (
                                        <Button key={idx} variant="outlined" sx={{ borderRadius: "15px", fontSize: "12px", padding: "5px 10px", color: "#333", borderColor: "#E0E0E0", minWidth: "auto" }}>
                                            {subject}
                                        </Button>
                                    ))}
                                </Box>
                            </Box>
                            <Button variant="contained" sx={{ mt: 2, backgroundColor: "#FF5722", color: "white", alignSelf: "center" }}>Explore Courses</Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
};


// ✅ StudyMaterials  Section 
const classOptions = ["Class 12", "Class 11", "Class 10", "Class 9", "Class 8", "Class 7", "Class 6", "Class 1 - 5", "LKG - UKG"];
const StudyMaterials = () => {
    const [selectedClass, setSelectedClass] = useState("Class 12");

    const materials = {
        "Class 12": [
            { title: "NCERT solutions", color: "#FFE0B2", image: "ncert.png" },
            { title: "Previous year question papers", color: "#E1BEE7", image: "previous.png" },
            { title: "Sample question papers", color: "#BBDEFB", image: "sample.png" },
            { title: "NCERT Books", color: "#C8E6C9", image: "ncert_books.png" },
            { title: "Important question papers", color: "#D1C4E9", image: "important.png" },
        ],
        "Class 11": [
            { title: "NCERT solutions", color: "#FFE0B2", image: "ncert.png" },
            { title: "Sample question papers", color: "#BBDEFB", image: "sample.png" },
        ],
    };

    return (
        <Container sx={{ my: 6 }}>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 2, textAlign: "center" }}>
                Explore all our <span style={{ color: "#FF5722", textDecoration: "underline" }}>offerings</span>
            </Typography>
            <ToggleButtonGroup
                value={selectedClass}
                exclusive
                onChange={(event, newClass) => newClass && setSelectedClass(newClass)}
                sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", mb: 4 }}
            >
                {classOptions.map((cls) => (
                    <ToggleButton key={cls} value={cls} sx={{ mx: 1, borderRadius: "20px", fontSize: "14px" }}>
                        {cls}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>

            <Typography variant="h5" fontWeight="bold" sx={{ mb: 4, textAlign: "center" }}>
                Study Materials
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                {materials[selectedClass]?.map((material, index) => (
                    <Grid item xs={12} sm={6} md={2.4} key={index}>
                        <Card sx={{ backgroundColor: material.color, borderRadius: "12px", padding: "20px", textAlign: "center", height: "220px" }}>
                            <Typography variant="body1" fontWeight="bold" sx={{ mb: 2 }}>{material.title}</Typography>
                            <img src={material.image} alt={material.title} style={{ width: "80px", height: "80px", borderRadius: "10px" }} />
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};


// ✅ StudyMaterials  Section 
const ResultsSection = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [bannerIndex, setBannerIndex] = useState(0);
  
    const banners = {
        "All": [img4,img4],
        "IIT JEE": [img4,img4],
        "NEET": [img5,img4],
        "10th Board": [img6,img6],
        "12th Board": [img7,img7],
        "NTSE": [img8,img8],
        "Olympiad": [img8,img8],
      };
  
      const handleNextBanner = () => {
        setBannerIndex((prev) => (prev + 1) % (banners[selectedCategory]?.length ?? 1));
      };
      
      const handlePrevBanner = () => {
        setBannerIndex((prev) => (prev - 1 + (banners[selectedCategory]?.length ?? 1)) % (banners[selectedCategory]?.length ?? 1));
      };
      
  
    return (
      <Container sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold">
          Inspired students. Inspired <span style={{ color: "#FF5722", textDecoration: "underline" }}>results</span>
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, mb: 3 }}>
          Our results reflect the passion, hard work, and efforts of our students and teachers.
        </Typography>
        <Button variant="contained" sx={{ backgroundColor: "#FF5722", color: "white", mx: 1 }}>Explore courses</Button>
        <Button variant="outlined" sx={{ borderColor: "#FF5722", color: "#FF5722", mx: 1 }}>View our results</Button>
        <Box sx={{ mt: 4 }}>
          <ToggleButtonGroup
            value={selectedCategory}
            exclusive
            onChange={(event, newCategory) => {
              if (newCategory) {
                setSelectedCategory(newCategory);
                setBannerIndex(0);
              }
            }}
            sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
          >
            {Object.keys(banners).map((category) => (
              <ToggleButton key={category} value={category} sx={{ mx: 1, borderRadius: "20px", fontSize: "14px" }}>
                {category}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
        <Box sx={{ mt: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IconButton onClick={handlePrevBanner} disabled={banners[selectedCategory]?.length <= 1}>
            <ArrowBackIos />
          </IconButton>
          <img src={banners[selectedCategory][bannerIndex]} alt={selectedCategory} style={{ width: "80%", borderRadius: "12px" }} />
          <IconButton onClick={handleNextBanner} disabled={banners[selectedCategory]?.length <= 1}>
            <ArrowForwardIos />
          </IconButton>
        </Box>
      </Container>
    );
  };

  const Footer = () => {
    const footerSections = [
      {
        title: "Study Material",
        links: ["NCERT", "NCERT Solutions", "NCERT Books", "Reference Book Solutions"],
      },
      {
        title: "Competitive Exams",
        links: ["JEE Main", "JEE Advanced", "NEET", "Olympiad Preparation", "NDA", "KVPY", "NTSE"],
      },
      {
        title: "CBSE & ICSE",
        links: ["CBSE Syllabus", "CBSE Sample Paper", "CBSE Important Questions", "ICSE Solutions"],
      },
      {
        title: "State Boards",
        links: ["AP Board", "Bihar Board", "Gujarat Board", "Karnataka Board", "Maharashtra Board", "UP Board"],
      },
      {
        title: "Free Study Material",
        links: ["Previous Year Question Papers", "Sample Papers", "JEE Main Study Materials", "NEET Study Materials"],
      },
      {
        title: "Important Subjects",
        links: ["Physics", "Biology", "Chemistry", "Maths", "English", "Commerce", "Geography"],
      },
      {
        title: "Revision Notes",
        links: ["CBSE Class 12 Notes", "CBSE Class 11 Notes", "CBSE Class 10 Notes"],
      },
    ];
  
    return (
      <Box sx={{ backgroundColor: "gray", color: "white", py: 4, mt: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {footerSections.map((section, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>{section.title}</Typography>
                <List>
                  {section.links.map((link, i) => (
                    <ListItem key={i} sx={{ py: 0.5 }}>
                      <ListItemText primary={link} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  };
  



// ✅ Main Page Component
const CoachingPage = () => (
    <>
        <Header />
        <HeroSection />
        <PopularCourses />
        <TestimonialSection/>
        <ExploreCourses />
        <StudyMaterials />
        <ResultsSection/>
        <Footer/>
    </>
);

export default CoachingPage;
