import axios from 'axios';
import * as Constants from './Constants'
import * as Secrets from './config.js'

export default axios.create({
    baseURL: Constants.YOUTUBE_API_BASE_URL,
    params: {
        part: 'snippet',
        maxResults: 5,
        key: Secrets.YOUTUBE_API_KEY
    }
})