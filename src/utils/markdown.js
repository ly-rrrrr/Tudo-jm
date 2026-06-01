import { marked } from 'marked';

marked.setOptions({
  breaks: true,
  gfm: true,
});

export function parseMarkdown(text) {
  if (!text) return '';
  return marked.parse(text);
}

const INLINE_TAGS = new Set(['b', 'strong', 'i', 'em', 'u', 's', 'del', 'code', 'a', 'br']);

function inlineToMarkdown(el) {
  const tag = el.tagName.toLowerCase();
  const text = el.textContent || '';
  switch (tag) {
    case 'b': case 'strong': return `**${text}**`;
    case 'i': case 'em': return `*${text}*`;
    case 'u': return `<u>${text}</u>`;
    case 's': case 'del': return `~~${text}~~`;
    case 'code': return `\`${text}\``;
    case 'a': return `[${text}](${el.getAttribute('href') || ''})`;
    case 'br': return '\n';
    default: return text;
  }
}

function blockToMarkdown(el) {
  const tag = el.tagName.toLowerCase();
  const children = Array.from(el.childNodes);

  if (tag === 'br') return '\n';

  if (tag === 'p') {
    const text = children.map(childToMarkdown).join('');
    return `${text}\n\n`;
  }
  if (/^h[1-6]$/.test(tag)) {
    const level = parseInt(tag[1]);
    const text = children.map(childToMarkdown).join('');
    return `${'#'.repeat(level)} ${text}\n\n`;
  }
  if (tag === 'ul' || tag === 'ol') {
    const items = Array.from(el.children)
      .filter(c => c.tagName === 'LI')
      .map((li, i) => {
        const content = Array.from(li.childNodes).map(childToMarkdown).join('');
        const prefix = tag === 'ol' ? `${i + 1}. ` : '- ';
        return `${prefix}${content}`;
      })
      .join('\n');
    return `${items}\n\n`;
  }
  if (tag === 'li') {
    return children.map(childToMarkdown).join('');
  }
  if (tag === 'div') {
    return children.map(childToMarkdown).join('');
  }
  if (tag === 'blockquote') {
    const text = children.map(childToMarkdown).join('');
    return text.split('\n').filter(l => l).map(l => `> ${l}`).join('\n') + '\n\n';
  }
  if (tag === 'hr') return '---\n\n';

  return children.map(childToMarkdown).join('');
}

function childToMarkdown(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent || '';
  }
  if (node.nodeType === Node.ELEMENT_NODE) {
    const tag = node.tagName.toLowerCase();
    if (INLINE_TAGS.has(tag)) {
      return inlineToMarkdown(node);
    }
    return blockToMarkdown(node);
  }
  return '';
}

export function htmlToMarkdown(html) {
  if (!html) return '';
  const div = document.createElement('div');
  div.innerHTML = html;
  const children = Array.from(div.childNodes);
  let md = children.map(childToMarkdown).join('');
  // Collapse excessive newlines
  md = md.replace(/\n{3,}/g, '\n\n');
  return md.trim();
}

