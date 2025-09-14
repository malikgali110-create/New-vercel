'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FolderOpen, AlertCircle, CheckCircle2, FileText, Image } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ValidationResult } from '@/lib/upload-utils';

interface FileDropZoneProps {
  onFilesSelected: (files: File[]) => void;
  validation?: ValidationResult | null;
  isUploading?: boolean;
  error?: string | null;
  className?: string;
}

export function FileDropZone({ 
  onFilesSelected, 
  validation, 
  isUploading = false,
  error,
  className 
}: FileDropZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesSelected(acceptedFiles);
  }, [onFilesSelected]);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    disabled: isUploading,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false),
    onDropRejected: () => setIsDragActive(false)
  });

  const getStatusIcon = () => {
    if (validation?.valid) {
      return <CheckCircle2 className="w-8 h-8 text-green-500" />;
    }
    if (validation && !validation.valid) {
      return <AlertCircle className="w-8 h-8 text-red-500" />;
    }
    return <Upload className="w-8 h-8 text-gray-400" />;
  };

  const getStatusText = () => {
    if (validation?.valid) {
      return 'Collection structure validated ✅';
    }
    if (validation && !validation.valid) {
      return `${validation.errors.length} validation errors found`;
    }
    return 'Drop your collection folder here';
  };

  const getStatusColor = () => {
    if (validation?.valid) return 'text-green-600';
    if (validation && !validation.valid) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={cn(
          'relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200',
          isDragActive
            ? 'border-blue-400 bg-blue-50'
            : validation?.valid
            ? 'border-green-300 bg-green-50'
            : validation && !validation.valid
            ? 'border-red-300 bg-red-50'
            : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100',
          isUploading && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center space-y-4">
          {getStatusIcon()}
          
          <div className="space-y-2">
            <h3 className={cn('text-lg font-semibold', getStatusColor())}>
              {getStatusText()}
            </h3>
            
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Upload your complete NFT collection with proper folder structure:
              <br />
              <code className="text-xs bg-gray-100 px-1 rounded">
                collection.json, items/*.json, media/*
              </code>
            </p>
          </div>
          
          <button
            type="button"
            onClick={open}
            disabled={isUploading}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FolderOpen className="w-4 h-4 mr-2" />
            Browse Files
          </button>
        </div>
      </div>

      {/* File Structure Guide */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2 flex items-center">
          <FileText className="w-4 h-4 mr-2" />
          Required File Structure
        </h4>
        <div className="text-sm text-blue-800 space-y-1 font-mono">
          <div>📁 collection_root/</div>
          <div className="ml-4">📄 collection.json</div>
          <div className="ml-4">📁 items/</div>
          <div className="ml-8">📄 1.json, 2.json, ...</div>
          <div className="ml-4">📁 media/</div>
          <div className="ml-8">🖼️ 1.png, 2.jpg, ...</div>
        </div>
      </div>

      {/* Validation Results */}
      {validation && (
        <div className={cn(
          'border rounded-lg p-4',
          validation.valid
            ? 'border-green-200 bg-green-50'
            : 'border-red-200 bg-red-50'
        )}>
          <div className="flex items-start space-x-3">
            {validation.valid ? (
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
            )}
            
            <div className="flex-1 space-y-3">
              <div>
                <h4 className={cn(
                  'font-medium',
                  validation.valid ? 'text-green-900' : 'text-red-900'
                )}>
                  {validation.valid ? 'Validation Passed' : 'Validation Failed'}
                </h4>
                
                {validation.stats && (
                  <div className="text-sm text-gray-600 mt-1">
                    {validation.stats.totalFiles} files • 
                    {validation.stats.metadataFiles} metadata • 
                    {validation.stats.mediaFiles} media
                    {validation.stats.collectionFile && ' • collection.json ✓'}
                  </div>
                )}
              </div>

              {/* Errors */}
              {validation.errors.length > 0 && (
                <div>
                  <h5 className="font-medium text-red-900 mb-1">Errors:</h5>
                  <ul className="text-sm text-red-800 space-y-1">
                    {validation.errors.map((error, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Warnings */}
              {validation.warnings.length > 0 && (
                <div>
                  <h5 className="font-medium text-yellow-900 mb-1">Warnings:</h5>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    {validation.warnings.map((warning, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Orphan Files */}
              {validation.stats && (
                validation.stats.orphanMedia.length > 0 || 
                validation.stats.orphanMetadata.length > 0
              ) && (
                <div>
                  <h5 className="font-medium text-orange-900 mb-1">Orphan Files:</h5>
                  <div className="text-sm text-orange-800 space-y-1">
                    {validation.stats.orphanMedia.map((file, index) => (
                      <div key={index}>Media without metadata: {file}</div>
                    ))}
                    {validation.stats.orphanMetadata.map((file, index) => (
                      <div key={index}>Metadata without media: {file}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}