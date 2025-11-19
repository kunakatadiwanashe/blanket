import Navigation from "@/components/Navigation";
import Image from "next/image";
import heroImage from "@/assets/hero-community.jpg";
import blanketsImage from "@/assets/blankets.jpg";
import marketImage from "@/assets/market-day.jpg";

const Gallery = () => {
  const galleryItems = [
    {
      id: 1,
      image: heroImage,
      title: "Community Gathering 2024",
      category: "Events",
    },
    {
      id: 2,
      image: blanketsImage,
      title: "Blankets Collection Drive",
      category: "Charity",
    },
    {
      id: 3,
      image: marketImage,
      title: "Summer Market Day",
      category: "Markets",
    },
    {
      id: 4,
      image: heroImage,
      title: "Live Music Performance",
      category: "Events",
    },
    {
      id: 5,
      image: marketImage,
      title: "Vendor Showcase",
      category: "Markets",
    },
    {
      id: 6,
      image: blanketsImage,
      title: "Blanket Distribution",
      category: "Charity",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Gallery
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Moments of joy, connection, and impact from our events and charity drives.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 aspect-square"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="text-sm font-medium text-primary-foreground/80 mb-2 block">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="max-w-3xl mx-auto text-center mt-20">
            <div className="bg-accent/50 rounded-2xl p-8 shadow-[var(--shadow-soft)]">
              <h2 className="text-3xl font-bold mb-4">Share Your Photos</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Been to one of our events? We&apos;d love to see your photos and memories!
                Tag us on social media to be featured in our gallery.
              </p>
              <p className="text-sm text-muted-foreground">
                #BlanketsAndChill #CommunityLove
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Gallery;
