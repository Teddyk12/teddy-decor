'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, Trash2, Eye, X, Image as ImageIcon, Save, Check } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import { getSupabase } from '@/lib/supabase';
import EnvDiagnostic from '@/components/env-diagnostic';

interface GalleryItem {
  id: number;
  category: string;
  image: string;
  title: string;
  date: string;
  type?: 'image' | 'video'; // Add support for videos
}

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const defaultGalleryItems: GalleryItem[] = [
    {
      id: 1,
      category: 'Weddings',
      image: 'https://m.media-amazon.com/images/I/81pLBZipH+L._AC_UF894,1000_QL80_.jpg',
      title: 'Romantic Wedding Arch',
      date: '2025-10-15'
    },
    {
      id: 2,
      category: 'Graduations',
      image: 'https://m.media-amazon.com/images/I/81FMRGc-3HL._AC_UF894,1000_QL80_.jpg',
      title: 'Burgundy & Gold Graduation',
      date: '2025-10-10'
    },
    {
      id: 3,
      category: 'Baby Showers',
      image: 'https://www.babysavers.com/wp-content/uploads/2024/11/baby-shower-ideas-boho-baby-theme.jpg',
      title: 'Boho Baby Shower',
      date: '2025-10-05'
    },
    {
      id: 4,
      category: 'Birthdays',
      image: 'https://thebratshack.com/wp-content/uploads/2022/01/IMG_2664.jpg',
      title: 'Elegant Birthday Setup',
      date: '2025-09-28'
    },
    {
      id: 5,
      category: 'Weddings',
      image: 'https://m.media-amazon.com/images/I/81EcVQNQQeL._AC_UF894,1000_QL80_.jpg',
      title: 'Floral Wedding Ceremony',
      date: '2025-09-20'
    },
    {
      id: 6,
      category: 'Baby Showers',
      image: 'https://www.babysavers.com/wp-content/uploads/2025/01/spring-baby-shower-themes-pastel-dreams-idea.jpeg',
      title: 'Pastel Dreams Baby Shower',
      date: '2025-09-15'
    },
  ];

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(defaultGalleryItems);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const [replacingImageId, setReplacingImageId] = useState<number | null>(null);

  // Load gallery from database (or localStorage as fallback)
  useEffect(() => {
    const loadGallery = async () => {
      const supabase = await getSupabase();

      if (supabase) {
        // Load from database
        const { data, error } = await supabase
          .from('gallery_images')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const formattedData: GalleryItem[] = data.map(item => ({
            id: item.id,
            category: item.category,
            image: item.image_url,
            title: item.title || '',
            date: item.date || '',
            type: (item.type || 'image') as 'image' | 'video'
          }));
          setGalleryItems(formattedData);
          console.log('📊 Gallery loaded from database:', data.length, 'items');
          return;
        }
      }

      // Fallback to localStorage
      const savedGallery = localStorage.getItem('galleryItems');
      if (savedGallery) {
        try {
          const parsed = JSON.parse(savedGallery);
          setGalleryItems(parsed);
          console.log('📊 Gallery loaded from localStorage');
        } catch (error) {
          console.error('Error loading gallery:', error);
        }
      }
    };

    loadGallery();
  }, []);

  // Auto-save to localStorage whenever gallery changes
  useEffect(() => {
    if (galleryItems.length > 0) {
      localStorage.setItem('galleryItems', JSON.stringify(galleryItems));
    }
  }, [galleryItems]);

  const handleSaveGallery = () => {
    setIsSaving(true);
    localStorage.setItem('galleryItems', JSON.stringify(galleryItems));
    setTimeout(() => {
      setIsSaving(false);
      setHasUnsavedChanges(false);
      toast.success('Gallery saved successfully!', {
        description: `${galleryItems.length} images saved to your portfolio`
      });
    }, 500);
  };

  const categories = [
    { value: 'all', label: 'All Photos', count: galleryItems.length },
    { value: 'Weddings', label: 'Weddings', count: galleryItems.filter(i => i.category === 'Weddings').length },
    { value: 'Birthdays', label: 'Birthdays', count: galleryItems.filter(i => i.category === 'Birthdays').length },
    { value: 'Baby Showers', label: 'Baby Showers', count: galleryItems.filter(i => i.category === 'Baby Showers').length },
    { value: 'Graduations', label: 'Graduations', count: galleryItems.filter(i => i.category === 'Graduations').length },
  ];

  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  const handleViewImage = (item: GalleryItem) => {
    setSelectedImage(item);
    setShowPreview(true);
  };

  const handleDeleteImage = async (id: number) => {
    const item = galleryItems.find(i => i.id === id);
    if (item && confirm(`Are you sure you want to delete "${item.title}"?`)) {
      // Delete from database (if Supabase available)
      const supabase = await getSupabase();
      if (supabase) {
        const { error } = await supabase
          .from('gallery_images')
          .delete()
          .eq('id', id);

        if (!error) {
          console.log('✅ Gallery item deleted from database');
        }
      }

      setGalleryItems(galleryItems.filter(i => i.id !== id));
      setHasUnsavedChanges(true);
      toast.success('Image deleted!', {
        description: 'Changes saved automatically'
      });
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) {
      toast.error('Please select an image or video file');
      return;
    }

    // Check file size (max 10MB for images, 50MB for videos)
    const maxSize = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error(`File too large. Max ${isVideo ? '50MB' : '10MB'} allowed`);
      return;
    }

    // Show uploading toast
    const uploadToast = toast.loading('Uploading to cloud storage...', {
      description: 'Please wait while we save your file'
    });

    try {
      const supabase = await getSupabase();
      let imageUrl: string;

      if (supabase) {
        // Upload to Supabase Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data, error } = await supabase.storage
          .from('gallery')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
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

        console.log('✅ Upload successful to Supabase:', publicUrl);
        toast.success('Uploaded to cloud! ✨', {
          id: uploadToast,
          description: 'File accessible from all devices'
        });
      } else {
        // Fallback to base64 if Supabase not configured
        const result = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        imageUrl = result;

        toast.success('Uploaded locally!', {
          id: uploadToast,
          description: 'Only visible on this device. Add Supabase keys for cloud storage.'
        });
      }

      // Save to database (if Supabase available)
      let newItemId = Date.now();

      if (supabase) {
        const { data, error } = await supabase
          .from('gallery_images')
          .insert([{
            category: selectedCategory === 'all' ? 'Weddings' : selectedCategory,
            image_url: imageUrl,
            title: file.name.replace(/\.[^/.]+$/, ''),
            date: new Date().toISOString().split('T')[0],
            type: isVideo ? 'video' : 'image'
          }])
          .select();

        if (!error && data && data[0]) {
          newItemId = data[0].id;
          console.log('✅ Gallery item saved to database');
        }
      }

      const newItem: GalleryItem = {
        id: newItemId,
        category: selectedCategory === 'all' ? 'Weddings' : selectedCategory,
        image: imageUrl,
        title: file.name.replace(/\.[^/.]+$/, ''),
        date: new Date().toISOString().split('T')[0],
        type: isVideo ? 'video' : 'image'
      };

      setGalleryItems([newItem, ...galleryItems]);
      setHasUnsavedChanges(true);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Upload failed', {
        id: uploadToast,
        description: 'Please check your Supabase configuration and try again'
      });
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleReplaceImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0 || replacingImageId === null) return;

    const file = files[0];
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) {
      toast.error('Please select an image or video file');
      return;
    }

    // Check file size
    const maxSize = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error(`File too large. Max ${isVideo ? '50MB' : '10MB'} allowed`);
      return;
    }

    const uploadToast = toast.loading('Uploading replacement...', {
      description: 'Please wait'
    });

    try {
      const supabase = await getSupabase();
      let imageUrl: string;

      if (supabase) {
        // Upload to Supabase Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data, error } = await supabase.storage
          .from('gallery')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
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

        toast.success('Replaced with cloud file!', {
          id: uploadToast,
          description: 'Visible on all devices'
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

        toast.success('Replaced locally!', {
          id: uploadToast,
          description: 'Add Supabase keys for cloud storage'
        });
      }

      setGalleryItems(galleryItems.map(item =>
        item.id === replacingImageId
          ? {
              ...item,
              image: imageUrl,
              title: file.name.replace(/\.[^/.]+$/, ''),
              date: new Date().toISOString().split('T')[0],
              type: isVideo ? 'video' : 'image'
            }
          : item
      ));

      setHasUnsavedChanges(true);
      setReplacingImageId(null);
    } catch (error) {
      console.error('Replace error:', error);
      toast.error('Replace failed', {
        id: uploadToast,
        description: 'Please check your Supabase configuration'
      });
    }

    // Reset file input
    if (replaceInputRef.current) {
      replaceInputRef.current.value = '';
    }
  };

  const triggerReplaceUpload = (id: number) => {
    setReplacingImageId(id);
    replaceInputRef.current?.click();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gallery Management</h1>
            <p className="text-gray-600">Upload and manage your portfolio images • Auto-saves changes</p>
            <a
              href="/admin/debug"
              className="text-sm text-blue-600 hover:text-blue-700 underline mt-1 inline-block"
            >
              🔍 Debug Supabase Connection
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-gradient-to-r from-teddy-green to-teddy-gold text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all flex items-center space-x-2"
            >
              <Upload className="w-5 h-5" />
              <span>Upload Photos/Videos</span>
            </button>
            <button
              onClick={handleSaveGallery}
              disabled={isSaving}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all flex items-center space-x-2 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Save Gallery</span>
                </>
              )}
            </button>
          </div>
          {/* Hidden file input for new uploads */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          {/* Hidden file input for replacing images */}
          <input
            ref={replaceInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleReplaceImage}
            className="hidden"
          />
        </div>
      </div>

      {/* Upload Area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="bg-white rounded-2xl shadow-sm p-8 mb-6 border-2 border-dashed border-gray-300 hover:border-teddy-green-500 transition-colors cursor-pointer"
      >
        <div className="text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Drag and drop images here</h3>
          <p className="text-gray-600 mb-4">or click to browse from your device</p>
          <p className="text-sm text-gray-500">Supports: JPG, PNG, WEBP • Works on PC, Mobile, Tablet, Laptop</p>
        </div>
      </div>

      {/* Environment Diagnostic */}
      <div className="mb-6">
        <EnvDiagnostic />
      </div>

      {/* Category Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                selectedCategory === category.value
                  ? 'bg-gradient-to-r from-teddy-green to-teddy-gold text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-sm overflow-hidden group hover:shadow-lg transition-shadow"
          >
            <div className="relative h-64 bg-gray-100">
              {item.type === 'video' ? (
                <video
                  src={item.image}
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                />
              ) : (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewImage(item)}
                    className="p-3 bg-white rounded-full hover:scale-110 transition-transform"
                    title="View Image"
                  >
                    <Eye className="w-5 h-5 text-gray-900" />
                  </button>
                  <button
                    onClick={() => triggerReplaceUpload(item.id)}
                    className="p-3 bg-white rounded-full hover:scale-110 transition-transform"
                    title="Replace Image"
                  >
                    <ImageIcon className="w-5 h-5 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteImage(item.id)}
                    className="p-3 bg-white rounded-full hover:scale-110 transition-transform"
                    title="Delete Image"
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </div>
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-900">
                  {item.category}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">
                Uploaded {new Date(item.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl">
          <p className="text-gray-500">No images found in this category</p>
        </div>
      )}

      {/* Image Preview Modal */}
      {showPreview && selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setShowPreview(false)}
        >
          <div className="relative max-w-6xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-lg"
            >
              <X className="w-6 h-6 text-gray-900" />
            </button>
            <div className="relative w-full h-[70vh] bg-gray-100 flex items-center justify-center">
              {selectedImage.type === 'video' ? (
                <video
                  src={selectedImage.image}
                  className="max-w-full max-h-full"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                  unoptimized
                />
              )}
            </div>
            <div className="p-6 bg-white border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedImage.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="px-3 py-1 bg-green-100 text-teddy-green-dark rounded-full font-semibold">
                      {selectedImage.category}
                    </span>
                    <span>
                      Uploaded {new Date(selectedImage.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerReplaceUpload(selectedImage.id);
                      setShowPreview(false);
                    }}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center space-x-2"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>Replace</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteImage(selectedImage.id);
                      setShowPreview(false);
                    }}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
