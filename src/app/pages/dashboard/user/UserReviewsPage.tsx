import { useState } from "react";
import { Star, MessageSquare, ThumbsUp, Calendar, Edit2, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { format } from "date-fns";
import { toast } from "sonner";

export function UserReviewsPage() {
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  });

  // Mock data
  const myReviews = [
    {
      id: "1",
      serviceName: "Network Security Audit",
      bookingId: "BK1709543210",
      rating: 5,
      comment:
        "Excellent service! The team was very professional and thorough. They identified several vulnerabilities we weren't aware of and provided clear recommendations.",
      date: new Date(2025, 11, 20),
      helpful: 12,
    },
    {
      id: "2",
      serviceName: "Business Strategy Consulting",
      bookingId: "BK1708234567",
      rating: 5,
      comment:
        "Great insights and actionable advice. The consultant understood our business needs perfectly and delivered a comprehensive strategy that we're already implementing.",
      date: new Date(2025, 10, 30),
      helpful: 8,
    },
    {
      id: "3",
      serviceName: "Cybersecurity Training",
      bookingId: "BK1707123456",
      rating: 4,
      comment:
        "Very informative training session. The trainer was knowledgeable and made complex topics easy to understand. Would recommend to other businesses.",
      date: new Date(2025, 10, 15),
      helpful: 15,
    },
  ];

  const pendingReviews = [
    {
      bookingId: "BK1709998877",
      serviceName: "Custom Website Development",
      completedDate: new Date(2026, 1, 25),
    },
  ];

  const stats = {
    totalReviews: myReviews.length,
    averageRating: (myReviews.reduce((sum, r) => sum + r.rating, 0) / myReviews.length).toFixed(
      1
    ),
    helpful: myReviews.reduce((sum, r) => sum + r.helpful, 0),
  };

  const handleStarClick = (rating: number) => {
    setNewReview((prev) => ({ ...prev, rating }));
  };

  const handleSubmitReview = () => {
    if (!newReview.comment.trim()) {
      toast.error("Please write a review comment");
      return;
    }
    toast.success("Review submitted successfully!");
    setIsWritingReview(false);
    setNewReview({ rating: 5, comment: "" });
  };

  const handleDeleteReview = (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      toast.success("Review deleted successfully!");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Reviews</h1>
        <p className="text-gray-600 mt-1">Share your experience and help others make informed decisions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <MessageSquare className="h-8 w-8 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalReviews}</div>
          <div className="text-gray-600">Total Reviews</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <Star className="h-8 w-8 text-yellow-400 fill-current" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.averageRating}</div>
          <div className="text-gray-600">Average Rating</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <ThumbsUp className="h-8 w-8 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.helpful}</div>
          <div className="text-gray-600">Helpful Votes</div>
        </motion.div>
      </div>

      {/* Pending Reviews */}
      {pendingReviews.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-yellow-600" />
            Pending Reviews
          </h3>
          <div className="space-y-3">
            {pendingReviews.map((booking) => (
              <div
                key={booking.bookingId}
                className="bg-white rounded-xl p-4 flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold text-gray-900">{booking.serviceName}</div>
                  <div className="text-sm text-gray-600">
                    Completed on {format(booking.completedDate, "MMM d, yyyy")}
                  </div>
                </div>
                <button
                  onClick={() => setIsWritingReview(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Write Review
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Write Review Modal/Form */}
      {isWritingReview && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Write Your Review</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleStarClick(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= newReview.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Review
            </label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
              rows={5}
              placeholder="Share your experience with this service..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setIsWritingReview(false);
                setNewReview({ rating: 5, comment: "" });
              }}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitReview}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-shadow font-medium"
            >
              Submit Review
            </button>
          </div>
        </motion.div>
      )}

      {/* My Reviews */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">My Reviews</h3>

        {myReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-semibold text-lg text-gray-900">
                    {review.serviceName}
                  </h4>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {review.bookingId}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= review.rating
                            ? "text-yellow-400 fill-current"
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
                    <Calendar className="h-4 w-4" />
                    {format(review.date, "MMM d, yyyy")}
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <ThumbsUp className="h-4 w-4" />
                    {review.helpful} people found this helpful
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Edit review"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteReview(review.id)}
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

      {/* Review Guidelines */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6"
      >
        <h4 className="font-bold text-gray-900 mb-3">Review Guidelines</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>Be honest and detailed about your experience</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>Focus on the service quality and professionalism</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>Avoid personal information or offensive language</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>Your review helps others make informed decisions</span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
