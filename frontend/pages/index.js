import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import Layout from "../components/Layout";

const Index = () => {
  return (
    <Layout>
      <Grid container>
        <Grid item xs={12}>
          <Typography textAlign="center" mt="10px" variant="h3">
            Welcome to The Daily Tech
          </Typography>
          <Divider sx={{ m: "10px 10px 10px 10px" }} />
        </Grid>

        <Grid item xs={12}>
          <Typography textAlign="center" mt="10px" variant="h5">
            One stop for all the tech-related information...
            <Divider sx={{ m: "10px 10px 10px 10px" }} />
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography textAlign="center" mt="10px" variant="h4">
            What's Trending ?
          </Typography>
        </Grid>

        <Grid item xs={12} mt="30px" display="flex" justifyContent='center' gap="30px">
          <Card sx={{ width: "350px", height: "330px" }}>
            <CardActionArea href="/categories/reactjs"> 
              <CardMedia
                component="img"
                alt="category image"
                src="https://i.ibb.co/KDX98zr/pexels-realtoughcandycom-11035471.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    ReactJS
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card sx={{ width: "350px", height: "330px" }}>
            <CardActionArea href="/categories/web-development">
              <CardMedia
                component="img"
                alt="category image"
                src="https://i.ibb.co/0KBsX1v/pexels-pixabay-270632.jpg"
              />
               <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Web Development
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card sx={{ width: "350px", height: "330px" }}>
            <CardActionArea href="/categories/ai-ml">
              <CardMedia
                component="img"
                alt="category image"
                src="https://i.ibb.co/RpgzRCQ/pexels-alex-knight-2599244.jpg"
              />
               <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Artificial Intelligence and Machine Learning
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Index;
