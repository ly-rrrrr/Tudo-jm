import { useRef, useState, useEffect, useCallback } from 'preact/hooks';
import { useApp } from '../../context/AppContext.jsx';
import EditorToolbar from './EditorToolbar.jsx';
import MarkdownEditor from './MarkdownEditor.jsx';
import RichTextEditor from './RichTextEditor.jsx';
import TaskList from './TaskList.jsx';
import './PlanEditor.css';

export default function PlanEditor() {
  const { state } = useApp();
  const plan = state.dayPlans[state.selectedDate];
  const editorMode = state.settings.editorMode || 'markdown';
  const containerRef = useRef(null);
  const dragging = useRef(false);
  const [splitPct, setSplitPct] = useState(() => {
    try { return parseFloat(localStorage.getItem('tudo_split')) || 65; }
    catch { return 65; }
  });

  const dateLabel = state.currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const onMouseDown = useCallback((e) => {
    e.preventDefault();
    dragging.current = true;
  }, []);

  useEffect(() => {
    function onMouseMove(e) {
      if (!dragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const top = rect.top + 4; // offset for toolbar
      const h = rect.height - 14; // handle height
      const pct = ((e.clientY - top) / h) * 100;
      const clamped = Math.max(25, Math.min(85, Math.round(pct)));
      setSplitPct(clamped);
    }
    function onMouseUp() {
      if (dragging.current) {
        dragging.current = false;
        try { localStorage.setItem('tudo_split', String(splitPct)); } catch {}
      }
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [splitPct]);

  // Persist on unmount
  useEffect(() => {
    try { localStorage.setItem('tudo_split', String(splitPct)); } catch {}
  }, [splitPct]);

  return (
    <div class="plan-editor">
      <div class="plan-editor-header">
        <h3 class="plan-date-label">{dateLabel}</h3>
        {plan?.updatedAt && (
          <span class="plan-save-status">Saved</span>
        )}
      </div>
      <EditorToolbar />
      <div class="plan-editor-content" ref={containerRef}>
        <div class="plan-notes-section" style={{ flex: 'none', height: `${splitPct}%` }}>
          <div style={{ display: editorMode === 'markdown' ? 'contents' : 'none' }}><MarkdownEditor /></div>
          <div style={{ display: editorMode === 'richtext' ? 'contents' : 'none' }}><RichTextEditor /></div>
        </div>
        <div class="plan-divider" onMouseDown={onMouseDown}>
          <div class="plan-divider-handle" />
        </div>
        <div class="plan-tasks-section" style={{ flex: '1 1 auto' }}>
          <TaskList />
        </div>
      </div>
    </div>
  );
}
