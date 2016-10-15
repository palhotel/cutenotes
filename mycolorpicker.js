'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import reactCSS from 'reactcss'
import {Editor, EditorState, Modifier, RichUtils} from 'draft-js'
import { SketchPicker } from 'react-color';

class ColorfulEditorExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editorState: EditorState.createEmpty()};

        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => this.setState({editorState});
        this.toggleColor = (toggledColor) => this._toggleColor(toggledColor);
    }

    _toggleColor(toggledColor) {
        const {editorState} = this.state;
        const selection = editorState.getSelection();

        // Let's just allow one color at a time. Turn off all active colors.
        const nextContentState = Object.keys(colorStyleMap)
            .reduce((contentState, color) => {
                return Modifier.removeInlineStyle(contentState, selection, color)
            }, editorState.getCurrentContent());

        let nextEditorState = EditorState.push(
            editorState,
            nextContentState,
            'change-inline-style'
        );

        const currentStyle = editorState.getCurrentInlineStyle();
        // Unset style override for current color.
        if (selection.isCollapsed()) {
            nextEditorState = currentStyle.reduce((state, color) => {
                return RichUtils.toggleInlineStyle(state, color);
            }, nextEditorState);
        }

        // If the color is being toggled on, apply it.这里是添加样式的地方
        if (!currentStyle.has(toggledColor)) {
            nextEditorState = RichUtils.toggleInlineStyle(
                nextEditorState,
                toggledColor
            );
        }

        this.onChange(nextEditorState);
    }

    render() {
        const {editorState} = this.state;
        return (
            <div style={styles.root}>
                <ColorControls
                    editorState={editorState}
                    onToggle={this.toggleColor}
                />
                <MyColorPickerBtn
                    editorState={editorState}
                    onToggle={this.toggleColor}
                    onClose={this.focus}
                />
                <div style={styles.editor} onClick={this.focus}>
                    <Editor
                        customStyleMap={colorStyleMap}
                        editorState={editorState}
                        onChange={this.onChange}
                        placeholder="Write something colorful..."
                        ref="editor"
                    />
                </div>
            </div>
        );
    }

}

class StyleButton extends React.Component {
    constructor(props) {
        super(props);
        this.onToggle = (e) => {
            e.preventDefault();
            console.log(this.props.style);
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let style;
        if (this.props.active) {
            style = {...styles.styleButton, ...colorStyleMap[this.props.style]};
        } else {
            style = styles.styleButton;
        }

        return (
            <span style={style} onMouseDown={this.onToggle}>
            {this.props.label}
            </span>
        );
    }
}

var COLORS = [
    {label: 'Red', style: 'red'},
    {label: 'Orange', style: 'orange'},
    {label: 'Yellow', style: 'yellow'},
    {label: 'Green', style: 'green'},
    {label: 'Blue', style: 'blue'},
    {label: 'Indigo', style: 'indigo'},
    {label: 'Violet', style: 'violet'},
];
//定义了一组jsx标签,相当于class
const ColorControls = (props) => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <div style={styles.controls}>

        {COLORS.map(type =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
        )}

        </div>
    );
};

// This object provides the styling information for our custom color
// styles.
var colorStyleMap = {
    red: {
        color: 'rgba(255, 0, 0, 1.0)',
    },
    orange: {
        color: 'rgba(255, 127, 0, 1.0)',
    },
    yellow: {
        color: 'rgba(180, 180, 0, 1.0)',
    },
    green: {
        color: 'rgba(0, 180, 0, 1.0)',
    },
    blue: {
        color: 'rgba(0, 0, 255, 1.0)',
    },
    indigo: {
        color: 'rgba(75, 0, 130, 1.0)',
    },
    violet: {
        color: 'rgba(127, 0, 255, 1.0)',
    },
    mine: {
        color: 'rgba(0,0,0,1.0)'
    }
};

const styles = {
    root: {
        fontFamily: '\'Georgia\', serif',
        fontSize: 14,
        padding: 20,
        width: 600,
    },
    editor: {
        borderTop: '1px solid #ddd',
        cursor: 'text',
        fontSize: 16,
        marginTop: 20,
        minHeight: 400,
        paddingTop: 20,
    },
    controls: {
        fontFamily: '\'Helvetica\', sans-serif',
        fontSize: 14,
        marginBottom: 10,
        userSelect: 'none',
    },
    styleButton: {
        color: '#999',
        cursor: 'pointer',
        marginRight: 16,
        padding: '2px 0',
    }
};

/*zhangda add color picker*/
class MyColorPickerBtn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            textColor: '#000',
            pickerShow: false
        };

        //解决this为null
        this.handleChangeComplete = this.handleChangeComplete.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChangeComplete(color){
        colorStyleMap.mine.color = color.hex;
        this.setState({ textColor: color.hex});
        this.props.onClose();
        this.props.onToggle('mine');

    }

    handleClick(){
        this.setState({ pickerShow: !this.state.pickerShow });
        this.props.onClose();
        this.props.onToggle('mine');
    };


    render() {
        return (
            <div style= {{display:'inline-block'}} >
                { this.state.pickerShow ? <div style={{position:'absolute',right:'400px', top: '66px'}}>
                    <SketchPicker
                        color={ this.state.textColor }
                        onChangeComplete={ this.handleChangeComplete }
                    />
                </div>: null }
                <button style={{
                    width:'20px',
                    height:'20px',
                    border:'1px solid #cccccc',
                    cursor:'pointer',
                    background:this.state.textColor,
                    color: this.state.textColor
                    }} onClick={this.handleClick} >
                </button>
            </div>

        );

    }
}
/*zhangda*/

ReactDOM.render(
    <ColorfulEditorExample />,
    document.getElementById('color-draft')
);
