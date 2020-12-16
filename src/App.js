import React, { Component } from "react";
import * as Constants from "./config.js";
import hash from "./hash";
import Player from "./Player";
import YoutubeContainer from './YoutubeContainer'
import Canvas from './Canvas'

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
            <div>
                <header className="App-header">
                    {!token && (
                        <>
                            <a id="login" className="btn btn--loginApp-link" href={`${Constants.authEndpoint}?client_id=${Constants.clientId}&redirect_uri=${Constants.redirectUri}&scope=${Constants.scopes.join(
                                "%20")}&response_type=token&show_dialog=true`}>Login to Spotify
                            </a>
                            <Canvas />
                        </>)}
                    {token && !no_data && (
                        <>
                            <Player item={item} is_playing={this.state.is_playing} progress_ms={this.state.progress_ms} />
                            <YoutubeContainer item={item} is_playing={this.state.is_playing} progress_ms={this.state.progress_ms} />
                        </>
                    )}
                    {no_data && (
                        <p>
                            You need to be playing a song on Spotify, for something to appear here.
                        </p>
                    )}
                </header>
            </div>
        );
    }
}

export default App;