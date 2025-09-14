'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Percent, 
  Users,
  Flame,
  Lock,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Info,
  Plus,
  X,
  ArrowUpDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Partner {
  id: string;
  address: string;
  percentage: number;
  name?: string;
}

interface XRPLSettingsProps {
  formData: any;
  onFormDataChange: (data: any) => void;
  className?: string;
}

export function XRPLSettings({ formData, onFormDataChange, className }: XRPLSettingsProps) {
  const [newPartner, setNewPartner] = useState({ address: '', percentage: 0, name: '' });

  const updateFormData = (field: string, value: any) => {
    onFormDataChange({
      ...formData,
      [field]: value
    });
  };

  const addPartner = () => {
    if (!newPartner.address || newPartner.percentage <= 0) return;
    
    const partners = formData.partners || [];
    const partner: Partner = {
      id: Date.now().toString(),
      address: newPartner.address,
      percentage: newPartner.percentage,
      name: newPartner.name || undefined
    };
    
    updateFormData('partners', [...partners, partner]);
    setNewPartner({ address: '', percentage: 0, name: '' });
  };

  const removePartner = (id: string) => {
    const partners = (formData.partners || []).filter((p: Partner) => p.id !== id);
    updateFormData('partners', partners);
  };

  const updatePartner = (id: string, field: keyof Partner, value: any) => {
    const partners = (formData.partners || []).map((p: Partner) => 
      p.id === id ? { ...p, [field]: value } : p
    );
    updateFormData('partners', partners);
  };

  const movePartner = (id: string, direction: 'up' | 'down') => {
    const partners = [...(formData.partners || [])];
    const index = partners.findIndex(p => p.id === id);
    
    if (direction === 'up' && index > 0) {
      [partners[index], partners[index - 1]] = [partners[index - 1], partners[index]];
    } else if (direction === 'down' && index < partners.length - 1) {
      [partners[index], partners[index + 1]] = [partners[index + 1], partners[index]];
    }
    
    updateFormData('partners', partners);
  };

  const getTotalPercentage = () => {
    return (formData.partners || []).reduce((sum: number, p: Partner) => sum + p.percentage, 0);
  };

  const isValidTransferFee = (fee: number) => {
    return fee >= 0 && fee <= 2500; // 0-25% in basis points
  };

  const totalPercentage = getTotalPercentage();
  const isValidSplit = totalPercentage === 100;

  return (
    <div className={cn('space-y-6', className)}>
      {/* XRPL Flags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>XRPL NFT Flags</span>
          </CardTitle>
          <CardDescription>
            Configure XRPL-specific NFT properties and behaviors
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Burnable Flag */}
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <Label className="text-base font-medium">Burnable</Label>
              </div>
              <p className="text-sm text-gray-500">
                Allow NFT holders to permanently destroy their tokens
              </p>
              <p className="text-xs text-gray-400">
                ⚠️ This cannot be changed after minting
              </p>
            </div>
            <Switch
              checked={formData.burnable}
              onCheckedChange={(checked) => updateFormData('burnable', checked)}
            />
          </div>

          <Separator />

          {/* OnlyXRP Flag */}
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-blue-500" />
                <Label className="text-base font-medium">Only XRP</Label>
              </div>
              <p className="text-sm text-gray-500">
                Restrict trading to XRP only (no other currencies)
              </p>
              <p className="text-xs text-gray-400">
                Recommended for most collections
              </p>
            </div>
            <Switch
              checked={formData.onlyXRP}
              onCheckedChange={(checked) => updateFormData('onlyXRP', checked)}
            />
          </div>

          <Separator />

          {/* Mutable Flag */}
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Edit3 className="w-4 h-4 text-green-500" />
                <Label className="text-base font-medium">Mutable</Label>
              </div>
              <p className="text-sm text-gray-500">
                Allow metadata updates after minting
              </p>
              <p className="text-xs text-gray-400">
                Useful for evolving artwork or game items
              </p>
            </div>
            <Switch
              checked={formData.mutable}
              onCheckedChange={(checked) => updateFormData('mutable', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Transfer Fee */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Percent className="w-5 h-5" />
            <span>Transfer Fee</span>
          </CardTitle>
          <CardDescription>
            Set a fee collected on secondary sales (0-25%)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="transferFee">Transfer Fee (Basis Points)</Label>
            <div className="flex items-center space-x-4">
              <Input
                id="transferFee"
                type="number"
                min="0"
                max="2500"
                placeholder="250"
                value={formData.transferFee}
                onChange={(e) => updateFormData('transferFee', parseInt(e.target.value) || 0)}
                className={cn(
                  'w-32',
                  !isValidTransferFee(formData.transferFee || 0) && 'border-red-300'
                )}
              />
              <span className="text-sm text-gray-500">=</span>
              <Badge variant="outline">
                {((formData.transferFee || 0) / 100).toFixed(2)}%
              </Badge>
            </div>
            <div className="space-y-1 text-xs text-gray-500">
              <p>• 0 BPS = 0% (no fee)</p>
              <p>• 250 BPS = 2.5% (recommended)</p>
              <p>• 1000 BPS = 10% (high but acceptable)</p>
              <p>• 2500 BPS = 25% (maximum allowed)</p>
            </div>
            {!isValidTransferFee(formData.transferFee || 0) && (
              <p className="text-sm text-red-600 flex items-center space-x-1">
                <AlertCircle className="w-4 h-4" />
                <span>Transfer fee must be between 0 and 2500 basis points (0-25%)</span>
              </p>
            )}
          </div>

          {/* Fee Preview */}
          {formData.transferFee > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Transfer Fee Preview</h4>
              <div className="space-y-1 text-sm text-blue-800">
                <div className="flex justify-between">
                  <span>If NFT sells for:</span>
                  <span className="font-medium">10 XRP</span>
                </div>
                <div className="flex justify-between">
                  <span>Transfer fee ({((formData.transferFee || 0) / 100).toFixed(2)}%):</span>
                  <span>{(10 * (formData.transferFee || 0) / 10000).toFixed(4)} XRP</span>
                </div>
                <div className="flex justify-between">
                  <span>Seller receives:</span>
                  <span className="font-medium">{(10 - (10 * (formData.transferFee || 0) / 10000)).toFixed(4)} XRP</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Royalties & Revenue Splits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Revenue Partners</span>
          </CardTitle>
          <CardDescription>
            Configure revenue sharing with partners and collaborators
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Partners */}
          {formData.partners && formData.partners.length > 0 && (
            <div className="space-y-3">
              <Label className="text-base font-medium">Current Partners</Label>
              {formData.partners.map((partner: Partner, index: number) => (
                <div key={partner.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Input
                      placeholder="Partner name (optional)"
                      value={partner.name || ''}
                      onChange={(e) => updatePartner(partner.id, 'name', e.target.value)}
                    />
                    <Input
                      placeholder="Wallet address"
                      value={partner.address}
                      onChange={(e) => updatePartner(partner.id, 'address', e.target.value)}
                      className="font-mono text-sm"
                    />
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="%"
                        value={partner.percentage}
                        onChange={(e) => updatePartner(partner.id, 'percentage', parseFloat(e.target.value) || 0)}
                        className="w-20"
                      />
                      <span className="text-sm text-gray-500">%</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => movePartner(partner.id, 'up')}
                      disabled={index === 0}
                    >
                      <ArrowUpDown className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removePartner(partner.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add New Partner */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Add Partner</Label>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <Input
                placeholder="Partner name (optional)"
                value={newPartner.name}
                onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
              />
              <Input
                placeholder="Wallet address"
                value={newPartner.address}
                onChange={(e) => setNewPartner({ ...newPartner, address: e.target.value })}
                className="font-mono text-sm"
              />
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="%"
                  value={newPartner.percentage || ''}
                  onChange={(e) => setNewPartner({ ...newPartner, percentage: parseFloat(e.target.value) || 0 })}
                />
                <span className="text-sm text-gray-500">%</span>
              </div>
              <Button
                onClick={addPartner}
                disabled={!newPartner.address || newPartner.percentage <= 0}
                className="w-full md:w-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
          </div>

          {/* Split Summary */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Revenue Split</Label>
              <Badge 
                variant={isValidSplit ? "default" : "destructive"}
                className={isValidSplit ? "bg-green-100 text-green-800" : ""}
              >
                {totalPercentage}% / 100%
              </Badge>
            </div>
            
            <Progress 
              value={Math.min(totalPercentage, 100)} 
              className={cn(
                "h-3",
                totalPercentage > 100 && "[&>div]:bg-red-500"
              )}
            />
            
            {!isValidSplit && (
              <p className="text-sm text-red-600 flex items-center space-x-1">
                <AlertCircle className="w-4 h-4" />
                <span>
                  {totalPercentage > 100 
                    ? `Split exceeds 100% by ${totalPercentage - 100}%` 
                    : `Split is ${100 - totalPercentage}% short of 100%`
                  }
                </span>
              </p>
            )}
            
            {isValidSplit && formData.partners?.length > 0 && (
              <p className="text-sm text-green-600 flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Revenue split is valid and totals 100%</span>
              </p>
            )}
          </div>

          {/* Revenue Preview */}
          {formData.price && formData.supply && isValidSplit && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">Revenue Distribution Preview</h4>
              <div className="space-y-2 text-sm text-green-800">
                <div className="flex justify-between font-medium">
                  <span>Total Revenue:</span>
                  <span>{(parseFloat(formData.price) * parseInt(formData.supply)).toFixed(6)} XRP</span>
                </div>
                {formData.partners?.map((partner: Partner) => (
                  <div key={partner.id} className="flex justify-between pl-4">
                    <span>{partner.name || partner.address.slice(0, 8)}... ({partner.percentage}%):</span>
                    <span>{((parseFloat(formData.price) * parseInt(formData.supply)) * partner.percentage / 100).toFixed(6)} XRP</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Validation Summary */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">XRPL Settings Progress</h4>
              <div className="space-y-1 text-sm text-blue-800">
                <div className="flex items-center space-x-2">
                  {isValidTransferFee(formData.transferFee || 0) ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <div className="w-4 h-4 border border-gray-300 rounded" />
                  )}
                  <span>Valid transfer fee</span>
                </div>
                <div className="flex items-center space-x-2">
                  {isValidSplit ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <div className="w-4 h-4 border border-gray-300 rounded" />
                  )}
                  <span>Revenue split totals 100%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>XRPL flags configured</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}