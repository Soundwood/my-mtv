import React, { Component } from 'react';
import * as Secrets from './config.js';
import * as Constants from './Constants'
import hash from './hash';
import Player from './Player';
import YoutubeContainer from './YoutubeContainer'
import Canvas from './Canvas'
import Background from './Background'

class App extends Component {
    constructor() {
        super();
        this.state = {
            token: null,
            item: {
                album: {
                images: [{ url: "" }]
                },
                name: "",
                artists: [{ name: "" }],
                duration_ms: 0
            },
            is_playing: "Paused",
            progress_ms: 0,
            no_data: false,
        };
        this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        let _token = hash.access_token;
        if (_token) {
            this.setState({
                token: _token
            });
            this.getCurrentlyPlaying(_token);
        }
        this.interval = setInterval(() => this.tick(), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick() {
        if(this.state.token) {
            this.getCurrentlyPlaying(this.state.token);
        }
    }

    getCurrentlyPlaying(token) {
        fetch("https://api.spotify.com/v1/me/player", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(!data) {
                this.setState({
                    no_data: true,
                });
                return;
            }
            this.setState({
                item: data.item,
                is_playing: data.is_playing,
                progress_ms: data.progress_ms,
                no_data: false /* We need to "reset" the boolean, in case the
                                    user does not give F5 and has opened his Spotify. */
            })
        })
    }

    render() {
        const { token, item, no_data } = this.state
        return (
            <div className='app_main'>
                {!token && (
                    <div className='login_main'>
                        <Canvas />
                        <a className="button" href={`${Constants.authEndpoint}?client_id=${Secrets.clientId}&redirect_uri=${Constants.redirectUri}&scope=${Constants.scopes.join(
                            "%20")}&response_type=token&show_dialog=true`}>LOGIN WITH SPOTIFY
                        </a>
                    </div>)}
                {token && !no_data && (
                    <>
                        <Background />
                        <div className='player_main'>
                            <YoutubeContainer item={item} is_playing={this.state.is_playing} progress_ms={this.state.progress_ms} />
                            <Player item={item} is_playing={this.state.is_playing} progress_ms={this.state.progress_ms} />
                        </div>
                    </>
                )}
                {no_data && (
                    <div className='player_main'>
                        <p>
                            You need to be playing a song on Spotify, for something to appear here.
                        </p>
                    </div>
                )}
            </div>
        );
    }
}

export default App;