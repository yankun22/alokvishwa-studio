import React from 'react';
import { motion } from 'framer-motion';
import { 
  Box, 
  Cpu, 
  Workflow, 
  CheckCircle2, 
  Terminal, 
  Layers
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/techStack';

const ICON_MAP: Record<string, React.ElementType> = {
  Layout: Layers,
  Box,
  Cpu,
  Workflow
};

export const TechMatrix: React.FC = () => {
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-champagne/20 text-champagne text-xs font-mono mb-4 tracking-widest uppercase">
            <Terminal className="w-3.5 h-3.5" />
            <span>CORE COMPETENCIES</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-titanium tracking-tight">
            Technical Skills Matrix
          </h2>
          <p className="mt-4 text-sm sm:text-base text-titanium-muted font-light leading-relaxed">
            Deep architectural mastery across modern reactive frameworks, 3D WebGL pipelines, client-side compute, and edge deployment automation.
          </p>
        </div>

        {/* Matrix Grid: 4 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((category, idx) => {
            const Icon = ICON_MAP[category.iconName] || Layers;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-3xl bg-surface-100/90 border border-white/[0.08] p-6 sm:p-7 backdrop-blur-2xl shadow-luxury-card hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-surface-200 border border-white/[0.08] flex items-center justify-center text-champagne">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-display font-bold text-base text-titanium">
                      {category.title}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-titanium">
                            {skill.name}
                          </span>
                          <span className="font-mono text-titanium-muted text-[11px]">
                            {skill.experience}
                          </span>
                        </div>
                        {/* Progress bar */}
                        <div className="w-full h-1.5 rounded-full bg-surface-200 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-champagne to-champagne-light"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Production Verified</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
