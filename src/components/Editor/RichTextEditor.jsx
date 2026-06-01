import { useEffect, useRef } from 'preact/hooks';
import { useApp } from '../../context/AppContext.jsx';
import { parseMarkdown, htmlToMarkdown } from '../../utils/markdown.js';

export default function RichTextEditor() {
  const { state, dispatch } = useApp();
  const plan = state.dayPlans[state.selectedDate];
  const editorRef = useRef(null);
  const debounceRef = useRef(null);
  const initializedRef = useRef(false);

  // Initialize content when selected date changes
  useEffect(() => {
    if (editorRef.current) {
      const html = parseMarkdown(plan?.notes || '');
      editorRef.current.innerHTML = html || '<p><br></p>';
      initializedRef.current = true;
    }
  }, [state.selectedDate]);

  const handleInput = () => {
    if (!editorRef.current || !initializedRef.current) return;
    const html = editorRef.current.innerHTML;
    const md = htmlToMarkdown(html);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      dispatch({ type: 'SAVE_PLAN', dateStr: state.selectedDate, notes: md });
    }, 500);
  };

  return (
    <div
      ref={editorRef}
      class="richtext-editor"
      contentEditable
      onInput={handleInput}
      onBlur={handleInput}
      placeholder="Write your daily plan notes..."
      data-placeholder="Write your daily plan notes..."
    />
  );
}
