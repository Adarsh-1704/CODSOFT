import React, { useEffect, useState } from 'react';
import { Grid, Box, TextField, IconButton } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { API } from '../../../service/api';
import Post from './Post';

const Posts = () => {
    const [posts, getPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => { 
            let response = await API.getAllPosts({ category: category || '' });
            if (response.isSuccess) {
                getPosts(response.data);
            }
        }
        fetchData();
    }, [category]);

    // Function to handle search input changes
    const handleSearchInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        // Filter posts based on the search query
        const filtered = posts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()));
        setFilteredPosts(filtered);
    }

    // Function to clear search input
    const clearSearchInput = () => {
        setSearchQuery('');
        setFilteredPosts([]);
    }

    return (
        <>
            <TextField
                label="Search Blogs"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={handleSearchInputChange}
                style={{ margin: '20px 20px 20px' }}
                InputProps={{
                    endAdornment: (
                        <IconButton onClick={clearSearchInput} edge="end" color="inherit">
                            {/* You can use any clear icon here, for example, 'Close' */}
                            <span>X</span>
                        </IconButton>
                    ),
                }}
            />
            {
                (searchQuery ? filteredPosts : posts)?.length ? (
                    (searchQuery ? filteredPosts : posts).map(post => (
                        <Grid item lg={3} sm={4} xs={12} key={post._id}>
                            <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`details/${post._id}`}>
                                <Post post={post} />
                            </Link>
                        </Grid>
                    ))
                ) : (
                    <Box style={{ color: '878787', margin: '30px 80px', fontSize: 18 }}>
                        No data is available for the selected category or search query.
                    </Box>
                )
            }
        </>
    )
}

export default Posts;
