import { useState } from "react";
import { Calendar as CalendarIcon, Clock, Plus, X, Save, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { format, addDays, startOfWeek, addWeeks, isSameDay } from "date-fns";
import { toast } from "sonner";

interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
  enabled: boolean;
}

interface Unavailability {
  id: string;
  date: Date;
  reason: string;
}

export function ProviderAvailabilityPage() {
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date()));
  const [showAddUnavailability, setShowAddUnavailability] = useState(false);
  const [unavailabilityDate, setUnavailabilityDate] = useState("");
  const [unavailabilityReason, setUnavailabilityReason] = useState("");

  const [weeklySchedule, setWeeklySchedule] = useState<TimeSlot[]>([
    { day: "Monday", startTime: "09:00", endTime: "17:00", enabled: true },
    { day: "Tuesday", startTime: "09:00", endTime: "17:00", enabled: true },
    { day: "Wednesday", startTime: "09:00", endTime: "17:00", enabled: true },
    { day: "Thursday", startTime: "09:00", endTime: "17:00", enabled: true },
    { day: "Friday", startTime: "09:00", endTime: "17:00", enabled: true },
    { day: "Saturday", startTime: "10:00", endTime: "14:00", enabled: false },
    { day: "Sunday", startTime: "10:00", endTime: "14:00", enabled: false }
  ]);

  const [unavailabilities, setUnavailabilities] = useState<Unavailability[]>([
    {
      id: "1",
      date: addDays(new Date(), 5),
      reason: "Personal appointment"
    },
    {
      id: "2",
      date: addDays(new Date(), 12),
      reason: "Out of town"
    }
  ]);

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));

  const handleToggleDay = (index: number) => {
    const updated = [...weeklySchedule];
    updated[index].enabled = !updated[index].enabled;
    setWeeklySchedule(updated);
  };

  const handleTimeChange = (index: number, field: 'startTime' | 'endTime', value: string) => {
    const updated = [...weeklySchedule];
    updated[index][field] = value;
    setWeeklySchedule(updated);
  };

  const handleSaveSchedule = () => {
    toast.success("Weekly schedule updated successfully!");
  };

  const handleAddUnavailability = () => {
    if (!unavailabilityDate || !unavailabilityReason) {
      toast.error("Please fill in all fields");
      return;
    }

    const newUnavailability: Unavailability = {
      id: Date.now().toString(),
      date: new Date(unavailabilityDate),
      reason: unavailabilityReason
    };

    setUnavailabilities([...unavailabilities, newUnavailability]);
    setUnavailabilityDate("");
    setUnavailabilityReason("");
    setShowAddUnavailability(false);
    toast.success("Unavailable date added successfully!");
  };

  const handleRemoveUnavailability = (id: string) => {
    setUnavailabilities(unavailabilities.filter(u => u.id !== id));
    toast.success("Unavailability removed");
  };

  const isUnavailable = (date: Date) => {
    return unavailabilities.some(u => isSameDay(u.date, date));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Availability Management</h1>
        <p className="text-gray-600 mt-1">Manage your working hours and unavailable dates</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Weekly Schedule</h2>
            <Clock className="h-5 w-5 text-blue-600" />
          </div>

          <div className="space-y-4">
            {weeklySchedule.map((slot, index) => (
              <div
                key={slot.day}
                className={`p-4 rounded-lg border-2 transition-all ${
                  slot.enabled
                    ? "border-blue-200 bg-blue-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={slot.enabled}
                      onChange={() => handleToggleDay(index)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className={`font-semibold ${
                      slot.enabled ? "text-gray-900" : "text-gray-400"
                    }`}>
                      {slot.day}
                    </span>
                  </label>
                  {!slot.enabled && (
                    <span className="text-xs text-gray-500 font-medium">Unavailable</span>
                  )}
                </div>

                {slot.enabled && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Start Time</label>
                      <input
                        type="time"
                        value={slot.startTime}
                        onChange={(e) => handleTimeChange(index, 'startTime', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">End Time</label>
                      <input
                        type="time"
                        value={slot.endTime}
                        onChange={(e) => handleTimeChange(index, 'endTime', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleSaveSchedule}
            className="w-full mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save Weekly Schedule
          </button>
        </motion.div>

        {/* Calendar and Unavailable Dates */}
        <div className="space-y-6">
          {/* Calendar View */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Calendar</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentWeek(addWeeks(currentWeek, -1))}
                  className="px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  ←
                </button>
                <button
                  onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
                  className="px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  →
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <div key={i} className="text-center text-xs font-semibold text-gray-600">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {weekDays.map((date, i) => {
                const unavailable = isUnavailable(date);
                const today = isSameDay(date, new Date());
                const daySchedule = weeklySchedule[i];

                return (
                  <div
                    key={i}
                    className={`aspect-square p-2 rounded-lg text-center transition-all ${
                      today
                        ? "bg-blue-600 text-white font-bold"
                        : unavailable
                        ? "bg-red-100 text-red-600"
                        : daySchedule?.enabled
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <div className="text-sm">{format(date, 'd')}</div>
                    <div className="text-xs">{format(date, 'MMM')}</div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-blue-800">
                <strong>Legend:</strong> Green = Available, Red = Unavailable, Blue = Today
              </div>
            </div>
          </motion.div>

          {/* Unavailable Dates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Unavailable Dates</h2>
              <button
                onClick={() => setShowAddUnavailability(!showAddUnavailability)}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showAddUnavailability ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </button>
            </div>

            {showAddUnavailability && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={unavailabilityDate}
                    onChange={(e) => setUnavailabilityDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reason
                  </label>
                  <input
                    type="text"
                    value={unavailabilityReason}
                    onChange={(e) => setUnavailabilityReason(e.target.value)}
                    placeholder="e.g., Personal appointment, Vacation"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <button
                  onClick={handleAddUnavailability}
                  className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Unavailable Date
                </button>
              </div>
            )}

            <div className="space-y-3">
              {unavailabilities.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No unavailable dates set
                </div>
              ) : (
                unavailabilities.map((unavailability) => (
                  <div
                    key={unavailability.id}
                    className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200"
                  >
                    <div className="flex items-center gap-3">
                      <CalendarIcon className="h-4 w-4 text-red-600" />
                      <div>
                        <div className="font-semibold text-gray-900">
                          {format(unavailability.date, "EEEE, MMMM d, yyyy")}
                        </div>
                        <div className="text-sm text-gray-600">{unavailability.reason}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveUnavailability(unavailability.id)}
                      className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
