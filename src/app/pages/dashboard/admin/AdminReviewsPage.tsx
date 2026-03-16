import { useState } from "react";
import { Search, Star, ThumbsUp, Eye, EyeOff, Trash2, Filter, MessageSquare } from "lucide-react";
import { motion } from "motion/react";
import { format } from "date-fns";
import { toast } from "sonner";

export function AdminReviewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRating, setFilterRating] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data
  const reviews = [
    {
      id: "REV001",
      userName: "Rajesh Kumar",
      userEmail: "rajesh@example.com",
      serviceName: "Network Security Audit",
      rating: 5,
      comment:
        "Excellent service! The team was very professional and thorough. They identified several vulnerabilities we weren't aware of and provided clear recommendations.",
      date: new Date(2026, 1, 15),
      helpful: 12,
      status: "published",
      bookingId: "BK1709543210",
    },
    {
      id: "REV002",
      userName: "Priya Sharma",
      userEmail: "priya@example.com",
      serviceName: "Custom Website Development",
      rating: 5,
      comment:
        "Amazing work! The website exceeded our expectations. The team was responsive and delivered on time. Highly recommend their services!",
      date: new Date(2026, 1, 18),
      helpful: 18,
      status: "published",
      bookingId: "BK1708234567",
    },
    {
      id: "REV003",
      userName: "Amit Patel",
      userEmail: "amit@example.com",
      serviceName: "Business Strategy Consulting",
      rating: 4,
      comment:
        "Great insights and practical advice. The consultant really understood our business needs. Only minor issue was the session ran a bit over time.",
      date: new Date(2026, 1, 20),
      helpful: 8,
      status: "published",
      bookingId: "BK1707123456",
    },
    {
      id: "REV004",
      userName: "Sneha Desai",
      userEmail: "sneha@example.com",
      serviceName: "Cybersecurity Training",
      rating: 5,
      comment:
        "Very informative and engaging training. Our team learned a lot about security best practices. The phishing simulation was eye-opening!",
      date: new Date(2026, 1, 22),
      helpful: 15,
      status: "published",
      bookingId: "BK1706987654",
    },
    {
      id: "REV005",
      userName: "Vikram Singh",
      userEmail: "vikram@example.com",
      serviceName: "Data Recovery Service",
      rating: 3,
      comment:
        "Service was okay but took longer than expected. They did recover most of our data though.",
      date: new Date(2026, 1, 25),
      helpful: 5,
      status: "pending",
      bookingId: "BK1705876543",
    },
    {
      id: "REV006",
      userName: "Anjali Mehta",
      userEmail: "anjali@example.com",
      serviceName: "Mobile App Development",
      rating: 5,
      comment:
        "Outstanding app development! The UI/UX is intuitive and our users love it. Great post-launch support too!",
      date: new Date(2026, 2, 1),
      helpful: 22,
      status: "published",
      bookingId: "BK1704765432",
    },
  ];

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      searchQuery === "" ||
      review.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating =
      filterRating === "all" || review.rating === parseInt(filterRating);
    const matchesStatus = filterStatus === "all" || review.status === filterStatus;
    return matchesSearch && matchesRating && matchesStatus;
  });

  const stats = {
    total: reviews.length,
    published: reviews.filter((r) => r.status === "published").length,
    pending: reviews.filter((r) => r.status === "pending").length,
    averageRating: (
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    ).toFixed(1),
  };

  const handleToggleVisibility = (reviewId: string, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "hidden" : "published";
    toast.success(`Review ${reviewId} is now ${newStatus}`);
  };

  const handleDelete = (reviewId: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      toast.success(`Review ${reviewId} deleted successfully`);
    }
  };

  const handleApprove = (reviewId: string) => {
    toast.success(`Review ${reviewId} approved and published`);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reviews Management</h1>
        <p className="text-gray-600 mt-1">Monitor and moderate customer reviews</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</div>
          <div className="text-gray-600">Total Reviews</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.published}</div>
          <div className="text-gray-600">Published</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.pending}</div>
          <div className="text-gray-600">Pending Approval</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.averageRating}</div>
          <div className="text-gray-600">Average Rating</div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-md mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search reviews by customer, service, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="pending">Pending</option>
              <option value="hidden">Hidden</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {review.userName.charAt(0)}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                    <span className="text-sm text-gray-500">{review.userEmail}</span>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        review.status === "published"
                          ? "bg-green-100 text-green-700"
                          : review.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">{review.serviceName}</span>
                    <span className="mx-2">•</span>
                    <span>Booking {review.bookingId}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {review.rating}/5
                    </span>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-3">{review.comment}</p>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <ThumbsUp className="h-4 w-4" />
                      {review.helpful} helpful
                    </div>
                    <div className="text-gray-500">
                      {format(review.date, "MMM d, yyyy")}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {review.status === "pending" && (
                  <button
                    onClick={() => handleApprove(review.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => handleToggleVisibility(review.id, review.status)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title={review.status === "published" ? "Hide review" : "Show review"}
                >
                  {review.status === "published" ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
                <button
                  onClick={() => handleDelete(review.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete review"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
