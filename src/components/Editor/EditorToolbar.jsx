import { useApp } from '../../context/AppContext.jsx';
import './EditorToolbar.css';

export default function EditorToolbar() {
  const { state, dispatch } = useApp();
  const mode = state.settings.editorMode || 'markdown';
  const isMarkdown = mode === 'markdown';

  return (
    <div class="editor-toolbar">
      <div class="toolbar-group">
        <button
          class={`toolbar-btn ${isMarkdown ? 'active' : ''}`}
          onClick={() => dispatch({ type: 'UPDATE_SETTINGS', settings: { editorMode: 'markdown' } })}
          title="Markdown mode"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/>
          </svg>
          MD
        </button>
        <button
          class={`toolbar-btn ${!isMarkdown ? 'active' : ''}`}
          onClick={() => dispatch({ type: 'UPDATE_SETTINGS', settings: { editorMode: 'richtext' } })}
          title="Rich text mode (undo history resets on switch)"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
          Rich
        </button>
      </div>
      {!isMarkdown && (
        <div class="toolbar-group">
          <button class="toolbar-icon-btn" onClick={() => document.execCommand('bold')} title="Bold (Ctrl+B)"><b>B</b></button>
          <button class="toolbar-icon-btn" onClick={() => document.execCommand('italic')} title="Italic (Ctrl+I)"><i>I</i></button>
          <button class="toolbar-icon-btn" onClick={() => document.execCommand('underline')} title="Underline (Ctrl+U)"><u>U</u></button>
          <button class="toolbar-icon-btn" onClick={() => document.execCommand('strikeThrough')} title="Strikethrough">S</button>
          <span class="toolbar-sep" />
          <button class="toolbar-icon-btn" onClick={() => document.execCommand('formatBlock', false, 'h2')} title="Heading">H</button>
          <button class="toolbar-icon-btn" onClick={() => document.execCommand('insertUnorderedList')} title="Bullet List">&bull;</button>
          <button class="toolbar-icon-btn" onClick={() => document.execCommand('insertOrderedList')} title="Numbered List">1.</button>
        </div>
      )}
      <div class="toolbar-group toolbar-right">
        <button
          class="toolbar-btn"
          onClick={() => dispatch({ type: 'OPEN_MODAL', taskId: null })}
          title="Add Task (Ctrl+N)"
        >
          + Task
        </button>
      </div>
    </div>
  );
}
