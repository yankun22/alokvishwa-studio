import React, { useState, useEffect } from 'react';
import { ParticleBackground } from './components/ParticleBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectGrid } from './components/ProjectGrid';
import { BentoGrid } from './components/BentoGrid';
import { TechMatrix } from './components/TechMatrix';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { CommandPalette } from './components/CommandPalette';
import { ProposalsModal } from './components/ProposalsModal';
import { useKeyboardShortcut } from './hooks/useKeyboardShortcut';
import { Project } from './types';

export function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [proposalsModalOpen, setProposalsModalOpen] = useState(false);

  // Global keyboard shortcut: Cmd+K / Ctrl+K opens Command Palette
  useKeyboardShortcut('k', () => {
    setCommandPaletteOpen((prev) => !prev);
  });

  // Global keyboard shortcut: Shift+P opens Proposals Vault
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // If pressing Shift+P or Alt+P and not actively focused in a form text input
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
      if (!isInput && e.key.toLowerCase() === 'p' && (e.shiftKey || e.altKey)) {
        e.preventDefault();
        setProposalsModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Global Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedProject) setSelectedProject(null);
        if (resumeModalOpen) setResumeModalOpen(false);
        if (commandPaletteOpen) setCommandPaletteOpen(false);
        if (proposalsModalOpen) setProposalsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, resumeModalOpen, commandPaletteOpen, proposalsModalOpen]);

  const handleExploreDeployments = () => {
    const element = document.getElementById('deployments');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030304] text-platinum selection:bg-white/20 selection:text-white font-sans overflow-x-hidden">
      {/* Main Website Interactive Shell (Isolated from print output) */}
      <div id="main-website-shell" className="print:hidden">
        {/* Ambient Spotlight Mesh & Noise Grain */}
        <ParticleBackground />

        {/* Header & Sticky Navigation */}
        <Navbar
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onOpenResumeModal={() => setResumeModalOpen(true)}
        />

        {/* Main Architectural Layout */}
        <main className="relative z-10">
          {/* Section 1: Hero Exhibition with Playfair & Telemetry */}
          <Hero
            onOpenResumeModal={() => setResumeModalOpen(true)}
            onExploreDeployments={handleExploreDeployments}
          />

          {/* Section 2: Curated Live Project Grid (All 15 Applications) */}
          <ProjectGrid
            onOpenDetails={(project) => setSelectedProject(project)}
          />

          {/* Section 3: Technical Architecture Bento Grid */}
          <BentoGrid />

          {/* Section 4: Architecture & Skills Matrix */}
          <TechMatrix />

          {/* Section 5: Direct Contact & Proposal Launcher */}
          <ContactSection />
        </main>

        {/* Footer with telemetry and copyright */}
        <Footer
          onOpenProposalsVault={() => setProposalsModalOpen(true)}
        />
      </div>

      {/* Deep-Dive Project Modal */}
      <div id="project-modal-root" className="print:hidden">
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>

      {/* Printable Digital Resume Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      {/* Owner Recorded Proposals Vault Modal */}
      <ProposalsModal
        isOpen={proposalsModalOpen}
        onClose={() => setProposalsModalOpen(false)}
      />

      {/* Global Cmd+K Command Palette */}
      <div id="command-palette-root" className="print:hidden">
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          onSelectProject={(project) => setSelectedProject(project)}
          onOpenResumeModal={() => setResumeModalOpen(true)}
          onOpenProposalsVault={() => setProposalsModalOpen(true)}
        />
      </div>
    </div>
  );
}

export default App;
