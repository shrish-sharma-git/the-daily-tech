import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { singleCategory } from "../../actions/category";
import Layout from "../../components/Layout";
import BlogCard from '../../components/blog/BlogCard';

const Category = ({ category, blogs, query }) => {
    return (  
        <Box>
            <Layout>
                <Grid container>
                    <Grid item xs={12} textAlign="center">
                        <Typography variant="h4">{category.name}</Typography>
                        <Box>
                            {blogs.map((b, i) => 
                                <BlogCard key={i} blog={b}/>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Layout>
        </Box>
    );
}

Category.getInitialProps = ({query}) => {
    return singleCategory(query.slug).then(data => {
        if(data.error) {
            console.log(data.error);
        } else {
            return {category: data.category, blogs: data.blogs, query }
        }
    })
}
 
export default Category;