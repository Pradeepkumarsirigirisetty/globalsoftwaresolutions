'use client';
import { useState, useEffect } from 'react';
import PublicLayout from '@/components/layout/PublicLayout';
import api from '@/lib/api';
import type { Gallery } from '@/lib/types';
import { GALLERY_CATEGORIES } from '@/lib/constants';
import { ZoomIn, X } from 'lucide-react';

export default function GalleryPage() {
  const [images, setImages] = useState<Gallery[]>([]);
  const [filtered, setFiltered] = useState<Gallery[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/gallery')
      .then((res) => {
        setImages(res.data);
        setFiltered(res.data);
      })
      .catch(() => setImages([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFiltered(images);
    } else {
      setFiltered(images.filter((img) => img.category === activeCategory));
    }
  }, [activeCategory, images]);

  return (
    <PublicLayout>
      <section className="hero-gradient pt-44 pb-20 md:pt-48 md:pb-24">
        <div className="container-custom relative z-10 text-center">
          <span className="badge bg-white/15 text-white border border-white/25 mb-5">Gallery</span>
          <h1
            className="text-4xl md:text-5xl font-black text-white mb-5"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', letterSpacing: '-0.02em' }}
          >
            Gallery
          </h1>
          <p className="text-blue-100 text-center text-lg md:text-xl leading-relaxed mx-auto max-w-xl">
            A glimpse into our vibrant learning environment.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeCategory === cat.value
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="aspect-square bg-slate-100 rounded-2xl animate-pulse" />
                ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">📸</p>
              <h3 className="text-xl font-bold text-slate-700 mb-2">No Images Yet</h3>
              <p className="text-slate-500">
                Check back soon for photos from our classes and events.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((img) => (
                <div
                  key={img.id}
                  className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-slate-100"
                  onClick={() => setLightbox(img.imageUrl)}
                >
                  <img
                    src={img.imageUrl}
                    alt={img.title || 'Gallery'}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/50 transition-all flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  {img.title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                      <p className="text-white text-sm font-medium">{img.title}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors">
            <X className="w-5 h-5" />
          </button>
          <img
            src={lightbox}
            alt="Lightbox"
            className="max-w-full max-h-[90vh] rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </PublicLayout>
  );
}
