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
import CookieBanner from './components/CookieBanner';

export default function App() {
  const [view, setView] = useState<PageView>('home');
  const [userEmail, setUserEmail] = useState('amirkeerio3@gmail.com');
  const [density, setDensity] = useState<'compact' | 'comfortable'>('compact');

  // ✅ On first load, read the URL path and set the correct view
  useEffect(() => {
    const path = window.location.pathname.replace('/', '');
    const validViews: PageView[] = ['privacy', 'terms', 'refund', 'title-generator', 'signin', 'dashboard'];
    if (validViews.includes(path as PageView)) {
      setView(path as PageView);
    }
  }, []);

  const handleNavigation = (targetView: PageView, sectionId?: string) => {
    setView(targetView);
    // ✅ Update the browser URL without a page reload
    const path = targetView === 'home' ? '/' : `/${targetView}`;
    window.history.pushState({}, '', path);

    if (sectionId) {
      if (targetView === 'home') {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [view]);

  // ✅ Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace('/', '');
      const validViews: PageView[] = ['privacy', 'terms', 'refund', 'title-generator', 'signin', 'dashboard'];
      if (validViews.includes(path as PageView)) {
        setView(path as PageView);
      } else {
        setView('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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
      {/* 4. Cookie Banner */}
      <CookieBanner />
    </div>
  );
}
