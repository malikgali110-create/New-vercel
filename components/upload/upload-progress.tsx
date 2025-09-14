'use client';

import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Pause, 
  Play, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Clock,
  Upload,
  RotateCcw,
  FileText,
  Image
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { UploadProgress as UploadProgressType } from '@/lib/upload-utils';

interface UploadProgressProps {
  uploads: UploadProgressType[];
  totalProgress: number;
  isUploading: boolean;
  isPaused: boolean;
  error?: string | null;
  onPause: () => void;
  onResume: () => void;
  onCancel: () => void;
  onRetry: (fileId: string) => void;
  className?: string;
}

export function UploadProgress({
  uploads,
  totalProgress,
  isUploading,
  isPaused,
  error,
  onPause,
  onResume,
  onCancel,
  onRetry,
  className
}: UploadProgressProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const formatSpeed = (bytesPerSecond: number) => {
    return formatFileSize(bytesPerSecond) + '/s';
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext || '')) {
      return <Image className="w-4 h-4" />;
    }
    return <FileText className="w-4 h-4" />;
  };

  const getStatusIcon = (status: UploadProgressType['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'uploading':
        return <Upload className="w-4 h-4 text-blue-500 animate-pulse" />;
      case 'paused':
        return <Pause className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getProgressPercentage = (upload: UploadProgressType) => {
    return upload.totalSize > 0 ? (upload.uploadedSize / upload.totalSize) * 100 : 0;
  };

  const completedUploads = uploads.filter(u => u.status === 'completed').length;
  const failedUploads = uploads.filter(u => u.status === 'error').length;
  const totalUploads = uploads.length;

  if (uploads.length === 0) {
    return null;
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Overall Progress */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              {isUploading && !isPaused ? (
                <Upload className="w-5 h-5 text-blue-500 animate-pulse" />
              ) : isPaused ? (
                <Pause className="w-5 h-5 text-yellow-500" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              )}
              <h3 className="font-semibold text-gray-900">
                {isUploading && !isPaused
                  ? 'Uploading Collection...'
                  : isPaused
                  ? 'Upload Paused'
                  : 'Upload Complete'
                }
              </h3>
            </div>
            
            <div className="text-sm text-gray-500">
              {completedUploads}/{totalUploads} files
              {failedUploads > 0 && (
                <span className="text-red-500 ml-2">({failedUploads} failed)</span>
              )}
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center space-x-2">
            {isUploading && (
              <>
                {isPaused ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onResume}
                    className="flex items-center space-x-1"
                  >
                    <Play className="w-4 h-4" />
                    <span>Resume</span>
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onPause}
                    className="flex items-center space-x-1"
                  >
                    <Pause className="w-4 h-4" />
                    <span>Pause</span>
                  </Button>
                )}
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onCancel}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="space-y-2">
          <Progress value={totalProgress} className="h-2" />
          <div className="flex justify-between text-sm text-gray-500">
            <span>{Math.round(totalProgress)}% complete</span>
            <span>
              {formatFileSize(
                uploads.reduce((sum, u) => sum + u.uploadedSize, 0)
              )} / {formatFileSize(
                uploads.reduce((sum, u) => sum + u.totalSize, 0)
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Individual File Progress */}
      <div className="space-y-2">
        <h4 className="font-medium text-gray-900">File Progress</h4>
        <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100 max-h-64 overflow-y-auto">
          {uploads.map((upload) => {
            const progress = getProgressPercentage(upload);
            
            return (
              <div key={upload.fileId} className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    {getFileIcon(upload.fileName)}
                    {getStatusIcon(upload.status)}
                    <span className="font-medium text-sm text-gray-900 truncate">
                      {upload.fileName}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">
                      {formatFileSize(upload.uploadedSize)} / {formatFileSize(upload.totalSize)}
                    </span>
                    
                    {upload.status === 'error' && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onRetry(upload.fileId)}
                        className="h-6 px-2 text-xs"
                      >
                        <RotateCcw className="w-3 h-3 mr-1" />
                        Retry
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Progress 
                    value={progress} 
                    className={cn(
                      'h-1.5',
                      upload.status === 'error' && 'bg-red-100',
                      upload.status === 'completed' && 'bg-green-100'
                    )}
                  />
                  
                  <div className="flex justify-between text-xs text-gray-500">
                    <span className={cn(
                      upload.status === 'error' && 'text-red-600',
                      upload.status === 'completed' && 'text-green-600'
                    )}>
                      {upload.status === 'error' 
                        ? upload.error || 'Upload failed'
                        : upload.status === 'completed'
                        ? 'Complete'
                        : upload.status === 'uploading'
                        ? 'Uploading...'
                        : upload.status === 'paused'
                        ? 'Paused'
                        : 'Pending'
                      }
                    </span>
                    
                    <span>{Math.round(progress)}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upload Summary */}
      {!isUploading && uploads.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Upload Summary</h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{completedUploads}</div>
              <div className="text-gray-500">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{failedUploads}</div>
              <div className="text-gray-500">Failed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">{totalUploads}</div>
              <div className="text-gray-500">Total</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}