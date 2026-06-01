import { useApp } from '../../context/AppContext.jsx';
import './SettingsModal.css';

export default function SettingsModal() {
  const { state, dispatch } = useApp();
  const show = state.showSettings;
  const settings = state.settings;

  if (!show) return null;

  const update = (key, value) => {
    dispatch({ type: 'UPDATE_SETTINGS', settings: { [key]: value } });
  };

  return (
    <div class="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) dispatch({ type: 'CLOSE_SETTINGS' }); }}>
      <div class="modal glass-panel animate-scale-in settings-modal">
        <div class="modal-header">
          <h3 class="modal-title">Settings</h3>
          <button class="modal-close" onClick={() => dispatch({ type: 'CLOSE_SETTINGS' })}>
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
                  class={`settings-opt ${settings.defaultView === v ? 'active' : ''}`}
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
              <button
                class={`settings-opt ${settings.editorMode === 'markdown' ? 'active' : ''}`}
                onClick={() => update('editorMode', 'markdown')}
              >
                Markdown
              </button>
              <button
                class={`settings-opt ${settings.editorMode === 'richtext' ? 'active' : ''}`}
                onClick={() => update('editorMode', 'richtext')}
              >
                Rich Text
              </button>
            </div>
          </div>
          <div class="settings-group">
            <label class="settings-label">Week Starts On</label>
            <div class="settings-options">
              <button
                class={`settings-opt ${settings.firstDayOfWeek === 0 ? 'active' : ''}`}
                onClick={() => update('firstDayOfWeek', 0)}
              >
                Sunday
              </button>
              <button
                class={`settings-opt ${settings.firstDayOfWeek === 1 ? 'active' : ''}`}
                onClick={() => update('firstDayOfWeek', 1)}
              >
                Monday
              </button>
            </div>
          </div>
          <div class="settings-group">
            <label class="settings-label">Starfield Intensity</label>
            <div class="settings-options">
              {['low', 'medium', 'high'].map(v => (
                <button
                  key={v}
                  class={`settings-opt ${settings.starfieldIntensity === v ? 'active' : ''}`}
                  onClick={() => update('starfieldIntensity', v)}
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="modal-footer-right">
            <button class="modal-btn secondary" onClick={() => dispatch({ type: 'CLOSE_SETTINGS' })}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
