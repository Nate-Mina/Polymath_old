import React from 'react';
import { AssessmentScope, FeedbackTiming } from '../types/polymath';
import { Compass, Sparkles, BookOpen, Clock, RotateCcw } from 'lucide-react';

interface AssessmentHeaderProps {
  scope: AssessmentScope;
  feedbackTiming: FeedbackTiming;
  onToggleFeedbackTiming: () => void;
  onResetAssessment: () => void;
  currentIndex?: number;
  totalQuestions?: number;
  isTestActive: boolean;
}

export const AssessmentHeader: React.FC<AssessmentHeaderProps> = ({
  scope,
  feedbackTiming,
  onToggleFeedbackTiming,
  onResetAssessment,
  currentIndex = 0,
  totalQuestions = 80,
  isTestActive,
}) => {
  return (
    <header className="w-full flex items-center justify-between gap-8 px-6 py-4 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          if (isTestActive && window.confirm('Return to assessment dashboard? Your progress is saved.')) {
            onResetAssessment();
          }
        }}
        className="text-base md:text-lg font-bold tracking-tight text-slate-100 hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
      >
        <Compass className="w-5 h-5 text-cyan-400 shrink-0" />
        <span className="truncate">Polymath Multidisciplinary Aptitude Assessment</span>
      </a>

      {/* Zone 2: Clean single-line text indicators */}
      <div className="hidden md:flex items-center gap-4 text-xs font-medium text-slate-400 whitespace-nowrap shrink-0">
        {scope === 'partial' ? (
          <>
            <span className="text-cyan-300 font-semibold">Partial Polymath Track</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>8 Technical + 3 Humanities Fields</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300 font-mono">22 Problems (1 Easy + 1 Med each)</span>
          </>
        ) : scope === 'technical' ? (
          <>
            <span>15 Technical Disciplines</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300 font-mono">60 Tiered Problems</span>
          </>
        ) : scope === 'humanities' ? (
          <>
            <span>5 Humanities Disciplines</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300 font-mono">20 Tiered Problems</span>
          </>
        ) : scope === 'single-field' ? (
          <>
            <span>Single Field Sprint</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300 font-mono">4 Tiered Problems</span>
          </>
        ) : (
          <>
            <span>15 Technical Disciplines</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>5 Non-Technical Disciplines</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300 font-mono">80 Calibrated Tiered Problems</span>
          </>
        )}
      </div>

      {/* Zone 3: Primary action & Mode Controls */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Toggle between Instant practice check and Exam mode */}
        <button
          onClick={onToggleFeedbackTiming}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all whitespace-nowrap shrink-0 cursor-pointer ${
            feedbackTiming === 'instant'
              ? 'bg-cyan-950 text-cyan-300 border-cyan-700/80 hover:bg-cyan-900'
              : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
          }`}
          title={
            feedbackTiming === 'instant'
              ? 'Instant Mode: Explanations show immediately after answering'
              : 'Exam Mode: Test continues quietly with full diagnostic report at the end'
          }
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span>{feedbackTiming === 'instant' ? 'Instant Feedback: ON' : 'Exam Mode: Active'}</span>
        </button>

        {isTestActive && (
          <button
            onClick={() => {
              if (window.confirm('Reset this assessment session?')) {
                onResetAssessment();
              }
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition-colors"
            title="Reset Assessment"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
};
