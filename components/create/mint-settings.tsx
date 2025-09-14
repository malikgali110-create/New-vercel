'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Coins, 
  Calendar, 
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  Info,
  Eye,
  EyeOff
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MintSettingsProps {
  formData: any;
  onFormDataChange: (data: any) => void;
  className?: string;
}

export function MintSettings({ formData, onFormDataChange, className }: MintSettingsProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateFormData = (field: string, value: any) => {
    onFormDataChange({
      ...formData,
      [field]: value
    });
  };

  const formatDateTime = (date: string, time: string) => {
    if (!date || !time) return null;
    return new Date(`${date}T${time}`);
  };

  const getCountdown = (targetDate: Date | null) => {
    if (!targetDate) return null;
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();
    
    if (diff <= 0) return 'Started';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const presaleDate = formatDateTime(formData.presaleDate, formData.presaleTime);
  const publicDate = formatDateTime(formData.publicDate, formData.publicTime);
  const revealDate = formatDateTime(formData.revealDate, formData.revealTime);

  return (
    <div className={cn('space-y-6', className)}>
      {/* Pricing & Supply */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Coins className="w-5 h-5" />
            <span>Pricing & Supply</span>
          </CardTitle>
          <CardDescription>
            Set the price, total supply, and minting limits
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price per NFT (XRP) *</Label>
              <div className="relative">
                <Input
                  id="price"
                  type="number"
                  step="0.000001"
                  min="0.000001"
                  placeholder="1.000000"
                  value={formData.price}
                  onChange={(e) => updateFormData('price', e.target.value)}
                  className="pr-12"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                  XRP
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Minimum: 0.000001 XRP
              </p>
            </div>

            {/* Total Supply */}
            <div className="space-y-2">
              <Label htmlFor="supply">Total Supply *</Label>
              <Input
                id="supply"
                type="number"
                min="1"
                max="10000"
                placeholder="1000"
                value={formData.supply}
                onChange={(e) => updateFormData('supply', e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Maximum: 10,000 NFTs
              </p>
            </div>
          </div>

          {/* Per Wallet Limit */}
          <div className="space-y-2">
            <Label htmlFor="perWalletLimit">Per Wallet Limit</Label>
            <Input
              id="perWalletLimit"
              type="number"
              min="1"
              placeholder="5"
              value={formData.perWalletLimit}
              onChange={(e) => updateFormData('perWalletLimit', e.target.value)}
              className="w-full md:w-48"
            />
            <p className="text-xs text-gray-500">
              Maximum NFTs one wallet can mint (leave empty for no limit)
            </p>
          </div>

          {/* Revenue Preview */}
          {formData.price && formData.supply && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">Revenue Preview</h4>
              <div className="space-y-1 text-sm text-green-800">
                <div className="flex justify-between">
                  <span>Total Revenue:</span>
                  <span className="font-medium">{(parseFloat(formData.price) * parseInt(formData.supply)).toFixed(6)} XRP</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee (2.5%):</span>
                  <span>-{((parseFloat(formData.price) * parseInt(formData.supply)) * 0.025).toFixed(6)} XRP</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>You Receive:</span>
                  <span>{((parseFloat(formData.price) * parseInt(formData.supply)) * 0.975).toFixed(6)} XRP</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mint Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Mint Schedule</span>
          </CardTitle>
          <CardDescription>
            Configure presale, public mint, and reveal timing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Presale Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Presale Phase</Label>
                <p className="text-sm text-gray-500">Allow early access for allowlisted wallets</p>
              </div>
              <Switch
                checked={formData.enablePresale}
                onCheckedChange={(checked) => updateFormData('enablePresale', checked)}
              />
            </div>

            {formData.enablePresale && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-4 border-l-2 border-blue-200">
                <div className="space-y-2">
                  <Label htmlFor="presalePrice">Presale Price (XRP)</Label>
                  <Input
                    id="presalePrice"
                    type="number"
                    step="0.000001"
                    min="0.000001"
                    placeholder={formData.price || '0.800000'}
                    value={formData.presalePrice}
                    onChange={(e) => updateFormData('presalePrice', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="presaleDate">Start Date</Label>
                  <Input
                    id="presaleDate"
                    type="date"
                    value={formData.presaleDate}
                    onChange={(e) => updateFormData('presaleDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="presaleTime">Start Time</Label>
                  <Input
                    id="presaleTime"
                    type="time"
                    value={formData.presaleTime}
                    onChange={(e) => updateFormData('presaleTime', e.target.value)}
                  />
                </div>
                {presaleDate && (
                  <div className="md:col-span-3">
                    <Badge variant="outline" className="text-blue-600">
                      <Clock className="w-3 h-3 mr-1" />
                      Starts in: {getCountdown(presaleDate) || 'Invalid date'}
                    </Badge>
                  </div>
                )}
              </div>
            )}
          </div>

          <Separator />

          {/* Public Mint Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Public Mint</Label>
                <p className="text-sm text-gray-500">Open minting for everyone</p>
              </div>
              <Switch
                checked={formData.enablePublicMint}
                onCheckedChange={(checked) => updateFormData('enablePublicMint', checked)}
              />
            </div>

            {formData.enablePublicMint && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-green-200">
                <div className="space-y-2">
                  <Label htmlFor="publicDate">Start Date</Label>
                  <Input
                    id="publicDate"
                    type="date"
                    value={formData.publicDate}
                    onChange={(e) => updateFormData('publicDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="publicTime">Start Time</Label>
                  <Input
                    id="publicTime"
                    type="time"
                    value={formData.publicTime}
                    onChange={(e) => updateFormData('publicTime', e.target.value)}
                  />
                </div>
                {publicDate && (
                  <div className="md:col-span-2">
                    <Badge variant="outline" className="text-green-600">
                      <Clock className="w-3 h-3 mr-1" />
                      Starts in: {getCountdown(publicDate) || 'Invalid date'}
                    </Badge>
                  </div>
                )}
              </div>
            )}
          </div>

          <Separator />

          {/* Reveal Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Delayed Reveal</Label>
                <p className="text-sm text-gray-500">Hide metadata until reveal date</p>
              </div>
              <Switch
                checked={formData.enableReveal}
                onCheckedChange={(checked) => updateFormData('enableReveal', checked)}
              />
            </div>

            {formData.enableReveal && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-purple-200">
                <div className="space-y-2">
                  <Label htmlFor="revealDate">Reveal Date</Label>
                  <Input
                    id="revealDate"
                    type="date"
                    value={formData.revealDate}
                    onChange={(e) => updateFormData('revealDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="revealTime">Reveal Time</Label>
                  <Input
                    id="revealTime"
                    type="time"
                    value={formData.revealTime}
                    onChange={(e) => updateFormData('revealTime', e.target.value)}
                  />
                </div>
                {revealDate && (
                  <div className="md:col-span-2">
                    <Badge variant="outline" className="text-purple-600">
                      <Eye className="w-3 h-3 mr-1" />
                      Reveals in: {getCountdown(revealDate) || 'Invalid date'}
                    </Badge>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Advanced Settings</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </CardTitle>
          <CardDescription>
            Additional configuration options
          </CardDescription>
        </CardHeader>
        {showAdvanced && (
          <CardContent className="space-y-4">
            {/* Whitelist Only */}
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Allowlist Only</Label>
                <p className="text-sm text-gray-500">Only allowlisted wallets can mint</p>
              </div>
              <Switch
                checked={formData.allowlistOnly}
                onCheckedChange={(checked) => updateFormData('allowlistOnly', checked)}
              />
            </div>

            {/* Auto-increment Token IDs */}
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Sequential Token IDs</Label>
                <p className="text-sm text-gray-500">Use sequential numbering (1, 2, 3...) instead of random</p>
              </div>
              <Switch
                checked={formData.sequentialIds}
                onCheckedChange={(checked) => updateFormData('sequentialIds', checked)}
              />
            </div>

            {/* Pause Minting */}
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Start Paused</Label>
                <p className="text-sm text-gray-500">Launch with minting paused (can be unpaused later)</p>
              </div>
              <Switch
                checked={formData.startPaused}
                onCheckedChange={(checked) => updateFormData('startPaused', checked)}
              />
            </div>
          </CardContent>
        )}
      </Card>

      {/* Validation Summary */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Mint Settings Progress</h4>
              <div className="space-y-1 text-sm text-blue-800">
                <div className="flex items-center space-x-2">
                  {formData.price && parseFloat(formData.price) >= 0.000001 ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <div className="w-4 h-4 border border-gray-300 rounded" />
                  )}
                  <span>Valid price set</span>
                </div>
                <div className="flex items-center space-x-2">
                  {formData.supply && parseInt(formData.supply) > 0 ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <div className="w-4 h-4 border border-gray-300 rounded" />
                  )}
                  <span>Supply configured</span>
                </div>
                <div className="flex items-center space-x-2">
                  {(formData.enablePresale && presaleDate) || (formData.enablePublicMint && publicDate) ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <div className="w-4 h-4 border border-gray-300 rounded" />
                  )}
                  <span>Mint schedule configured</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}