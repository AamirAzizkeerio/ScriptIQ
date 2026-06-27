/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageView, FeatureItem, FaqItem } from '../types';
import { FEATURES, FAQS, SCRIPT_PRESETS } from '../data/mockData';
import { 
  FileText, 
  Search, 
  TrendingUp, 
  Sparkles, 
  FileSpreadsheet, 
  MessageSquare, 
  ArrowRight, 
  ChevronRight, 
  Play, 
  Eye, 
  Settings, 
  Folder, 
  User, 
  Copy, 
  Check, 
  Loader2, 
  Video, 
  Sliders,
  Sparkle
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: PageView) => void;
  density?: 'compact' | 'comfortable';
}

// Icon mapper for FEATURES list
const IconMap: { [key: string]: React.ComponentType<any> } = {
  FileText,
  Search,
  TrendingUp,
  Sparkles,
  FileSpreadsheet,
  MessageSquare,
};

export default function HomeView({ onNavigate, density = 'compact' }: HomeViewProps) {
  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Home Page Mini interactive playground state
  const [demoTopic, setDemoTopic] = useState('Life hacks to save time');
  const [isGeneratingDemo, setIsGeneratingDemo] = useState(false);
  const [demoResult, setDemoResult] = useState<typeof SCRIPT_PRESETS[0] | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleRunDemo = () => {
    setIsGeneratingDemo(true);
    setDemoResult(null);
    setTimeout(() => {
      // Find preset or use default
      const matched = SCRIPT_PRESETS.find(p => p.topic.toLowerCase().includes(demoTopic.toLowerCase())) || SCRIPT_PRESETS[0];
      setDemoResult(matched);
      setIsGeneratingDemo(false);
    }, 1800);
  };

  const isCompact = density === 'compact';

  return (
    <div id="home-view" className={`bg-white transition-all duration-150 ${isCompact ? 'pt-16' : 'pt-24'}`}>
      {/* 1. HERO SECTION */}
      <section id="hero" className={`relative overflow-hidden transition-all duration-150 ${isCompact ? 'py-8 md:py-12 border-b border-gray-100/60' : 'py-16 md:py-24'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Hero Texts */}
            <div className={`lg:col-span-5 text-center lg:text-left ${isCompact ? 'space-y-3' : 'space-y-6'}`}>
              <div className={`inline-flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-md ${isCompact ? 'px-2 py-0.5' : 'px-3 py-1 rounded-full'}`}>
                <span className="w-2 h-2 rounded-full bg-[#4F46E5] animate-pulse" />
                <span className="font-mono text-[9px] font-bold text-gray-500 uppercase tracking-wider">
                  The Next Gen of Creator Tools
                </span>
              </div>
              
              <h1 className={`font-sans tracking-tight text-black leading-[1.1] ${
                isCompact 
                  ? 'text-2xl sm:text-3xl lg:text-4xl font-bold' 
                  : 'text-4xl sm:text-5xl lg:text-6xl font-extrabold'
              }`}>
                Create Better YouTube Scripts <span className="text-[#4F46E5]">with AI</span>
              </h1>
              
              <p className={`font-sans text-gray-500 max-w-xl mx-auto lg:mx-0 leading-relaxed ${
                isCompact ? 'text-xs sm:text-sm' : 'text-base sm:text-lg'
              }`}>
                Generate professional YouTube scripts, SEO-optimized titles, descriptions, and keywords in seconds using AI. Designed for high retention and organic search growth.
              </p>
              
              <div className={`flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 ${isCompact ? 'pt-1' : 'pt-2'}`}>
                <button
                  id="hero-start-free"
                  onClick={() => onNavigate('dashboard')}
                  className={`w-full sm:w-auto font-sans font-semibold text-xs flex items-center justify-center gap-1.5 text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-md cursor-pointer transition-all duration-150 shadow-2xs ${
                    isCompact ? 'px-4 py-2' : 'px-6 py-3.5 rounded-xl shadow-xs hover:shadow-md'
                  }`}
                >
                  Start Free
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  id="hero-watch-demo"
                  onClick={() => {
                    const el = document.getElementById('try-it-now');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full sm:w-auto font-sans font-semibold text-xs flex items-center justify-center gap-1.5 text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200/60 rounded-md cursor-pointer transition-all duration-150 ${
                    isCompact ? 'px-4 py-2' : 'px-6 py-3.5 rounded-xl'
                  }`}
                >
                  Try Interactive Demo
                </button>
              </div>

              {/* Minimalist social proof */}
              <div className={`border-t border-gray-100/80 flex items-center justify-center lg:justify-start gap-4 ${isCompact ? 'pt-3' : 'pt-6'}`}>
                <div>
                  <span className={`block font-sans font-bold text-black ${isCompact ? 'text-sm' : 'text-xl'}`}>10x</span>
                  <span className="block font-sans text-[10px] text-gray-400">Faster Scripting</span>
                </div>
                <div className="w-[1px] h-6 bg-gray-100" />
                <div>
                  <span className={`block font-sans font-bold text-black ${isCompact ? 'text-sm' : 'text-xl'}`}>45%</span>
                  <span className="block font-sans text-[10px] text-gray-400">CTR Average Increase</span>
                </div>
                <div className="w-[1px] h-6 bg-gray-100" />
                <div>
                  <span className={`block font-sans font-bold text-black ${isCompact ? 'text-sm' : 'text-xl'}`}>10k+</span>
                  <span className="block font-sans text-[10px] text-gray-400">Creators Empowered</span>
                </div>
              </div>
            </div>

            {/* Right Hero Dashboard Mockup Card */}
            <div className="lg:col-span-7 flex justify-center lg:justify-end">
              <div 
                id="hero-mockup"
                className="w-full max-w-2xl bg-white border border-gray-200/80 rounded-2xl shadow-xl overflow-hidden p-1 bg-linear-to-b from-gray-50 to-white"
              >
                {/* Simulated Window Frame */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-gray-200" />
                    <span className="w-3 h-3 rounded-full bg-gray-200" />
                    <span className="w-3 h-3 rounded-full bg-gray-200" />
                  </div>
                  <div className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-md text-[10px] font-mono text-gray-400">
                    scriptiq.site/workspace
                  </div>
                  <div className="w-12" />
                </div>

                {/* Simulated App Workspace */}
                <div className="grid grid-cols-4 h-[340px] bg-white">
                  {/* Mock Sidebar */}
                  <div className="col-span-1 border-r border-gray-100 p-3 flex flex-col gap-4 bg-gray-50/50">
                    <div className="flex items-center gap-1.5 px-1.5 py-1 text-xs font-bold text-black">
                      <Sparkles className="w-3.5 h-3.5 text-[#4F46E5]" />
                      ScriptIQ Workspace
                    </div>
                    <div className="space-y-1">
                      <div className="w-full bg-white border border-gray-100 p-1.5 rounded-md text-[10px] text-[#4F46E5] font-semibold flex items-center gap-1">
                        <FileText className="w-3 h-3" /> New Script
                      </div>
                      <div className="w-full p-1.5 rounded-md text-[10px] text-gray-400 flex items-center gap-1">
                        <Folder className="w-3 h-3" /> Projects
                      </div>
                      <div className="w-full p-1.5 rounded-md text-[10px] text-gray-400 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> SEO Keywords
                      </div>
                    </div>
                    <div className="mt-auto pt-3 border-t border-gray-100 flex items-center gap-1.5 px-1">
                      <div className="w-5 h-5 rounded-full bg-[#4F46E5]/10 text-[#4F46E5] flex items-center justify-center text-[9px] font-bold">
                        JD
                      </div>
                      <div className="truncate">
                        <p className="text-[9px] font-semibold text-black leading-none">Jon Doe</p>
                        <span className="text-[8px] text-gray-400">Free Tier</span>
                      </div>
                    </div>
                  </div>

                  {/* Mock Workspace Content */}
                  <div className="col-span-3 p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                      <span className="text-xs font-semibold text-gray-800">Untitled Youtube Script</span>
                      <span className="text-[9px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Ready</span>
                    </div>

                    <div className="space-y-2 flex-1 overflow-hidden">
                      <div className="p-2.5 bg-[#4F46E5]/5 rounded-lg border border-[#4F46E5]/10">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-[#4F46E5] mb-1">
                          <Sparkles className="w-3 h-3" />
                          Title Suggestion #1
                        </div>
                        <p className="text-[10px] text-black font-semibold">10 Life Hacks to Save 2 Hours Every Day</p>
                      </div>

                      <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 flex flex-col gap-1.5">
                        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">Generated Script [Hook]</span>
                        <p className="text-[9px] text-gray-600 line-clamp-4 leading-relaxed">
                          "[VISUAL: Fast-paced montage of clock spinning, stressed builder looking at to-do list. Upbeat background lofi hum.] Imagine what you could do with an extra 730 hours this year. That is an entire month of waking hours, fully restored to you. That is not science fiction—it is the direct result..."
                        </p>
                      </div>
                    </div>

                    {/* Copy/Export simulated action bar */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[10px] text-gray-400">
                      <span>1,240 Words Generated</span>
                      <div className="flex gap-1.5">
                        <span className="px-2 py-1 bg-gray-50 border border-gray-100 rounded-md flex items-center gap-1 font-medium text-black">
                          <Copy className="w-2.5 h-2.5 text-gray-400" /> Copy Script
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FEATURES SECTION */}
      <section id="features" className={`bg-gray-50 border-t border-b border-gray-200/60 transition-all duration-150 ${isCompact ? 'py-10' : 'py-20'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className={`text-center max-w-2xl mx-auto space-y-3 ${isCompact ? 'mb-8' : 'mb-16'}`}>
            <h2 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#4F46E5]">
              Core Capabilities
            </h2>
            <h3 className={`font-sans font-bold text-black tracking-tight ${isCompact ? 'text-xl sm:text-2xl' : 'text-3xl sm:text-4xl font-extrabold'}`}>
              Everything you need to capture attention
            </h3>
            <p className={`font-sans text-gray-500 leading-relaxed ${isCompact ? 'text-xs' : 'text-base'}`}>
              Ditch the writer's block. ScriptIQ provides structured, optimized elements to ensure your videos stand out in feed impressions and maximize audience watch-time.
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${isCompact ? 'gap-4' : 'gap-6 sm:gap-8'}`}>
            {FEATURES.map((feature) => {
              const IconComp = IconMap[feature.iconName] || FileText;
              return (
                <div
                  key={feature.id}
                  id={`feature-card-${feature.id}`}
                  className={`bg-white border border-gray-200 shadow-2xs hover:shadow-xs transition-all duration-150 group relative overflow-hidden ${
                    isCompact ? 'p-4 rounded-md' : 'p-6 rounded-2xl'
                  }`}
                >
                  <div className={`bg-[#4F46E5]/10 text-[#4F46E5] rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 duration-150 ${
                    isCompact ? 'w-8 h-8 mb-3' : 'w-10 h-10 mb-5 rounded-xl'
                  }`}>
                    <IconComp className={isCompact ? 'w-4.5 h-4.5' : 'w-5 h-5'} />
                  </div>
                  <h4 className={`font-sans font-bold text-black flex items-center gap-1 ${isCompact ? 'text-sm mb-1' : 'text-lg mb-2'}`}>
                    {feature.title}
                  </h4>
                  <p className={`font-sans text-gray-500 leading-relaxed ${isCompact ? 'text-[11px]' : 'text-sm'}`}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section id="how-it-works" className={`bg-white transition-all duration-150 ${isCompact ? 'py-10' : 'py-20'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className={`text-center max-w-2xl mx-auto space-y-3 ${isCompact ? 'mb-8' : 'mb-16'}`}>
            <h2 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#4F46E5]">
              Workflow
            </h2>
            <h3 className={`font-sans font-bold text-black tracking-tight ${isCompact ? 'text-xl sm:text-2xl' : 'text-3xl sm:text-4xl font-extrabold'}`}>
              Three steps to creator success
            </h3>
            <p className={`font-sans text-gray-500 leading-relaxed ${isCompact ? 'text-xs' : 'text-base'}`}>
              We stripped the friction from video production. Go from raw idea to launch-ready script packages faster than ever.
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 relative ${isCompact ? 'gap-6' : 'gap-12'}`}>
            {/* Step 1 */}
            <div id="step-1" className={`flex flex-col items-center md:items-start text-center md:text-left ${isCompact ? 'space-y-2' : 'space-y-4'}`}>
              <div className={`bg-black text-white rounded-full flex items-center justify-center font-mono font-bold ${
                isCompact ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm'
              }`}>
                01
              </div>
              <h4 className={`font-sans font-bold text-black ${isCompact ? 'text-sm' : 'text-lg'}`}>Enter your topic</h4>
              <p className={`font-sans text-gray-500 leading-relaxed max-w-xs ${isCompact ? 'text-xs' : 'text-sm'}`}>
                Provide a basic video idea, keywords, or niche direction. Set your target audience and desired tone.
              </p>
            </div>

            {/* Step 2 */}
            <div id="step-2" className={`flex flex-col items-center md:items-start text-center md:text-left ${isCompact ? 'space-y-2' : 'space-y-4'}`}>
              <div className={`bg-[#4F46E5] text-white rounded-full flex items-center justify-center font-mono font-bold shadow-sm shadow-[#4F46E5]/40 ${
                isCompact ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm'
              }`}>
                02
              </div>
              <h4 className={`font-sans font-bold text-black ${isCompact ? 'text-sm' : 'text-lg'}`}>AI analyzes your request</h4>
              <p className={`font-sans text-gray-500 leading-relaxed max-w-xs ${isCompact ? 'text-xs' : 'text-sm'}`}>
                Our model maps high-CTR structures, viral hooks, SEO search values, and custom engagement loops.
              </p>
            </div>

            {/* Step 3 */}
            <div id="step-3" className={`flex flex-col items-center md:items-start text-center md:text-left ${isCompact ? 'space-y-2' : 'space-y-4'}`}>
              <div className={`bg-black text-white rounded-full flex items-center justify-center font-mono font-bold ${
                isCompact ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm'
              }`}>
                03
              </div>
              <h4 className={`font-sans font-bold text-black ${isCompact ? 'text-sm' : 'text-lg'}`}>Generate optimized scripts</h4>
              <p className={`font-sans text-gray-500 leading-relaxed max-w-xs ${isCompact ? 'text-xs' : 'text-sm'}`}>
                Get full scripts (complete with hook, body, CTA, visual cues), title suggestions, descriptions, and tag sets.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. DASHBOARD PREVIEW / TRY IT LIVE SECTION */}
      <section id="try-it-now" className={`bg-gray-50 border-t border-b border-gray-200/60 transition-all duration-150 ${isCompact ? 'py-10' : 'py-20'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className={`text-center max-w-2xl mx-auto space-y-3 ${isCompact ? 'mb-6' : 'mb-12'}`}>
            <h2 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#4F46E5]">
              Interactive Sandbox
            </h2>
            <h3 className={`font-sans font-bold text-black tracking-tight ${isCompact ? 'text-xl sm:text-2xl' : 'text-3xl sm:text-4xl font-extrabold'}`}>
              Test drive the generator instantly
            </h3>
            <p className={`font-sans text-gray-500 leading-relaxed ${isCompact ? 'text-xs' : 'text-base'}`}>
              Pick a trending YouTube topic below or type your own, then click generate to preview our structured AI output.
            </p>
          </div>

          <div className={`max-w-4xl mx-auto bg-white border border-gray-200 overflow-hidden ${
            isCompact ? 'rounded-lg shadow-2xs' : 'rounded-2xl shadow-lg'
          }`}>
            {/* Control Bar */}
            <div className={`bg-white border-b border-gray-100 ${isCompact ? 'p-4' : 'p-6'}`}>
              <div className="flex flex-col md:flex-row gap-4 items-end justify-between">
                <div className="w-full md:flex-1">
                  <label htmlFor="sandbox-topic" className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Select or Type a Topic
                  </label>
                  <div className={`flex flex-wrap gap-1.5 ${isCompact ? 'mb-2' : 'mb-3'}`}>
                    {['Life hacks to save time', 'Why everyone is leaving Silicon Valley', 'Learn coding in 30 days'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setDemoTopic(t)}
                        className={`font-sans transition-all cursor-pointer border ${
                          isCompact 
                            ? `text-[10px] px-2 py-1 rounded-md ${demoTopic === t ? 'bg-[#4F46E5] text-white border-[#4F46E5] font-semibold' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`
                            : `text-xs px-3 py-1.5 rounded-lg ${demoTopic === t ? 'bg-[#4F46E5] text-white border-[#4F46E5] font-semibold' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    id="sandbox-topic"
                    value={demoTopic}
                    onChange={(e) => setDemoTopic(e.target.value)}
                    placeholder="Enter your custom topic idea..."
                    className={`w-full font-sans bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#4F46E5] focus:border-transparent transition-all ${
                      isCompact ? 'text-xs px-3 py-2 rounded-md' : 'text-sm px-4 py-3 rounded-xl'
                    }`}
                  />
                </div>
                <div className="w-full md:w-auto">
                  <button
                    onClick={handleRunDemo}
                    disabled={isGeneratingDemo || !demoTopic.trim()}
                    className={`w-full md:w-auto font-sans font-semibold flex items-center justify-center gap-1.5 text-white bg-black hover:bg-gray-950 cursor-pointer transition-colors disabled:opacity-50 ${
                      isCompact ? 'text-xs px-4 py-2 rounded-md' : 'text-sm px-6 py-3.5 rounded-xl'
                    }`}
                  >
                    {isGeneratingDemo ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkle className="w-3.5 h-3.5 text-white" />
                        Run Script Engine
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Generated Output Preview Area */}
            <div className={`bg-gray-50/50 flex flex-col justify-center ${isCompact ? 'p-4 min-h-[240px]' : 'p-6 min-h-[300px]'}`}>
              {isGeneratingDemo ? (
                /* Skeleton Loader */
                <div className="space-y-3 animate-pulse">
                  <div className="h-5 bg-gray-200 rounded-sm w-3/4" />
                  <div className="h-4 bg-gray-200 rounded-sm w-1/2" />
                  <div className="space-y-1.5 pt-3">
                    <div className="h-3 bg-gray-200 rounded-sm w-full" />
                    <div className="h-3 bg-gray-200 rounded-sm w-11/12" />
                    <div className="h-3 bg-gray-200 rounded-sm w-10/12" />
                  </div>
                  <div className="space-y-1.5 pt-3">
                    <div className="h-3 bg-gray-200 rounded-sm w-full" />
                    <div className="h-3 bg-gray-200 rounded-sm w-9/12" />
                  </div>
                </div>
              ) : demoResult ? (
                /* Generated results */
                <div className={`${isCompact ? 'space-y-4' : 'space-y-6'}`}>
                  <div className="flex items-center justify-between border-b border-gray-200/85 pb-3">
                    <div>
                      <span className="font-mono text-[9px] text-[#4F46E5] font-bold uppercase tracking-wider block mb-0.5">
                        Success • Optimized Workspace
                      </span>
                      <h4 className={`font-sans font-bold text-black ${isCompact ? 'text-sm' : 'text-lg'}`}>
                        {demoResult.topic}
                      </h4>
                    </div>
                    <button
                      onClick={() => onNavigate('dashboard')}
                      className="font-sans text-[11px] font-semibold text-[#4F46E5] hover:text-[#4338CA] flex items-center gap-0.5"
                    >
                      Open in Full Workspace
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Generated Items Grid */}
                  <div className={`grid grid-cols-1 md:grid-cols-3 ${isCompact ? 'gap-4' : 'gap-6'}`}>
                    {/* Column 1: Metadata */}
                    <div className={`md:col-span-1 ${isCompact ? 'space-y-3' : 'space-y-4'}`}>
                      <div className={`bg-white border border-gray-200 shadow-2xs relative ${isCompact ? 'p-3 rounded-md' : 'p-4 rounded-xl'}`}>
                        <button 
                          onClick={() => handleCopy(demoResult.titles[0], 'sandbox-title')}
                          className="absolute top-2.5 right-2.5 text-gray-400 hover:text-black cursor-pointer"
                        >
                          {copiedIndex === 'sandbox-title' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        </button>
                        <span className="block font-sans text-[9px] font-bold text-gray-400 uppercase mb-1">
                          Optimized Title Variant
                        </span>
                        <p className={`font-sans font-bold text-black leading-snug ${isCompact ? 'text-[11px]' : 'text-xs'}`}>
                          {demoResult.titles[0]}
                        </p>
                      </div>

                      <div className={`bg-white border border-gray-200 shadow-2xs relative ${isCompact ? 'p-3 rounded-md' : 'p-4 rounded-xl'}`}>
                        <button 
                          onClick={() => handleCopy(demoResult.description, 'sandbox-desc')}
                          className="absolute top-2.5 right-2.5 text-gray-400 hover:text-black cursor-pointer"
                        >
                          {copiedIndex === 'sandbox-desc' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        </button>
                        <span className="block font-sans text-[9px] font-bold text-gray-400 uppercase mb-1">
                          SEO Description Suggestion
                        </span>
                        <p className={`font-sans text-gray-500 line-clamp-4 leading-relaxed ${isCompact ? 'text-[10px]' : 'text-[11px]'}`}>
                          {demoResult.description}
                        </p>
                      </div>

                      <div className={`bg-white border border-gray-200 shadow-2xs ${isCompact ? 'p-3 rounded-md' : 'p-4 rounded-xl'}`}>
                        <span className="block font-sans text-[9px] font-bold text-gray-400 uppercase mb-1.5">
                          Tags & Keywords
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {demoResult.keywords.slice(0, 5).map((kw, idx) => (
                            <span key={idx} className="font-mono text-[8px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-sm">
                              #{kw.replace(/\s+/g, '')}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Column 2 & 3: Script Panel */}
                    <div className={`md:col-span-2 bg-white border border-gray-200 shadow-2xs flex flex-col ${isCompact ? 'rounded-md' : 'rounded-xl'}`}>
                      <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                        <span className="font-sans text-[9px] font-bold text-gray-400 uppercase">
                          Camera Ready Script
                        </span>
                        <button
                          onClick={() => handleCopy(demoResult.script, 'sandbox-script')}
                          className="font-sans text-[11px] text-gray-500 hover:text-black flex items-center gap-1 cursor-pointer"
                        >
                          {copiedIndex === 'sandbox-script' ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              Copy Complete Script
                            </>
                          )}
                        </button>
                      </div>
                      <div className="p-4 max-h-[300px] overflow-y-auto text-xs font-sans text-gray-600 leading-relaxed whitespace-pre-line space-y-4">
                        {demoResult.script}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Empty/Initial Sandbox State */
                <div className="text-center py-12 space-y-3">
                  <div className="bg-[#4F46E5]/10 text-[#4F46E5] w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                    <Video className="w-6 h-6" />
                  </div>
                  <h4 className="font-sans font-bold text-base text-gray-800">
                    Your generated script package will appear here
                  </h4>
                  <p className="font-sans text-sm text-gray-500 max-w-sm mx-auto">
                    Click "Run Script Engine" above to trigger a simulated YouTube optimization session.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section id="faq" className={`bg-white transition-all duration-150 ${isCompact ? 'py-10' : 'py-20'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className={`text-center space-y-3 ${isCompact ? 'mb-8' : 'mb-16'}`}>
            <h2 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#4F46E5]">
              Questions
            </h2>
            <h3 className={`font-sans font-bold text-black tracking-tight ${isCompact ? 'text-xl sm:text-2xl' : 'text-3xl sm:text-4xl font-extrabold'}`}>
              Frequently Asked Questions
            </h3>
            <p className={`font-sans text-gray-500 max-w-xl mx-auto ${isCompact ? 'text-xs' : 'text-base'}`}>
              Got questions? We have answers. Find everything you need to know about starting your content scaling process.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  id={`faq-item-${index}`}
                  className="border border-gray-200/80 rounded-md overflow-hidden transition-all bg-white"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className={`w-full flex items-center justify-between text-left font-sans font-bold text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer focus:outline-none ${
                      isCompact ? 'p-3 text-xs' : 'p-5 text-sm'
                    }`}
                  >
                    <span>{faq.question}</span>
                    <ChevronRight 
                      className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-90 text-[#4F46E5]' : ''} ${isCompact ? 'w-4 h-4' : 'w-5 h-5'}`} 
                    />
                  </button>

                  <div
                    className={`transition-all duration-200 overflow-hidden ${
                      isOpen ? 'max-h-[300px] border-t border-gray-100' : 'max-h-0'
                    }`}
                  >
                    <div className={`font-sans text-gray-500 leading-relaxed bg-gray-50/50 ${isCompact ? 'p-3 text-[11px]' : 'p-5 text-sm'}`}>
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CTA Bottom Section */}
      <section className={`bg-[#4F46E5] text-white transition-all duration-150 ${isCompact ? 'py-10' : 'py-16'}`}>
        <div className="max-w-4xl mx-auto text-center px-4 space-y-4">
          <h3 className={`font-sans font-bold tracking-tight ${isCompact ? 'text-xl sm:text-2xl' : 'text-3xl sm:text-4xl font-extrabold'}`}>
            Ready to streamline your video pipeline?
          </h3>
          <p className={`font-sans text-[#E0E7FF] max-w-lg mx-auto leading-relaxed ${isCompact ? 'text-xs' : 'text-base'}`}>
            Create high-retention YouTube scripts and meta-data packages. Try ScriptIQ absolutely free.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`inline-flex items-center gap-1.5 font-sans font-bold text-black bg-white hover:bg-gray-100 cursor-pointer transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 duration-150 ${
                isCompact ? 'px-4 py-2 text-xs rounded-md' : 'px-7 py-3.5 rounded-xl text-sm'
              }`}
            >
              Get Started Now — It's Free
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
