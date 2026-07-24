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
    num_standard: 0,
    num_premium: 0,
    num_bundles: 0,
    num_alumni: 1,
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
      if (name === 'batch') {
        if (value === 'Alumni') {
          updated.ticket_type = 'Alumni';
          updated.num_bundles = 0;
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
    if (formData.batch === 'Alumni') {
      return (parseInt(formData.num_alumni, 10) || 0) * 2500;
    }
    const standard = parseInt(formData.num_standard, 10) || 0;
    const premium = parseInt(formData.num_premium, 10) || 0;
    const bundles = parseInt(formData.num_bundles, 10) || 0;
    return (standard * 1400) + (premium * 1800) + (bundles * 6500);
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

    let final_ticket_type = '';
    let final_num_tickets = 0;

    if (formData.batch === 'Alumni') {
      final_ticket_type = 'Alumni';
      final_num_tickets = Number(formData.num_alumni) || 0;
    } else {
      const stdCount = Number(formData.num_standard) || 0;
      const prmCount = Number(formData.num_premium) || 0;
      const bdlCount = Number(formData.num_bundles) || 0;
      
      final_num_tickets = stdCount + prmCount + (bdlCount * 5);
      
      const types = [];
      if (bdlCount > 0) types.push(`Standard Bundle (x${bdlCount})`);
      if (stdCount > 0) types.push(`Standard (x${stdCount})`);
      if (prmCount > 0) types.push(`Premium (x${prmCount})`);
      
      final_ticket_type = types.join(' + ') || 'Standard';
    }

    if (final_num_tickets < 1) {
      setError('Please select at least one ticket.');
      return;
    }
    if (final_num_tickets > 25) {
      setError('You can only purchase up to 25 tickets per reservation.');
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (!['num_standard', 'num_premium', 'num_alumni', 'num_bundles', 'ticket_type', 'num_tickets'].includes(key)) {
          data.append(key, formData[key]);
        }
      });
      data.append('ticket_type', final_ticket_type);
      data.append('num_tickets', final_num_tickets);
      data.append('payment_slip', paymentSlip);

      // Call our backend API
      const baseUrl = import.meta.env.DEV ? 'http://localhost:3005' : 'https://ticket.moraspirit.com';
      const response = await fetch(`${baseUrl}/api/tickets/reserve`, {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        let errorMsg = result.error || result.message || 'Failed to submit reservation. Please try again.';
        if (typeof errorMsg === 'object') errorMsg = 'A server error occurred. Please try again.';
        throw new Error(errorMsg);
      }

      setFormData({
        buyer_name: '',
        contact_number: '',
        email: '',
        index_number: '',
        batch: '',
        faculty: '',
        department: '',
        ticket_type: 'Standard',
        num_standard: 0,
        num_premium: 0,
        num_bundles: 0,
        num_alumni: 1,
      });
      setPaymentSlip(null);
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
                <label className="block text-xs font-semibold text-gray-400 tracking-wider uppercase mb-1.5">Index Number *</label>
                <input 
                  type="text" 
                  name="index_number"
                  value={formData.index_number}
                  onChange={handleInputChange}
                  required
                  placeholder="Eg: 234567X or 20ME1234"
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
                  <option value="NDT">NDT</option>
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

            {/* Ticket Selection — always visible */}
            <div className="border-t border-white/5 pt-6">
              <label className="block text-xs font-semibold text-gray-400 tracking-wider uppercase mb-3">Choose Tickets *</label>
              <div className="space-y-3">

                {/* Standard Bundle — max 1, hidden for Alumni */}
                {formData.batch !== 'Alumni' && (
                  <div className="bg-gradient-to-r from-green-900/40 to-[#1e2020] border border-green-500/30 p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold tracking-widest text-green-400 uppercase">Special Offer</span>
                      <h4 className="text-md font-bold text-white mt-0.5">Standard Bundle (5 Tickets)</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-sm font-black text-gray-500 line-through">Rs. 7000.00</span>
                        <span className="text-sm font-black text-green-400">Rs. 6500.00</span>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1">Save Rs. 500! · Max 1 per booking</p>
                    </div>
                    <div className="flex items-center bg-[#1a1d1d] border border-white/5 rounded-xl px-2 py-1.5">
                      <button 
                        type="button" 
                        onClick={() => setFormData(prev => ({ ...prev, num_bundles: Math.max(0, Number(prev.num_bundles) - 1) }))}
                        className="text-gray-400 hover:text-white p-1 hover:bg-white/5 rounded"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/></svg>
                      </button>
                      <span className="text-sm font-bold text-white w-8 text-center">{formData.num_bundles || 0}</span>
                      <button 
                        type="button" 
                        onClick={() => setFormData(prev => ({ ...prev, num_bundles: Math.min(1, Number(prev.num_bundles) + 1) }))}
                        className="text-gray-400 hover:text-white p-1 hover:bg-white/5 rounded"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                      </button>
                    </div>
                  </div>
                )}

                {/* Standard Ticket Row — always visible */}
                <div className={`flex items-center justify-between bg-[#1e2020] border border-white/5 p-4 rounded-2xl ${formData.batch === 'Alumni' ? 'opacity-40 pointer-events-none' : ''}`}>
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Standard Offer</span>
                    <h4 className="text-md font-bold text-white mt-0.5">Standard Ticket</h4>
                    <span className="text-sm font-black text-green-400">Rs. 1400.00</span>
                  </div>
                  <div className="flex items-center bg-[#1a1d1d] border border-white/5 rounded-xl px-2 py-1.5">
                    <button 
                      type="button" 
                      onClick={() => setFormData(prev => ({ ...prev, num_standard: Math.max(0, Number(prev.num_standard) - 1) }))}
                      className="text-gray-400 hover:text-white p-1 hover:bg-white/5 rounded"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/></svg>
                    </button>
                    <span className="text-sm font-bold text-white w-8 text-center">{formData.num_standard || 0}</span>
                    <button 
                      type="button" 
                      onClick={() => setFormData(prev => ({ ...prev, num_standard: Math.min(10, Number(prev.num_standard) + 1) }))}
                      className="text-gray-400 hover:text-white p-1 hover:bg-white/5 rounded"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                    </button>
                  </div>
                </div>

                {/* Premium Ticket Row — always visible */}
                <div className={`flex items-center justify-between bg-[#1e2020] border border-white/5 p-4 rounded-2xl ${formData.batch === 'Alumni' ? 'opacity-40 pointer-events-none' : ''}`}>
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-green-400 uppercase">VIP Access</span>
                    <h4 className="text-md font-bold text-white mt-0.5">Premium Ticket</h4>
                    <span className="text-sm font-black text-green-400">Rs. 1800.00</span>
                  </div>
                  <div className="flex items-center bg-[#1a1d1d] border border-white/5 rounded-xl px-2 py-1.5">
                    <button 
                      type="button" 
                      onClick={() => setFormData(prev => ({ ...prev, num_premium: Math.max(0, Number(prev.num_premium) - 1) }))}
                      className="text-gray-400 hover:text-white p-1 hover:bg-white/5 rounded"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/></svg>
                    </button>
                    <span className="text-sm font-bold text-white w-8 text-center">{formData.num_premium || 0}</span>
                    <button 
                      type="button" 
                      onClick={() => setFormData(prev => ({ ...prev, num_premium: Math.min(10, Number(prev.num_premium) + 1) }))}
                      className="text-gray-400 hover:text-white p-1 hover:bg-white/5 rounded"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                    </button>
                  </div>
                </div>



                {/* Alumni Ticket Row — only when Alumni batch is selected */}
                {formData.batch === 'Alumni' && (
                  <div className="bg-green-950/20 border border-green-500/10 p-5 rounded-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold font-mono tracking-widest text-green-400 uppercase">Alumni Offer</span>
                      <h4 className="text-lg font-bold text-white mt-1">Alumni Ticket</h4>
                      <p className="text-sm text-gray-400 mt-0.5">Price: Rs. 2500.00 per Ticket</p>
                    </div>
                    <div className="w-full md:w-32">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Quantity</label>
                      <div className="flex items-center justify-between bg-[#1a1d1d] border border-white/5 rounded-xl px-3 py-2">
                        <button 
                          type="button" 
                          onClick={() => setFormData(prev => ({ ...prev, num_alumni: Math.max(1, Number(prev.num_alumni) - 1) }))}
                          className="text-gray-400 hover:text-white p-1 hover:bg-white/5 rounded"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/></svg>
                        </button>
                        <span className="text-sm font-bold text-white">{formData.num_alumni || 1}</span>
                        <button 
                          type="button" 
                          onClick={() => setFormData(prev => ({ ...prev, num_alumni: Math.min(10, Number(prev.num_alumni) + 1) }))}
                          className="text-gray-400 hover:text-white p-1 hover:bg-white/5 rounded"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
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

              <div className="text-[11px] text-gray-400 leading-relaxed border-t border-white/5 pt-3 space-y-2">
                <p>
                  <strong>Important:</strong> Rename your receipt file to include your <strong>Index Number</strong>.
                </p>
                <div className="text-xs text-gray-300 font-medium mt-3 bg-white/5 p-3 rounded-xl border border-white/10 flex flex-wrap gap-x-4 gap-y-2 items-center justify-center sm:justify-start">
                  <span className="text-green-400 font-bold uppercase tracking-wider text-[10px] bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">Questions?</span>
                  <span className="flex items-center gap-1">
                    <span className="text-gray-400">Yasiru:</span>
                    <a href="tel:0783650000" className="hover:text-green-400 hover:underline font-mono text-gray-200 transition-colors">0783650000</a>
                  </span>
                  <span className="hidden sm:inline text-gray-600">|</span>
                  <span className="flex items-center gap-1">
                    <span className="text-gray-400">Nayomi:</span>
                    <a href="tel:0704587592" className="hover:text-green-400 hover:underline font-mono text-gray-200 transition-colors">0704587592</a>
                  </span>
                </div>
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

            {/* Error Banner */}
            {error && (
              <div className="p-4 bg-red-950/40 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center gap-2">
                <svg className="w-5 h-5 shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                <span>{error}</span>
              </div>
            )}

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
                We have received your reservation and payment slip copy.
              </p>
              <div className="mt-6 p-5 bg-[#25D366]/10 border border-[#25D366]/20 rounded-xl text-center">
                <p className="text-white font-semibold mb-4">Join our WhatsApp Group for updates!</p>
                <a 
                  href="https://chat.whatsapp.com/Ev35asw5Vat3ymGedal9xR" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-full font-bold transition-all shadow-[0_4px_15px_rgba(37,211,102,0.3)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)] hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Join WhatsApp Group
                </a>
            </div>
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
