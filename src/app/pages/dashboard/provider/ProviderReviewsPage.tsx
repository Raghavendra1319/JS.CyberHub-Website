import { Star, ThumbsUp, MessageSquare, Filter, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

export function ProviderReviewsPage() {
  const overallStats = {
    avgRating: 4.9,
    totalReviews: 156,
    breakdown: [
      { stars: 5, count: 132, percentage: 85 },
      { stars: 4, count: 18, percentage: 12 },
      { stars: 3, count: 4, percentage: 2 },
      { stars: 2, count: 1, percentage: 1 },
      { stars: 1, count: 1, percentage: 0 },
    ]
  };

  const reviews = [
    {
      id: 1,
      client: "Sarah Johnson",
      clientInitial: "S",
      service: "Network Security Audit",
      rating: 5,
      date: "2026-03-02",
      comment: "Exceptional service! The team was professional, thorough, and identified several critical vulnerabilities we weren't aware of. Highly recommend!",
      helpful: 12,
      response: null
    },
    {
      id: 2,
      client: "Michael Chen",
      clientInitial: "M",
      service: "Custom Website Development",
      rating: 5,
      date: "2026-03-01",
      comment: "Outstanding work on our company website. The design is modern, responsive, and exactly what we needed. Communication throughout the project was excellent.",
      helpful: 8,
      response: "Thank you so much for your kind words! We're thrilled you're happy with the result."
    },
    {
      id: 3,
      client: "Emily Rodriguez",
      clientInitial: "E",
      service: "Business Consulting Session",
      rating: 5,
      date: "2026-02-28",
      comment: "Incredibly insightful consultation. Received actionable advice that we've already started implementing. Worth every penny!",
      helpful: 6,
      response: null
    },
    {
      id: 4,
      client: "David Thompson",
      clientInitial: "D",
      service: "Cybersecurity Training",
      rating: 4,
      date: "2026-02-25",
      comment: "Very informative training session. The content was comprehensive, though I wish there was more time for hands-on practice. Overall great experience.",
      helpful: 4,
      response: "Thanks for the feedback! We're adding more hands-on sessions to our training program."
    },
    {
      id: 5,
      client: "Jennifer Lee",
      clientInitial: "J",
      service: "Data Recovery Service",
      rating: 5,
      date: "2026-02-20",
      comment: "Saved our business! We thought we had lost critical data, but they recovered everything. Fast, efficient, and professional. Can't thank them enough!",
      helpful: 15,
      response: "So glad we could help! Data protection is critical and we're here whenever you need us."
    },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Reviews & Ratings</h1>
        <p className="text-muted-foreground mt-1">See what your clients are saying about your services</p>
      </div>

      {/* Overall Rating Summary */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Average Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-6 shadow-sm"
        >
          <div className="text-center">
            <div className="text-6xl font-bold text-foreground mb-2">{overallStats.avgRating}</div>
            <div className="flex justify-center mb-2">
              {renderStars(5)}
            </div>
            <div className="text-sm text-muted-foreground">{overallStats.totalReviews} total reviews</div>
            <div className="mt-4 flex items-center justify-center gap-1 text-green-400 text-sm font-medium">
              <TrendingUp className="h-4 w-4" />
              +0.2 from last month
            </div>
          </div>
        </motion.div>

        {/* Rating Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-card rounded-2xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Rating Breakdown</h3>
          <div className="space-y-3">
            {overallStats.breakdown.map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm font-medium text-foreground/80">{item.stars}</span>
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-1">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
                <div className="w-20 text-right">
                  <span className="text-sm font-medium text-foreground/80">{item.count}</span>
                  <span className="text-sm text-muted-foreground ml-1">({item.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Reviews List */}
      <div className="bg-card rounded-2xl shadow-sm overflow-hidden mb-6">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Client Reviews</h3>
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted/20 transition-colors">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>

        <div className="divide-y divide-border">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-6 hover:bg-muted/20 transition-colors"
            >
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-white font-medium text-lg flex-shrink-0">
                    {review.clientInitial}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{review.client}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      {renderStars(review.rating)}
                      <span className="text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{review.service}</div>
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <div className="ml-16">
                <p className="text-foreground/80 mb-4">{review.comment}</p>

                {/* Review Actions */}
                <div className="flex items-center gap-4 mb-4">
                  <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                    <ThumbsUp className="h-4 w-4" />
                    Helpful ({review.helpful})
                  </button>
                  {!review.response && (
                    <button className="flex items-center gap-2 text-sm text-cyan-500 hover:text-cyan-400">
                      <MessageSquare className="h-4 w-4" />
                      Respond
                    </button>
                  )}
                </div>

                {/* Provider Response */}
                {review.response && (
                  <div className="bg-card border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-medium">JS</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-foreground mb-1">Response from JS.CyberHub</div>
                        <p className="text-sm text-foreground/80">{review.response}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="px-6 py-3 border border-border rounded-lg hover:bg-muted/20 transition-colors font-medium">
          Load More Reviews
        </button>
      </div>
    </div>
  );
}
