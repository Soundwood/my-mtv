import React, { Component } from 'react'
import * as Constants from './config'

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
    componentDidMount(props) {
        const apiComp = "&safeSearch=none&type=video&key="
        const apiInjectionString = `&q=${this.props.item.artists[0].name}%20${this.props.item.name}%20music%20video`
        fetch(`${Constants.YOUTUBE_API_BASE_URL}${apiInjectionString}${apiComp}${Constants.YOUTUBE_API_KEY}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                channel: data.items[0].snippet.channelTitle,
                description: data.items[0].snippet.description,
                youtubeVid: data.items[0].id.videoId,
                mute: 1
            })
        })
    }
    // componentDidUpdate(props) {
    //     const apiComp = "&safeSearch=none&type=video&key="
    //     const apiInjectionString = `&q=${this.props.item.artists[0].name}%20${this.props.item.name}%20music%20video`
    //     fetch(`${Constants.YOUTUBE_API_BASE_URL}${apiInjectionString}${apiComp}${Constants.YOUTUBE_API_KEY}`)
    //     .then(res => res.json())
    //     .then(data => {
    //         this.setState({
    //             channel: data.items[0].snippet.channelTitle,
    //             description: data.items[0].snippet.description,
    //             youtubeVid: data.items[0].id.videoId,
    //             mute: 1
    //         })
    //     })
    // }
    render() {
        return (
            <div>
                <iframe width="840" height="630"
                    src={`${Constants.YOUTUBE_BASE_URL}/embed/${this.state.youtubeVid}?autoplay=1&mute=1`}
                    frameborder='0'
                    allow='autoplay; encrypted-media'
                    allowfullscreen
                    title='video'
                />
            </div>
        )
    }
}
