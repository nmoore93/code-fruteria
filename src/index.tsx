import React, { useState, DragEvent, FC, StrictMode } from 'react';
import ReactDOM from 'react-dom';
import FruitBook from './panels/FruitBookPanel';
import AboutPanel from './panels/AboutPanel';
import ResizableDraggablePanel from './components/ResizableDraggablePanel';
import TermsIcon from './Icons/TermsIcon';
import AboutIcon from './Icons/AboutIcon';

// Panel data
const panelList = [
  { key: 'fruitbook', title: 'Fruit Book', content: <FruitBook /> },
  { key: 'about', title: 'About', content: <AboutPanel /> },
];

type OpenPanel = {
  id: string;
  key: string;
  title: string;
  content: React.ReactNode;
  x: number;
  y: number;
  width: number;
  height: number;
};

const getDefaultPanelPosition = (count: number) => ({
  x: 60 + count * 40,
  y: 60 + count * 40,
  width: 700,  
  height: 420, 
});

const App: FC = () => {
  const [openPanels, setOpenPanels] = useState<OpenPanel[]>([]);
  const [dragNavPanelKey, setDragNavPanelKey] = useState<string | null>(null);
  const [navOpen, setNavOpen] = useState<boolean>(false);

  // Drag from nav: set key in dataTransfer
  const onNavDragStart = (key: string) => (e: DragEvent<HTMLLIElement>) => {
    setDragNavPanelKey(key);
    e.dataTransfer.setData('panelKey', key);
  };

  // Drop on main: open new panel
  const onMainDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const key = e.dataTransfer.getData('panelKey');
    if (!key) return;
    const panelDef = panelList.find(p => p.key === key);
    if (!panelDef) return;
    // Prevent duplicate panels of same id at same position
    const id = `${key}-${Date.now()}`;
    const count = openPanels.length;
    setOpenPanels([
      ...openPanels,
      {
        id,
        key: panelDef.key,
        title: panelDef.title,
        content: panelDef.content,
        ...getDefaultPanelPosition(count),
      },
    ]);
    setDragNavPanelKey(null);
  };

  const onMainDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Panel close
  const handleClose = (id: string) => {
    setOpenPanels(openPanels.filter(p => p.id !== id));
  };

  // Panel move (drag inside main area)
  const handlePanelMove = (id: string, dx: number, dy: number) => {
    setOpenPanels(panels =>
      panels.map(p =>
        p.id === id
          ? { ...p, x: p.x + dx, y: p.y + dy }
          : p
      )
    );
  };

  // Panel resize
  const handlePanelResize = (id: string, dw: number, dh: number) => {
    setOpenPanels(panels =>
      panels.map(p =>
        p.id === id
          ? { ...p, width: Math.max(200, p.width + dw), height: Math.max(100, p.height + dh) }
          : p
      )
    );
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Navigation Bar */}
      {navOpen && (
        <nav
          style={{
            width: 60,
            background: '#232b3e',
            padding: '0.5rem 0.25rem',
            borderRight: '1px solid #3e4a6b',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: 60,
            boxSizing: 'border-box',
          }}
        >
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            {panelList.map((panel) => (
              <li
                key={panel.key}
                style={{
                  marginBottom: 12,
                  cursor: 'grab',
                  fontWeight: 'normal',
                  background: dragNavPanelKey === panel.key ? '#353b4a' : undefined,
                  padding: 6,
                  borderRadius: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  fontSize: 11,
                  color: '#e0e0e0',
                  width: '100%',
                  transition: 'background 0.2s',
                }}
                draggable
                onDragStart={onNavDragStart(panel.key)}
                onDragEnd={() => setDragNavPanelKey(null)}
                title={panel.title}
              >
                <span style={{ marginBottom: 2 }}>
                  {panel.key === 'fruitbook' ? (
                    <TermsIcon />
                  ) : panel.key === 'about' ? (
                    <AboutIcon />
                  ) : null}
                </span>
                <span>{panel.title}</span>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Panel Area */}
      <main
        style={{
          flex: 1,
          position: 'relative',
          background: '#232b3e',
          overflow: 'hidden',
        }}
        onDrop={onMainDrop}
        onDragOver={onMainDragOver}
      >
        {/* Top nav branding */}
        <div
          style={{
            width: '100%',
            background: 'linear-gradient(90deg, #2b3556 0%, #3e4a6b 100%)', 
            color: '#fff',
            padding: '0.5rem 1.5rem',
            fontWeight: 600,
            fontSize: 20,
            letterSpacing: 1,
            position: 'sticky',
            top: 0,
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 2px 8px #0002',
            minHeight: 56,
            borderBottom: '1px solid #3e4a6b',
          }}
        >
          {/* Hamburger/X icon */}
          <button
            onClick={() => setNavOpen((v) => !v)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: 26,
              cursor: 'pointer',
              marginRight: 20,
              display: 'flex',
              alignItems: 'center',
              padding: 0,
              height: 40,
              width: 40,
              borderRadius: 8,
              transition: 'background 0.2s',
              boxShadow: navOpen ? '0 2px 8px #0002' : undefined,
            }}
            aria-label="Toggle navigation"
          >
            <span style={{ display: 'inline-block', width: 28, height: 28 }}>
              {navOpen ? (
                // X icon
                <svg width="28" height="28" viewBox="0 0 28 28">
                  <line x1="7" y1="7" x2="21" y2="21" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
                  <line x1="21" y1="7" x2="7" y2="21" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              ) : (
                // Hamburger icon
                <svg width="28" height="28" viewBox="0 0 28 28">
                  <rect y="6" width="28" height="3" rx="1.5" fill="#fff" />
                  <rect y="13" width="28" height="3" rx="1.5" fill="#fff" />
                  <rect y="20" width="28" height="3" rx="1.5" fill="#fff" />
                </svg>
              )}
            </span>
          </button>
          <span style={{
            fontFamily: 'monospace',
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: 2,
            color: '#fff',
            textShadow: '0 1px 2px #0006',
            userSelect: 'none',
            textTransform: 'uppercase',
          }}>
            fruteria
          </span>
        </div>
        {openPanels.length === 0 ? (
          <div style={{ color: '#888', textAlign: 'center', marginTop: '2rem' }}>
            No panels open.<br />
            Drag one from the navigation bar.
          </div>
        ) : (
          openPanels.map((panel) => (
            <ResizableDraggablePanel
              key={panel.id}
              {...panel}
              onClose={() => handleClose(panel.id)}
              onMove={(dx, dy) => handlePanelMove(panel.id, dx, dy)}
              onResize={(dw, dh) => handlePanelResize(panel.id, dw, dh)}
            />
          ))
       )}
      </main>
    </div>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
