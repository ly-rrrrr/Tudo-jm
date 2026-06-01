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

  const dateLabel = state.currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div class="plan-editor">
      <div class="plan-editor-header">
        <h3 class="plan-date-label">{dateLabel}</h3>
        {plan?.updatedAt && (
          <span class="plan-save-status">Saved</span>
        )}
      </div>
      <EditorToolbar />
      <div class="plan-editor-content">
        <div class="plan-notes-section">
          {editorMode === 'richtext' ? <RichTextEditor /> : <MarkdownEditor />}
        </div>
        <div class="plan-tasks-section">
          <TaskList />
        </div>
      </div>
    </div>
  );
}
