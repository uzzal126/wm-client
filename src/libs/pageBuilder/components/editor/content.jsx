import React from 'react'
import JoditReact from 'jodit-react'

class Content extends React.Component {
  constructor(props) {
    super(props)

    this.editorConfig = {
      readonly: false,
      autofocus: true,
      tabIndex: 1,

      defaultActionOnPaste: 'insert_clear_html',
      toolbarAdaptive: false,
      toolbarButtonSize: 'small',
      beautyHTML: true,

      buttons: [
        'bold',
        'italic',
        'font',
        'fontsize',
        'brush',
        'left',
        'center',
        'right',
        'justify',
        '|',
        'ul',
        'ol',
        'table',
        'link',
        '|',
        'undo',
        'redo',
      ],
    }
  }

  onChange = (value) => {
    this.props.onChange(value)
  }

  setContent = (newContent) => {
    this.props.onChange(newContent)
  }

  render() {
    return (
      <React.Fragment>
        <JoditReact
          value={this.props.content || ''}
          config={this.editorConfig}
          onChange={this.onChange.bind(this)}
          onBlur={(newContent) => this.setContent(newContent)}
        />
      </React.Fragment>
    )
  }
}
export default Content
