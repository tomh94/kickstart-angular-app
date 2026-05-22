import { transformToPortableText } from '@kontent-ai/rich-text-resolver';
import type {
  PortableTextBlock,
  PortableTextSpan,
  PortableTextMarkDefinition,
} from '@kontent-ai/rich-text-resolver';

export function isRichTextEmpty(value: string): boolean {
  return !value || value === '<p><br></p>';
}

export function richTextToHtml(value: string): string {
  const blocks = transformToPortableText(value) as unknown as PortableTextBlock[];
  return blocks
    .filter((b) => b._type === 'block')
    .map((b) => blockToHtml(b))
    .join('');
}

const styleMap: Record<string, string> = {
  h1: 'class="text-8xl font-family-libre text-azure"',
  h2: 'class="text-6xl text-azure"',
  h3: 'class="text-4xl text-azure"',
  normal: 'class="text-left text-gray-700 text-xl"',
};

function resolveSpan(span: PortableTextSpan, marks: PortableTextMarkDefinition[]): string {
  let text = span.text ?? '';
  if (!span.marks?.length) return text;

  for (const mark of span.marks) {
    const def = marks.find((m) => m._key === mark);
    if (def?._type === 'link') {
      const href = (def as unknown as { href: string }).href ?? '#';
      text = `<a href="${href}" class="underline text-burgundy">${text}</a>`;
    } else if (mark === 'strong') {
      text = `<strong>${text}</strong>`;
    } else if (mark === 'em') {
      text = `<em>${text}</em>`;
    }
  }
  return text;
}

export function blockToHtml(block: PortableTextBlock): string {
  const style = block.style ?? 'normal';
  const attrs = styleMap[style] ?? styleMap['normal'];
  const marks = (block.markDefs ?? []) as PortableTextMarkDefinition[];
  const inner = (block.children ?? [])
    .map((child) => resolveSpan(child as PortableTextSpan, marks))
    .join('');

  if (style === 'normal') return `<p ${attrs}>${inner}</p>`;
  return `<${style} ${attrs}>${inner}</${style}>`;
}

export function listToHtml(items: PortableTextBlock[], listItem: 'bullet' | 'number'): string {
  const tag = listItem === 'bullet' ? 'ul' : 'ol';
  const cls =
    listItem === 'bullet'
      ? 'text-xl text-gray-700 list-disc ml-8'
      : 'text-xl text-gray-700 list-decimal ml-8';
  const marks = [] as PortableTextMarkDefinition[];
  const lis = items
    .map((item) => {
      const inner = (item.children ?? [])
        .map((c) => resolveSpan(c as PortableTextSpan, marks))
        .join('');
      return `<li>${inner}</li>`;
    })
    .join('');
  return `<${tag} class="${cls}">${lis}</${tag}>`;
}
