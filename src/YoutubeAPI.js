import axios from 'axios';
import * as Constants from './config'

export default axios.create({
    baseURL: Constants.YOUTUBE_API_BASE_URL,
    params: {
        part: 'snippet',
        maxResults: 5,
        key: Constants.YOUTUBE_API_KEY
    }
})