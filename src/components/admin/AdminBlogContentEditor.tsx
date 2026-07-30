'use client'

import { useEffect, useState, type ReactNode } from 'react'
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Minus,
  Plus,
  Quote,
  Redo2,
  Strikethrough,
  Underline,
  Undo2,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import Placeholder from '@tiptap/extension-placeholder'
import UnderlineExtension from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/react'

type Props = {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

type HeadingLevel = 1 | 2 | 3
type HeadingKey = 'paragraph' | 'h1' | 'h2' | 'h3'

function ToolButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: ReactNode
  label: string
  active?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
        active
          ? 'bg-indigo-100 text-indigo-700'
          : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      {icon}
    </button>
  )
}

export default function AdminBlogContentEditor({
  value,
  onChange,
  placeholder,
}: Props) {
  const { t } = useTranslation('common', { keyPrefix: 'admin.components.blogContentEditor' })
  const [zoom, setZoom] = useState(100)
  const [heading, setHeading] = useState<HeadingKey>('paragraph')

  const editorPlaceholder = placeholder ?? t('placeholderDefault')

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      UnderlineExtension,
      Placeholder.configure({
        placeholder: editorPlaceholder,
      }),
    ],
    content: value,

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())

      if (editor.isActive('heading', { level: 1 })) setHeading('h1')
      else if (editor.isActive('heading', { level: 2 })) setHeading('h2')
      else if (editor.isActive('heading', { level: 3 })) setHeading('h3')
      else setHeading('paragraph')
    },
  })

  useEffect(() => {
    if (!editor) return
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value || '<p></p>', { emitUpdate: false })
    }
  }, [value, editor])

  if (!editor) return null

  const applyHeading = (level: HeadingLevel) => {
    editor.chain().focus().toggleHeading({ level }).run()
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3">
        <div className="ml-2 flex items-center gap-2 rounded-xl border px-2 py-1 bg-white">
          <button type="button" onClick={() => setZoom((p) => Math.max(50, p - 10))}>
            <Minus size={16} />
          </button>

          <span className="min-w-[50px] text-center text-sm">{zoom}%</span>

          <button type="button" onClick={() => setZoom((p) => Math.min(200, p + 10))}>
            <Plus size={16} />
          </button>
        </div>

        <select
          value={heading}
          onChange={(e) => {
            const val = e.target.value as HeadingKey

            if (val === 'h1') applyHeading(1)
            else if (val === 'h2') applyHeading(2)
            else if (val === 'h3') applyHeading(3)
            else editor.chain().focus().setParagraph().run()

            setHeading(val)
          }}
          className="rounded-xl border bg-white px-3 py-2 text-sm outline-none"
        >
          <option value="paragraph">{t('headings.paragraph')}</option>
          <option value="h1">{t('headings.h1')}</option>
          <option value="h2">{t('headings.h2')}</option>
          <option value="h3">{t('headings.h3')}</option>
        </select>

        <ToolButton
          label={t('toolbar.bold')}
          icon={<Bold size={16} />}
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />

        <ToolButton
          label={t('toolbar.italic')}
          icon={<Italic size={16} />}
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />

        <ToolButton
          label={t('toolbar.underline')}
          icon={<Underline size={16} />}
          active={editor.isActive('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />

        <ToolButton
          label={t('toolbar.strike')}
          icon={<Strikethrough size={16} />}
          active={editor.isActive('strike')}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        />

        <ToolButton
          label={t('toolbar.h1')}
          icon={<Heading1 size={16} />}
          active={editor.isActive('heading', { level: 1 })}
          onClick={() => applyHeading(1)}
        />

        <ToolButton
          label={t('toolbar.h2')}
          icon={<Heading2 size={16} />}
          active={editor.isActive('heading', { level: 2 })}
          onClick={() => applyHeading(2)}
        />

        <ToolButton
          label={t('toolbar.h3')}
          icon={<Heading3 size={16} />}
          active={editor.isActive('heading', { level: 3 })}
          onClick={() => applyHeading(3)}
        />

        <ToolButton
          label={t('toolbar.bullet')}
          icon={<List size={16} />}
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />

        <ToolButton
          label={t('toolbar.number')}
          icon={<ListOrdered size={16} />}
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />

        <ToolButton
          label={t('toolbar.quote')}
          icon={<Quote size={16} />}
          active={editor.isActive('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        />

        <ToolButton
          label={t('toolbar.undo')}
          icon={<Undo2 size={16} />}
          onClick={() => editor.chain().focus().undo().run()}
        />

        <ToolButton
          label={t('toolbar.redo')}
          icon={<Redo2 size={16} />}
          onClick={() => editor.chain().focus().redo().run()}
        />
      </div>

      <div className="bg-slate-100 p-8">
        <div
          style={{ zoom: `${zoom}%` }}
          className="mx-auto max-w-5xl rounded-2xl bg-white px-12 py-12 shadow-lg"
        >
          <EditorContent editor={editor} />
        </div>
      </div>

      <style jsx global>{`
        .ProseMirror {
          min-height: 650px;
          outline: none;
          font-size: 16px;
          line-height: 1.8;
          color: #0f172a;
        }

        .ProseMirror h1 {
          font-size: 38px;
          font-weight: 800;
          margin: 22px 0 14px;
          line-height: 1.2;
        }

        .ProseMirror h2 {
          font-size: 30px;
          font-weight: 700;
          margin: 20px 0 12px;
          line-height: 1.3;
        }

        .ProseMirror h3 {
          font-size: 24px;
          font-weight: 700;
          margin: 18px 0 10px;
          line-height: 1.35;
        }

        .ProseMirror p {
          margin: 10px 0;
        }

        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 24px;
          margin: 12px 0;
        }

        .ProseMirror li {
          margin: 6px 0;
        }

        .ProseMirror blockquote {
          border-left: 4px solid #6366f1;
          padding-left: 16px;
          margin: 16px 0;
          color: #475569;
          font-style: italic;
        }

        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          color: #94a3b8;
          pointer-events: none;
          float: left;
          height: 0;
        }
      `}</style>
    </div>
  )
}
