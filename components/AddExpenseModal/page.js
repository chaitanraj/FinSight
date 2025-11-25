'use client';

import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

export default function AddExpenseModal({open,onClose}) {
  const [merchant, setMerchant] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');

  const handleAddExpense = () => {
    console.log({ merchant, amount, date, category, notes });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-950 to-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-6"  >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X className="w-7 h-7 cursor-pointer" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white mb-6">Add Expense</h2>

        {/* Form */}
        <div className="space-y-4">
          {/* Merchant */}
          <div>
            <label className="block text-slate-300 text-sm mb-2">
              Merchant
            </label>
            <input
              type="text"
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
              className="w-full bg-slate-800 text-white text-sm px-4 py-3 rounded-lg border border-slate-700 focus:outline-none focus:border-slate-600 transition-colors"
            />
          </div>
          {/* Amount  */}
          <div>
            <label className="block text-slate-300 text-sm mb-2">
              Amount
            </label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-slate-800 text-white text-sm px-4 py-3 rounded-lg border border-slate-700 focus:outline-none focus:border-slate-600 transition-colors"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-slate-300 text-sm mb-2">
              Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button className="w-full bg-slate-800 text-white text-sm px-4 py-3 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors flex items-center justify-between text-left">
                  <span className={!date ? "text-slate-400" : ""}>
                    {date ? new Date(date).toLocaleDateString() : "Select date"}
                  </span>
                  <CalendarIcon className="w-4 cursor-pointer h-4 text-slate-400" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 text-gray-200 bg-slate-900 border-slate-700">
                <Calendar
                  mode="single"
                  selected={date ? new Date(date) : undefined}
                  onSelect={(selectedDate) => {
                    if (selectedDate) {
                      setDate(selectedDate.toISOString().split('T')[0]);
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Category */}
          <div>
            <label className="block text-slate-300 text-sm mb-2">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-800 text-white text-sm px-4 py-3 rounded-lg border border-slate-700 focus:outline-none focus:border-slate-600 transition-colors"
            />
          </div>

          {/* AI Detection Indicator */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-5 h-5 bg-teal-500 rounded-full">
              <Check className="w-3 h-3 text-white" />
            </div>
            <span className="text-slate-300 text-sm">
              Automatically detected by AI
            </span>
          </div>

          {/* Notes */}
          {/* <div>
            <label className="block text-slate-300 text-sm mb-2">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-800 text-white text-sm px-4 py-3 rounded-lg border border-slate-700 focus:outline-none focus:border-slate-600 transition-colors resize-none h-20"
              placeholder="Add any notes..."
            />
          </div> */}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-slate-800 cursor-pointer text-white text-sm font-medium px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors border border-slate-700"
          >
            Cancel
          </button>
          <button
            onClick={handleAddExpense}
            className="flex-1 bg-teal-600 text-white text-sm font-medium px-4 py-3 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );
}
