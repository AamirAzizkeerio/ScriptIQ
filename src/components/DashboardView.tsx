/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageView, MockProject } from '../types';
import { MOCK_PROJECTS, getDynamicScript } from '../data/mockData';
import {
  LayoutDashboard,
  Folder,
  Plus,
  Search,
  Trash2,
  Copy,
  Check,
  LogOut,
  User,
  Sparkles,
  Menu,
  X,
  FileText,
  ChevronRight,
  TrendingUp,
  Video,
  Loader2,
  HelpCircle,
  CheckCircle,
  Sliders,
  Eye,
  ArrowRight,
  Edit2
} from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (view: PageView) => void;
  userEmail?: string;
  density?: 'compact' | 'comfortable';
  onSetDensity?: (density: 'compact' | 'comfortable') => void;
}

export default function DashboardView({ onNavigate, userEmail = 'creator@scriptiq.site', density = 'comfortable', onSetDensity }: DashboardViewProps) {
  const isCompact = density === 'compact';
  // Navigation states inside dashboard
  const [activeTab, setActiveTab] = useState<'workspace' | 'projects'>('workspace');
  
  // Projects states
  const [projects, setProjects] = useState<MockProject[]>(MOCK_PROJECTS);
  const [activeProject, setActiveProject] = useState<MockProject | null>(MOCK_PROJECTS[0]);
  const [searchQuery, setSearchQuery] = useState('');

  // Generation Input state
  const [topicInput, setTopicInput] = useState('');
  const [tonality, setTonality] = useState('engaging');
  const [isGenerating, setIsGenerating] = useState(false);

  // Active Project workspace fields
  const [editedScript, setEditedScript] = useState('');
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDesc, setEditedDesc] = useState('');
  const [editedKeywords, setEditedKeywords] = useState<string[]>([]);
  const [titleSuggestions, setTitleSuggestions] = useState<string[]>([]);

  // UI state managers
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'dirty'>('saved');

  // Load selected project into workspace editor
  useEffect(() => {
    if (activeProject) {
      setEditedScript(activeProject.scriptSnippet);
      setEditedTitle(activeProject.title);
      setEditedDesc(activeProject.description);
      setEditedKeywords(activeProject.keywords);
      setTitleSuggestions([
        activeProject.title,
        `Mastering ${activeProject.topic}: A Step-by-Step Guide`,
        `The Hidden Truth About ${activeProject.topic} Revealed`
      ]);
      setSaveStatus('saved');
    } else {
      setEditedScript('');
      setEditedTitle('');
      setEditedDesc('');
      setEditedKeywords([]);
      setTitleSuggestions([]);
    }
  }, [activeProject]);

  // Handle auto-saving visual cue when editing
  const handleScriptChange = (val: string) => {
    setEditedScript(val);
    setSaveStatus('dirty');
  };

  const handleTitleChange = (val: string) => {
    setEditedTitle(val);
    setSaveStatus('dirty');
  };

  const handleDescChange = (val: string) => {
    setEditedDesc(val);
    setSaveStatus('dirty');
  };

  const triggerSave = () => {
    if (!activeProject) return;
    setSaveStatus('saving');
    setTimeout(() => {
      const updated = projects.map(p => {
        if (p.id === activeProject.id) {
          return {
            ...p,
            title: editedTitle,
            scriptSnippet: editedScript,
            description: editedDesc,
            keywords: editedKeywords
          };
        }
        return p;
      });
      setProjects(updated);
      setSaveStatus('saved');
    }, 800);
  };

  // Copy helper
  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Generate a project
  const handleGenerateScript = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicInput.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      // Get standard preset script structure
      const scriptData = getDynamicScript(topicInput);
      
      const newProj: MockProject = {
        id: `proj-${Date.now()}`,
        title: scriptData.titles[0],
        topic: scriptData.topic,
        date: 'Just now',
        scriptSnippet: scriptData.script,
        keywords: scriptData.keywords,
        description: scriptData.description,
        category: tonality.charAt(0).toUpperCase() + tonality.slice(1)
      };

      setProjects([newProj, ...projects]);
      setActiveProject(newProj);
      setTitleSuggestions(scriptData.titles);
      setTopicInput('');
      setIsGenerating(false);
      setActiveTab('workspace');
      setMobileSidebarOpen(false);
    }, 2000);
  };

  // Delete a project
  const handleDeleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = projects.filter(p => p.id !== id);
    setProjects(filtered);
    if (activeProject?.id === id) {
      setActiveProject(filtered[0] || null);
    }
  };

  // Filter projects by search
  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="dashboard-layout" className="min-h-screen bg-gray-50 flex flex-col md:flex-row text-black">
      
      {/* MOBILE BAR */}
      <div className={`md:hidden flex items-center justify-between bg-white border-b border-gray-200 sticky top-0 z-40 transition-all ${
        isCompact ? 'px-3 py-2' : 'px-4 py-3'
      }`}>
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-1.5"
        >
          <div className="bg-[#4F46E5] text-white p-1 rounded-md">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="font-sans text-sm font-bold text-black">ScriptIQ</span>
        </button>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              setActiveTab('workspace');
              setActiveProject(null);
            }}
            className="p-1 rounded bg-gray-100 text-gray-700"
            title="Create New Script"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1 rounded hover:bg-gray-100 text-gray-700 cursor-pointer"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* SIDEBAR NAVIGATION - DESKTOP / MOBILE OVERLAY */}
      <aside
        id="dashboard-sidebar"
        className={`fixed inset-y-0 left-0 z-40 bg-white border-r border-gray-200 flex flex-col justify-between transform transition-all duration-200 md:relative md:transform-none ${
          isCompact ? 'w-56 p-3' : 'w-64 p-4'
        } ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className={isCompact ? 'space-y-4' : 'space-y-6'}>
          {/* Brand Logo - Desktop Only */}
          <button
            onClick={() => onNavigate('home')}
            className={`hidden md:flex items-center cursor-pointer focus:outline-none ${
              isCompact ? 'gap-1.5 px-1 py-1' : 'gap-2.5 px-2 py-1.5'
            }`}
          >
            <div className={`bg-[#4F46E5] text-white rounded-lg flex items-center justify-center ${isCompact ? 'w-6 h-6' : 'p-1.5'}`}>
              <Sparkles className={isCompact ? 'w-3.5 h-3.5' : 'w-4.5 h-4.5'} />
            </div>
            <span className={`font-sans font-bold text-black ${isCompact ? 'text-base' : 'text-lg'}`}>
              Script<span className="text-[#4F46E5]">IQ</span>
            </span>
          </button>

          {/* Quick Create Button */}
          <button
            id="sidebar-create-btn"
            onClick={() => {
              setActiveTab('workspace');
              setActiveProject(null);
              setMobileSidebarOpen(false);
            }}
            className={`w-full font-sans font-semibold flex items-center justify-center gap-1.5 text-white bg-black hover:bg-gray-900 transition-colors cursor-pointer ${
              isCompact ? 'text-[11px] px-2.5 py-1.5 rounded-md' : 'text-xs px-3 py-2.5 rounded-lg'
            }`}
          >
            <Plus className={isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
            New Script Project
          </button>

          {/* Sidebar Menu Links */}
          <div className={isCompact ? 'space-y-0.5' : 'space-y-1'}>
            <span className={`block font-bold text-gray-400 uppercase tracking-wider ${
              isCompact ? 'text-[9px] px-1 mb-1' : 'text-[10px] px-2 mb-1.5'
            }`}>
              Navigation
            </span>
            <button
              onClick={() => {
                setActiveTab('workspace');
                setMobileSidebarOpen(false);
              }}
              className={`w-full font-sans font-medium flex items-center transition-colors ${
                isCompact ? 'text-[11px] gap-2 px-2 py-1.5 rounded-md' : 'text-xs gap-2.5 px-3 py-2 rounded-lg'
              } ${
                activeTab === 'workspace'
                  ? 'bg-gray-100 text-black'
                  : 'text-gray-500 hover:text-black hover:bg-gray-50'
              }`}
            >
              <LayoutDashboard className={isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
              Generator Workspace
            </button>
            <button
              onClick={() => {
                setActiveTab('projects');
                setMobileSidebarOpen(false);
              }}
              className={`w-full font-sans font-medium flex items-center transition-colors ${
                isCompact ? 'text-[11px] gap-2 px-2 py-1.5 rounded-md' : 'text-xs gap-2.5 px-3 py-2 rounded-lg'
              } ${
                activeTab === 'projects'
                  ? 'bg-gray-100 text-black'
                  : 'text-gray-500 hover:text-black hover:bg-gray-50'
              }`}
            >
              <Folder className={isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
              All Saved Projects ({projects.length})
            </button>
          </div>

          {/* Sidebar Recent Projects Panel */}
          <div className={`pt-1 ${isCompact ? 'space-y-1' : 'space-y-2'}`}>
            <span className={`block font-bold text-gray-400 uppercase tracking-wider ${
              isCompact ? 'text-[9px] px-1 mb-1' : 'text-[10px] px-2 mb-1'
            }`}>
              Recent Projects
            </span>
            <div className={`relative ${isCompact ? 'px-1' : 'px-2'}`}>
              <Search className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isCompact ? 'left-3 w-3 h-3' : 'left-4.5 w-3.5 h-3.5'}`} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full font-sans bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#4F46E5] focus:bg-white ${
                  isCompact ? 'text-[10px] pl-6 pr-2 py-1' : 'text-[11px] pl-7 pr-3 py-1.5'
                }`}
              />
            </div>

            <div className={`overflow-y-auto space-y-0.5 px-1 ${isCompact ? 'max-h-[140px]' : 'max-h-[160px]'}`}>
              {filteredProjects.map((p) => (
                <div
                  key={p.id}
                  className={`w-full font-sans flex items-center justify-between group transition-colors ${
                    isCompact ? 'text-[10px] p-1.5 rounded-sm' : 'text-[11px] p-2 rounded-md'
                  } ${
                    activeProject?.id === p.id
                      ? 'bg-[#4F46E5]/10 text-[#4F46E5] font-semibold'
                      : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setActiveProject(p);
                      setActiveTab('workspace');
                      setMobileSidebarOpen(false);
                    }}
                    className="flex-1 text-left truncate pr-2 cursor-pointer focus:outline-none"
                  >
                    {p.title || 'Untitled Project'}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleDeleteProject(p.id, e)}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity p-0.5 cursor-pointer shrink-0"
                    title="Delete project"
                  >
                    <Trash2 className={isCompact ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
                  </button>
                </div>
              ))}

              {filteredProjects.length === 0 && (
                <span className="block text-[10px] text-gray-400 text-center py-2 italic">
                  No projects found
                </span>
              )}
            </div>
          </div>
        </div>

        {/* User Account / Profile Indicator */}
        <div className={`border-t border-gray-100 relative ${isCompact ? 'pt-2' : 'pt-4'}`}>
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className={`w-full flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer ${
              isCompact ? 'p-1.5 rounded-lg' : 'p-2 rounded-xl'
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              <div className={`rounded-full bg-[#4F46E5]/10 border border-[#4F46E5]/20 text-[#4F46E5] flex items-center justify-center font-sans font-bold ${
                isCompact ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm'
              }`}>
                {userEmail.charAt(0).toUpperCase()}
              </div>
              <div className="truncate text-left">
                <span className={`block font-sans font-semibold text-black truncate leading-tight ${isCompact ? 'text-[11px]' : 'text-xs'}`}>
                  {userEmail.split('@')[0]}
                </span>
                <span className="block font-sans text-[10px] text-gray-400 leading-none">
                  Free Plan
                </span>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileDropdown && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-xl shadow-lg p-1.5 space-y-1 z-50">
              <div className="px-2.5 py-1.5 border-b border-gray-100">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Account</p>
                <p className="text-xs text-black truncate font-medium">{userEmail}</p>
              </div>
              <button
                onClick={() => {
                  setShowProfileDropdown(false);
                  onNavigate('home');
                }}
                className="w-full text-left font-sans text-xs text-gray-700 hover:text-black hover:bg-gray-50 p-2 rounded-lg flex items-center gap-2"
              >
                <User className="w-3.5 h-3.5 text-gray-400" />
                View Homepage
              </button>
              
              {onSetDensity && (
                <div className="px-2.5 py-1.5 border-t border-b border-gray-100 flex flex-col gap-1">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Density</p>
                  <div className="grid grid-cols-2 gap-1 bg-gray-50 p-0.5 rounded-md">
                    <button
                      type="button"
                      onClick={() => onSetDensity('comfortable')}
                      className={`text-[9px] font-medium py-1 px-1.5 rounded-sm transition-all text-center ${
                        !isCompact ? 'bg-white text-black shadow-2xs font-semibold' : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      Comfortable
                    </button>
                    <button
                      type="button"
                      onClick={() => onSetDensity('compact')}
                      className={`text-[9px] font-medium py-1 px-1.5 rounded-sm transition-all text-center ${
                        isCompact ? 'bg-white text-black shadow-2xs font-semibold' : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      Compact
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={() => onNavigate('signin')}
                className="w-full text-left font-sans text-xs text-red-600 hover:bg-red-50 p-2 rounded-lg flex items-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* MAIN CONTAINER CONTENT */}
      <main id="dashboard-main-content" className={`flex-1 overflow-y-auto max-w-7xl mx-auto w-full transition-all ${
        isCompact ? 'p-3 sm:p-4 md:p-5' : 'p-4 sm:p-6 lg:p-8'
      }`}>
        
        {/* ALL PROJECTS TAB VIEW */}
        {activeTab === 'projects' && (
          <div className={isCompact ? 'space-y-4' : 'space-y-6'}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className={`font-sans font-extrabold text-black tracking-tight ${isCompact ? 'text-lg md:text-xl' : 'text-2xl'}`}>Saved Projects</h1>
                <p className={`font-sans text-gray-500 ${isCompact ? 'text-xs' : 'text-sm'}`}>Manage, read, and edit your previously generated video script packages.</p>
              </div>
              <button
                onClick={() => {
                  setActiveTab('workspace');
                  setActiveProject(null);
                }}
                className={`font-sans font-semibold flex items-center gap-1.5 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] shadow-xs cursor-pointer ${
                  isCompact ? 'text-[11px] px-2.5 py-1.5' : 'text-xs px-3 py-2'
                }`}
              >
                <Plus className={isCompact ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
                Create Project
              </button>
            </div>

            <div className="relative">
              <Search className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isCompact ? 'left-3 w-4 h-4' : 'left-3.5 w-4.5 h-4.5'}`} />
              <input
                type="text"
                placeholder="Search projects by title, topic, keywords, or niche category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full font-sans bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all ${
                  isCompact ? 'text-xs pl-9 pr-3 py-2 rounded-lg' : 'text-sm pl-11 pr-4 py-3 rounded-xl'
                }`}
              />
            </div>

            {filteredProjects.length === 0 ? (
              <div className={`bg-white border border-gray-200 text-center ${isCompact ? 'rounded-xl p-8 space-y-3' : 'rounded-2xl p-12 space-y-4'}`}>
                <div className={`rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto ${isCompact ? 'w-10 h-10' : 'w-12 h-12'}`}>
                  <Folder className={isCompact ? 'w-5 h-5' : 'w-6 h-6'} />
                </div>
                <div>
                  <h3 className={`font-sans font-bold text-gray-900 ${isCompact ? 'text-sm' : 'text-base'}`}>No projects found</h3>
                  <p className={`font-sans text-gray-500 ${isCompact ? 'text-xs' : 'text-sm'}`}>Try adjusting your search query or create a brand new script project.</p>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('workspace');
                    setActiveProject(null);
                  }}
                  className={`inline-flex items-center gap-1.5 font-sans font-bold bg-black text-white rounded-lg ${isCompact ? 'text-[11px] px-3 py-1.5' : 'text-xs px-4 py-2'}`}
                >
                  <Plus className="w-3.5 h-3.5" /> Create a Project
                </button>
              </div>
            ) : (
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${isCompact ? 'gap-4' : 'gap-6'}`}>
                {filteredProjects.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setActiveProject(p);
                      setActiveTab('workspace');
                    }}
                    className={`bg-white border border-gray-200 hover:border-[#4F46E5] transition-all duration-150 cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between group relative ${
                      isCompact ? 'rounded-xl p-3.5 h-[145px]' : 'rounded-2xl p-5 h-[180px]'
                    }`}
                  >
                    <div className={isCompact ? 'space-y-1' : 'space-y-2'}>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[9px] bg-[#4F46E5]/10 text-[#4F46E5] font-bold px-2 py-0.5 rounded-sm uppercase">
                          {p.category}
                        </span>
                        <span className="text-[10px] text-gray-400">{p.date}</span>
                      </div>
                      <h4 className={`font-sans font-bold text-gray-900 line-clamp-2 leading-snug ${isCompact ? 'text-xs md:text-sm' : 'text-base'}`}>
                        {p.title}
                      </h4>
                      <p className={`font-sans text-gray-500 line-clamp-2 leading-relaxed ${isCompact ? 'text-[11px]' : 'text-xs'}`}>
                        {p.description}
                      </p>
                    </div>

                    <div className={`flex items-center justify-between border-t border-gray-100 ${isCompact ? 'pt-2' : 'pt-3'}`}>
                      <span className="font-sans text-[10px] font-semibold text-gray-400 uppercase">
                        {p.keywords.length} tags
                      </span>
                      <span className={`font-sans text-[#4F46E5] font-semibold group-hover:translate-x-1 transition-transform duration-150 flex items-center gap-0.5 ${isCompact ? 'text-[11px]' : 'text-xs'}`}>
                        Open Workspace <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleDeleteProject(p.id, e)}
                      className={`absolute opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 hover:bg-gray-50 rounded-lg transition-all ${
                        isCompact ? 'top-2.5 right-2.5 p-1' : 'top-4 right-4 p-1.5'
                      }`}
                      title="Delete Project"
                    >
                      <Trash2 className={isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* WORKSPACE & CREATION TAB VIEW */}
        {activeTab === 'workspace' && (
          <div className={isCompact ? 'space-y-4' : 'space-y-6'}>
            
            {/* Active Workspace Header / Save Indicator */}
            <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 ${
              isCompact ? 'pb-3' : 'pb-5'
            }`}>
              <div>
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#4F46E5]">
                  Creator Suite
                </span>
                <h1 className={`font-sans font-extrabold text-black tracking-tight ${isCompact ? 'text-lg md:text-xl' : 'text-2xl'}`}>
                  {activeProject ? 'Workspace Editor' : 'Generate New YouTube Script'}
                </h1>
                <p className={`font-sans text-gray-500 ${isCompact ? 'text-xs' : 'text-sm'}`}>
                  {activeProject 
                    ? 'Refine, edit, and copy your AI-generated script and search engine metadata.'
                    : 'Input your video concept, select your tone, and let our AI compile an optimized draft.'
                  }
                </p>
              </div>

              {activeProject && (
                <div className="flex items-center gap-3">
                  {/* Saving indicator */}
                  <span className="font-sans text-xs flex items-center gap-1.5">
                    {saveStatus === 'saved' && (
                      <span className="text-gray-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-500" /> Saved
                      </span>
                    )}
                    {saveStatus === 'saving' && (
                      <span className="text-gray-400 flex items-center gap-1">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#4F46E5]" /> Saving...
                      </span>
                    )}
                    {saveStatus === 'dirty' && (
                      <button
                        onClick={triggerSave}
                        className="font-sans text-xs font-bold text-[#4F46E5] hover:underline flex items-center gap-1.5"
                      >
                        <Edit2 className="w-3.5 h-3.5" /> Save Changes
                      </button>
                    )}
                  </span>

                  <button
                    onClick={() => setActiveProject(null)}
                    className={`font-sans font-bold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer ${
                      isCompact ? 'text-[11px] px-2.5 py-1.5' : 'text-xs px-3 py-2'
                    }`}
                  >
                    Start New Script
                  </button>
                </div>
              )}
            </div>

            {/* IF NO PROJECT IS SELECTED (SHOW GENERATION INTERFACE) */}
            {!activeProject ? (
              <div className={`max-w-3xl mx-auto bg-white border border-gray-200 shadow-xs ${
                isCompact ? 'rounded-xl p-5' : 'rounded-2xl p-6 sm:p-8'
              }`}>
                <form onSubmit={handleGenerateScript} className={isCompact ? 'space-y-4' : 'space-y-6'}>
                  
                  {/* Topic Input Area */}
                  <div>
                    <label htmlFor="gen-topic" className="block font-sans text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">
                      1. What is your YouTube Video about?
                    </label>
                    <input
                      type="text"
                      id="gen-topic"
                      required
                      value={topicInput}
                      onChange={(e) => setTopicInput(e.target.value)}
                      placeholder="e.g., Why everyone is leaving Silicon Valley, Productivity tips for programmers..."
                      className={`w-full font-sans bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white focus:border-transparent transition-all ${
                        isCompact ? 'text-xs px-3 py-2 rounded-lg' : 'text-sm px-4 py-3.5 rounded-xl'
                      }`}
                    />
                    <div className="mt-2 flex flex-wrap gap-1.5 items-center">
                      <span className="font-sans text-[10px] text-gray-400">Suggestions:</span>
                      {['Life hacks to save time', 'Why everyone is leaving Silicon Valley', 'Learn coding in 30 days'].map((sug) => (
                        <button
                          key={sug}
                          type="button"
                          onClick={() => setTopicInput(sug)}
                          className="font-sans text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Niche & Tonality Selector */}
                  <div className={`grid grid-cols-1 sm:grid-cols-2 ${isCompact ? 'gap-3' : 'gap-4'}`}>
                    <div>
                      <label htmlFor="gen-tone" className="block font-sans text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">
                        2. Desired Tonality
                      </label>
                      <select
                        id="gen-tone"
                        value={tonality}
                        onChange={(e) => setTonality(e.target.value)}
                        className={`w-full font-sans bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all cursor-pointer ${
                          isCompact ? 'text-xs px-2.5 py-2 rounded-lg' : 'text-sm px-3.5 py-3 rounded-xl'
                        }`}
                      >
                        <option value="engaging">🔥 High Energy & Engaging</option>
                        <option value="analytical">📊 Analytical & Data-Driven</option>
                        <option value="educational">🎓 Educational & Straightforward</option>
                        <option value="storytelling">📖 Deep Storytelling & Narrative</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-sans text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">
                        Target Audience
                      </label>
                      <div className={`flex items-center gap-2 bg-gray-50 border border-gray-200 text-xs text-gray-500 ${
                        isCompact ? 'h-9 px-2.5 rounded-lg text-[11px]' : 'h-11 px-3 rounded-xl'
                      }`}>
                        <Sliders className="w-4 h-4 text-gray-400" />
                        Default: Tech-savvy YouTube Viewers
                      </div>
                    </div>
                  </div>

                  {/* Skeleton/Loading triggers */}
                  <button
                    type="submit"
                    disabled={isGenerating || !topicInput.trim()}
                    className={`w-full font-sans font-bold flex items-center justify-center gap-2 text-white bg-[#4F46E5] hover:bg-[#4338CA] cursor-pointer disabled:opacity-50 transition-all shadow-md shadow-[#4F46E5]/10 ${
                      isCompact ? 'text-xs px-4 py-2.5 rounded-lg' : 'text-sm px-6 py-4 rounded-xl'
                    }`}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                        Compiling Script Structure (ETA 2s)...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4.5 h-4.5 text-white" />
                        Generate Complete Script Package
                      </>
                    )}
                  </button>
                </form>

                {/* Info block for beginner friendly feel */}
                <div className="mt-8 border-t border-gray-100 pt-6 flex gap-3 text-xs text-gray-400">
                  <HelpCircle className="w-5 h-5 text-gray-400 shrink-0" />
                  <p className="leading-relaxed">
                    ScriptIQ uses specialized training data for viral retention maps (Hook, Intrigue, Explanation, Retention Bump, CTA). Our template engine replicates realistic production-grade responses.
                  </p>
                </div>
              </div>
            ) : (
              /* IF ACTIVE PROJECT IS LOADED (SHOW FULL INTERACTIVE EDITOR WORKSPACE) */
              <div className={`grid grid-cols-1 lg:grid-cols-12 ${isCompact ? 'gap-4' : 'gap-8'}`}>
                
                {/* Left Side: Script Editor Canvas (8 Columns) */}
                <div className={`lg:col-span-8 ${isCompact ? 'space-y-4' : 'space-y-6'}`}>
                  
                  {/* Main Script Textarea */}
                  <div className={`bg-white border border-gray-200 shadow-xs overflow-hidden flex flex-col transition-all ${
                    isCompact ? 'rounded-xl h-[380px]' : 'rounded-2xl h-[520px]'
                  }`}>
                    <div className={`border-b border-gray-100 bg-white flex items-center justify-between ${
                      isCompact ? 'px-4 py-2' : 'px-5 py-3'
                    }`}>
                      <span className="font-mono text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-[#4F46E5]" /> Teleprompter Ready Script Draft
                      </span>
                      <button
                        onClick={() => handleCopyText(editedScript, 'editor-script')}
                        className="font-sans text-xs text-gray-500 hover:text-black flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedSection === 'editor-script' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-gray-400" /> Copy Complete Script
                          </>
                        )}
                      </button>
                    </div>

                    <textarea
                      value={editedScript}
                      onChange={(e) => handleScriptChange(e.target.value)}
                      placeholder="Your script content..."
                      className={`w-full flex-1 font-sans text-gray-700 leading-relaxed focus:outline-none resize-none bg-white font-normal ${
                        isCompact ? 'p-4 text-xs' : 'p-5 text-sm'
                      }`}
                    />

                    <div className={`border-t border-gray-100 bg-gray-50/50 flex items-center justify-between text-xs text-gray-400 font-mono ${
                      isCompact ? 'px-4 py-2' : 'px-5 py-3'
                    }`}>
                      <span>{editedScript.split(/\s+/).filter(Boolean).length} words</span>
                      <span>UTF-8 Script File</span>
                    </div>
                  </div>

                  {/* AI Copilot feedback helper box */}
                  <div className={`bg-[#4F46E5]/5 border border-[#4F46E5]/15 flex items-start gap-3 ${
                    isCompact ? 'p-3 rounded-lg' : 'p-4 rounded-xl'
                  }`}>
                    <Sparkles className="w-5 h-5 text-[#4F46E5] shrink-0 mt-0.5" />
                    <div className="space-y-1.5">
                      <h4 className="font-sans font-bold text-xs text-[#4F46E5]">Need to adjust the pacing?</h4>
                      <p className="font-sans text-[11px] text-gray-600 leading-relaxed">
                        Add visual cues like <code className="font-mono bg-[#4F46E5]/10 px-1 py-0.5 rounded-sm">[VISUAL: Zoom in slowly]</code> or auditory marks <code className="font-mono bg-[#4F46E5]/10 px-1 py-0.5 rounded-sm">[AUDIO: Sound effect pops]</code> to coordinate your video editor and keep the pacing optimal.
                      </p>
                    </div>
                  </div>

                </div>

                {/* Right Side: SEO Metadata Options (4 Columns) */}
                <div className={`lg:col-span-4 ${isCompact ? 'space-y-4' : 'space-y-6'}`}>
                  
                  {/* 1. Title Ideas Panel */}
                  <div className={`bg-white border border-gray-200 shadow-xs ${
                    isCompact ? 'rounded-xl p-4 space-y-3' : 'rounded-2xl p-5 space-y-4'
                  }`}>
                    <span className="block font-sans text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Title Suggestions
                    </span>

                    {/* Single editable Active Title */}
                    <div>
                      <label htmlFor="active-title" className="block text-[10px] font-semibold text-gray-400 mb-1">
                        Active Project Title
                      </label>
                      <input
                        type="text"
                        id="active-title"
                        value={editedTitle}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        className={`w-full font-sans font-bold bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F46E5] ${
                          isCompact ? 'text-[11px] p-2' : 'text-xs p-2.5'
                        }`}
                      />
                    </div>

                    {/* Seed suggestions list */}
                    <div className={`pt-2 border-t border-gray-100 ${isCompact ? 'space-y-1.5' : 'space-y-2'}`}>
                      <span className="block text-[9px] font-bold text-gray-400 uppercase">
                        AI Suggested Alternatives
                      </span>
                      {titleSuggestions.map((t, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setEditedTitle(t);
                            setSaveStatus('dirty');
                          }}
                          className={`w-full text-left font-sans border transition-all text-gray-600 hover:text-black hover:border-gray-300 block cursor-pointer ${
                            isCompact ? 'text-[10px] p-1.5 rounded-md' : 'text-[11px] p-2 rounded-lg'
                          } ${
                            editedTitle === t ? 'border-[#4F46E5] bg-[#4F46E5]/5 text-black font-semibold' : 'border-gray-100 bg-gray-50/50'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Description Panel */}
                  <div className={`bg-white border border-gray-200 shadow-xs ${
                    isCompact ? 'rounded-xl p-4 space-y-3' : 'rounded-2xl p-5 space-y-4'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        SEO Video Description
                      </span>
                      <button
                        onClick={() => handleCopyText(editedDesc, 'editor-desc')}
                        className="text-gray-400 hover:text-black cursor-pointer"
                        title="Copy Description"
                      >
                        {copiedSection === 'editor-desc' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <textarea
                      value={editedDesc}
                      onChange={(e) => handleDescChange(e.target.value)}
                      rows={isCompact ? 4 : 5}
                      className={`w-full font-sans bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F46E5] resize-none leading-relaxed text-gray-600 ${
                        isCompact ? 'text-[10px] p-2.5' : 'text-xs p-3'
                      }`}
                    />
                  </div>

                  {/* 3. Tags & Keywords Panel */}
                  <div className={`bg-white border border-gray-200 shadow-xs ${
                    isCompact ? 'rounded-xl p-4 space-y-3' : 'rounded-2xl p-5 space-y-4'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Keywords / Tags
                      </span>
                      <button
                        onClick={() => handleCopyText(editedKeywords.join(', '), 'editor-keywords')}
                        className="text-gray-400 hover:text-black shrink-0 cursor-pointer"
                        title="Copy Keywords List"
                      >
                        {copiedSection === 'editor-keywords' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <div className={`flex flex-wrap ${isCompact ? 'gap-1' : 'gap-1.5'}`}>
                      {editedKeywords.map((kw, idx) => (
                        <span
                          key={idx}
                          className={`font-mono bg-gray-100 text-gray-600 flex items-center gap-1 group ${
                            isCompact ? 'text-[8px] px-1.5 py-0.5 rounded-sm' : 'text-[9px] px-2 py-1 rounded-sm'
                          }`}
                        >
                          #{kw.replace(/\s+/g, '')}
                          <button
                            onClick={() => {
                              const filtered = editedKeywords.filter((_, i) => i !== idx);
                              setEditedKeywords(filtered);
                              setSaveStatus('dirty');
                            }}
                            className="text-gray-400 hover:text-red-500 cursor-pointer"
                          >
                            <X className="w-2.5 h-2.5" />
                          </button>
                        </span>
                      ))}

                      {/* Add new keyword mock input */}
                      <button
                        onClick={() => {
                          const val = prompt('Enter a new search tag:');
                          if (val && val.trim()) {
                            setEditedKeywords([...editedKeywords, val.trim()]);
                            setSaveStatus('dirty');
                          }
                        }}
                        className={`font-mono bg-[#4F46E5]/10 text-[#4F46E5] hover:bg-[#4F46E5]/15 font-bold flex items-center gap-1 cursor-pointer ${
                          isCompact ? 'text-[8px] px-1.5 py-0.5 rounded-sm' : 'text-[9px] px-2 py-1 rounded-sm'
                        }`}
                      >
                        <Plus className="w-2.5 h-2.5" /> Add Tag
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>
        )}

      </main>

    </div>
  );
}
