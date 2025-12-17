'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const defaultGalleryItems = [
    {
      id: 1,
      category: 'Weddings',
      image: 'https://m.media-amazon.com/images/I/81pLBZipH+L._AC_UF894,1000_QL80_.jpg',
      caption: 'Luxury Floral Wedding Ceremony',
      description: 'Elegant pastel florals with romantic ambiance'
    },
    {
      id: 2,
      category: 'Weddings',
      image: 'https://m.media-amazon.com/images/I/81EcVQNQQeL._AC_UF894,1000_QL80_.jpg',
      caption: 'Romantic Rose Gold Wedding Arch',
      description: 'Stunning ceremony backdrop with cascading flowers'
    },
    {
      id: 3,
      category: 'Weddings',
      image: 'https://www.wholeblossoms.com/wedding-flowers-blog/wp-content/uploads/2024/01/IMG_8298-min-940x1156.jpeg',
      caption: 'Grecian White & Gold Reception',
      description: 'Elegant white florals with gold accents'
    },
    {
      id: 4,
      category: 'Birthdays',
      image: 'https://i.etsystatic.com/14397413/r/il/e549bc/1768374862/il_570xN.1768374862_p67d.jpg',
      caption: 'Pink Balloon Garland Dessert Table',
      description: 'Whimsical first birthday celebration'
    },
    {
      id: 5,
      category: 'Birthdays',
      image: 'https://i.etsystatic.com/14397413/r/il/e549bc/1768374862/il_570xN.1768374862_p67d.jpg',
      caption: 'Pink & White Balloon Garland Party',
      description: 'Elegant dessert table with balloon decorations'
    },
    {
      id: 6,
      category: 'Birthdays',
      image: 'https://img.freepik.com/premium-photo/pastel-balloon-arch-birthday-party-decor-with-dessert-table-bunting_1346134-33361.jpg',
      caption: 'Pastel Rainbow Party Decor',
      description: 'Colorful balloon arch with dessert display'
    },
    {
      id: 7,
      category: 'Baby Showers',
      image: 'https://www.babysavers.com/wp-content/uploads/2024/11/baby-shower-ideas-boho-baby-theme.jpg',
      caption: 'Boho Baby Welcome',
      description: 'Sage and rose gold balloon garland'
    },
    {
      id: 8,
      category: 'Baby Showers',
      image: 'https://www.babysavers.com/wp-content/uploads/2025/01/spring-baby-shower-themes-pastel-dreams-idea.jpeg',
      caption: 'Pastel Dreams Baby Shower',
      description: 'Soft pastel balloons with elegant table setting'
    },
    {
      id: 9,
      category: 'Baby Showers',
      image: 'https://www.babysavers.com/wp-content/uploads/2024/10/baby-shower-centerpieces-1-1.jpeg',
      caption: 'Blue & Gold Teddy Bear Theme',
      description: 'Adorable balloon centerpieces for baby boy'
    },
    {
      id: 10,
      category: 'Graduations',
      image: 'https://m.media-amazon.com/images/I/81FMRGc-3HL._AC_UF894,1000_QL80_.jpg',
      caption: 'Burgundy & Gold Graduation Celebration',
      description: 'Sophisticated balloon garland with metallic accents'
    },
    {
      id: 11,
      category: 'Graduations',
      image: 'https://www.prettymyparty.com/wp-content/uploads/2024/04/graduation-party-photo-display.jpeg',
      caption: 'Colorful Graduation Photo Display',
      description: 'Vibrant balloon arch with memory wall'
    },
    {
      id: 12,
      category: 'Graduations',
      image: 'https://m.media-amazon.com/images/I/81f0S1M+3iL._AC_UF894,1000_QL80_.jpg',
      caption: 'Blue & Gold Grad Party',
      description: 'School colors celebration setup'
    },
    {
      id: 13,
      category: 'Other Events',
      image: 'https://cdn.shopify.com/s/files/1/0841/6968/7334/files/baby-shower-themes-girls-13-683x1024.jpg',
      caption: 'Elegant Outdoor Garden Party',
      description: 'Beautiful floral setup for special occasions'
    }
  ];

  const [galleryItems, setGalleryItems] = useState(defaultGalleryItems);

  // Load gallery from database (or localStorage as fallback)
  useEffect(() => {
    const loadGallery = async () => {
      try {
        const { getSupabase } = await import('@/lib/supabase');
        const supabase = await getSupabase();

        if (supabase) {
          // Load from database
          const { data, error } = await supabase
            .from('gallery_images')
            .select('*')
            .order('created_at', { ascending: false });

          if (!error && data && data.length > 0) {
            const mappedItems = data.map((item: any) => ({
              id: item.id,
              category: item.category,
              image: item.image_url,
              caption: item.title || 'Event Photo',
              description: `Uploaded ${new Date(item.date || item.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`,
              type: item.type || 'image'
            }));
            setGalleryItems(mappedItems);
            console.log('📊 Public gallery loaded from database:', data.length, 'items');
            return;
          }
        }
      } catch (error) {
        console.error('Error loading gallery from database:', error);
      }

      // Fallback to localStorage
      const savedGallery = localStorage.getItem('galleryItems');
      if (savedGallery) {
        try {
          const parsed: { id: number; category: string; image: string; title: string; date: string; type?: 'image' | 'video' }[] = JSON.parse(savedGallery);
          const mappedItems = parsed.map((item) => ({
            id: item.id,
            category: item.category,
            image: item.image,
            caption: item.title,
            description: `Uploaded ${new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`,
            type: item.type || 'image'
          }));
          setGalleryItems(mappedItems as any);
        } catch (error) {
          console.error('Error loading gallery:', error);
        }
      }
    };

    loadGallery();
  }, []);

  const categories = ['All', 'Weddings', 'Birthdays', 'Baby Showers', 'Graduations', 'Other Events'];

  const filteredItems = activeFilter === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-teddy-green to-teddy-gold text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Portfolio</h1>
          <p className="text-xl md:text-2xl text-teddy-green-50 max-w-3xl mx-auto">
            A glimpse into the magical events we've created
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  activeFilter === category
                    ? 'bg-gradient-to-r from-teddy-green to-teddy-gold text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer"
              >
                <div className="relative h-96 bg-gray-100">
                  {(item as any).type === 'video' ? (
                    <video
                      src={item.image}
                      className="w-full h-full object-cover"
                      controls
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <Image
                      src={item.image}
                      alt={item.caption}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                    />
                  )}
                  {(item as any).type !== 'video' && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-xl font-bold mb-2">{item.caption}</h3>
                        <p className="text-gray-200 text-sm">{item.description}</p>
                      </div>
                    </>
                  )}
                  {(item as any).type === 'video' && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent pointer-events-none">
                      <h3 className="text-white font-bold text-lg">{item.caption}</h3>
                    </div>
                  )}
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-teddy-green text-xs font-semibold rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">No items found in this category</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Love What You See?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's create something beautiful for your next event
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teddy-green to-teddy-gold text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
