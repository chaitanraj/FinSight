'use client';
import { useState } from 'react';
import { useRef } from 'react';
import { X, Check } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

export default function AddExpenseModal({ open, onClose }) {
  const [merchant, setMerchant] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [AiDetected, setAiDetected] = useState(false);
  const [overrode, setOverrode] = useState(false);

  async function fetchAPI(merchant) {
    const res = await fetch('/api/category-guesser', {
      method: "POST",
      body: JSON.stringify({ "text": merchant })
    });
    const data = await res.json();
    if (data.category) {
      setCategory(data.category);
      setAiDetected(true);
    }
  }
  const debounceTimer = useRef(null);

  const handleMerchantChange = (e) => {
    const value = e.target.value;
    setMerchant(value);
    setAiDetected(false);

    if (AiDetected || overrode) {
      setCategory("");
      setAiDetected(false);
      setOverrode(false);
    }
    if (overrode) return;
    clearTimeout(debounceTimer.current);
    if (value.length >= 3) {
      debounceTimer.current = setTimeout(() => {
        fetchAPI(value);
      }, 200);
    }
  }

  function handleCategoryChange(e) {
    setCategory(e.target.value);
    setOverrode(true);
    setAiDetected(false);
  }

  async function handleAddExpense() {
    const payload = {
      merchant,
      amount,
      date,
      category,
    };

    await fetch("/api/add-expense", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
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
              onChange={handleMerchantChange}
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
                <button className="w-full cursor-pointer bg-slate-800 text-white text-sm px-4 py-3 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors flex items-center justify-between text-left">
                  <span className={!date ? "text-slate-400" : ""}>
                    {date ? new Date(date + 'T00:00:00').toLocaleDateString() : "Select date"}
                  </span>
                  <CalendarIcon className="w-4 cursor-pointer h-4 text-slate-400" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto cursor-pointer p-0 text-gray-200 bg-slate-900 border-slate-700">
                <Calendar
                  mode="single"
                  className="cursor-pointer"
                  selected={date ? new Date(date + 'T00:00:00') : undefined}
                  onSelect={(selectedDate) => {
                    if (selectedDate) {
                      const year = selectedDate.getFullYear();
                      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
                      const day = String(selectedDate.getDate()).padStart(2, '0');
                      setDate(`${year}-${month}-${day}`);
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Category */}
          <div>
            <label className="block cursor-pointer text-slate-300 text-sm mb-2">
              Category
            </label>

            <select
              value={category}
              onChange={handleCategoryChange}
              className="w-full cursor-pointer bg-slate-900 text-white text-sm px-4 py-3 rounded-lg border border-slate-700 focus:outline-none focus:border-slate-600 transition-colors"
            >
              <option value="" disabled>
                {AiDetected ? "Detected by AI" : "Select a category"}
              </option>

              <option value="Groceries">Groceries</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Shopping">Shopping</option>
              <option value="Utilities">Utilities</option>
              <option value="Rent">Rent</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="Travel">Travel</option>
              <option value="Other">Other</option>
            </select>
          </div>


          {/* AI Detection Indicator */}
          {(AiDetected) ?
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-5 h-5 bg-teal-500 rounded-full">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-slate-300 text-sm">
                Automatically detected by AI
              </span>
            </div>
            : <></>}
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
            className="flex-1 bg-teal-600 text-white cursor-pointer text-sm font-medium px-4 py-3 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );
}
