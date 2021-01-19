import React, {useState} from 'react';
import GoogleMapReact from 'google-map-react';
import {LocationOn} from '@material-ui/icons'
import {connect} from 'react-redux'
import{setCoordinates} from 'src/store/youtube/actions'

const Marker = () => {
    return <LocationOn style={{color:'#FB6107'}}/>
}
const SimpleMap = ({onSetCoordinates}) => {
    const [clickedCoordinates, setClickedCoordinates] = useState(null);
    const defaultMapProps = {
        center: {
            lat: 38,
            lng: 35
        },
        zoom: 6
    };
    const onMapClick = (event) => {
        setClickedCoordinates({lat: event.lat, lng: event.lng})
        onSetCoordinates({lat: event.lat, lng: event.lng})
    }
    return (
        <div style={{height: '90vh', width: '100%'}}>
            <GoogleMapReact
                bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_API_KEY}}
                defaultCenter={defaultMapProps.center}
                defaultZoom={defaultMapProps.zoom}
                onClick={onMapClick}
            >
                <Marker lat={clickedCoordinates?.lat} lng={clickedCoordinates?.lng}></Marker>
            </GoogleMapReact>
        </div>
    );
}
const mapStateToProps = (state) =>({
    coordinates: state.youtube.coordinates
})
const mapDispatchToProps = (dispatch) =>({
    onSetCoordinates: (data) => dispatch(setCoordinates(data))
})
export default connect(mapStateToProps,mapDispatchToProps)(SimpleMap)
