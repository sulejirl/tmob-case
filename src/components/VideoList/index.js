import React, {useEffect, useState,useRef} from 'react'
import {connect} from 'react-redux'
import {setCoordinates} from "src/store/youtube/actions";
import {Divider, Card, CardContent, Grid} from '@material-ui/core'
import moment from 'moment'
import api from 'src/api';

const VideoList = ({coordinates}) => {
    const [videos, setVideos] = useState([])
    const [nextPageToken, setNextPageToken] = useState(null)

    useEffect(() => {
        if (coordinates.lat && coordinates.lng) {
            setVideos([]);
            getVideosByCoordinates(coordinates)
        }
    }, [coordinates.lat])

    const getVideosByCoordinates = async (coordinates) => {
        let tempVideos = [...videos];
        let videosResult = await api.external.youtubeLocationSearch(coordinates);
        tempVideos = tempVideos.concat(videosResult.data.items);
        setVideos(tempVideos)
        setNextPageToken(videosResult.data.nextPageToken)

    }
    const handleScroll=(e) => {
        if((e.target.scrollHeight-e.target.scrollTop)-e.target.clientHeight === 0){
            let tempCoor = {...coordinates};
            console.log(tempCoor)
            tempCoor.pageToken = nextPageToken;
            getVideosByCoordinates(tempCoor);
        }
        console.log(e.target.scrollHeight-e.target.scrollTop,e.target.clientHeight)

    }
    return (
        <div>
            Selected Coordinates: {coordinates.lat}, {coordinates.lng}
            <Divider/>
            <Grid container style={{overflowY: 'scroll', height: '90vh'}}onScroll={handleScroll}>
                {videos && videos.length > 0 && videos?.map((item) => {
                    return (
                        <Grid item xs={'12'} style={{padding: '20px'}}>
                            <Card>
                                <CardContent>
                                    <Grid container>
                                        <Grid item xs={'3'}>
                                            <img src={item?.snippet?.thumbnails?.default?.url} height={100}/>
                                        </Grid>
                                        <Grid item xs={'9'} style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                            justifyContent: 'flex-start',

                                        }}>
                                            <div><b>Video Title:</b>&nbsp; {item.snippet.title}</div>
                                            <div style={{display:'flex',justifyContent:'flex-start'}}><b>Video Description:</b>&nbsp;
                                                <div>{item.snippet.description}</div>
                                            </div>
                                            <div><b>Published
                                                At:</b>&nbsp; {moment(item.snippet.publishedAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                                            </div>


                                        </Grid>
                                    </Grid>

                                </CardContent>
                            </Card>
                        </Grid>
                    )

                })}
            </Grid>
        </div>)
}

const mapStateToProps = (state) => ({
    coordinates: state.youtube.coordinates
})
const mapDispatchToProps = (dispatch) => ({
    onSetCoordinates: (data) => dispatch(setCoordinates(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(VideoList)