import ReactQuill from 'react-quill'
import Quill from 'quill'
import 'react-quill/dist/quill.snow.css'
import styled from 'styled-components'

class CustomQuill extends ReactQuill {
  //fix temporário no React Quill necessário ao react 18
  destroyEditor() {
    if (!this.editor) return
    this.unhookEditor(this.editor)
  }

  createEditor(element, config) {
    const editor = new Quill(element, config)
    if (config.tabIndex != null) {
      this.setEditorTabIndex(editor, config.tabIndex)
    }
    // this.hookEditor(editor)
    return editor
  }

  componentDidMount() {
    this.instantiateEditor()
    this.setEditorContents(this.editor, this.getEditorContents())
    this.hookEditor(this.editor)
  }
}

const defaultToolbar = [
  [{ header: [false, 1, 2, 3, 4, 5, 6] }],
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  [
    { align: '' },
    { align: 'center' },
    { align: 'right' },
    { align: 'justify' },
  ],
  ['blockquote', 'code-block'],
  [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  ['link', 'image', 'video'],
  ['clean'], // remove formatting button
]

function QuillEditor(props) {
  return (
    <CustomQuill
      {...props}
      theme="snow"
      modules={{ toolbar: defaultToolbar }}
    />
  )
}

export default styled(QuillEditor)`
  &.quill .ql-editor {
    min-height: 200px;
  }
`
