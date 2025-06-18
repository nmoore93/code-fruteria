import React from 'react';

const fruits = [
  { id: 'F001', name: 'Banana', country: 'Ecuador', type: 'Tropical', status: 'Available', details: 'Organic, Fair Trade' },
  { id: 'F002', name: 'Apple', country: 'Spain', type: 'Temperate', status: 'Available', details: 'Fuji, Premium' },
  { id: 'F003', name: 'Orange', country: 'Morocco', type: 'Citrus', status: 'Low Stock', details: 'Navel, Sweet' },
  { id: 'F004', name: 'Kiwi', country: 'New Zealand', type: 'Berry', status: 'Available', details: 'Green, Large' },
  { id: 'F005', name: 'Mango', country: 'Peru', type: 'Tropical', status: 'Pending', details: 'Kent, Air Freight' },
  { id: 'F006', name: 'Pineapple', country: 'Costa Rica', type: 'Tropical', status: 'Available', details: 'Extra Sweet' },
  { id: 'F007', name: 'Grape', country: 'Italy', type: 'Berry', status: 'Available', details: 'Red Globe' },
  { id: 'F008', name: 'Pear', country: 'Argentina', type: 'Temperate', status: 'Available', details: 'Williams, Fresh' },
  { id: 'F009', name: 'Lime', country: 'Mexico', type: 'Citrus', status: 'Low Stock', details: 'Seedless' },
  { id: 'F010', name: 'Papaya', country: 'Brazil', type: 'Tropical', status: 'Available', details: 'Formosa' },
];

const headerStyle: React.CSSProperties = {
  background: '#232b3e',
  color: '#fff',
  fontWeight: 700,
  fontFamily: 'monospace',
  fontSize: 18,
  letterSpacing: 1,
  borderBottom: '2px solid #3e4a6b',
};

const rowStyle: React.CSSProperties = {
  fontFamily: 'monospace',
  fontSize: 16, 
  color: '#f5f5f5',
  background: '#232b3e',
};

const altRowStyle: React.CSSProperties = {
  ...rowStyle,
  background: '#262f47',
};

const cellStyle: React.CSSProperties = {
  padding: '8px 18px',
  borderRight: '1px solid #353b4a',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  maxWidth: 180,
};

const FruitBook: React.FC = () => (
  <div style={{ padding: 0, background: '#232b3e', height: '100%', overflow: 'auto' }}>
    <div style={{
      fontFamily: 'monospace',
      fontWeight: 700,
      fontSize: 22,
      color: '#fff',
      background: '#232b3e',
      padding: '16px 24px 10px 24px',
      borderBottom: '1px solid #353b4a',
      letterSpacing: 1,
    }}>
      Fruit Book
    </div>
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 700 }}>
        <thead>
          <tr>
            <th style={{ ...headerStyle, borderTopLeftRadius: 6 }}>ID</th>
            <th style={headerStyle}>Fruit</th>
            <th style={headerStyle}>Country</th>
            <th style={headerStyle}>Type</th>
            <th style={headerStyle}>Status</th>
            <th style={{ ...headerStyle, borderTopRightRadius: 6 }}>Details</th>
          </tr>
        </thead>
        <tbody>
          {fruits.map((f, i) => (
            <tr key={f.id} style={i % 2 === 0 ? rowStyle : altRowStyle}>
              <td style={cellStyle}>{f.id}</td>
              <td style={cellStyle}>{f.name}</td>
              <td style={cellStyle}>{f.country}</td>
              <td style={cellStyle}>{f.type}</td>
              <td style={{
                ...cellStyle,
                color: f.status === 'Available' ? '#7c5fe6' : f.status === 'Pending' ? '#ffb300' : '#e57373',
                fontWeight: 700,
              }}>{f.status}</td>
              <td style={cellStyle}>{f.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default FruitBook;
