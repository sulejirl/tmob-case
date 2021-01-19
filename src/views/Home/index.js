import React from 'react';
import GoogleMap from '../../components/GoogleMap';
import VideoList from 'src/components/VideoList';
import {Container, Grid} from '@material-ui/core';

const Home = () => {
    return <Container maxWidth={'xl'} style={{padding:'30px'}}>
        <Grid container justify={"space-between"}>
            <Grid item xs={4}>
                <GoogleMap/>
            </Grid>
            <Grid item xs={7}>
                <VideoList/>
            </Grid>
        </Grid>

    </Container>
}
export default Home;