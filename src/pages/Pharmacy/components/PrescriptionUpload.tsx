import React, { useState, useRef } from 'react';
import { Upload, FileCheck, AlertCircle, Loader2 } from 'lucide-react';

export const PrescriptionUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (!validateFile(selectedFile)) {
        setUploadStatus('error');
        setErrorMessage('Invalid file type. Please upload JPG, PNG, or PDF.');
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setUploadStatus('idle');
      setErrorMessage(null);
    }
  };

  const validateFile = (f: File) => {
    const allowed = ['image/jpeg', 'image/png', 'application/pdf'];
    return allowed.includes(f.type);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const dropped = e.dataTransfer.files[0];
      if (!validateFile(dropped)) {
        setUploadStatus('error');
        setErrorMessage('Invalid file type. Please upload JPG, PNG, or PDF.');
        return;
      }
      setFile(dropped);
      setPreview(URL.createObjectURL(dropped));
      setUploadStatus('idle');
      setErrorMessage(null);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    setIsUploading(true);
    setProgress(0);
    // Simulate API call with progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + 15, 100);
        if (next === 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadStatus('success');
          // Reset after 3 seconds
          setTimeout(() => {
            setFile(null);
            setPreview(null);
            setUploadStatus('idle');
            setProgress(0);
          }, 3000);
        }
        return next;
      });
    }, 200);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md border border-slate-100 my-8 relative" aria-busy={isUploading}>
      {uploadStatus === 'success' && (
        <div role="status" aria-live="assertive" className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg bg-gradient-to-r from-green-600 via-teal-600 to-indigo-600 text-white">
          <FileCheck className="w-5 h-5" />
          <span>Uploaded successfully. We’ll contact you shortly.</span>
        </div>
      )}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-teal-600 to-indigo-600">Upload Prescription</h2>
        <p className="text-slate-500 mt-2">
          Upload a clear photo of your doctor's prescription. Our pharmacists will verify and process your order.
        </p>
      </div>

      <div className="space-y-6">
        <div
          ref={dropRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onKeyDown={(e) => {
            if (!preview && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          onClick={() => {
            if (!preview) fileInputRef.current?.click();
          }}
          role="button"
          tabIndex={0}
          aria-label="Upload prescription drop zone"
          aria-invalid={uploadStatus === 'error'}
          className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-white transition-colors relative ${
            isDragging ? 'border-primary-400 bg-primary-50' : 'border-slate-300 hover:border-primary-300 hover:bg-primary-50'
          }`}
        >
          
          {preview ? (
            <div className="relative w-full h-64">
              <img 
                src={preview} 
                alt="Prescription Preview" 
                className="w-full h-full object-contain rounded-md"
              />
              <button 
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                  setUploadStatus('idle');
                  setErrorMessage(null);
                  setProgress(0);
                }}
                className="absolute top-2 right-2 bg-white/80 p-1 rounded-full text-rose-500 hover:text-rose-700 shadow"
              >
                <AlertCircle size={20} />
              </button>
            </div>
          ) : (
            <>
              <Upload className="w-12 h-12 text-primary-600 mb-4" />
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="bg-gradient-to-r from-primary-50 via-teal-50 to-indigo-50 text-primary-700 font-semibold px-4 py-2 rounded-lg border border-primary-200 hover:brightness-110 transition-colors shadow-sm">
                  Select a file
                </span>
                <input 
                  id="file-upload" 
                  type="file" 
                  className="hidden" 
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  aria-describedby="file-help"
                />
              </label>
              <p id="file-help" className="mt-2 text-sm text-slate-400">Supported: JPG, PNG, PDF. Or drag and drop here.</p>
            </>
          )}
        </div>

        {uploadStatus === 'error' && errorMessage && (
          <div role="alert" aria-live="polite" className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-lg flex items-center justify-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {uploadStatus === 'success' ? (
          <div role="status" aria-live="polite" className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg flex items-center justify-center gap-2">
            <FileCheck className="w-5 h-5" />
            <span>Prescription uploaded successfully! We will contact you shortly.</span>
          </div>
        ) : (
          <div className="space-y-3">
            <button
              onClick={handleUpload}
              disabled={!file || isUploading}
              className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                !file 
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-primary-600 via-teal-600 to-indigo-600 text-white hover:brightness-110 shadow-lg hover:shadow-xl'
              }`}
              aria-disabled={!file || isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Submit Prescription'
              )}
            </button>

            {isUploading && (
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-600 via-teal-600 to-indigo-600 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600">
        <div className="flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-100 to-indigo-100 text-teal-700 flex items-center justify-center mb-2 font-bold">1</div>
          <p>Upload clear image</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-100 to-pink-100 text-indigo-700 flex items-center justify-center mb-2 font-bold">2</div>
          <p>Pharmacist verifies</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-100 to-teal-100 text-pink-700 flex items-center justify-center mb-2 font-bold">3</div>
          <p>Delivery to Doorstep</p>
        </div>
      </div>
    </div>
  );
};
