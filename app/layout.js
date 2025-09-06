export const metadata = {
  title: 'Root Cause Analysis Strategy Platform',
  description: 'Platform komprehensif untuk analisis akar masalah',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
          }
          
          .card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            padding: 1.5rem;
            margin-bottom: 1rem;
            transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
          }
          
          .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          }
          
          .btn {
            background: #3b82f6;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.2s;
            text-decoration: none;
            display: inline-block;
            text-align: center;
          }
          
          .btn:hover {
            background: #2563eb;
            transform: translateY(-1px);
          }
          
          .btn-outline {
            background: white;
            color: #3b82f6;
            border: 2px solid #3b82f6;
          }
          
          .btn-outline:hover {
            background: #3b82f6;
            color: white;
          }
          
          .badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
          }
          
          .badge-high {
            background: #fecaca;
            color: #991b1b;
          }
          
          .badge-medium {
            background: #fed7aa;
            color: #c2410c;
          }
          
          .badge-low {
            background: #bbf7d0;
            color: #166534;
          }
          
          .badge-outline {
            background: white;
            color: #6b7280;
            border: 1px solid #d1d5db;
          }
          
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
          }
          
          .grid {
            display: grid;
            gap: 1.5rem;
          }
          
          .grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
          .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
          .grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
          
          @media (min-width: 768px) {
            .md\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
            .md\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
          }
          
          .tab-container {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          
          .tab-list {
            display: flex;
            background: #f8fafc;
            border-bottom: 1px solid #e2e8f0;
          }
          
          .tab {
            flex: 1;
            padding: 1rem;
            background: none;
            border: none;
            cursor: pointer;
            font-weight: 600;
            color: #64748b;
            transition: all 0.2s;
          }
          
          .tab.active {
            background: white;
            color: #3b82f6;
            border-bottom: 3px solid #3b82f6;
          }
          
          .tab:hover:not(.active) {
            background: #e2e8f0;
          }
          
          .tab-content {
            padding: 2rem;
            display: none;
          }
          
          .tab-content.active {
            display: block;
          }
          
          .progress-bar {
            background: #e2e8f0;
            height: 0.5rem;
            border-radius: 0.25rem;
            overflow: hidden;
          }
          
          .progress-fill {
            background: #3b82f6;
            height: 100%;
            transition: width 0.3s ease;
          }
          
          .alert {
            padding: 1rem;
            border-radius: 8px;
            margin: 1rem 0;
          }
          
          .alert-info {
            background: #dbeafe;
            color: #1e40af;
            border-left: 4px solid #3b82f6;
          }
          
          .alert-success {
            background: #dcfce7;
            color: #166534;
            border-left: 4px solid #16a34a;
          }
          
          .hidden { display: none; }
          .text-center { text-align: center; }
          .text-left { text-align: left; }
          .font-bold { font-weight: 700; }
          .font-semibold { font-weight: 600; }
          .text-sm { font-size: 0.875rem; }
          .text-lg { font-size: 1.125rem; }
          .text-xl { font-size: 1.25rem; }
          .text-2xl { font-size: 1.5rem; }
          .text-3xl { font-size: 1.875rem; }
          .text-4xl { font-size: 2.25rem; }
          .mb-2 { margin-bottom: 0.5rem; }
          .mb-4 { margin-bottom: 1rem; }
          .mb-6 { margin-bottom: 1.5rem; }
          .mb-8 { margin-bottom: 2rem; }
          .mt-4 { margin-top: 1rem; }
          .mt-6 { margin-top: 1.5rem; }
          .p-4 { padding: 1rem; }
          .p-6 { padding: 1.5rem; }
          .space-y-2 > * + * { margin-top: 0.5rem; }
          .space-y-4 > * + * { margin-top: 1rem; }
          .space-y-6 > * + * { margin-top: 1.5rem; }
          .space-x-2 > * + * { margin-left: 0.5rem; }
          .flex { display: flex; }
          .items-center { align-items: center; }
          .justify-between { justify-content: space-between; }
          .cursor-pointer { cursor: pointer; }
          
          .fishbone-category {
            border: 2px solid;
            border-radius: 8px;
            padding: 1rem;
            margin: 0.5rem;
            transition: all 0.2s;
          }
          
          .fishbone-people { border-color: #ef4444; background: #fef2f2; }
          .fishbone-process { border-color: #3b82f6; background: #eff6ff; }
          .fishbone-environment { border-color: #10b981; background: #f0fdf4; }
          .fishbone-equipment { border-color: #f59e0b; background: #fffbeb; }
          .fishbone-materials { border-color: #8b5cf6; background: #faf5ff; }
          .fishbone-methods { border-color: #f97316; background: #fff7ed; }
          
          input[type="checkbox"] {
            margin-right: 0.5rem;
            transform: scale(1.1);
          }
          
          input[type="text"], textarea, select {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            font-size: 0.875rem;
          }
          
          input[type="text"]:focus, textarea:focus, select:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
        `}</style>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}