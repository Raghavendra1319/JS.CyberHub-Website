import { useParams, useNavigate, Link } from "react-router";
import { useState } from "react";
import { Calendar, Clock, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { services } from "../../data/services";
import { useBooking } from "../../context/BookingContext";
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, isBefore } from "date-fns";

export function BookingDateTimePage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { updateBooking } = useBooking();
  
  const service = services.find(s => s.id === serviceId);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  if (!service) {
    return <div>Service not found</div>;
  }

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      updateBooking({
        serviceId: service.id,
        serviceName: service.name,
        servicePrice: service.price,
        date: selectedDate,
        timeSlot: selectedTime,
      });
      navigate(`/booking/details/${serviceId}`);
    }
  };

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Select Date & Time</h1>
          <p className="text-muted-foreground mt-1">{service.name}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            {["Select Service", "Date & Time", "Your Details", "Payment"].map((step, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 ${index <= 1 ? "text-cyan-500" : "text-muted-foreground/70"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index < 1 ? "bg-green-600 text-white" : index === 1 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                  }`}>
                    {index < 1 ? <CheckCircle className="h-5 w-5" /> : index + 1}
                  </div>
                  <span className="text-sm font-medium hidden sm:inline">{step}</span>
                </div>
                {index < 3 && <ArrowRight className="h-4 w-4 text-gray-300 hidden sm:block" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">
                  {format(currentMonth, "MMMM yyyy")}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentMonth(addDays(currentMonth, -30))}
                    className="p-2 hover:bg-muted/40 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setCurrentMonth(addDays(currentMonth, 30))}
                    className="p-2 hover:bg-muted/40 rounded-lg transition-colors"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {days.map((day, index) => {
                  const isPast = isBefore(day, new Date()) && !isToday(day);
                  const isSelected = selectedDate && isSameDay(day, selectedDate);
                  const isCurrentMonth = isSameMonth(day, currentMonth);

                  return (
                    <button
                      key={index}
                      onClick={() => !isPast && setSelectedDate(day)}
                      disabled={isPast || !isCurrentMonth}
                      className={`
                        aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all
                        ${!isCurrentMonth ? "text-gray-300 cursor-not-allowed" : ""}
                        ${isPast ? "text-gray-300 cursor-not-allowed" : ""}
                        ${isSelected ? "bg-primary text-white ring-2 ring-blue-600 ring-offset-2" : ""}
                        ${!isPast && !isSelected && isCurrentMonth ? "hover:bg-card text-foreground" : ""}
                        ${isToday(day) && !isSelected ? "ring-2 ring-blue-200" : ""}
                      `}
                    >
                      {format(day, "d")}
                    </button>
                  );
                })}
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-8 pt-8 border-t border-border"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <h3 className="text-lg font-semibold text-foreground">
                      Available Time Slots
                    </h3>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {timeSlots.map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`
                          px-4 py-3 rounded-lg text-sm font-medium transition-all
                          ${selectedTime === time 
                            ? "bg-primary text-white ring-2 ring-blue-600 ring-offset-2" 
                            : "bg-muted/20 text-foreground hover:bg-card"
                          }
                        `}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card rounded-2xl p-6 sticky top-24"
            >
              <h3 className="font-semibold text-foreground mb-4">Booking Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Service</div>
                  <div className="font-medium text-foreground">{service.name}</div>
                </div>

                {selectedDate && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Date</div>
                    <div className="font-medium text-foreground">
                      {format(selectedDate, "EEEE, MMMM d, yyyy")}
                    </div>
                  </div>
                )}

                {selectedTime && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Time</div>
                    <div className="font-medium text-foreground">{selectedTime}</div>
                  </div>
                )}

                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total</span>
                    <span className="text-2xl font-bold text-foreground">₹{service.price.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleContinue}
                disabled={!selectedDate || !selectedTime}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Continue
                <ArrowRight className="h-5 w-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
