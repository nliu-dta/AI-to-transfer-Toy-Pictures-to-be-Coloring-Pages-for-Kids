import React from 'react';
import { Terminal, Github, Play, FileCode, AlertCircle, Download } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-[#58a6ff] selection:text-white p-6 flex flex-col items-center">
      <div className="max-w-4xl w-full space-y-8">
        
        {/* Header */}
        <div className="border-b border-[#30363d] pb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
             <span>🎨 ToyToColor</span>
             <span className="bg-[#1f6feb] text-white text-xs px-2 py-1 rounded-full uppercase tracking-wide">Python Edition</span>
          </h1>
          <p className="text-[#8b949e] text-lg">
            Streamlit application powered by Google Gemini 2.5
          </p>
        </div>

        {/* Action Card */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-md p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Terminal className="w-6 h-6 text-[#58a6ff]" />
            Quick Start
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-[#8b949e] mb-2 uppercase tracking-wider">1. Install Dependencies</h3>
              <div className="bg-[#0d1117] border border-[#30363d] rounded p-4 font-mono text-sm text-[#e6edf3] flex justify-between items-center group">
                 <code>pip install -r requirements.txt</code>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#8b949e] mb-2 uppercase tracking-wider">2. Run Application</h3>
              <div className="bg-[#0d1117] border border-[#30363d] rounded p-4 font-mono text-sm text-[#e6edf3]">
                 <code>streamlit run app.py</code>
              </div>
            </div>

            <div className="bg-[#1f6feb]/10 border border-[#1f6feb]/30 rounded p-4 flex gap-3 items-start">
               <AlertCircle className="w-5 h-5 text-[#58a6ff] mt-0.5 shrink-0" />
               <div className="text-sm text-[#8b949e]">
                 <strong className="text-[#58a6ff]">Note:</strong> Make sure you have set your <code className="bg-[#30363d] px-1 rounded text-white">API_KEY</code> environment variable before running.
               </div>
            </div>
          </div>
        </div>

        {/* Code Preview */}
        <div className="grid md:grid-cols-2 gap-6">
           <div className="bg-[#161b22] border border-[#30363d] rounded-md p-6">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <FileCode className="w-5 h-5 text-green-400" />
                Project Structure
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-[#8b949e]">📄</span>
                  <span className="text-[#58a6ff] font-mono">app.py</span>
                  <span className="text-[#8b949e] text-xs ml-auto">Main Application</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#8b949e]">📄</span>
                  <span className="text-[#58a6ff] font-mono">requirements.txt</span>
                  <span className="text-[#8b949e] text-xs ml-auto">Dependencies</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#8b949e]">📄</span>
                  <span className="text-[#58a6ff] font-mono">README.md</span>
                  <span className="text-[#8b949e] text-xs ml-auto">Documentation</span>
                </li>
              </ul>
           </div>

           <div className="bg-[#161b22] border border-[#30363d] rounded-md p-6">
             <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Github className="w-5 h-5 text-white" />
                Ready for GitHub
             </h3>
             <p className="text-[#8b949e] text-sm mb-4">
               This project is structured to be pushed directly to GitHub. The code is pure Python and uses standard libraries.
             </p>
             <button className="w-full bg-[#238636] hover:bg-[#2ea043] text-white font-bold py-2 px-4 rounded transition-colors flex items-center justify-center gap-2">
               <Download className="w-4 h-4" />
               Download Files
             </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default App;