/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageView } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import DashboardView from './components/DashboardView';
import SignInView from './components/SignInView';
import { PrivacyView, TermsView, RefundView } from './components/LegalViews';
import NotFoundView from './components/NotFoundView';
import YoutubeTitleGeneratorView from './components/YoutubeTitleGeneratorView';

export default function App() {
  const [view, setView] = useState<PageView>('home');
  const [userEmail, setUserEmail] = useState('amirkeerio3@gmail.com');
  const [density, setDensity] = useState<'compact' | 'comfortable'>('compact');

  // Handle cross-page and single-page navigation and scrolling
  const handleNavigation = (targetView: PageView, sectionId?: string) => {
    setView(targetView);
    
    if (sectionId) {
      if (targetView === 'home') {
        // If already on home, scroll immediately
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    } else {
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  // Scroll to top on standard page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [view]);

  // Determine if general layout chrome (Navbar & Footer) should be shown
  const showMainChrome = view !== 'dashboard' && view !== 'signin';

  return (
    <div className={`min-h-screen bg-white font-sans text-black selection:bg-[#4F46E5]/10 selection:text-[#4F46E5] ${density === 'compact' ? 'text-xs' : 'text-sm'}`}>
      {/* 1. Global Navigation header */}
      {showMainChrome && (
        <Navbar currentView={view} onNavigate={handleNavigation} density={density} onSetDensity={setDensity} />
      )}

      {/* 2. Main Page views */}
      <main className="transition-all duration-150 ease-in-out">
        {view === 'home' && (
          <HomeView onNavigate={handleNavigation} density={density} />
        )}
        {view === 'signin' && (
          <SignInView onNavigate={handleNavigation} onSetUserEmail={setUserEmail} density={density} onSetDensity={setDensity} />
        )}
        {view === 'dashboard' && (
          <DashboardView onNavigate={handleNavigation} userEmail={userEmail} density={density} onSetDensity={setDensity} />
        )}
        {view === 'privacy' && (
          <PrivacyView onNavigate={handleNavigation} />
        )}
        {view === 'terms' && (
          <TermsView onNavigate={handleNavigation} />
        )}
        {view === 'refund' && (
          <RefundView onNavigate={handleNavigation} />
        )}
        {view === 'notfound' && (
          <NotFoundView onNavigate={handleNavigation} />
        )}
        {view === 'title-generator' && (
          <YoutubeTitleGeneratorView onNavigate={handleNavigation} density={density} />
        )}
      </main>

      {/* 3. Global Footer */}
      {showMainChrome && (
        <Footer onNavigate={handleNavigation} density={density} />
      )}
    </div>
  );
}

