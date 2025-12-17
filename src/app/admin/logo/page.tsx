'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, Save, RotateCcw, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import { getSupabase } from '@/lib/supabase';

export default function LogoManagementPage() {
  const [logoUrl, setLogoUrl] = useState('/images/teddy-decor-logo.svg');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load custom logo from database (or localStorage as fallback)
  useEffect(() => {
    const loadLogo = async () => {
      const supabase = await getSupabase();

      if (supabase) {
        // Try to load from database first
        const { data, error } = await supabase
          .from('site_settings')
          .select('setting_value')
          .eq('setting_key', 'logo_url')
          .single();

        if (!error && data?.setting_value) {
          setLogoUrl(data.setting_value);
          return;
        }
      }

      // Fallback to localStorage
      const savedLogo = localStorage.getItem('customLogo');
      if (savedLogo) {
        setLogoUrl(savedLogo);
      }
    };

    loadLogo();
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('File too large. Max 2MB allowed');
      return;
    }

    setIsUploading(true);
    const uploadToast = toast.loading('Uploading logo...', {
      description: 'Please wait while we save your logo'
    });

    try {
      const supabase = await getSupabase();
      let imageUrl: string;

      if (supabase) {
        // Upload to Supabase Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `logo.${fileExt}`;
        const filePath = `${fileName}`;

        const { data, error } = await supabase.storage
          .from('gallery')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true // Replace if exists
          });

        if (error) {
          console.error('Supabase upload error:', error);
          throw error;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('gallery')
          .getPublicUrl(filePath);

        imageUrl = publicUrl;

        toast.success('Logo uploaded to cloud! ✨', {
          id: uploadToast,
          description: 'Logo accessible from all devices'
        });
      } else {
        // Fallback to base64
        const result = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        imageUrl = result;

        toast.success('Logo uploaded locally!', {
          id: uploadToast,
          description: 'Add Supabase keys for cloud storage'
        });
      }

      // Save to database (if Supabase available)
      if (supabase) {
        const { error: upsertError } = await supabase
          .from('site_settings')
          .upsert({
            setting_key: 'logo_url',
            setting_value: imageUrl,
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'setting_key' // Specify which column to match on
          });

        if (upsertError) {
          console.error('❌ Database save error:', upsertError);
        } else {
          console.log('✅ Logo URL saved to database:', imageUrl);
        }
      }

      // Also save to localStorage as backup
      localStorage.setItem('customLogo', imageUrl);
      setLogoUrl(imageUrl);

      // Trigger event to update navigation
      window.dispatchEvent(new Event('logoUpdated'));

      // Force page reload to update navigation
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Upload failed', {
        id: uploadToast,
        description: 'Please try again'
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleReset = () => {
    if (confirm('Reset to default logo? This will remove your custom logo.')) {
      localStorage.removeItem('customLogo');
      setLogoUrl('/images/teddy-decor-logo.svg');
      toast.success('Logo reset to default');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Logo Management</h1>
        <p className="text-gray-600">Upload and customize your company logo</p>
      </div>

      {/* Logo Preview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
        <h2 className="text-xl font-semibold mb-6">Current Logo</h2>

        <div className="flex flex-col items-center space-y-6">
          {/* Preview Card */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 w-full max-w-md">
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={logoUrl}
                  alt="Company Logo"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-800 tracking-wide">
                  Teddy Decor
                </span>
                <span className="text-xs text-teddy-green font-medium tracking-wider uppercase">
                  Creating Unforgettable Moments
                </span>
              </div>
            </div>
          </div>

          {/* Large Preview */}
          <div className="relative w-64 h-64 bg-white rounded-lg border-2 border-dashed border-gray-300 p-6">
            <Image
              src={logoUrl}
              alt="Logo Preview"
              fill
              className="object-contain p-4"
              unoptimized
            />
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
        <h2 className="text-xl font-semibold mb-6">Upload New Logo</h2>

        <div className="space-y-4">
          {/* Requirements */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Logo Requirements:
            </h3>
            <ul className="text-sm text-blue-800 space-y-1 ml-7">
              <li>• Format: PNG, JPG, or SVG (PNG with transparent background recommended)</li>
              <li>• Size: Square image works best (e.g., 500x500px)</li>
              <li>• File size: Maximum 2MB</li>
              <li>• Will be displayed at 56x56px in navigation</li>
            </ul>
          </div>

          {/* Upload Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full px-6 py-4 bg-gradient-to-r from-teddy-green to-teddy-gold text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload className="w-5 h-5" />
            <span>{isUploading ? 'Uploading...' : 'Choose Logo File'}</span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Reset Button */}
          <button
            onClick={handleReset}
            disabled={isUploading}
            className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset to Default Logo</span>
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="font-semibold text-yellow-900 mb-3">📝 How It Works</h3>
        <ol className="text-sm text-yellow-800 space-y-2 ml-4 list-decimal">
          <li>Upload your logo using the button above</li>
          <li>Logo will be saved and appear in the navigation immediately</li>
          <li>Logo is stored locally (or in cloud if Supabase is configured)</li>
          <li>To see changes on deployed site, upload here and refresh</li>
          <li>Reset button restores the default Teddy Decor logo</li>
        </ol>
      </div>

      {/* Navigation Tip */}
      <div className="mt-6 bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-3">💡 Pro Tip</h3>
        <p className="text-gray-600 mb-3">
          For best results, create a square logo with a transparent background (PNG format).
          Your logo should look good at small sizes since it will be displayed at 56x56 pixels in the navigation bar.
        </p>
        <p className="text-sm text-gray-500">
          If you need help creating a logo, consider using tools like Canva, Adobe Express, or hiring a designer on Fiverr.
        </p>
      </div>
    </div>
  );
}
