import { useState } from "react";
import { Link } from "react-router";
import { Search, Filter, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { services, categories } from "../../data/services";

export function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<"all" | "low" | "mid" | "high">("all");

  const filteredServices = services.filter((service) => {
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesPrice = true;
    if (priceRange === "low") matchesPrice = service.price < 500;
    else if (priceRange === "mid") matchesPrice = service.price >= 500 && service.price < 2000;
    else if (priceRange === "high") matchesPrice = service.price >= 2000;

    return matchesCategory && matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <section className="bg-gradient-to-br from-cyan-400 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Services
            </h1>
            <p className="text-lg text-cyan-100/70 max-w-2xl mx-auto">
              Professional services tailored to your business needs. Book online and get started today.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-64 flex-shrink-0"
          >
            <div className="bg-card rounded-2xl p-6 shadow-sm sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="h-5 w-5 text-foreground/80" />
                <h2 className="font-semibold text-foreground">Filters</h2>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70" />
                  <input
                    type="text"
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Category
                </label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === category.id
                          ? "bg-card text-cyan-500"
                          : "text-foreground/80 hover:bg-muted/20"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Price Range
                </label>
                <div className="space-y-2">
                  {[
                    { id: "all", label: "All Prices" },
                    { id: "low", label: "Under $500" },
                    { id: "mid", label: "$500 - $2,000" },
                    { id: "high", label: "Over $2,000" },
                  ].map((range) => (
                    <button
                      key={range.id}
                      onClick={() => setPriceRange(range.id as any)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        priceRange === range.id
                          ? "bg-card text-cyan-500"
                          : "text-foreground/80 hover:bg-muted/20"
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset Button */}
              {(selectedCategory !== "all" || searchQuery || priceRange !== "all") && (
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                    setPriceRange("all");
                  }}
                  className="w-full mt-6 px-4 py-2 text-sm font-medium text-cyan-500 hover:bg-card rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </motion.aside>

          {/* Services Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">{filteredServices.length}</span>{" "}
                {filteredServices.length === 1 ? "service" : "services"} found
              </p>
            </div>

            {filteredServices.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-card rounded-2xl p-12 text-center"
              >
                <div className="w-16 h-16 bg-muted/40 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground/70" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No services found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                    setPriceRange("all");
                  }}
                  className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-cyan-600 transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Link
                      to={`/services/${service.id}`}
                      className="block bg-card rounded-2xl overflow-hidden hover:shadow-xl transition-shadow group h-full"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                          <div className="bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-foreground capitalize">
                            {service.category}
                          </div>
                          {service.popular && (
                            <div className="bg-yellow-400 text-foreground px-3 py-1 rounded-full text-xs font-semibold">
                              Popular
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-cyan-500 transition-colors">
                          {service.name}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {service.shortDescription}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div>
                            <div className="text-2xl font-bold text-foreground">
                              ₹{service.price.toLocaleString('en-IN')}
                            </div>
                            <div className="text-sm text-muted-foreground">{service.duration}</div>
                          </div>
                          <div className="flex items-center gap-2 text-cyan-500 font-medium group-hover:gap-3 transition-all">
                            View Details
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
