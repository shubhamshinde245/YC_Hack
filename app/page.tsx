"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Product interface
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
}

// Hero Section Component with cinematic background
const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematic Background Video/Image */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1920&h=1080&fit=crop"
            alt="Leather artisan at work"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto text-white">
        <div
          className={`transition-all duration-1500 ease-out transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight tracking-wide">
            Oak & Hide
          </h1>
          <p className="text-2xl md:text-3xl text-amber-100 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Timeless Leather Craftsmanship
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 rounded-full text-xl font-semibold transition-all duration-500 transform hover:scale-110 hover:shadow-2xl border-2 border-amber-500">
              Shop Collection
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-10 py-4 rounded-full text-xl font-semibold transition-all duration-500 transform hover:scale-110">
              Discover Our Story
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

// Story Scroll Section with crafting process panels
const StoryScrollSection = () => {
  const [activePanel, setActivePanel] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress =
          (window.innerHeight - rect.top) / window.innerHeight;
        const panelIndex = Math.floor(scrollProgress * 4);
        setActivePanel(Math.max(0, Math.min(3, panelIndex)));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const panels = [
    {
      title: "Raw Materials",
      subtitle: "Only full-grain, ethically sourced leather",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop",
      description:
        "We begin with the finest full-grain leather, carefully selected for its natural beauty and durability.",
    },
    {
      title: "Hand-Stitching",
      subtitle: "Traditional techniques passed down through generations",
      image:
        "https://images.unsplash.com/photo-1580910051074-dc1a6c772e73?w=1200&h=800&fit=crop",
      description:
        "Every stitch is placed by hand, ensuring strength and creating a unique pattern that tells our story.",
    },
    {
      title: "Finishing Touches",
      subtitle: "Applying wax, polishing brass buckles",
      image:
        "https://images.unsplash.com/photo-1525977816735-3c6b3b7c8932?w=1200&h=800&fit=crop",
      description:
        "The final steps bring out the leather's natural patina and add the perfect hardware accents.",
    },
    {
      title: "Final Product",
      subtitle: "A masterpiece ready for a lifetime of use",
      image:
        "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1200&h=800&fit=crop",
      description:
        "Each piece is a testament to craftsmanship, designed to age beautifully and become more valuable over time.",
    },
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-gray-900">
      {panels.map((panel, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            activePanel === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative w-full h-screen">
            <Image
              src={panel.image}
              alt={panel.title}
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl mx-auto px-6">
                <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-wide">
                  {panel.title}
                </h2>
                <p className="text-2xl md:text-3xl text-amber-200 mb-6 font-light">
                  {panel.subtitle}
                </p>
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                  {panel.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Panel Indicators */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20">
        <div className="space-y-4">
          {panels.map((_, index) => (
            <button
              key={index}
              onClick={() => setActivePanel(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activePanel === index
                  ? "bg-amber-400 scale-125"
                  : "bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Featured Collection Grid with hover animations
const FeaturedCollection = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const products: Product[] = [
    {
      id: 1,
      name: "Heritage Leather Wallet",
      price: 89.99,
      description:
        "A classic bi-fold wallet handcrafted from premium full-grain leather for timeless style.",
      images: [
        "https://images.unsplash.com/photo-1580910051074-dc1a6c772e73?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1525977816735-3c6b3b7c8932?w=400&h=400&fit=crop",
      ],
      category: "Wallets",
    },
    {
      id: 2,
      name: "Vintage Messenger Bag",
      price: 249.99,
      description:
        "Spacious yet sleek, this messenger bag blends rustic charm with modern functionality.",
      images: [
        "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&h=400&fit=crop",
      ],
      category: "Bags",
    },
    {
      id: 3,
      name: "Artisan Belt",
      price: 79.99,
      description:
        "Durable leather belt with hand-stitched details and a solid brass buckle.",
      images: [
        "https://images.unsplash.com/photo-1525977816735-3c6b3b7c8932?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1580910051074-dc1a6c772e73?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&h=400&fit=crop",
      ],
      category: "Accessories",
    },
    {
      id: 4,
      name: "Classic Tote Bag",
      price: 189.99,
      description:
        "Elegant tote bag that pairs versatility with artisanal craftsmanship.",
      images: [
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1580910051074-dc1a6c772e73?w=400&h=400&fit=crop",
      ],
      category: "Bags",
    },
  ];

  const nextImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex(
        (prev) => (prev + 1) % selectedProduct.images.length
      );
    }
  };

  const prevImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProduct.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Featured Collection
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our handcrafted leather goods, each piece tells a story of
            tradition and quality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 overflow-hidden cursor-pointer"
              onClick={() => setSelectedProduct(product)}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {product.category}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <button className="w-full bg-white/90 backdrop-blur-sm text-gray-800 py-3 rounded-xl font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    Quick View
                  </button>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-amber-600">
                    ${product.price}
                  </span>
                  <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                <div className="relative">
                  <div className="relative h-96 rounded-2xl overflow-hidden">
                    <Image
                      src={selectedProduct.images[currentImageIndex]}
                      alt={selectedProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Image Navigation */}
                  <div className="flex justify-center mt-4 space-x-2">
                    <button
                      onClick={prevImage}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
                      aria-label="Previous image"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <div className="flex space-x-1">
                      {selectedProduct.images.map((_, index: number) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                            currentImageIndex === index
                              ? "bg-amber-600"
                              : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={nextImage}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
                      aria-label="Next image"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                  <div className="text-4xl font-bold text-amber-600 mb-8">
                    ${selectedProduct.price}
                  </div>
                  <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 mb-4">
                    Add to Cart
                  </button>
                  <button className="w-full border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300">
                    Save for Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// About Section with rustic background
const AboutSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 relative overflow-hidden">
      {/* Rustic texture overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8">
              About Oak & Hide
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              At Oak & Hide, we create leather goods that are not just
              accessories, but heirlooms. Our journey began with a simple dream:
              to create leather goods that stand the test of time.
            </p>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Every piece is crafted with care, using only the finest materials
              and traditional techniques that ensure beauty and durability. We
              believe in the slow craft movement, where quality takes precedence
              over quantity.
            </p>
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              Meet the Makers
            </button>
          </div>

          <div className="relative">
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1580910051074-dc1a6c772e73?w=600&h=400&fit=crop"
                alt="Oak & Hide workshop"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-8 shadow-xl">
              <div className="text-4xl font-bold text-amber-600 mb-2">25+</div>
              <div className="text-gray-600 font-medium">
                Years of Craftsmanship
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Sticky Contact Footer
const ContactFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-bold text-amber-400 mb-6">
              Oak & Hide
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl leading-relaxed">
              We create leather goods that are not just accessories, but
              heirlooms. Crafting timeless pieces with premium materials and
              traditional techniques.
            </p>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-amber-600 p-2 rounded-full">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-300 hover:text-amber-400 transition-colors duration-300 cursor-pointer">
                    hello@oakandhide.com
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-amber-600 p-2 rounded-full">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-300 hover:text-amber-400 transition-colors duration-300 cursor-pointer">
                    +1 (555) 765-4321
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-amber-600 p-2 rounded-full">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-300">
                    789 Artisan Road, Heritage Town, TX 75001
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Follow Our Journey</h4>
            <div className="flex space-x-4">
              {[
                {
                  name: "Instagram",
                  icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4z",
                },
                {
                  name: "Twitter",
                  icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.665 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
                },
                {
                  name: "Pinterest",
                  icon: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z",
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="group bg-gray-800 hover:bg-amber-600 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                >
                  <svg
                    className="w-6 h-6 text-white group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Oak & Hide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div
            className={`text-2xl font-bold transition-colors duration-500 ${
              isScrolled ? "text-amber-600" : "text-white"
            }`}
          >
            Oak & Hide
          </div>
          <div className="hidden md:flex space-x-8">
            {["Home", "Story", "Collection", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`transition-colors duration-500 font-medium ${
                  isScrolled
                    ? "text-gray-700 hover:text-amber-600"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {item}
              </a>
            ))}
          </div>
          <button
            className={`md:hidden transition-colors duration-500 ${
              isScrolled ? "text-gray-700" : "text-white"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

// Main App Component
export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <StoryScrollSection />
      <FeaturedCollection />
      <AboutSection />
      <ContactFooter />

      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: #d97706;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #b45309;
        }
      `}</style>
    </div>
  );
}
