import Alt from '../Alt'
import React from 'react'

const ProgressBar = React.createClass({
    mixins: [Alt],

    render() {
        let progress = this.context.alt.getStore('upload').getProgress()

        let style = {
            display: progress !== null ? 'block' : 'none'
        }

        return (
            <div className="upload_progress" style={style}>
                <div className={`progress ${progress === 100 ? '-working' : ''}`}>
                    <div className="progress_bar"
                         style={{ width: parseInt(progress)+'%' }}>
                    </div>
                </div>
            </div>
        )
    }
})

export default ProgressBar
