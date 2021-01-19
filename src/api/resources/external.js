import {EXTERNAL} from '../http'

export default {
    youtubeLocationSearch: (params) =>
        EXTERNAL.get(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&location=${params.lat},${params.lng}&locationRadius=10km&maxResults=10&order=date&type=video&key=AIzaSyARuExN9HxDUg471bZeDFozMTG_hS_J2Rk${params.pageToken ? '&pageToken=' +params.pageToken : ''}`,
        ),
}
