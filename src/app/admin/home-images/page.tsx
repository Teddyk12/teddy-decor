'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, Save, Check, Image as ImageIcon, Home, Type } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

interface HomeContent {
  images: {
    heroBackground: string;
    services: {
      wedding: string;
      birthday: string;
      babyShower: string;
      graduation: string;
      special: string;
    };
  };
  text: {
    heroTitle: string;
    heroSubtitle: string;
    services: {
      wedding: { title: string; description: string };
      birthday: { title: string; description: string };
      babyShower: { title: string; description: string };
      graduation: { title: string; description: string };
      special: { title: string; description: string };
    };
  };
}

export default function HomeImagesPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [editingImage, setEditingImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultContent: HomeContent = {
    images: {
      heroBackground: 'https://m.media-amazon.com/images/I/81pLBZipH+L._AC_UF894,1000_QL80_.jpg',
      services: {
        wedding: 'https://m.media-amazon.com/images/I/81pLBZipH+L._AC_UF894,1000_QL80_.jpg',
        birthday: 'https://i.etsystatic.com/14397413/r/il/e549bc/1768374862/il_570xN.1768374862_p67d.jpg',
        babyShower: 'https://www.babysavers.com/wp-content/uploads/2024/11/baby-shower-ideas-boho-baby-theme.jpg',
        graduation: 'https://m.media-amazon.com/images/I/81FMRGc-3HL._AC_UF894,1000_QL80_.jpg',
        special: 'https://cdn.shopify.com/s/files/1/0841/6968/7334/files/baby-shower-themes-girls-13-683x1024.jpg'
      }
    },
    text: {
      heroTitle: 'Creating Unforgettable Moments, One Detail at a Time',
      heroSubtitle: 'Full-Service Event Decor and Planning for Life\'s Most Celebrated Occasions',
      services: {
        wedding: { title: 'Wedding Decor', description: 'Elegant ceremony arches and reception styling' },
        birthday: { title: 'Birthday Party Decor', description: 'Vibrant themed celebrations for all ages' },
        babyShower: { title: 'Baby Shower & Gender Reveal', description: 'Sweet and memorable celebrations' },
        graduation: { title: 'Graduation Decor', description: 'Celebrate achievements in style' },
        special: { title: 'Special Events', description: 'Corporate and social gatherings' }
      }
    }
  };

  const [content, setContent] = useState<HomeContent>(defaultContent);

  // Load content from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('homeContent');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setContent(parsed);
      } catch (error) {
        console.error('Error loading home content:', error);
      }
    }
  }, []);

  // Auto-save to localStorage whenever content changes
  useEffect(() => {
    localStorage.setItem('homeContent', JSON.stringify(content));
    // Also save in old format for backward compatibility
    localStorage.setItem('homeImages', JSON.stringify(content.images));
  }, [content]);

  const handleSave = () => {
    setIsSaving(true);
    localStorage.setItem('homeContent', JSON.stringify(content));
    localStorage.setItem('homeImages', JSON.stringify(content.images));
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Home page saved!', {
        description: 'All text and images have been updated'
      });
    }, 500);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0 || !editingImage) return;

    const file = files[0];
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    if (editingImage === 'heroBackground') {
      setContent({
        ...content,
        images: { ...content.images, heroBackground: imageUrl }
      });
    } else {
      setContent({
        ...content,
        images: {
          ...content.images,
          services: {
            ...content.images.services,
            [editingImage]: imageUrl
          }
        }
      });
    }

    toast.success('Image updated!', {
      description: 'Changes saved automatically'
    });
    setEditingImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleTextChange = (field: string, value: string, serviceKey?: string) => {
    if (serviceKey) {
      setContent({
        ...content,
        text: {
          ...content.text,
          services: {
            ...content.text.services,
            [serviceKey]: {
              ...content.text.services[serviceKey as keyof typeof content.text.services],
              [field]: value
            }
          }
        }
      });
    } else {
      setContent({
        ...content,
        text: {
          ...content.text,
          [field]: value
        }
      });
    }
  };

  const triggerImageUpload = (imageKey: string) => {
    setEditingImage(imageKey);
    fileInputRef.current?.click();
  };

  const serviceCards = [
    {
      key: 'wedding',
      title: content.text.services.wedding.title,
      description: content.text.services.wedding.description,
      image: content.images.services.wedding,
    },
    {
      key: 'birthday',
      title: content.text.services.birthday.title,
      description: content.text.services.birthday.description,
      image: content.images.services.birthday,
    },
    {
      key: 'babyShower',
      title: content.text.services.babyShower.title,
      description: content.text.services.babyShower.description,
      image: content.images.services.babyShower,
    },
    {
      key: 'graduation',
      title: content.text.services.graduation.title,
      description: content.text.services.graduation.description,
      image: content.images.services.graduation,
    },
    {
      key: 'special',
      title: content.text.services.special.title,
      description: content.text.services.special.description,
      image: content.images.services.special,
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
              <Home className="w-8 h-8 mr-3 text-rose-500" />
              Home Page Editor
            </h1>
            <p className="text-gray-600">Customize all text and images on your home page • Auto-saves changes</p>
          </div>
          <button
            onClick={handleSave}
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
                <span>Save All Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Hero Section Editor */}
      <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-rose-100 rounded-lg">
            <Type className="w-6 h-6 text-rose-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Hero Section</h2>
            <p className="text-gray-600 text-sm">Main banner at the top of the home page</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hero Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Background Image</label>
            <div className="relative h-48 bg-gray-100 rounded-xl overflow-hidden mb-3">
              <Image
                src={content.images.heroBackground}
                alt="Hero Background"
                fill
                className="object-cover"
              />
            </div>
            <button
              onClick={() => triggerImageUpload('heroBackground')}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              <Upload className="w-4 h-4" />
              <span>Replace Image</span>
            </button>
          </div>

          {/* Hero Text */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Hero Title</label>
              <textarea
                value={content.text.heroTitle}
                onChange={(e) => handleTextChange('heroTitle', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                placeholder="Enter hero title..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Hero Subtitle</label>
              <textarea
                value={content.text.heroSubtitle}
                onChange={(e) => handleTextChange('heroSubtitle', e.target.value)}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                placeholder="Enter hero subtitle..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Services Section Editor */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <ImageIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Service Cards</h2>
            <p className="text-gray-600 text-sm">Edit text and images for each service preview card</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {serviceCards.map((card) => (
            <div
              key={card.key}
              className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 bg-gray-100">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Service Title</label>
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => handleTextChange('title', e.target.value, card.key)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Enter service title..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <input
                    type="text"
                    value={card.description}
                    onChange={(e) => handleTextChange('description', e.target.value, card.key)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Enter description..."
                  />
                </div>
                <button
                  onClick={() => triggerImageUpload(card.key)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  <Upload className="w-4 h-4" />
                  <span>Replace Image</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Link */}
      <div className="mt-8 p-6 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl border border-rose-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Preview Your Changes</h3>
            <p className="text-gray-600 text-sm">
              Click to see how your home page looks with the new text and images
            </p>
          </div>
          <a
            href="/"
            target="_blank"
            className="px-6 py-3 bg-white text-rose-600 font-semibold rounded-full border-2 border-rose-500 hover:bg-rose-50 transition-all flex items-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Preview Home Page</span>
          </a>
        </div>
      </div>
    </div>
  );
}
