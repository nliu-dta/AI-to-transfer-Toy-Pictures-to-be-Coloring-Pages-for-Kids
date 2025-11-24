import React from 'react';
import { Download, RefreshCw, Printer, ArrowRight } from 'lucide-react';

interface ResultViewProps {
  originalUrl: string;
  generatedUrl: string | null;
  onReset: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ originalUrl, generatedUrl, onReset }) => {
  const handleDownload = () => {
    if (!generatedUrl) return;
    const link = document.createElement('a');
    link.href = generatedUrl;
    link.download = `toy-coloring-page-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    if (!generatedUrl) return;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Coloring Page</title>
            <style>
              body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; }
              img { max-width: 100%; max-height: 100%; object-fit: contain; }
              @media print {
                body { -webkit-print-color-adjust: exact; }
              }
            </style>
          </head>
          <body>
            <img src="${generatedUrl}" onload="window.print();window.close()" />
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-8 items-stretch">
        
        {/* Original Image Card */}
        <div className="flex-1 bg-white p-4 rounded-3xl shadow-sm border-2 border-gray-100 flex flex-col">
          <div className="mb-3 flex items-center justify-between">
             <h3 className="text-lg font-bold text-gray-700 fun-font">Original Toy</h3>
          </div>
          <div className="relative flex-grow min-h-[300px] bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
             <img 
               src={originalUrl} 
               alt="Original Upload" 
               className="absolute inset-0 w-full h-full object-contain p-4"
             />
          </div>
        </div>

        {/* Process Flow Icon (Mobile: Down, Desktop: Right) */}
        <div className="flex items-center justify-center text-crayon-blue">
          <ArrowRight className="w-8 h-8 hidden md:block" />
          <div className="md:hidden">⬇️</div>
        </div>

        {/* Generated Image Card */}
        <div className="flex-1 bg-white p-4 rounded-3xl shadow-xl border-4 border-crayon-yellow flex flex-col relative overflow-hidden">
           <div className="absolute top-0 right-0 bg-crayon-yellow text-xs font-bold px-3 py-1 rounded-bl-xl text-crayon-dark">
             Ready to Color!
           </div>
          <div className="mb-3 flex items-center justify-between">
             <h3 className="text-lg font-bold text-gray-700 fun-font">Coloring Page</h3>
          </div>
          
          <div className="relative flex-grow min-h-[300px] bg-white rounded-2xl overflow-hidden border border-gray-200 pattern-grid">
             {generatedUrl ? (
               <img 
                 src={generatedUrl} 
                 alt="Coloring Page" 
                 className="absolute inset-0 w-full h-full object-contain p-4"
               />
             ) : (
               <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                 Loading...
               </div>
             )}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
             <button 
               onClick={handleDownload}
               disabled={!generatedUrl}
               className="flex-1 bg-crayon-blue hover:bg-teal-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
             >
               <Download className="w-5 h-5" />
               Download
             </button>
             <button 
               onClick={handlePrint}
               disabled={!generatedUrl}
               className="flex-1 bg-white border-2 border-crayon-dark hover:bg-gray-50 text-crayon-dark font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
             >
               <Printer className="w-5 h-5" />
               Print
             </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <button
          onClick={onReset}
          className="text-gray-500 hover:text-crayon-red font-semibold flex items-center gap-2 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Start Over with New Photo
        </button>
      </div>
    </div>
  );
};

export default ResultView;
