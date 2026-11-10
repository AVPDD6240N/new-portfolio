/** Hand-made SVG character inspired by the user's photo: long dark hair, warm skin tone, black/lilac outfit. */
export default function MiniMe({kind='wave',className=''}) {
  return <svg className={`mini-me mini-me-${kind} ${className}`} viewBox="0 0 230 270" role="img" aria-label="Small illustrated Dulmali waving hello" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="jumper" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#b7a0e7"/><stop offset="1" stopColor="#8b73c6"/></linearGradient></defs>
    <ellipse cx="116" cy="257" rx="78" ry="9" fill="#a99bc3" opacity=".13"/>
    <path d="M37 223 C32 178 54 147 88 140 H142 C181 150 190 175 191 247H38Z" fill="url(#jumper)"/>
    <path d="M71 72C68 15 163 11 174 78L185 201Q176 219 149 209L144 132H87L82 204Q48 216 44 194Z" fill="#242535"/>
    <path d="M87 126L88 161Q114 182 141 158L141 124Z" fill="#bb8064"/>
    <ellipse cx="116" cy="94" rx="52" ry="64" fill="#ba8063"/>
    <path d="M64 95Q63 28 110 30Q173 24 168 96Q155 82 155 59Q132 81 83 70Q78 85 64 95Z" fill="#202333"/>
    <path d="M89 96Q98 91 107 96M126 96Q135 91 145 96" fill="none" stroke="#29222b" strokeWidth="3.2" strokeLinecap="round"/>
    <circle cx="99" cy="99" r="3.2" fill="#282332"/><circle cx="135" cy="99" r="3.2" fill="#282332"/>
    <path d="M115 104L112 119Q117 123 122 119" fill="none" stroke="#a76c58" strokeWidth="2"/>
    <path d="M102 132Q116 143 131 131" fill="none" stroke="#8f5254" strokeWidth="3" strokeLinecap="round"/>
    <ellipse cx="86" cy="117" rx="9" ry="5" fill="#da927f" opacity=".5"/><ellipse cx="145" cy="117" rx="9" ry="5" fill="#da927f" opacity=".5"/>
    <path d="M53 179Q21 181 20 143" fill="none" stroke="#aa8dd8" strokeWidth="25" strokeLinecap="round"/>
    <g className="mini-hand"><path d="M20 145Q4 134 8 117L13 101Q16 95 20 106L22 94Q26 90 30 101L33 111L34 124Q31 144 20 145Z" fill="#bb8165"/></g>
    <path d="M163 177Q189 196 181 243" fill="none" stroke="#9276cf" strokeWidth="29" strokeLinecap="round"/>
    <path d="M53 219Q111 237 177 220V253H53Z" fill="#8a6fbd"/>
    <circle cx="191" cy="53" r="5" fill="#f6b7bc"/><path d="M193 30L196 21M211 43L221 40M177 37L169 30" stroke="#edb0b8" strokeWidth="3" strokeLinecap="round"/>
  </svg>;
}
