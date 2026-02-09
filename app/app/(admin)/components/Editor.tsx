'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { Table } from "@tiptap/extension-table"
import TableRow from "@tiptap/extension-table-row"
import TableCell from "@tiptap/extension-table-cell"
import TableHeader from "@tiptap/extension-table-header"

function MenuButton({ onClick, active, children, title }: {
  onClick: any, active?: boolean, children: any, title: any
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`px-3 py-2 rounded-md text-sm font-semibold border transition ${active
        ? 'bg-blue-600 text-white border-blue-600'
        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
        }`}
    >
      {children}
    </button>
  )
}

export default function Editor({
  initialValue = '',
  name = 'content',
  placeholder = 'Escribe aquí...',
}) {
  const [content, setContent] = useState(initialValue || '<p></p>')
  const [isTableActive, setIsTableActive] = useState(false)



 
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image,
      Placeholder.configure({ placeholder }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: initialValue || '<p></p>',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      setContent(html)
    },
    editorProps: {
      attributes: {
        class: 'editor-content max-w-full outline-none min-h-[400px] text-lg',
      },
    },
    immediatelyRender: false,
  })

  useEffect(() => {
    if (editor && initialValue !== editor.getHTML()) {
      editor.commands.setContent(initialValue || '<p></p>')
      setContent(initialValue)
    }
  }, [initialValue, editor])

   useEffect(() => {
    if (!editor) return

    const update = () => {
      setIsTableActive(
        editor.isActive('table') ||
        editor.isActive('tableCell') ||
        editor.isActive('tableHeader')
      )
    }

    editor.on('selectionUpdate', update)
    editor.on('transaction', update)

    return () => {
      editor.off('selectionUpdate', update)
      editor.off('transaction', update)
    }
  }, [editor])


  const addImage = useCallback(
    (file: File) => {
      if (!editor) return
      const reader = new FileReader()
      reader.onload = () => {
        editor.chain().focus().setImage({ src: reader.result as string }).run()
      }
      reader.readAsDataURL(file)
    },
    [editor]
  )

  if (!editor) return <div></div>

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      {/* TOOLBAR */}
      <div className="p-3 flex flex-wrap gap-2 bg-gray-50 border-b border-gray-200">
        <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Negrita">
          B
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Cursiva">
          I
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Subrayado">
          U
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="H2">
          H2
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Lista con viñetas">
          • List
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Lista ordenada">
          1. List
        </MenuButton>
        <MenuButton
          onClick={() => {
            const url = window.prompt('Ingresa URL')
            if (url) editor.chain().focus().setLink({ href: url }).run()
          }}
          active={editor.isActive('link')}
          title="Insertar enlace"
        >
          🔗
        </MenuButton>
        <MenuButton
          onClick={() => {
            const fileInput = document.createElement('input')
            fileInput.type = 'file'
            fileInput.accept = 'image/*'
            fileInput.onchange = () => {
              if (fileInput.files && fileInput.files[0]) addImage(fileInput.files[0])
            }
            fileInput.click()
          }}
          title="Insertar imagen"
        >
          🖼
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Code block">
          {'</>'}
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().undo().run()} title="Deshacer">
          ↶
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().redo().run()} title="Rehacer">
          ↷
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().setTextAlign('left').run()} title="Alinear izquierda">
          L
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().setTextAlign('center').run()} title="Centrar">
          C
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().setTextAlign('right').run()} title="Alinear derecha">
          R
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} title="Tabla">
          Tabla
        </MenuButton>
      </div>
      {/* MENÚ CONTEXTUAL DE TABLA */}
      {isTableActive && (
        <div className="border-b bg-blue-50 p-2 flex flex-wrap gap-2 text-sm">
          <button
            type="button"
            className="px-2 py-1 border rounded bg-white"
            onClick={() => editor.chain().focus().toggleHeaderRow().run()}
          >
            Cabecera
          </button>
          <button onClick={() => editor.chain().focus().addRowAfter().run()} type="button" className="px-2 py-1 border rounded bg-white">
            + Fila
          </button>
          <button onClick={() => editor.chain().focus().addRowBefore().run()} type="button" className="px-2 py-1 border rounded bg-white">
            ↑ Fila
          </button>
          <button onClick={() => editor.chain().focus().deleteRow().run()} type="button" className="px-2 py-1 border rounded bg-white">
            − Fila
          </button>
          <button onClick={() => editor.chain().focus().addColumnAfter().run()} type="button" className="px-2 py-1 border rounded bg-white">
            + Col
          </button>
          <button onClick={() => editor.chain().focus().addColumnBefore().run()} type="button" className="px-2 py-1 border rounded bg-white">
            ← Col
          </button>
          <button onClick={() => editor.chain().focus().deleteColumn().run()} type="button" className="px-2 py-1 border rounded bg-white">
            − Col
          </button>
          <button
            onClick={() => editor.chain().focus().deleteTable().run()}
            type="button"
            className="ml-auto px-2 py-1 border rounded bg-white text-red-600"
          >
            🗑 Tabla
          </button>
        </div>
      )}
      {/* CONTENIDO */}
      <div className="p-4 bg-white h-96 overflow-y-auto">
        <EditorContent editor={editor} />
      </div>

      {/* 🔥 HIDDEN INPUT PARA SERVER ACTION */}
      <input type="hidden" name={name} value={content} />
    </div>
  )
}
