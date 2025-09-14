import { useState, useRef, useEffect } from 'react'

export const ReadMoreText = ({ id, text, maxHeight = 100  }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [itCanOverflow, setItCanOverflow] = useState(false)
  const [displayText, setDisplayText] = useState(text)
  const contentRef = useRef(null)
  const hiddenRef = useRef(null)

  useEffect(() => {
    if (hiddenRef.current) {
      const contentHeight = hiddenRef.current.scrollHeight
      setItCanOverflow(contentHeight > maxHeight)
      
      if (contentHeight > maxHeight && !isExpanded) {
        adjustTextWithEllipsis()
      } else {
        setDisplayText(text)
      }
    }
  }, [text, maxHeight, isExpanded])

  const adjustTextWithEllipsis = () => {
    const container = contentRef.current
    const originalText = text.trim()
    let min = 0
    let max = originalText.length
    let bestFit = originalText

    // Búsqueda binaria para encontrar el punto de corte
    while (min <= max) {
      const mid = Math.floor((min + max) / 2)
      let testText = originalText.substring(0, mid)
      
      // Limpiar el texto de espacios al final y agregar puntos
      testText = testText.trim()
      
      // Si termina con punto, agregar solo 2 puntos, sino 3
      if (testText.endsWith('.')) {
        testText += '..'
      } else {
        // Remover cualquier punto existente al final antes de agregar
        testText = testText.replace(/\.+$/, '') + '...'
      }

      container.textContent = testText
      
      if (container.scrollHeight <= maxHeight) {
        bestFit = testText
        min = mid + 1
      } else {
        max = mid - 1
      }
    }

    setDisplayText(bestFit)
  }

  const handleKeyboard = (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      setIsExpanded(!isExpanded)
      e.preventDefault()
    }
  }

  // --- Ajustes aquí ---
  const content = isExpanded ? text : displayText

  return (
    <div>
      {/* Elemento oculto para medir la altura real */}
      <div ref={hiddenRef} className="whitespace-pre-line absolute opacity-0 pointer-events-none">
        {text}
      </div>
      
      {/* Contenedor principal con flexbox para alinear texto y botón */}
      <div className="flex flex-wrap text-zinc-800">
        <span
          id={id}
          ref={contentRef}
          className="whitespace-pre-line"
        >
          {content}
        </span>
        
        {itCanOverflow && (
          <button
            className="text-blue-500 cursor-pointer hover:text-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-300"
            onClick={() => setIsExpanded(!isExpanded)}
            onKeyDown={handleKeyboard}
            aria-expanded={isExpanded}
            aria-controls={id}
          >
            {isExpanded ? 'Mostrar menos' : 'Mostrar más'}
          </button>
        )}
      </div>
    </div>
  )
} 