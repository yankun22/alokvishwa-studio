import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  Info, 
  Box, 
  TrendingUp, 
  Music, 
  Workflow, 
  Radio, 
  Terminal, 
  Network, 
  Compass, 
  Activity, 
  Home, 
  Car, 
  Coffee, 
  Building2, 
  Briefcase
} from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
  index: number;
}

const ICON_MAP: Record<string, React.ElementType> = {
  spatialcore: Box,
  soundpulse: Music,
  canvasflow: Workflow,
  wealthflow: TrendingUp,
  incidentpulse: Radio,
  codeforge: Terminal,
  nexuswiki: Network,
  voyageplanner: Compass,
  vitalpulse: Activity,
  havenrealty: Home,
  'chelvie-coffee': Coffee,
  'sukhmani-car-bazar': Car,
  theimmigrantcafe: Coffee,
  shreepratham: Building2,
  gighunter: Briefcase,
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenDetails,
  index
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [tilt, setTilt] = useState<{ rotateX: number; rotateY: number }>({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const IconComponent = ICON_MAP[project.id] || Box;

  // 3D Magnetic Tilt & Specular Lighting
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(-4px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
      }}
      className="group relative flex flex-col justify-between rounded-3xl bg-white/[0.015] hover:bg-white/[0.035] border border-white/[0.06] hover:border-white/[0.18] p-6 sm:p-7 backdrop-blur-2xl shadow-noir-card hover:shadow-noir-hover transition-all duration-300 transform-gpu overflow-hidden"
    >
      {/* Specular Inner Lighting that tracks cursor */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.05), transparent 60%)`,
          }}
        />
      )}

      <div className="relative z-10 flex flex-col">
        {/* Top Header Row: Number Prefix + Category + Live Indicator */}
        <div className="flex items-center justify-between gap-2 mb-4">
          {/* Index & Category Badge */}
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[11px] font-medium text-platinum-dark tracking-widest">
              {project.numberPrefix} /
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase bg-white/[0.03] text-platinum-muted border border-white/[0.06]">
              <IconComponent className="w-3 h-3 text-platinum-muted" />
              <span>{project.category}</span>
            </span>
          </div>

          {/* Live Status Indicator */}
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span>Live</span>
          </div>
        </div>

        {/* Project Title (Full Width to prevent squashing) */}
        <h3 className="font-sans font-bold text-xl sm:text-2xl text-platinum group-hover:text-white transition-colors tracking-tight mb-2">
          {project.title}
        </h3>

        {/* Dedicated Metric Badge Row */}
        {project.metrics && (
          <div className="mb-3.5">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-mono tracking-wider bg-white/[0.03] text-platinum-muted border border-white/[0.06]">
              ⚡ {project.metrics}
            </span>
          </div>
        )}

        {/* 2-Sentence Architecture Summary */}
        <p className="text-platinum-muted text-xs leading-relaxed mb-5 font-light min-h-[48px] line-clamp-3">
          {project.summary}
        </p>

        {/* Core Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-white/[0.02] text-platinum-dark border border-white/[0.04] group-hover:border-white/10 group-hover:text-platinum-muted transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Card Actions: 44px+ Tap Targets */}
      <div className="relative z-10 pt-4 border-t border-white/[0.06] flex items-center gap-3 mt-auto">
        {/* Primary Launch Live App direct button */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-950 hover:bg-slate-200 font-bold text-xs shadow-sm transition-all duration-200 min-h-[44px]"
          aria-label={`Launch ${project.title} live system in a new tab`}
        >
          <span>Launch Live System</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        {/* Specs / Details Modal Trigger */}
        <button
          onClick={() => onOpenDetails(project)}
          className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] text-platinum-muted hover:text-platinum font-medium text-xs border border-white/[0.06] hover:border-white/20 transition-all min-h-[44px] min-w-[44px]"
          title={`View architecture specs for ${project.title}`}
          aria-label={`View architecture details for ${project.title}`}
        >
          <Info className="w-4 h-4 text-platinum-muted" />
          <span className="hidden sm:inline">Specs</span>
        </button>
      </div>
    </motion.div>
  );
};
