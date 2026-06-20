/**
 * Logo.jsx — Logo text-based của ITechZone
 * Thiết kế độc quyền với gradient đỏ/trắng
 */
import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants'

export default function Logo({ size = 'md', white = false }) {
  const sizes = {
    sm: { text: 'text-lg', sub: 'text-xs' },
    md: { text: 'text-2xl', sub: 'text-xs' },
    lg: { text: 'text-3xl', sub: 'text-sm' },
    xl: { text: 'text-4xl', sub: 'text-base' },
  }
  const s = sizes[size] || sizes.md

  return (
    <Link to={ROUTES.HOME} className="flex items-center gap-2 select-none group">
      {/* Icon mark */}
      <div className="relative flex-shrink-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700
                        flex items-center justify-center shadow-primary
                        group-hover:shadow-primary-lg transition-shadow duration-300">
          <span className="text-white font-display font-black text-lg leading-none">i</span>
        </div>
        {/* Accent dot */}
        <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full
                        bg-white border-2 border-primary-600" />
      </div>

      {/* Text mark */}
      <div className="flex flex-col leading-none">
        <span className={`font-display font-black ${s.text} tracking-tight`}>
          <span className="text-primary">i</span>
          <span className={white ? 'text-white' : 'text-gray-900 dark:text-white'}>Tech</span>
          <span className="text-primary">Zone</span>
        </span>
        {size !== 'sm' && (
          <span className={`${s.sub} font-medium tracking-widest uppercase mt-0.5
                            ${white ? 'text-white/60' : 'text-gray-400 dark:text-gray-500'}`}>
            Premium Tech Store
          </span>
        )}
      </div>
    </Link>
  )
}
