import React, { Component } from 'react'
import * as Constants from './Constants'
import youtube from './YoutubeAPI'

export default class YoutubeContainer extends Component {
    constructor (props) {
        super(props)
        this.state = {
            channel: "",
            description: "",
            youtubeVid: "",
            mute: 1
        }
    }
    youtubeSearch = async (searchTerm) => {
        const response = await youtube.get('/search', {
            params: {
                q: searchTerm
            }
        })
        this.setState({
            channel: response.data.items[0].snippet.channelTitle,
            description: response.data.items[0].snippet.title,
            youtubeVid: response.data.items[0].id.videoId,
            mute: 1
        })
    };
    
    componentDidMount() {
        this.youtubeSearch(`${this.props.item.artists[0].name} ${this.props.item.name} music video`)
    }

    componentDidUpdate(prevProps) {
        if(this.props.item.name !== prevProps.item.name){
            this.youtubeSearch(`${this.props.item.artists[0].name} ${this.props.item.name} official music video`)
        }
    }
    
    render() {
        return (
            <div>
                <iframe width="840" height="630"
                    src={`${Constants.YOUTUBE_BASE_URL}/embed/${this.state.youtubeVid}?autoplay=1&mute=1`}
                    frameborder='0'
                    allow='autoplay; encrypted-media'
                    allowfullscreen
                    title={this.state.description}
                />
            </div>
        )
    }
}
