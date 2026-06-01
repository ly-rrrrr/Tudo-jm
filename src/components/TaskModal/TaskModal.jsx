import { useState, useEffect, useRef } from 'preact/hooks';
import { useApp } from '../../context/AppContext.jsx';
import './TaskModal.css';

const emptyTask = {
  title: '',
  description: '',
  date: '',
  startTime: '',
  endTime: '',
  priority: 'medium',
  category: '',
  completed: false,
};

export default function TaskModal() {
  const { state, dispatch } = useApp();
  const { modalState } = state;
  const isOpen = modalState.open;

  const editingTask = modalState.taskId ? state.tasks[modalState.taskId] : null;
  const [form, setForm] = useState(emptyTask);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (editingTask) {
        setForm({
          title: editingTask.title || '',
          description: editingTask.description || '',
          date: editingTask.date || state.selectedDate,
          startTime: editingTask.startTime || '',
          endTime: editingTask.endTime || '',
          priority: editingTask.priority || 'medium',
          category: editingTask.category || '',
          completed: editingTask.completed || false,
        });
      } else {
        setForm({ ...emptyTask, date: state.selectedDate });
      }
      setErrors({});
    }
  }, [isOpen, modalState.taskId, state.selectedDate]);

  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) setClosing(false);
  }, [isOpen]);

  if (!isOpen && !closing) return null;

  const close = () => { setClosing(true); setTimeout(() => dispatch({ type: 'CLOSE_MODAL' }), 200); };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (form.startTime && form.endTime && form.startTime >= form.endTime) {
      errs.endTime = 'End time must be after start time';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    if (editingTask) {
      dispatch({
        type: 'UPDATE_TASK',
        taskId: editingTask.id,
        updates: { ...form, order: editingTask.order },
      });
    }
    close();
  };

  const handleDelete = () => {
    if (editingTask && confirm('Delete this task permanently?')) {
      dispatch({ type: 'DELETE_TASK', taskId: editingTask.id });
      close();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) close();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') close();
    if (e.key === 'Enter' && e.ctrlKey) handleSave();
  };

  return (
    <div class={`modal-overlay ${closing ? 'animate-fade-out' : ''}`} onClick={handleOverlayClick} onKeyDown={handleKeyDown}>
      <div class={`modal glass-panel ${closing ? 'animate-scale-out' : 'animate-scale-in'}`}>
        <div class="modal-header">
          <h3 class="modal-title">{editingTask ? 'Edit Task' : 'New Task'}</h3>
          <button class="modal-close" onClick={close}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Title *</label>
            <input
              type="text"
              class={`form-input ${errors.title ? 'error' : ''}`}
              value={form.title}
              onInput={(e) => handleChange('title', e.target.value)}
              placeholder="What needs to be done?"
              autofocus
            />
            {errors.title && <span class="form-error">{errors.title}</span>}
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Date</label>
              <input
                type="date"
                class="form-input"
                value={form.date}
                onInput={(e) => handleChange('date', e.target.value)}
              />
            </div>
            <div class="form-group">
              <label class="form-label">Priority</label>
              <select
                class="form-input"
                value={form.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Start Time</label>
              <input
                type="time"
                class="form-input"
                value={form.startTime}
                onInput={(e) => handleChange('startTime', e.target.value)}
              />
            </div>
            <div class="form-group">
              <label class="form-label">End Time</label>
              <input
                type="time"
                class={`form-input ${errors.endTime ? 'error' : ''}`}
                value={form.endTime}
                onInput={(e) => handleChange('endTime', e.target.value)}
              />
              {errors.endTime && <span class="form-error">{errors.endTime}</span>}
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Category</label>
            <input
              type="text"
              class="form-input"
              value={form.category}
              onInput={(e) => handleChange('category', e.target.value)}
              placeholder="e.g. work, personal, health"
            />
          </div>
          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea
              class="form-textarea"
              value={form.description}
              onInput={(e) => handleChange('description', e.target.value)}
              placeholder="Additional details (Markdown supported)..."
              rows={3}
            />
          </div>
        </div>
        <div class="modal-footer">
          {editingTask && (
            <button class="modal-btn danger" onClick={handleDelete}>Delete</button>
          )}
          <div class="modal-footer-right">
            <button class="modal-btn secondary" onClick={close}>Cancel</button>
            <button class="modal-btn primary" onClick={handleSave}>
              {editingTask ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
