'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileDropZone } from '@/components/upload/file-drop-zone';
import { UploadProgress } from '@/components/upload/upload-progress';

import { 
  Upload, 
  Image,
  Settings, 
  DollarSign, 
  Package, 
  Eye, 
  Save,
  CheckCircle,
  CheckCircle2,
  AlertCircle,
  Clock,
  Zap,
  Info,
  Download,
  Star,
  Palette
} from 'lucide-react';

export default function CreateBundleStudio() {
  const [activeTab, setActiveTab] = useState('upload');
  const [formData, setFormData] = useState<{
    name: string;
    slug: string;
    description: string;
    category: string;
    bundleType: string;
    banner: File | null;
    thumbnail: File | null;
    price: string;
    license: string;
    traits: { name: string; values: string[] }[];
    tags: string[];
    isExclusive: boolean;
    includeMetadata: boolean;
    includeTraits: boolean;
    fileFormat: string;
    resolution: string;
    totalAssets: string;
    previewImages: File[];
    bundleFile: File | null;
    status: string;
  }>({
    name: '',
    slug: '',
    description: '',
    category: 'nft-bundle',
    bundleType: '10k',
    banner: null,
    thumbnail: null,
    price: '',
    license: 'exclusive',
    traits: [],
    tags: [],
    isExclusive: true,
    includeMetadata: true,
    includeTraits: true,
    fileFormat: 'png',
    resolution: '1024x1024',
    totalAssets: '',
    previewImages: [],
    bundleFile: null,
    status: 'draft'
  });

  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  
  const uploadFiles = async (fileList: File[]) => {
    // Mock upload function
    setIsUploading(true);
    setUploadProgress(0);
    
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    setIsUploading(false);
  };
  
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  const clearFiles = () => {
    setFiles([]);
  };

  const [previewMode, setPreviewMode] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Auto-generate slug from name
    if (field === 'name') {
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const addTrait = () => {
    setFormData(prev => ({
      ...prev,
      traits: [...prev.traits, { name: '', values: [''] }]
    }));
  };

  const updateTrait = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      traits: prev.traits.map((trait, i) => 
        i === index ? { ...trait, [field]: value } : trait
      )
    }));
  };

  const addTraitValue = (traitIndex: number) => {
    setFormData(prev => ({
      ...prev,
      traits: prev.traits.map((trait, i) => 
        i === traitIndex ? { ...trait, values: [...trait.values, ''] } : trait
      )
    }));
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.name.trim()) errors.push('Bundle name is required');
    if (!formData.description.trim()) errors.push('Description is required');
    if (!formData.price || parseFloat(formData.price) <= 0) errors.push('Valid price is required');
    if (!formData.bundleFile) errors.push('Bundle zip file is required');
    if (formData.previewImages.length < 3) errors.push('At least 3 preview images required');
    
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handlePublish = async () => {
    if (!validateForm()) return;
    
    try {
      // Here you would upload to your backend
      console.log('Publishing bundle:', formData);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Bundle published successfully!');
    } catch (error) {
      console.error('Failed to publish:', error);
    }
  };

  const getBundleTypeInfo = (type: string) => {
    const info: { [key: string]: { label: string; desc: string; price: string } } = {
      '10k': { label: '10K Collection', desc: '10,000 unique assets', price: '50-200 XRP' },
      '5k': { label: '5K Collection', desc: '5,000 unique assets', price: '25-100 XRP' },
      '2k': { label: '2K Collection', desc: '2,000 unique assets', price: '10-50 XRP' },
      '1k': { label: '1K Collection', desc: '1,000 unique assets', price: '5-25 XRP' },
      'custom': { label: 'Custom Size', desc: 'Any number of assets', price: 'Variable' }
    };
    return info[type] || info.custom;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-green-500 rounded-xl">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Create Exclusive Digital Bundle</h1>
                <p className="text-gray-600">Upload exclusive art collections for one-time purchase with full commercial rights</p>
              </div>
            </div>
            <div className="mt-4 flex justify-center space-x-4 text-sm">
              <span className="flex items-center text-green-600">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                One-time purchase only
              </span>
              <span className="flex items-center text-orange-600">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                XRP payments via XUMM
              </span>
              <span className="flex items-center text-purple-600">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Full commercial rights
              </span>
            </div>
          
          {/* Progress Indicator */}
          <div className="flex items-center space-x-4 text-sm">
            <div className={`flex items-center space-x-2 ${activeTab === 'upload' ? 'text-orange-600' : 'text-gray-400'}`}>
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </div>
            <div className="w-8 h-px bg-gray-300" />
            <div className={`flex items-center space-x-2 ${activeTab === 'details' ? 'text-orange-600' : 'text-gray-400'}`}>
              <Settings className="w-4 h-4" />
              <span>Details</span>
            </div>
            <div className="w-8 h-px bg-gray-300" />
            <div className={`flex items-center space-x-2 ${activeTab === 'pricing' ? 'text-orange-600' : 'text-gray-400'}`}>
              <DollarSign className="w-4 h-4" />
              <span>Pricing</span>
            </div>
            <div className="w-8 h-px bg-gray-300" />
            <div className={`flex items-center space-x-2 ${activeTab === 'preview' ? 'text-orange-600' : 'text-gray-400'}`}>
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="upload" className="flex items-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>Upload</span>
                </TabsTrigger>
                <TabsTrigger value="details" className="flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Details</span>
                </TabsTrigger>
                <TabsTrigger value="pricing" className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4" />
                  <span>Pricing</span>
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </TabsTrigger>
              </TabsList>

              {/* Upload Tab */}
              <TabsContent value="upload" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Package className="w-5 h-5" />
                      <span>Bundle Upload</span>
                    </CardTitle>
                    <CardDescription>
                      Upload your complete art collection as a zip file
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Bundle Type Selection */}
                    <div className="space-y-3">
                      <Label>Bundle Type</Label>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {['10k', '5k', '2k', '1k', 'custom'].map((type) => {
                          const info = getBundleTypeInfo(type);
                          return (
                            <div
                              key={type}
                              className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                                formData.bundleType === type
                                  ? 'border-orange-500 bg-orange-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              onClick={() => handleInputChange('bundleType', type)}
                            >
                              <div className="text-sm font-medium">{info.label} Bundle</div>
                              <div className="text-xs text-gray-500 mt-1">{info.desc}</div>
                              <div className="text-xs text-green-600 mt-1">{info.price}</div>
                              <div className="text-xs text-orange-600 mt-1">💎 Exclusive Rights</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Main Bundle File */}
                    <div className="space-y-3">
                      <Label>Bundle Zip File</Label>
                      <FileDropZone
                        onFilesSelected={(files) => handleInputChange('bundleFile', files[0])}
                        error={error}
                      />
                      {formData.bundleFile && (
                        <div className="flex items-center space-x-2 text-sm text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>{formData.bundleFile.name}</span>
                        </div>
                      )}
                    </div>

                    {/* Preview Images */}
                    <div className="space-y-3">
                      <Label>Preview Images (3-6 images)</Label>
                      <FileDropZone
                        onFilesSelected={(files) => handleInputChange('previewImages', files)}
                        error={error}
                      />
                      {formData.previewImages.length > 0 && (
                        <div className="grid grid-cols-3 gap-2">
                          {formData.previewImages.map((file, index) => (
                            <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                              <Image className="w-8 h-8 text-gray-400" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Upload Progress */}
                    {isUploading && (
                      <UploadProgress
                        uploads={[]}
                        totalProgress={uploadProgress}
                        isUploading={isUploading}
                        isPaused={false}
                        error={error}
                        onPause={() => {}}
                        onResume={() => {}}
                        onCancel={() => {}}
                        onRetry={() => {}}
                      />
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Details Tab */}
              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Bundle Information</CardTitle>
                    <CardDescription>
                      Provide details about your art collection
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Bundle Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="10K Cyberpunk Warriors Bundle"
                        />
                        <p className="text-xs text-gray-500">Auto-generates URL slug: {formData.slug || 'bundle-name'}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="slug">URL Slug</Label>
                        <Input
                          id="slug"
                          value={formData.slug}
                          onChange={(e) => handleInputChange('slug', e.target.value)}
                          placeholder="cyber-punk-collection"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Describe your art collection, style, and what buyers will receive..."
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nft-bundle">NFT Bundle</SelectItem>
                            <SelectItem value="digital-art">Digital Art</SelectItem>
                            <SelectItem value="print-product">Print Product</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>File Format</Label>
                        <Select value={formData.fileFormat} onValueChange={(value) => handleInputChange('fileFormat', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="png">PNG</SelectItem>
                            <SelectItem value="jpg">JPG</SelectItem>
                            <SelectItem value="svg">SVG</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Resolution</Label>
                        <Select value={formData.resolution} onValueChange={(value) => handleInputChange('resolution', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="512x512">512×512</SelectItem>
                            <SelectItem value="1024x1024">1024×1024</SelectItem>
                            <SelectItem value="2048x2048">2048×2048</SelectItem>
                            <SelectItem value="4096x4096">4096×4096</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Include Metadata Files</Label>
                        <Switch
                          checked={formData.includeMetadata}
                          onCheckedChange={(checked) => handleInputChange('includeMetadata', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label>Include Traits JSON</Label>
                        <Switch
                          checked={formData.includeTraits}
                          onCheckedChange={(checked) => handleInputChange('includeTraits', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label>Exclusive Purchase (One-time only)</Label>
                        <Switch
                          checked={formData.isExclusive}
                          onCheckedChange={(checked) => handleInputChange('isExclusive', checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Pricing Tab */}
              <TabsContent value="pricing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Pricing & License</CardTitle>
                    <CardDescription>
                      Set your bundle price and usage rights
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="price">Bundle Price (XRP)</Label>
                        <div className="relative">
                          <Input
                            id="price"
                            type="number"
                            step="0.000001"
                            min="0.000001"
                            value={formData.price}
                            onChange={(e) => handleInputChange('price', e.target.value)}
                            placeholder="250.000000"
                            className="pr-16"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-600 font-medium">
                            XRP
                          </div>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Recommended: 75-350 XRP for exclusive bundles</span>
                          <span className="text-green-600">💎 One-time purchase only</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Available Copies</Label>
                        <div className="relative">
                          <Input
                            type="number"
                            value="1"
                            disabled
                            className="bg-gray-50 text-gray-500 pr-20"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                              Exclusive
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-red-600">
                          ⚡ Only 1 copy available - Bundle becomes unavailable after purchase
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>License Type</Label>
                      <Select value={formData.license} onValueChange={(value) => handleInputChange('license', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="exclusive">Exclusive Rights</SelectItem>
                          <SelectItem value="commercial">Commercial Use</SelectItem>
                          <SelectItem value="personal">Personal Use Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-900">License Information</h4>
                          <div className="text-sm text-blue-800 mt-1">
                            {formData.license === 'exclusive' && (
                              <p>Buyer gets exclusive rights to use and mint this collection on any blockchain. Only one purchase allowed.</p>
                            )}
                            {formData.license === 'commercial' && (
                              <p>Buyer can use for commercial purposes but you retain ownership. Multiple purchases allowed.</p>
                            )}
                            {formData.license === 'personal' && (
                              <p>Buyer can use for personal projects only. No commercial use or resale allowed.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preview Tab */}
              <TabsContent value="preview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Bundle Preview</CardTitle>
                    <CardDescription>
                      How your bundle will appear in the store
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-lg p-6 bg-white">
                      <div className="flex items-start space-x-4">
                        <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center relative">
                          <Package className="w-8 h-8 text-white" />
                          <div className="absolute -top-2 -right-2">
                            <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold">
                              💎
                            </span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-xl font-bold">{formData.name || 'Bundle Name'}</h3>
                            <Badge variant="secondary">{getBundleTypeInfo(formData.bundleType).label}</Badge>
                            {formData.isExclusive && <Badge className="bg-yellow-400 text-black">Exclusive</Badge>}
                          </div>
                          <p className="text-gray-600 mb-3">{formData.description || 'Bundle description will appear here...'}</p>
                          
                          <div className="bg-gradient-to-r from-orange-50 to-green-50 rounded-lg p-3 mb-3">
                            <div className="text-xs space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">Payment Method:</span>
                                <span className="text-orange-600 font-medium">XRP via XUMM</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">Download:</span>
                                <span className="text-green-600 font-medium">Instant after payment</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">License:</span>
                                <span className="text-purple-600 font-medium">Full commercial rights</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <span className="flex items-center space-x-1">
                              <Image className="w-4 h-4" />
                              <span>{formData.resolution}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Download className="w-4 h-4" />
                              <span>{formData.fileFormat.toUpperCase()}</span>
                            </span>
                            {formData.includeMetadata && (
                              <span className="flex items-center space-x-1">
                                <Settings className="w-4 h-4" />
                                <span>Metadata</span>
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="text-2xl font-bold text-green-600">
                                {formData.price ? `${formData.price} XRP` : 'Price TBD'}
                              </div>
                              <div className="text-xs text-red-600 font-medium">
                                ⚡ Limited: 1 copy only
                              </div>
                            </div>
                            <Button className="bg-orange-500 hover:bg-orange-600">
                              Buy & Download
                            </Button>
                          </div>
                          
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-red-600 font-medium">⚡ One-time purchase only</span>
                              <span className="text-green-600 font-medium">💎 Exclusive ownership</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Bundle Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Completion</span>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <Progress value={65} className="h-2" />
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Bundle type selected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Basic info added</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-yellow-500" />
                    <span>Upload bundle file</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-yellow-500" />
                    <span>Set pricing</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Validation Errors */}
            {validationErrors.length > 0 && (
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-lg text-red-600 flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5" />
                    <span>Issues to Fix</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm text-red-600">
                    {validationErrors.map((error, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-red-500 rounded-full" />
                        <span>{error}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="space-y-3">
              <Button 
                onClick={handlePublish}
                className="w-full bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600"
                disabled={validationErrors.length > 0}
              >
                <Zap className="w-4 h-4 mr-2" />
                Publish Bundle
              </Button>
              
              <Button variant="outline" className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}