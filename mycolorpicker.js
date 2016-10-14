'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color';

class SketchExample extends React.Component {

    render() {
        return <SketchPicker />;
    }
}


ReactDOM.render(
    <SketchExample />,
    document.getElementById('color-picker')
);
