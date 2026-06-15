import { useState, useRef, useEffect } from 'react';

export default function TicketForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    buyer_name: '',
    contact_number: '',
    email: '',
    index_number: '',
    batch: '',
    faculty: '',
    department: '',
    ticket_type: 'Standard',
    num_tickets: '1',
  });

  const [paymentSlip, setPaymentSlip] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const fileInputRef = useRef(null);

  // Prevent parent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // Default ticket type to 'Alumni' if batch is Alumni
      if (name === 'batch') {
        if (value === 'Alumni') {
          updated.ticket_type = 'Alumni';
        } else if (prev.batch === 'Alumni') {
          updated.ticket_type = 'Standard';
        }
      }
      return updated;
    });
  };

  const handleFileChange = (file) => {
    if (!file) return;

    // Validate type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setError('Only image files (JPEG, PNG, WEBP) or PDFs are allowed.');
      return;
    }

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Payment slip file size must be less than 5MB.');
      return;
    }

    setPaymentSlip(file);
    setError('');
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const selectFile = () => {
    fileInputRef.current.click();
  };

  const calculateTotal = () => {
    const count = parseInt(formData.num_tickets, 10) || 1;
    if (formData.batch === 'Alumni') {
      return count * 2300;
    }
    const price = formData.ticket_type === 'Premium' ? 1600 : 1200;
    return count * price;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic Validation
    if (!formData.buyer_name || !formData.contact_number || !formData.email || !formData.index_number || !formData.batch) {
      setError('Please fill in all required fields.');
      return;
    }

    // Faculty is required for all
    if (!formData.faculty) {
      setError('Please select your Faculty.');
      return;
    }

    if (!paymentSlip) {
      setError('Please upload your payment slip.');
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      data.append('payment_slip', paymentSlip);

      // Call our backend API
      const response = await fetch('/api/tickets/reserve', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit reservation.');
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-2xl glass-panel p-6 md:p-8 rounded-3xl border border-primary-container/30 shadow-2xl scale-up-anim max-h-[90vh] overflow-y-auto hide-scrollbar bg-[#121414]/95 text-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Close form"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header */}
            <div className="text-center">
              <h2 className="font-sans text-2xl font-black tracking-tight text-white dark:text-primary-fixed uppercase">
                EPILOGUE '26
              </h2>
              <p className="text-xs text-green-500 font-mono tracking-widest uppercase mt-1">
                TICKET RESERVATION
              </p>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="p-4 bg-red-950/40 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center gap-2">
                <svg className="w-5 h-5 shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                <span>{error}</span>
              </div>
            )}

            {/* Fields: Phase 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 tracking-wider uppercase mb-1.5">Full Name *</label>
                <input 
                  type="text" 
                  name="buyer_name"
                  value={formData.buyer_name}
                  onChange={handleInputChange}
                  required
                  placeholder="Eg: Hasith Karunarathne"
                  className="w-full bg-[#1e2020] border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 tracking-wider uppercase mb-1.5">Contact Number *</label>
                <input 
                  type="tel" 
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleInputChange}
                  required
                  placeholder="Eg: 0712345678"
                  className="w-full bg-[#1e2020] border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 tracking-wider uppercase mb-1.5">Email Address *</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Eg: hasith@gmail.com"
                  className="w-full bg-[#1e2020] border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 tracking-wider uppercase mb-1.5">Index Number / NIC *</label>
                <input 
                  type="text" 
                  name="index_number"
                  value={formData.index_number}
                  onChange={handleInputChange}
                  required
                  placeholder="Eg: 234567X or 20ME1234 / NIC"
                  className="w-full bg-[#1e2020] border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 tracking-wider uppercase mb-1.5">Batch *</label>
                <select 
                  name="batch"
                  value={formData.batch}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#1e2020] border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500/50 transition-colors"
                >
                  <option value="">Select Batch</option>
                  <option value="21">21 Batch</option>
                  <option value="22">22 Batch</option>
                  <option value="23">23 Batch</option>
                  <option value="24">24 Batch</option>
                  <option value="25">25 Batch</option>
                  <option value="Alumni">Alumni</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 tracking-wider uppercase mb-1.5">Faculty *</label>
                <select 
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#1e2020] border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500/50 transition-colors"
                >
                  <option value="">Select Faculty</option>
                  <option value="Faculty of Engineering">Faculty of Engineering</option>
                  <option value="Faculty of Business">Faculty of Business</option>
                  <option value="Faculty of Medicine">Faculty of Medicine</option>
                  <option value="Faculty of Architecture">Faculty of Architecture</option>
                  <option value="Faculty of IT">Faculty of IT</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-400 tracking-wider uppercase mb-1.5">Department / Field</label>
                <input 
                  type="text" 
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="Eg: CSE / ENTC / Busi"
                  className="w-full bg-[#1e2020] border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500/50 transition-colors"
                />
              </div>
            </div>

            {/* Branching Category & Quantity */}
            <div className="border-t border-white/5 pt-6">
              {formData.batch === 'Alumni' ? (
                <div className="bg-green-950/20 border border-green-500/10 p-5 rounded-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold font-mono tracking-widest text-green-400 uppercase">Alumni Offer</span>
                    <h4 className="text-lg font-bold text-white mt-1">Alumni Ticket</h4>
                    <p className="text-sm text-gray-400 mt-0.5">Price: Rs. 2300.00 per Ticket</p>
                  </div>
                  <div className="w-full md:w-32">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Quantity</label>
                    <select
                      name="num_tickets"
                      value={formData.num_tickets}
                      onChange={handleInputChange}
                      className="w-full bg-[#1a1d1d] border border-white/5 rounded-xl px-3 py-2 text-sm focus:outline-none"
                    >
                      {[1, 2, 3, 4, 5].map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <label className="block text-xs font-semibold text-gray-400 tracking-wider uppercase mb-1.5">Choose Ticket Category *</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Standard Card */}
                    <div 
                      onClick={() => setFormData(prev => ({ ...prev, ticket_type: 'Standard' }))}
                      className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex flex-col justify-between h-28 ${
                        formData.ticket_type === 'Standard' 
                          ? 'border-green-500 bg-green-500/5 shadow-[0_0_15px_rgba(34,255,68,0.1)]' 
                          : 'border-white/5 bg-[#1e2020] hover:border-white/20'
                      }`}
                    >
                      <div>
                        <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Standard Offer</span>
                        <h4 className="text-md font-bold text-white mt-0.5">Standard Ticket</h4>
                      </div>
                      <span className="text-lg font-black text-green-400">Rs. 1200.00</span>
                    </div>

                    {/* Premium Card */}
                    <div 
                      onClick={() => setFormData(prev => ({ ...prev, ticket_type: 'Premium' }))}
                      className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex flex-col justify-between h-28 ${
                        formData.ticket_type === 'Premium' 
                          ? 'border-green-500 bg-green-500/5 shadow-[0_0_15px_rgba(34,255,68,0.1)]' 
                          : 'border-white/5 bg-[#1e2020] hover:border-white/20'
                      }`}
                    >
                      <div>
                        <span className="text-[10px] font-bold tracking-widest text-green-400 uppercase">VIP Access</span>
                        <h4 className="text-md font-bold text-white mt-0.5">Premium Ticket</h4>
                      </div>
                      <span className="text-lg font-black text-green-400">Rs. 1600.00</span>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <div className="w-full md:w-40">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Number of Tickets</label>
                      <select
                        name="num_tickets"
                        value={formData.num_tickets}
                        onChange={handleInputChange}
                        className="w-full bg-[#1e2020] border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none"
                      >
                        {[1, 2, 3, 4, 5].map(n => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Total Price Display */}
            <div className="bg-[#1e2020] border border-white/5 p-4 rounded-2xl flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-400">Calculated Total</span>
              <span className="text-xl font-black text-green-400 font-mono">
                Rs. {calculateTotal().toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>

            {/* Bank Details */}
            <div className="bg-[#121414] border border-white/5 rounded-2xl p-5 space-y-4">
              <h4 className="text-xs font-bold tracking-widest text-green-400 uppercase flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                Bank Deposit Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-gray-500 block">Account Name</span>
                  <span className="font-semibold text-gray-300">G. A. G. Sathsarani</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Account Number</span>
                  <span className="font-semibold text-gray-300 font-mono">96577045</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Bank</span>
                  <span className="font-semibold text-gray-300">Bank of Ceylon</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Branch</span>
                  <span className="font-semibold text-gray-300">Hikkaduwa Branch</span>
                </div>
              </div>

              <div className="text-[11px] text-gray-400 leading-relaxed border-t border-white/5 pt-3 space-y-1">
                <p>
                  <strong>Important:</strong> Rename your receipt file to include your <strong>Index Number</strong> or <strong>NIC Number</strong>.
                </p>
                <p className="text-[10px] text-gray-500">
                  Questions? Yasiru: 0783650000 | Nayomi: 0704587592
                </p>
              </div>
            </div>

            {/* File Uploader */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-400 tracking-wider uppercase">Upload Payment Receipt / Slip *</label>
              <div 
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={selectFile}
                className={`cursor-pointer border-2 border-dashed rounded-2xl p-6 text-center transition-all flex flex-col items-center justify-center min-h-[120px] ${
                  dragActive 
                    ? 'border-green-500 bg-green-500/5' 
                    : paymentSlip 
                      ? 'border-green-500/30 bg-green-500/5' 
                      : 'border-white/10 bg-[#1e2020] hover:border-white/20'
                }`}
              >
                <input 
                  ref={fileInputRef}
                  type="file" 
                  onChange={(e) => handleFileChange(e.target.files[0])}
                  className="hidden" 
                  accept="image/*,application/pdf"
                />

                {paymentSlip ? (
                  <div className="space-y-2">
                    <svg className="w-10 h-10 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <p className="text-sm font-semibold text-white truncate max-w-[320px]">{paymentSlip.name}</p>
                    <p className="text-xs text-gray-400">Click or drag another file to replace</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <svg className="w-10 h-10 text-gray-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
                    <p className="text-sm font-semibold text-white">Drag & drop your payment slip</p>
                    <p className="text-xs text-gray-500">Supports JPEG, PNG, WEBP, and PDF up to 5MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 border-t border-white/5 pt-6">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/5 text-white py-3 rounded-xl font-semibold text-sm transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={loading}
                className="flex-grow bg-green-700 hover:bg-green-600 disabled:bg-green-800/50 text-white py-3 rounded-xl font-semibold text-sm transition-all hover:shadow-[0_0_15px_rgba(34,255,68,0.2)] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Reserve Ticket'
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Success Screen */
          <div className="text-center py-10 space-y-6">
            <div className="w-20 h-20 bg-green-500/10 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(34,255,68,0.2)]">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
            </div>
            <div className="space-y-2">
              <h3 className="font-sans text-2xl font-black text-white dark:text-primary-fixed uppercase tracking-tight">
                Reservation Submitted!
              </h3>
              <p className="text-xs text-green-500 font-mono tracking-widest uppercase">
                Awaiting Verification
              </p>
            </div>
            <div className="max-w-md mx-auto text-sm text-gray-400 leading-relaxed bg-[#1e2020]/40 p-5 rounded-2xl border border-white/5 space-y-3">
              <p>
                We have received your reservation and payment slip copy. Our team will verify the payment details shortly.
              </p>
              <p className="text-xs text-gray-500">
                Once approved, your e-ticket with a secure verification QR code will be sent to the email address: <strong>{formData.email}</strong>.
              </p>
            </div>
            <button 
              onClick={() => {
                onClose();
                setSuccess(false);
              }}
              className="bg-green-700 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-semibold text-sm transition-all hover:shadow-[0_0_15px_rgba(34,255,68,0.2)]"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
