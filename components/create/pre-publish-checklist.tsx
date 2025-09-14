'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock,
  Shield,
  Upload,
  Settings,
  Users,
  Eye,
  Rocket,
  Download,
  ExternalLink,
  Copy,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'warning' | 'success' | 'error';
  required: boolean;
  details?: string;
}

interface PrePublishChecklistProps {
  formData: any;
  uploadStatus?: any;
  onPublish: () => void;
  onDryRun: () => void;
  className?: string;
}

export function PrePublishChecklist({ 
  formData, 
  uploadStatus, 
  onPublish, 
  onDryRun, 
  className 
}: PrePublishChecklistProps) {
  const [tosAccepted, setTosAccepted] = useState(false);
  const [ipfsNoticeAccepted, setIpfsNoticeAccepted] = useState(false);
  const [dryRunResult, setDryRunResult] = useState<any>(null);
  const [isRunningDryRun, setIsRunningDryRun] = useState(false);

  // Validation functions
  const validateAssets = (): ChecklistItem => {
    if (!uploadStatus?.completed) {
      return {
        id: 'assets',
        title: 'Assets Uploaded & Validated',
        description: 'All NFT assets must be uploaded and pass validation',
        status: 'error',
        required: true,
        details: 'Upload your collection assets first'
      };
    }

    if (uploadStatus.errors?.length > 0) {
      return {
        id: 'assets',
        title: 'Assets Uploaded & Validated',
        description: 'All NFT assets must be uploaded and pass validation',
        status: 'error',
        required: true,
        details: `${uploadStatus.errors.length} validation errors found`
      };
    }

    return {
      id: 'assets',
      title: 'Assets Uploaded & Validated',
      description: 'All NFT assets must be uploaded and pass validation',
      status: 'success',
      required: true,
      details: `${uploadStatus.totalFiles} files uploaded successfully`
    };
  };

  const validateSlug = (): ChecklistItem => {
    if (!formData.slug) {
      return {
        id: 'slug',
        title: 'URL Slug Available',
        description: 'Collection must have a unique URL slug',
        status: 'error',
        required: true,
        details: 'Slug is required'
      };
    }

    const slugRegex = /^[a-z0-9-]{3,32}$/;
    if (!slugRegex.test(formData.slug)) {
      return {
        id: 'slug',
        title: 'URL Slug Available',
        description: 'Collection must have a unique URL slug',
        status: 'error',
        required: true,
        details: 'Invalid slug format'
      };
    }

    // Simulate availability check (in real app, this would be an API call)
    const isAvailable = Math.random() > 0.3; // 70% chance available
    
    return {
      id: 'slug',
      title: 'URL Slug Available',
      description: 'Collection must have a unique URL slug',
      status: isAvailable ? 'success' : 'error',
      required: true,
      details: isAvailable ? `"${formData.slug}" is available` : `"${formData.slug}" is already taken`
    };
  };

  const validateXRPLFlags = (): ChecklistItem => {
    // XRPL flags are always valid (they have defaults)
    return {
      id: 'xrpl-flags',
      title: 'XRPL Flags Valid',
      description: 'NFT flags and transfer fee configuration',
      status: 'success',
      required: true,
      details: `Transfer fee: ${((formData.transferFee || 0) / 100).toFixed(2)}%`
    };
  };

  const validateRoyalties = (): ChecklistItem => {
    if (!formData.partners || formData.partners.length === 0) {
      return {
        id: 'royalties',
        title: 'Royalty & Partners = 100%',
        description: 'Revenue split must total exactly 100%',
        status: 'warning',
        required: false,
        details: 'No partners configured (100% to creator)'
      };
    }

    const totalPercentage = formData.partners.reduce((sum: number, p: any) => sum + p.percentage, 0);
    
    if (totalPercentage !== 100) {
      return {
        id: 'royalties',
        title: 'Royalty & Partners = 100%',
        description: 'Revenue split must total exactly 100%',
        status: 'error',
        required: true,
        details: `Current total: ${totalPercentage}%`
      };
    }

    return {
      id: 'royalties',
      title: 'Royalty & Partners = 100%',
      description: 'Revenue split must total exactly 100%',
      status: 'success',
      required: true,
      details: `${formData.partners.length} partners, 100% allocated`
    };
  };

  const validateAllowlist = (): ChecklistItem => {
    if (!formData.enableAllowlist) {
      return {
        id: 'allowlist',
        title: 'Allowlist Configuration',
        description: 'Allowlist settings and entries validation',
        status: 'success',
        required: false,
        details: 'Allowlist disabled (public mint only)'
      };
    }

    const validEntries = (formData.allowlistEntries || []).filter((e: any) => !e.error);
    const errorEntries = (formData.allowlistEntries || []).filter((e: any) => e.error);

    if (errorEntries.length > 0) {
      return {
        id: 'allowlist',
        title: 'Allowlist Configuration',
        description: 'Allowlist settings and entries validation',
        status: 'error',
        required: true,
        details: `${errorEntries.length} invalid entries`
      };
    }

    return {
      id: 'allowlist',
      title: 'Allowlist Configuration',
      description: 'Allowlist settings and entries validation',
      status: 'success',
      required: true,
      details: `${validEntries.length} valid entries`
    };
  };

  const validateSchedule = (): ChecklistItem => {
    const hasPresale = formData.enablePresale && formData.presaleDate && formData.presaleTime;
    const hasPublic = formData.enablePublicMint && formData.publicDate && formData.publicTime;

    if (!hasPresale && !hasPublic) {
      return {
        id: 'schedule',
        title: 'Mint Schedule',
        description: 'At least one mint phase must be configured',
        status: 'error',
        required: true,
        details: 'No mint phases configured'
      };
    }

    return {
      id: 'schedule',
      title: 'Mint Schedule',
      description: 'At least one mint phase must be configured',
      status: 'success',
      required: true,
      details: `${hasPresale ? 'Presale' : ''}${hasPresale && hasPublic ? ' + ' : ''}${hasPublic ? 'Public' : ''} configured`
    };
  };

  const validatePricing = (): ChecklistItem => {
    if (!formData.price || parseFloat(formData.price) < 0.000001) {
      return {
        id: 'pricing',
        title: 'Pricing Configuration',
        description: 'Valid pricing must be set',
        status: 'error',
        required: true,
        details: 'Invalid or missing price'
      };
    }

    if (!formData.supply || parseInt(formData.supply) < 1) {
      return {
        id: 'pricing',
        title: 'Pricing Configuration',
        description: 'Valid pricing must be set',
        status: 'error',
        required: true,
        details: 'Invalid or missing supply'
      };
    }

    return {
      id: 'pricing',
      title: 'Pricing Configuration',
      description: 'Valid pricing must be set',
      status: 'success',
      required: true,
      details: `${formData.price} XRP × ${formData.supply} supply`
    };
  };

  const validatePreviewImages = (): ChecklistItem => {
    if (!formData.bannerImage && !formData.profileImage) {
      return {
        id: 'preview',
        title: 'Preview Images',
        description: 'Banner and profile images for collection display',
        status: 'warning',
        required: false,
        details: 'No preview images uploaded'
      };
    }

    return {
      id: 'preview',
      title: 'Preview Images',
      description: 'Banner and profile images for collection display',
      status: 'success',
      required: false,
      details: `${formData.bannerImage ? 'Banner' : ''}${formData.bannerImage && formData.profileImage ? ' + ' : ''}${formData.profileImage ? 'Profile' : ''} uploaded`
    };
  };

  // Get all checklist items
  const checklistItems = [
    validateAssets(),
    validateSlug(),
    validateXRPLFlags(),
    validateRoyalties(),
    validateAllowlist(),
    validateSchedule(),
    validatePricing(),
    validatePreviewImages()
  ];

  const requiredItems = checklistItems.filter(item => item.required);
  const optionalItems = checklistItems.filter(item => !item.required);
  
  const successCount = checklistItems.filter(item => item.status === 'success').length;
  const errorCount = checklistItems.filter(item => item.status === 'error').length;
  const warningCount = checklistItems.filter(item => item.status === 'warning').length;
  
  const requiredErrors = requiredItems.filter(item => item.status === 'error').length;
  const canPublish = requiredErrors === 0 && tosAccepted && ipfsNoticeAccepted;
  
  const completionPercentage = (successCount / checklistItems.length) * 100;

  const handleDryRun = async () => {
    setIsRunningDryRun(true);
    
    // Simulate dry run
    setTimeout(() => {
      setDryRunResult({
        estimatedGas: '0.012 XRP',
        sampleNFTokenID: 'NFT' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        payloadSize: '2.4 KB',
        validationsPassed: requiredErrors === 0,
        warnings: warningCount,
        timestamp: new Date().toISOString()
      });
      setIsRunningDryRun(false);
    }, 3000);
  };

  const downloadDryRunReport = () => {
    if (!dryRunResult) return;
    
    const report = {
      collection: {
        name: formData.name,
        slug: formData.slug,
        supply: formData.supply,
        price: formData.price
      },
      dryRun: dryRunResult,
      checklist: checklistItems,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.slug || 'collection'}-dry-run-report.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Pre-Publish Checklist</span>
          </CardTitle>
          <CardDescription>
            Ensure your collection is ready for launch
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Completion Progress</span>
              <span>{successCount}/{checklistItems.length} items complete</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-green-600">{successCount}</div>
              <div className="text-xs text-green-800">Passed</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-yellow-600">{warningCount}</div>
              <div className="text-xs text-yellow-800">Warnings</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-red-600">{errorCount}</div>
              <div className="text-xs text-red-800">Errors</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Required Items */}
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Required Items</CardTitle>
          <CardDescription>
            These items must pass before you can publish
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {requiredItems.map((item) => (
            <div key={item.id} className="flex items-start space-x-3 p-3 border rounded-lg">
              {getStatusIcon(item.status)}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{item.title}</h4>
                  <Badge 
                    variant={item.status === 'success' ? 'default' : 'destructive'}
                    className={item.status === 'success' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {item.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                {item.details && (
                  <p className="text-xs text-gray-500 mt-1">{item.details}</p>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Optional Items */}
      {optionalItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600">Optional Items</CardTitle>
            <CardDescription>
              Recommended for better collection presentation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {optionalItems.map((item) => (
              <div key={item.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                {getStatusIcon(item.status)}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{item.title}</h4>
                    <Badge variant="outline">
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  {item.details && (
                    <p className="text-xs text-gray-500 mt-1">{item.details}</p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Legal Agreements */}
      <Card>
        <CardHeader>
          <CardTitle>Legal & Compliance</CardTitle>
          <CardDescription>
            Required agreements before publishing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="tos"
              checked={tosAccepted}
              onChange={(e) => setTosAccepted(e.target.checked)}
              className="mt-1"
            />
            <div className="flex-1">
              <label htmlFor="tos" className="text-sm font-medium cursor-pointer">
                I agree to the Terms of Service and Creator Agreement
              </label>
              <p className="text-xs text-gray-500 mt-1">
                By publishing, you agree to our platform terms and creator responsibilities
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="ipfs"
              checked={ipfsNoticeAccepted}
              onChange={(e) => setIpfsNoticeAccepted(e.target.checked)}
              className="mt-1"
            />
            <div className="flex-1">
              <label htmlFor="ipfs" className="text-sm font-medium cursor-pointer">
                I understand IPFS storage is public and permanent
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Your NFT metadata and assets will be stored on IPFS and cannot be deleted
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dry Run */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="w-5 h-5" />
            <span>Testnet Dry Run</span>
          </CardTitle>
          <CardDescription>
            Test your collection on testnet before mainnet launch
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleDryRun}
            disabled={isRunningDryRun || requiredErrors > 0}
            variant="outline"
            className="w-full"
          >
            {isRunningDryRun ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Eye className="w-4 h-4 mr-2" />
            )}
            {isRunningDryRun ? 'Running Dry Run...' : 'Run Testnet Dry Run'}
          </Button>
          
          {dryRunResult && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-green-900">Dry Run Results</h4>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={downloadDryRunReport}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-green-800">
                <div>
                  <span className="font-medium">Estimated Gas:</span>
                  <div>{dryRunResult.estimatedGas}</div>
                </div>
                <div>
                  <span className="font-medium">Sample NFTokenID:</span>
                  <div className="font-mono text-xs">{dryRunResult.sampleNFTokenID}</div>
                </div>
                <div>
                  <span className="font-medium">Payload Size:</span>
                  <div>{dryRunResult.payloadSize}</div>
                </div>
                <div>
                  <span className="font-medium">Status:</span>
                  <div className="flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Ready for mainnet</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Publish Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Rocket className="w-5 h-5" />
            <span>Launch Collection</span>
          </CardTitle>
          <CardDescription>
            Deploy your collection to the XRPL mainnet
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!canPublish && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-red-800">
                <AlertCircle className="w-4 h-4" />
                <span className="font-medium">Cannot Publish Yet</span>
              </div>
              <div className="mt-2 text-sm text-red-700">
                <p>Please resolve the following issues:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  {requiredItems.filter(item => item.status === 'error').map(item => (
                    <li key={item.id}>{item.title}</li>
                  ))}
                  {!tosAccepted && <li>Accept Terms of Service</li>}
                  {!ipfsNoticeAccepted && <li>Accept IPFS Storage Notice</li>}
                </ul>
              </div>
            </div>
          )}
          
          <Button
            onClick={onPublish}
            disabled={!canPublish}
            className="w-full"
            size="lg"
          >
            <Rocket className="w-5 h-5 mr-2" />
            Publish Collection to Mainnet
          </Button>
          
          {canPublish && (
            <p className="text-xs text-center text-gray-500">
              ✅ All checks passed • Ready to launch
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}