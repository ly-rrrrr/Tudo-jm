import { useState, useEffect } from 'preact/hooks';
import { useApp } from '../../context/AppContext.jsx';
import './SettingsModal.css';

export default function SettingsModal() {
  const { state, dispatch } = useApp();
  const show = state.showSettings;
  const [closing, setClosing] = useState(false);
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    if (show) { setClosing(false); setDraft({ ...state.settings }); }
  }, [show]);

  if (!show && !closing) return null;

  const close = () => { setClosing(true); setTimeout(() => dispatch({ type: 'CLOSE_SETTINGS' }), 200); };
  const save = () => { dispatch({ type: 'UPDATE_SETTINGS', settings: draft }); close(); };
  const update = (key, value) => setDraft(prev => ({ ...prev, [key]: value }));

  if (!draft) return null;

  return (
    <div class={`modal-overlay ${closing ? 'animate-fade-out' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div class={`modal glass-panel settings-modal ${closing ? 'animate-scale-out' : 'animate-scale-in'}`}>
        <div class="modal-header">
          <h3 class="modal-title">Settings</h3>
          <button class="modal-close" onClick={close}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="settings-group">
            <label class="settings-label">Default View</label>
            <div class="settings-options">
              {['month', 'week', 'day'].map(v => (
                <button
                  key={v}
                  class={`settings-opt ${draft.defaultView === v ? 'active' : ''}`}
                  onClick={() => update('defaultView', v)}
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div class="settings-group">
            <label class="settings-label">Editor Mode</label>
            <div class="settings-options">
              <button class={`settings-opt ${draft.editorMode === 'markdown' ? 'active' : ''}`} onClick={() => update('editorMode', 'markdown')}>Markdown</button>
              <button class={`settings-opt ${draft.editorMode === 'richtext' ? 'active' : ''}`} onClick={() => update('editorMode', 'richtext')}>Rich Text</button>
            </div>
          </div>
          <div class="settings-group">
            <label class="settings-label">Week Starts On</label>
            <div class="settings-options">
              <button class={`settings-opt ${draft.firstDayOfWeek === 0 ? 'active' : ''}`} onClick={() => update('firstDayOfWeek', 0)}>Sunday</button>
              <button class={`settings-opt ${draft.firstDayOfWeek === 1 ? 'active' : ''}`} onClick={() => update('firstDayOfWeek', 1)}>Monday</button>
            </div>
          </div>
          <div class="settings-group">
            <label class="settings-label">Starfield</label>
            <div class="settings-options">
              {['low', 'medium', 'high'].map(v => (
                <button key={v} class={`settings-opt ${draft.starfieldIntensity === v ? 'active' : ''}`} onClick={() => update('starfieldIntensity', v)}>{v.charAt(0).toUpperCase() + v.slice(1)}</button>
              ))}
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="modal-footer-right">
            <button class="modal-btn secondary" onClick={close}>Cancel</button>
            <button class="modal-btn primary" onClick={save}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
