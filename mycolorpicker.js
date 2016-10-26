'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import reactCSS from 'reactcss'
import {Editor, EditorState, Modifier, RichUtils, convertToRaw} from 'draft-js'
import { SketchPicker } from 'react-color';

class ColorfulEditorExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editorState: EditorState.createEmpty()};

        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => this.setState({editorState});
        this.changeColor = (color) => this._changeColor(color);
    }
    _changeColor(toggledColor){
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

        // If the color is being toggled on, apply it.
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
                <MyColorPickerBtn
                    editorState={editorState}
                    onClose={this.focus}
                    onChangeColor = {this.changeColor}
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


// This object provides the styling information for our custom color
// styles.
var colorStyleMap = {
    color0000: {
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
        colorStyleMap['color'+color.hex.slice(1)] = {color: color.hex};
        this.setState({ textColor: color.hex});
        this.props.onClose();
        this.props.onChangeColor('color'+color.hex.slice(1));
    }

    handleClick(){
        this.setState({ pickerShow: !this.state.pickerShow });
        this.props.onClose();
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
