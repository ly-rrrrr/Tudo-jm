import { AppProvider } from './context/AppContext.jsx';
import Starfield from './components/Starfield.jsx';
import Header from './components/Header.jsx';
import CalendarPopover from './components/CalendarPopover.jsx';
import PlanEditor from './components/Editor/PlanEditor.jsx';
import TaskModal from './components/TaskModal/TaskModal.jsx';
import SettingsModal from './components/SettingsModal/SettingsModal.jsx';
import './styles/variables.css';
import './styles/reset.css';
import './styles/typography.css';
import './styles/animations.css';
import './styles/utilities.css';
import './App.css';

function AppInner() {
  return (
    <>
      <Starfield />
      <div class="app-shell">
        <Header />
        <main class="app-main">
          <PlanEditor />
        </main>
      </div>
      <CalendarPopover />
      <TaskModal />
      <SettingsModal />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
