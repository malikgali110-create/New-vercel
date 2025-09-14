'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Upload,
  Download,
  FileText,
  CheckCircle2,
  AlertCircle,
  Info,
  X,
  Plus,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDropzone } from 'react-dropzone';

interface AllowlistEntry {
  wallet: string;
  maxMints: number;
  price?: number;
  startsAt?: string;
  endsAt?: string;
  error?: string;
}

interface AllowlistManagementProps {
  formData: any;
  onFormDataChange: (data: any) => void;
  className?: string;
}

export function AllowlistManagement({ formData, onFormDataChange, className }: AllowlistManagementProps) {
  const [csvData, setCsvData] = useState<string>('');
  const [parsedEntries, setParsedEntries] = useState<AllowlistEntry[]>([]);
  const [parseErrors, setParseErrors] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newEntry, setNewEntry] = useState<Partial<AllowlistEntry>>({ wallet: '', maxMints: 1 });

  const updateFormData = (field: string, value: any) => {
    onFormDataChange({
      ...formData,
      [field]: value
    });
  };

  const validateWallet = (wallet: string): boolean => {
    // Basic XRPL wallet validation (simplified)
    return wallet.length >= 25 && wallet.length <= 34 && wallet.startsWith('r');
  };

  const parseCSV = (csvText: string): { entries: AllowlistEntry[], errors: string[] } => {
    const lines = csvText.trim().split('\n');
    const entries: AllowlistEntry[] = [];
    const errors: string[] = [];

    if (lines.length === 0) {
      return { entries, errors: ['CSV is empty'] };
    }

    // Skip header if present
    const startIndex = lines[0].toLowerCase().includes('wallet') ? 1 : 0;

    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const columns = line.split(',').map(col => col.trim());
      const rowNum = i + 1;

      if (columns.length < 2) {
        errors.push(`Row ${rowNum}: Missing required columns`);
        continue;
      }

      const wallet = columns[0];
      const maxMints = parseInt(columns[1]);
      const price = columns[2] ? parseFloat(columns[2]) : undefined;
      const startsAt = columns[3] || undefined;
      const endsAt = columns[4] || undefined;

      let entryError = '';

      if (!validateWallet(wallet)) {
        entryError = 'Invalid wallet address';
      } else if (isNaN(maxMints) || maxMints < 1) {
        entryError = 'Invalid max mints (must be ≥ 1)';
      } else if (price !== undefined && (isNaN(price) || price < 0)) {
        entryError = 'Invalid price';
      }

      entries.push({
        wallet,
        maxMints,
        price,
        startsAt,
        endsAt,
        error: entryError || undefined
      });

      if (entryError) {
        errors.push(`Row ${rowNum}: ${entryError}`);
      }
    }

    return { entries, errors };
  };

  const handleCSVUpload = (csvText: string) => {
    setCsvData(csvText);
    const { entries, errors } = parseCSV(csvText);
    setParsedEntries(entries);
    setParseErrors(errors);
    updateFormData('allowlistEntries', entries.filter(e => !e.error));
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        handleCSVUpload(text);
      };
      reader.readAsText(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'text/plain': ['.txt']
    },
    multiple: false
  });

  const addManualEntry = () => {
    if (!newEntry.wallet || !newEntry.maxMints) return;

    const entry: AllowlistEntry = {
      wallet: newEntry.wallet,
      maxMints: newEntry.maxMints,
      price: newEntry.price,
      startsAt: newEntry.startsAt,
      endsAt: newEntry.endsAt
    };

    if (!validateWallet(entry.wallet)) {
      entry.error = 'Invalid wallet address';
    }

    const updatedEntries = [...parsedEntries, entry];
    setParsedEntries(updatedEntries);
    updateFormData('allowlistEntries', updatedEntries.filter(e => !e.error));
    setNewEntry({ wallet: '', maxMints: 1 });
  };

  const removeEntry = (index: number) => {
    const updatedEntries = parsedEntries.filter((_, i) => i !== index);
    setParsedEntries(updatedEntries);
    updateFormData('allowlistEntries', updatedEntries.filter(e => !e.error));
  };

  const downloadTemplate = () => {
    const template = `wallet,max_mints,price,starts_at,ends_at
rExampleWallet1234567890123456789,5,0.8,2024-01-15T10:00,2024-01-20T10:00
rExampleWallet2345678901234567890,3,,2024-01-16T12:00,
rExampleWallet3456789012345678901,10,0.5,,`;
    
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'allowlist-template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadErrors = () => {
    if (parseErrors.length === 0) return;
    
    const errorText = parseErrors.join('\n');
    const blob = new Blob([errorText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'allowlist-errors.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredEntries = parsedEntries.filter(entry => 
    entry.wallet.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validEntries = parsedEntries.filter(e => !e.error);
  const errorEntries = parsedEntries.filter(e => e.error);
  const uniqueWallets = new Set(validEntries.map(e => e.wallet)).size;
  const totalMintable = validEntries.reduce((sum, e) => sum + e.maxMints, 0);

  return (
    <div className={cn('space-y-6', className)}>
      {/* Enable Allowlist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Allowlist Configuration</span>
          </CardTitle>
          <CardDescription>
            Manage early access and special pricing for selected wallets
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Enable Allowlist</Label>
              <p className="text-sm text-gray-500">Restrict minting to pre-approved wallets</p>
            </div>
            <Switch
              checked={formData.enableAllowlist}
              onCheckedChange={(checked) => updateFormData('enableAllowlist', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {formData.enableAllowlist && (
        <>
          {/* CSV Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>Import Allowlist</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadTemplate}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Template
                </Button>
              </CardTitle>
              <CardDescription>
                Upload a CSV file with wallet addresses and mint limits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* File Drop Zone */}
              <div
                {...getRootProps()}
                className={cn(
                  'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
                  isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                )}
              >
                <input {...getInputProps()} />
                <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                {isDragActive ? (
                  <p className="text-blue-600">Drop the CSV file here...</p>
                ) : (
                  <div className="space-y-1">
                    <p className="text-gray-600">Drag & drop a CSV file here, or click to select</p>
                    <p className="text-xs text-gray-500">
                      Supported format: wallet, max_mints, price (optional), starts_at (optional), ends_at (optional)
                    </p>
                  </div>
                )}
              </div>

              {/* Manual CSV Input */}
              <div className="space-y-2">
                <Label htmlFor="csvInput">Or paste CSV data directly:</Label>
                <Textarea
                  id="csvInput"
                  placeholder="wallet,max_mints,price,starts_at,ends_at&#10;rExampleWallet123...,5,0.8,2024-01-15T10:00,2024-01-20T10:00"
                  value={csvData}
                  onChange={(e) => handleCSVUpload(e.target.value)}
                  rows={4}
                  className="font-mono text-sm"
                />
              </div>
            </CardContent>
          </Card>

          {/* Manual Entry */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Add Individual Entry</span>
              </CardTitle>
              <CardDescription>
                Manually add wallet addresses to the allowlist
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                <Input
                  placeholder="Wallet address"
                  value={newEntry.wallet}
                  onChange={(e) => setNewEntry({ ...newEntry, wallet: e.target.value })}
                  className="font-mono text-sm"
                />
                <Input
                  type="number"
                  min="1"
                  placeholder="Max mints"
                  value={newEntry.maxMints || ''}
                  onChange={(e) => setNewEntry({ ...newEntry, maxMints: parseInt(e.target.value) || 1 })}
                />
                <Input
                  type="number"
                  step="0.000001"
                  placeholder="Price (optional)"
                  value={newEntry.price || ''}
                  onChange={(e) => setNewEntry({ ...newEntry, price: parseFloat(e.target.value) || undefined })}
                />
                <Input
                  type="datetime-local"
                  placeholder="Starts at"
                  value={newEntry.startsAt || ''}
                  onChange={(e) => setNewEntry({ ...newEntry, startsAt: e.target.value })}
                />
                <Button
                  onClick={addManualEntry}
                  disabled={!newEntry.wallet || !newEntry.maxMints}
                  className="w-full"
                >
                  Add Entry
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Parse Results */}
          {parsedEntries.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Allowlist Summary</span>
                  {parseErrors.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadErrors}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Errors
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Summary Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{uniqueWallets}</div>
                    <div className="text-sm text-green-800">Unique Wallets</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{totalMintable}</div>
                    <div className="text-sm text-blue-800">Total Mintable</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{validEntries.length}</div>
                    <div className="text-sm text-orange-800">Valid Entries</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{errorEntries.length}</div>
                    <div className="text-sm text-red-800">Errors</div>
                  </div>
                </div>

                {/* Error Summary */}
                {parseErrors.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-medium text-red-900 mb-2 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Parsing Errors ({parseErrors.length})
                    </h4>
                    <div className="space-y-1 text-sm text-red-800 max-h-32 overflow-y-auto">
                      {parseErrors.slice(0, 5).map((error, index) => (
                        <div key={index}>• {error}</div>
                      ))}
                      {parseErrors.length > 5 && (
                        <div className="text-xs text-red-600">... and {parseErrors.length - 5} more errors</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Search & Filter */}
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search wallet addresses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                </div>

                {/* Entries List */}
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {filteredEntries.slice(0, 50).map((entry, index) => (
                    <div
                      key={index}
                      className={cn(
                        'flex items-center justify-between p-3 border rounded-lg',
                        entry.error ? 'border-red-200 bg-red-50' : 'border-gray-200'
                      )}
                    >
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2 text-sm">
                        <div className="font-mono">
                          {entry.wallet.slice(0, 12)}...{entry.wallet.slice(-6)}
                        </div>
                        <div>{entry.maxMints} mints</div>
                        <div>{entry.price ? `${entry.price} XRP` : 'Default price'}</div>
                        <div className="text-xs text-gray-500">
                          {entry.startsAt ? new Date(entry.startsAt).toLocaleDateString() : 'No start date'}
                        </div>
                      </div>
                      {entry.error && (
                        <Badge variant="destructive" className="mr-2">
                          {entry.error}
                        </Badge>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeEntry(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  {filteredEntries.length > 50 && (
                    <div className="text-center text-sm text-gray-500 py-2">
                      Showing first 50 of {filteredEntries.length} entries
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pricing Precedence Info */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Pricing Precedence</h4>
                  <div className="space-y-1 text-sm text-blue-800">
                    <p>• If an allowlist entry has a custom price, it overrides the global presale price</p>
                    <p>• Entries without custom prices use the global presale price</p>
                    <p>• Time-based restrictions (starts_at/ends_at) are enforced per entry</p>
                    <p>• All allowlist entries are subject to the per-wallet mint limit</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Validation Summary */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Allowlist Progress</h4>
              <div className="space-y-1 text-sm text-blue-800">
                <div className="flex items-center space-x-2">
                  {formData.enableAllowlist ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <div className="w-4 h-4 border border-gray-300 rounded" />
                  )}
                  <span>Allowlist configuration set</span>
                </div>
                <div className="flex items-center space-x-2">
                  {!formData.enableAllowlist || (validEntries.length > 0 && errorEntries.length === 0) ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <div className="w-4 h-4 border border-gray-300 rounded" />
                  )}
                  <span>Valid allowlist entries (no errors)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}