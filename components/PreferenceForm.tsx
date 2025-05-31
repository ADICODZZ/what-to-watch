
import React, { useState } from 'react';
import type { SessionPreferences } from '../types';
import { MOVIE_GENRES, ICONS } from '../constants';

interface PreferenceFormProps {
  onSubmit: (preferences: SessionPreferences) => void;
  isLoading: boolean;
}

export const PreferenceForm: React.FC<PreferenceFormProps> = ({ onSubmit, isLoading }) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [mood, setMood] = useState<string>('');
  const [keywords, setKeywords] = useState<string>('');

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ 
      genres: selectedGenres, 
      mood, 
      keywords,
    });
  };

  const getGenreIcon = (genre: string) => {
    const iconKey = genre.toLowerCase().replace(/\s+/g, '_').replace('-', '_');
    return (ICONS as any)[iconKey] || ICONS.default_genre;
  };
  
  const QuestionLabel: React.FC<{ htmlFor?: string; id?: string; icon: string; text: string; className?: string; isOptional?: boolean }> = 
  ({ htmlFor, id, icon, text, className = "block text-xl font-semibold mb-4 text-purple-300 text-center", isOptional = false }) => (
    <label htmlFor={htmlFor} id={id} className={className}>
      <span dangerouslySetInnerHTML={{ __html: icon }} className="inline-block align-middle" />
      {text} {isOptional && <span className="text-sm text-slate-400">(optional)</span>}
    </label>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-10 bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl">
      {/* Genres */}
      <div>
        <QuestionLabel icon={ICONS.question_genre} text="What kind of movie are you in the mood for now? (select up to 5 genres)" />
        <div className="flex flex-wrap gap-3 justify-center">
          {MOVIE_GENRES.map(genre => (
            <button
              type="button"
              key={genre}
              onClick={() => handleGenreToggle(genre)}
              disabled={selectedGenres.length >= 5 && !selectedGenres.includes(genre)}
              aria-pressed={selectedGenres.includes(genre)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ease-in-out flex items-center
                ${selectedGenres.includes(genre)
                  ? 'bg-purple-500 text-white shadow-md ring-2 ring-purple-300'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }
                ${selectedGenres.length >= 5 && !selectedGenres.includes(genre) ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <span dangerouslySetInnerHTML={{ __html: getGenreIcon(genre) }} />
              {genre}
            </button>
          ))}
        </div>
        {selectedGenres.length >= 5 && <p className="text-xs text-amber-400 mt-2 text-center">Maximum 5 genres selected.</p>}
      </div>

      {/* Mood */}
      <div>
        <QuestionLabel icon={ICONS.question_mood} htmlFor="mood" text="Describe the mood, vibe, or plot" isOptional={true} />
        <textarea
          id="mood"
          value={mood}
          onChange={e => setMood(e.target.value)}
          placeholder="e.g., 'A light-hearted comedy', 'A mind-bending thriller' (optional)"
          className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-slate-200 placeholder-slate-400 text-sm text-center"
          rows={3}
        />
      </div>
      
      {/* Keywords */}
      <div>
        <QuestionLabel icon={ICONS.question_keywords} htmlFor="keywords" text="Any specific keywords?" isOptional={true} />
        <input
          type="text"
          id="keywords"
          value={keywords}
          onChange={e => setKeywords(e.target.value)}
          placeholder="e.g., 'space exploration, strong female lead, based on a true story'"
          className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-slate-200 placeholder-slate-400 text-sm text-center"
        />
      </div>

      <div className="mt-10 text-center">
        <button
          type="submit"
          disabled={isLoading}
          className={`group inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out text-xl w-auto
                      ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Working...
            </>
          ) : (
            <>
             Go!
             <span dangerouslySetInnerHTML={{ __html: ICONS.go_cta }} />
            </>
          )}
        </button>
      </div>
    </form>
  );
};
