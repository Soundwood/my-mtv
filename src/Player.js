import React from "react";

const Player = props => {
    const progressBarStyles = {
        width: (props.progress_ms * 100 / props.item.duration_ms) + '%'
    };

    return (
        <div className="info_wrapper">
            <div className="now_playing_img">
                <img style={{width: "80%"}} src={props.item.album.images[0].url} alt={"placeholder"}/>
            </div>
            <div className="now_playing_info">
                <div className="now_playing_name">
                    Song: {props.item.name}
                </div>
                <div className="now_playing_artist">
                    Artist: {props.item.artists[0].name}
                </div>
                <div className="now_playing_status">
                    Status: {props.is_playing ? "Playing" : "Paused"}
                </div>
                <div className="progress">
                    <div className="progress_bar" style={progressBarStyles} />
                </div>
            </div>
        </div>
    );
}

export default Player;