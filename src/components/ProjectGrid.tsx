import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  X, 
  Layers, 
  Filter, 
  RefreshCw 
} from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { PROJECTS, CATEGORIES } from '../data/projects';
import { ProjectCard } from './ProjectCard';

interface ProjectGridProps {
  onOpenDetails: (project: Project) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ onOpenDetails }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Curated quick-filter tags
  const popularTags = [
    'Three.js',
    'Next.js',
    'WASM',
    'Web Audio API',
    'TypeScript',
    'Framer Motion',
    'D3.js',
    'Recharts'
  ];

  // Filtered projects computation
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      // Category match
      const categoryMatch =
        selectedCategory === 'All' || project.category === selectedCategory;

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const searchMatch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.summary.toLowerCase().includes(query) ||
        project.stack.some((tech) => tech.toLowerCase().includes(query)) ||
        project.architectureDetails.frontendStack.toLowerCase().includes(query);

      // Tag match
      const tagMatch = !selectedTag || project.stack.some(t => t.toLowerCase().includes(selectedTag.toLowerCase()));

      return categoryMatch && searchMatch && tagMatch;
    });
  }, [selectedCategory, searchQuery, selectedTag]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSelectedTag(null);
  };

  return (
    <section id="deployments" className="relative py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.08] text-platinum-muted text-[11px] font-mono mb-4 tracking-widest uppercase">
            <Layers className="w-3.5 h-3.5" />
            <span>ARCHITECTURAL DIRECTORY</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-platinum tracking-tight">
            Curated Exhibitions
          </h2>
          <p className="mt-4 text-sm sm:text-base text-platinum-muted font-light leading-relaxed">
            Fifteen live production systems organized across 3 specialized engineering domains. Launch any live system directly or inspect architectural blueprints.
          </p>
        </div>

        {/* Filter Controls Bar: Categories + Search + Tags */}
        <div className="space-y-6 mb-14">
          
          {/* Category Tabs: Floating Pill Dock with layoutId="activePill" */}
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 sm:pb-0 gap-2 no-scrollbar">
            <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-2xl shadow-noir-card">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`relative shrink-0 px-4 sm:px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 min-h-[44px] flex items-center gap-2 z-10 ${
                      isSelected
                        ? 'text-slate-950 font-bold'
                        : 'text-platinum-muted hover:text-white'
                    }`}
                    aria-pressed={isSelected}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activePill"
                        className="absolute inset-0 bg-white rounded-xl shadow-pill-active -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Bar & Tag Pills */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-platinum-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across all 15 deployments..."
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.16] focus:border-white/40 focus:ring-1 focus:ring-white/30 text-sm text-platinum placeholder:text-platinum-dark transition-all min-h-[44px]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-platinum-muted hover:text-white p-1"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Tech Tag Filters */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-platinum-dark font-mono flex items-center gap-1 mr-1 tracking-wider uppercase">
                <Filter className="w-3 h-3 text-platinum-muted" /> Filter:
              </span>
              {popularTags.map((tag) => {
                const isActive = selectedTag?.toLowerCase() === tag.toLowerCase();
                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(isActive ? null : tag)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all min-h-[36px] flex items-center ${
                      isActive
                        ? 'bg-white text-slate-950 font-semibold shadow-sm'
                        : 'bg-white/[0.02] hover:bg-white/[0.05] text-platinum-muted border border-white/[0.04]'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
              {(selectedTag || searchQuery || selectedCategory !== 'All') && (
                <button
                  onClick={handleResetFilters}
                  className="px-3 py-1 rounded-lg text-xs font-mono text-platinum-muted hover:text-white bg-white/[0.04] border border-white/[0.08] flex items-center gap-1 min-h-[36px]"
                  title="Reset all filters"
                >
                  <RefreshCw className="w-3 h-3" /> Reset
                </button>
              )}
            </div>
          </div>

          {/* Results Count Bar */}
          <div className="flex items-center justify-between text-xs font-mono text-platinum-dark pt-1">
            <span>
              Showing <strong className="text-platinum">{filteredProjects.length}</strong> of{' '}
              <strong className="text-platinum">{PROJECTS.length}</strong> live applications
            </span>
            {selectedCategory !== 'All' && (
              <span className="text-platinum-muted font-mono uppercase tracking-wider text-[11px]">
                Domain: {selectedCategory}
              </span>
            )}
          </div>
        </div>

        {/* Project Cards Grid (15 Total) */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenDetails={onOpenDetails}
                index={index}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-2xl max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-white/[0.04] mx-auto flex items-center justify-center text-platinum-muted mb-4 border border-white/[0.08]">
              <Search className="w-6 h-6 text-platinum" />
            </div>
            <h3 className="font-display font-bold text-xl text-platinum">No exhibitions found</h3>
            <p className="text-platinum-muted text-sm mt-2 font-light">
              No matching applications for &quot;{searchQuery || selectedTag || selectedCategory}&quot;.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-5 px-6 py-2.5 rounded-xl bg-white text-slate-950 font-bold text-xs hover:bg-slate-200 transition-all min-h-[44px]"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
