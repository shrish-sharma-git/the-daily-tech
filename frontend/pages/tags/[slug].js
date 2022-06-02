import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { singleTag } from "../../actions/tag";
import Layout from "../../components/Layout";
import BlogCard from '../../components/blog/BlogCard';

const Tag = ({ tag, blogs, query }) => {
    return (  
        <Box>
            <Layout>
                <Grid container >
                    <Grid item xs={12} textAlign="center">
                        <Typography variant="h4">{tag.name}</Typography>
                        {blogs.map((b, i) => 
                            <BlogCard key={i} blog={b}/>
                        )}
                    </Grid>
                </Grid>
            </Layout>
        </Box>
    );
}

Tag.getInitialProps = ({query}) => {
    return singleTag(query.slug).then(data => {
        if(data.error) {
            console.log(data.error);
        } else {
            return {tag: data.tag, blogs: data.blogs, query }
        }
    })
}
 
export default Tag;