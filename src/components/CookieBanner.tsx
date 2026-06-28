import React, { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setTimeout(() => setVisible(true), 1000);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{ zIndex: 9999 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg px-4 py-4 md:py-3"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        
        {/* Text */}
        <div className="flex-1">
          <p className="text-xs text-gray-600 leading-relaxed">
            We use cookies to improve your experience, analyze site traffic, and serve personalized content. 
            By clicking <strong>"Accept"</strong>, you consent to our use of cookies. 
            See our{' '}
            
              href="/privacy"
              className="text-[#4F46E5] underline hover:text-[#4338CA]"
            >
              Privacy Policy
            </a>
            {' '}for details.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={decline}
            className="text-xs font-semibold px-3 py-1.5 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="text-xs font-semibold px-4 py-1.5 rounded-md bg-[#4F46E5] text-white hover:bg-[#4338CA] transition-colors cursor-pointer"
          >
            Accept
          </button>
        </div>

      </div>
    </div>
  );
}
