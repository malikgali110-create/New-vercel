'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, 
  Image as ImageIcon, 
  Upload,
  CheckCircle2,
  AlertCircle,
  Info,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CollectionConfigProps {
  formData: any;
  onFormDataChange: (data: any) => void;
  className?: string;
}

export function CollectionConfig({ formData, onFormDataChange, className }: CollectionConfigProps) {
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
  const [slugChecking, setSlugChecking] = useState(false);

  const updateFormData = (field: string, value: any) => {
    onFormDataChange({
      ...formData,
      [field]: value
    });
  };

  const checkSlugAvailability = async (slug: string) => {
    if (!slug || slug.length < 3) {
      setSlugAvailable(null);
      return;
    }

    setSlugChecking(true);
    // Simulate API call
    setTimeout(() => {
      setSlugAvailable(Math.random() > 0.3); // 70% chance available
      setSlugChecking(false);
    }, 1000);
  };

  const validateSlug = (slug: string) => {
    const slugRegex = /^[a-z0-9-]{3,32}$/;
    return slugRegex.test(slug);
  };

  const getSlugStatus = () => {
    if (!formData.slug) return null;
    if (!validateSlug(formData.slug)) {
      return { type: 'error', message: 'Use lowercase letters, numbers, and hyphens only (3-32 chars)' };
    }
    if (slugChecking) {
      return { type: 'checking', message: 'Checking availability...' };
    }
    if (slugAvailable === true) {
      return { type: 'success', message: 'Slug is available!' };
    }
    if (slugAvailable === false) {
      return { type: 'error', message: 'Slug is already taken' };
    }
    return null;
  };

  const slugStatus = getSlugStatus();

  return (
    <div className={cn('space-y-6', className)}>
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Collection Information</span>
          </CardTitle>
          <CardDescription>
            Basic details about your NFT collection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Collection Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Collection Name *</Label>
            <Input
              id="name"
              placeholder="My Awesome NFT Collection"
              value={formData.name}
              onChange={(e) => updateFormData('name', e.target.value)}
              className="w-full"
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug *</Label>
            <div className="relative">
              <Input
                id="slug"
                placeholder="my-awesome-collection"
                value={formData.slug}
                onChange={(e) => {
                  const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
                  updateFormData('slug', slug);
                  checkSlugAvailability(slug);
                }}
                className={cn(
                  'w-full pr-10',
                  slugStatus?.type === 'error' && 'border-red-300',
                  slugStatus?.type === 'success' && 'border-green-300'
                )}
              />
              {slugStatus && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {slugStatus.type === 'success' && (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  )}
                  {slugStatus.type === 'error' && (
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  )}
                  {slugStatus.type === 'checking' && (
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  )}
                </div>
              )}
            </div>
            {slugStatus && (
              <p className={cn(
                'text-sm',
                slugStatus.type === 'error' && 'text-red-600',
                slugStatus.type === 'success' && 'text-green-600',
                slugStatus.type === 'checking' && 'text-blue-600'
              )}>
                {slugStatus.message}
              </p>
            )}
            <p className="text-xs text-gray-500">
              Your collection will be available at: marketplace.com/collection/{formData.slug || 'your-slug'}
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe your collection, its story, and what makes it unique..."
              value={formData.description}
              onChange={(e) => updateFormData('description', e.target.value)}
              rows={4}
              className="w-full"
            />
            <p className="text-xs text-gray-500">
              {formData.description?.length || 0}/1000 characters
            </p>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => updateFormData('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a category</option>
              <option value="art">Art</option>
              <option value="collectibles">Collectibles</option>
              <option value="gaming">Gaming</option>
              <option value="photography">Photography</option>
              <option value="music">Music</option>
              <option value="sports">Sports</option>
              <option value="utility">Utility</option>
              <option value="other">Other</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Collection Images */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ImageIcon className="w-5 h-5" />
            <span>Collection Images</span>
          </CardTitle>
          <CardDescription>
            Upload banner and profile images for your collection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Banner Image */}
          <div className="space-y-3">
            <Label>Banner Image (1600×450px recommended)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              {formData.bannerImage ? (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(formData.bannerImage)}
                    alt="Banner preview"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateFormData('bannerImage', null)}
                    className="absolute top-2 right-2 bg-white"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                  <p className="text-sm text-gray-600">Click to upload banner image</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) updateFormData('bannerImage', file);
                    }}
                    className="hidden"
                    id="banner-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('banner-upload')?.click()}
                  >
                    Choose File
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Image */}
          <div className="space-y-3">
            <Label>Profile Image (300×300px recommended)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              {formData.profileImage ? (
                <div className="relative inline-block">
                  <img
                    src={URL.createObjectURL(formData.profileImage)}
                    alt="Profile preview"
                    className="w-24 h-24 object-cover rounded-full"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateFormData('profileImage', null)}
                    className="absolute -top-2 -right-2 bg-white rounded-full w-6 h-6 p-0"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                  <p className="text-sm text-gray-600">Click to upload profile image</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) updateFormData('profileImage', file);
                    }}
                    className="hidden"
                    id="profile-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('profile-upload')?.click()}
                  >
                    Choose File
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Validation Summary */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Collection Setup Progress</h4>
              <div className="space-y-1 text-sm text-blue-800">
                <div className="flex items-center space-x-2">
                  {formData.name ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <div className="w-4 h-4 border border-gray-300 rounded" />
                  )}
                  <span>Collection name provided</span>
                </div>
                <div className="flex items-center space-x-2">
                  {formData.slug && slugAvailable === true ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <div className="w-4 h-4 border border-gray-300 rounded" />
                  )}
                  <span>URL slug available</span>
                </div>
                <div className="flex items-center space-x-2">
                  {formData.description ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <div className="w-4 h-4 border border-gray-300 rounded" />
                  )}
                  <span>Description added</span>
                </div>
                <div className="flex items-center space-x-2">
                  {formData.bannerImage ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <div className="w-4 h-4 border border-gray-300 rounded" />
                  )}
                  <span>Banner image uploaded</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}