import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ math, block = false, className = '' }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
        trust: true,
      });
    } catch (e) {
      console.error('KaTeX rendering error:', e);
      return `<span class="text-red-400 font-mono">${math}</span>`;
    }
  }, [math, block]);

  return (
    <span
      className={`${block ? 'block my-3 text-center overflow-x-auto py-1' : 'inline-block px-1'} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export const RenderRichMathText: React.FC<{ text: string }> = ({ text }) => {
  // Regex to match $$block$$ and $inline$
  const parts = useMemo(() => {
    const segments: Array<{ type: 'text' | 'inline' | 'block'; content: string }> = [];
    const blockRegex = /\$\$([\s\S]*?)\$\$/g;
    let lastIndex = 0;
    let match;

    // Process blocks first or sequentially
    // Let's do a simple line-by-line / tokenizer approach
    let remaining = text;

    while (remaining.length > 0) {
      const blockStart = remaining.indexOf('$$');
      const inlineStart = remaining.indexOf('$');

      if (blockStart !== -1 && (inlineStart === -1 || blockStart <= inlineStart)) {
        // Block math found
        if (blockStart > 0) {
          segments.push({ type: 'text', content: remaining.slice(0, blockStart) });
        }
        const blockEnd = remaining.indexOf('$$', blockStart + 2);
        if (blockEnd !== -1) {
          segments.push({ type: 'block', content: remaining.slice(blockStart + 2, blockEnd) });
          remaining = remaining.slice(blockEnd + 2);
        } else {
          segments.push({ type: 'text', content: remaining });
          break;
        }
      } else if (inlineStart !== -1) {
        // Inline math found
        if (inlineStart > 0) {
          segments.push({ type: 'text', content: remaining.slice(0, inlineStart) });
        }
        const inlineEnd = remaining.indexOf('$', inlineStart + 1);
        if (inlineEnd !== -1) {
          segments.push({ type: 'inline', content: remaining.slice(inlineStart + 1, inlineEnd) });
          remaining = remaining.slice(inlineEnd + 1);
        } else {
          segments.push({ type: 'text', content: remaining });
          break;
        }
      } else {
        segments.push({ type: 'text', content: remaining });
        break;
      }
    }

    return segments;
  }, [text]);

  return (
    <span className="leading-relaxed">
      {parts.map((p, idx) => {
        if (p.type === 'block') {
          return <MathView key={idx} math={p.content} block={true} />;
        }
        if (p.type === 'inline') {
          return <MathView key={idx} math={p.content} block={false} />;
        }
        return <span key={idx} className="whitespace-pre-wrap">{p.content}</span>;
      })}
    </span>
  );
};
