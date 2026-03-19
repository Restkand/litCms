'use client'

const WA_NUMBER = '6289530974645'
const WA_MESSAGE = encodeURIComponent(
  'Halo Nuii, saya tertarik dengan layanan IT Consulting & Digital Solutions. Boleh saya tahu lebih lanjut?'
)
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`

export default function WhatsAppButton() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-3"
    >
      {/* Tooltip */}
      <span className="
        hidden sm:flex
        opacity-0 group-hover:opacity-100
        translate-x-2 group-hover:translate-x-0
        transition-all duration-200
        bg-gray-900 text-white text-xs font-semibold
        px-3 py-1.5 rounded-lg shadow-lg
        whitespace-nowrap
        border border-white/10
        pointer-events-none
      ">
        Chat dengan kami
      </span>

      {/* Button */}
      <div className="
        relative w-14 h-14 rounded-full
        bg-[#25D366] hover:bg-[#20bb5a]
        shadow-lg shadow-[#25D366]/40
        hover:shadow-xl hover:shadow-[#25D366]/50
        hover:scale-110
        active:scale-95
        transition-all duration-200
        flex items-center justify-center
      ">
        {/* Ping animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />

        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-7 h-7 fill-white relative z-10"
        >
          <path d="M16.003 2C8.28 2 2 8.28 2 16.003c0 2.478.655 4.797 1.8 6.8L2 30l7.403-1.777A13.94 13.94 0 0 0 16.003 30C23.72 30 30 23.72 30 16.003 30 8.28 23.72 2 16.003 2zm0 25.527a11.49 11.49 0 0 1-5.87-1.608l-.421-.25-4.394 1.054 1.08-4.278-.274-.44A11.467 11.467 0 0 1 4.474 16c0-6.357 5.172-11.53 11.53-11.53 6.356 0 11.528 5.173 11.528 11.53 0 6.356-5.172 11.528-11.528 11.528zm6.32-8.64c-.346-.173-2.05-1.012-2.368-1.127-.317-.115-.548-.173-.778.173-.23.346-.893 1.127-1.094 1.357-.202.23-.403.26-.749.087-.346-.174-1.46-.537-2.783-1.717-1.028-.916-1.723-2.048-1.924-2.394-.202-.347-.022-.534.151-.707.155-.155.346-.403.52-.605.173-.202.23-.346.346-.577.115-.23.058-.433-.029-.606-.087-.173-.779-1.878-1.068-2.571-.28-.674-.566-.583-.779-.593l-.663-.012c-.23 0-.606.087-.923.433-.317.347-1.21 1.183-1.21 2.884s1.239 3.344 1.411 3.574c.173.23 2.44 3.725 5.912 5.223.827.357 1.471.57 1.974.73.83.264 1.585.226 2.182.137.666-.1 2.05-.838 2.34-1.648.289-.81.289-1.503.202-1.648-.086-.144-.317-.23-.663-.403z" />
        </svg>
      </div>
    </a>
  )
}
