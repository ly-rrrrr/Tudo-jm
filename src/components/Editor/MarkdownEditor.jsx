import { useEffect, useRef, useState } from 'preact/hooks';
import { useApp } from '../../context/AppContext.jsx';
import { parseMarkdown } from '../../utils/markdown.js';

export default function MarkdownEditor() {
  const { state, dispatch } = useApp();
  const plan = state.dayPlans[state.selectedDate];
  const [text, setText] = useState(plan?.notes || '');
  const [showPreview, setShowPreview] = useState(false);
  const textareaRef = useRef(null);
  const debounceRef = useRef(null);

  // Sync with plan changes from outside
  useEffect(() => {
    const currentPlan = state.dayPlans[state.selectedDate];
    setText(currentPlan?.notes || '');
  }, [state.selectedDate]);

  const handleInput = (value) => {
    setText(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      dispatch({ type: 'SAVE_PLAN', dateStr: state.selectedDate, notes: value });
    }, 500);
  };

  const insertMarkdown = (prefix, suffix = '') => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = text.substring(start, end);
    const newText = text.substring(0, start) + prefix + selected + suffix + text.substring(end);
    setText(newText);
    handleInput(newText);
    ta.focus();
    setTimeout(() => {
      ta.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  return (
    <div class="md-editor">
      <div class="md-toolbar">
        <button class="md-toolbar-btn" onClick={() => insertMarkdown('**', '**')} title="Bold">B</button>
        <button class="md-toolbar-btn" onClick={() => insertMarkdown('*', '*')} title="Italic"><i>I</i></button>
        <button class="md-toolbar-btn" onClick={() => insertMarkdown('~~', '~~')} title="Strikethrough">S</button>
        <button class="md-toolbar-btn" onClick={() => insertMarkdown('\n## ', '')} title="Heading">H</button>
        <button class="md-toolbar-btn" onClick={() => insertMarkdown('\n- ', '')} title="List">&bull;</button>
        <button class="md-toolbar-btn" onClick={() => insertMarkdown('[', '](url)')} title="Link">A</button>
        <button
          class={`md-toolbar-btn ${showPreview ? 'active' : ''}`}
          onClick={() => setShowPreview(!showPreview)}
          title="Toggle preview"
        >
          &#9654;
        </button>
      </div>
      <div class={`md-editor-body ${showPreview ? 'split' : ''}`}>
        <textarea
          ref={textareaRef}
          class="md-textarea"
          value={text}
          onInput={(e) => handleInput(e.target.value)}
          placeholder="Write your daily plan notes in Markdown..."
          spellcheck={false}
        />
        {showPreview && (
          <div
            class="md-preview"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(text) }}
          />
        )}
      </div>
    </div>
  );
}
