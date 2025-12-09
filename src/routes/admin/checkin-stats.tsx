import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { api } from '../../../convex/_generated/api'
import { useQuery } from 'convex/react'

export const Route = createFileRoute('/admin/checkin-stats')({
  component: RouteComponent,
})

// ============ CONFIGURABLE VARIABLES ============
const SQUARE_SIZE = 30 // Size of each square in pixels
const SQUARE_GAP = 8 // Gap between squares in pixels
const NUMBER_OF_VISITORS = 700 // Total expected number of visitors
// ================================================

function RouteComponent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')

  const handlePasswordSubmit = (e: any) => {
    e.preventDefault()
    if (password === 'vive ignite') {
      setIsAuthenticated(true)
      setAuthError('')
    } else {
      setAuthError('Incorrect password')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Authentication Required</h1>

          <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Enter Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                placeholder="Enter password"
                required
              />
            </div>

            {authError && (
              <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white font-bold rounded-lg shadow hover:bg-primary/90 transition-colors"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    )
  }

  return <Page />
}

function Page() {
  const visitors = useQuery(api.visitors.getAllVisitors)

  if (!visitors) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-xl font-semibold text-white">Loading...</div>
      </div>
    )
  }

  // Type 1: Visitors NOT in guest mode (have actual email)
  const type1Visitors = visitors.filter(v => !v.guestMode)
  
  // Type 2: Visitors in guest mode (registered through system)
  const type2Visitors = visitors.filter(v => v.guestMode)
  
  // Type 3: Imaginary guests (manually specified number)
  // Calculated as: NUMBER_OF_VISITORS - (type1 + type2)
  const type3Count = Math.max(0, NUMBER_OF_VISITORS - type1Visitors.length - type2Visitors.length)

  const totalSquares = NUMBER_OF_VISITORS

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Check-in Stats</h1>

        {/* Legend */}
        <div className="flex flex-wrap gap-6 mb-8 p-4 bg-gray-800 rounded-xl">
          <div className="flex items-center gap-3">
            <div 
              className="rounded-sm" 
              style={{ 
                width: SQUARE_SIZE * 2, 
                height: SQUARE_SIZE * 2, 
                backgroundColor: '#14b8a6' 
              }} 
            />
            <span className="text-white text-sm">
              Registered (Email) - {type1Visitors.length} ({type1Visitors.filter(v => v.checkedIn).length} checked in)
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div 
              className="rounded-sm" 
              style={{ 
                width: SQUARE_SIZE * 2, 
                height: SQUARE_SIZE * 2, 
                backgroundColor: '#a855f7' 
              }} 
            />
            <span className="text-white text-sm">
              Guest Mode - {type2Visitors.length} ({type2Visitors.filter(v => v.checkedIn).length} checked in)
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div 
              className="rounded-sm" 
              style={{ 
                width: SQUARE_SIZE * 2, 
                height: SQUARE_SIZE * 2, 
                backgroundColor: '#6b7280' 
              }} 
            />
            <span className="text-white text-sm">
              Expected (Not Registered) - {type3Count}
            </span>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-white">{NUMBER_OF_VISITORS}</div>
            <div className="text-gray-400 text-sm">Expected Total</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-teal-400">{type1Visitors.length}</div>
            <div className="text-gray-400 text-sm">Registered (Email)</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-purple-400">{type2Visitors.length}</div>
            <div className="text-gray-400 text-sm">Guest Mode</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-yellow-400">
              {type1Visitors.filter(v => v.checkedIn).length + type2Visitors.filter(v => v.checkedIn).length}
            </div>
            <div className="text-gray-400 text-sm">Total Checked In</div>
          </div>
        </div>

        {/* Grid of Squares */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Visitor Grid</h2>
          <div 
            className="flex flex-wrap"
            style={{ gap: SQUARE_GAP }}
          >
            {/* Type 1: Registered visitors (with email) - Green */}
            {type1Visitors.map((visitor) => (
              <div
                key={visitor._id}
                className="rounded-sm transition-all hover:scale-110"
                style={{
                  width: SQUARE_SIZE,
                  height: SQUARE_SIZE,
                  backgroundColor: '#14b8a6',
                  opacity: visitor.checkedIn ? 1 : 0.2,
                }}
                title={`Registered: ${visitor.email || 'N/A'} - ${visitor.checkedIn ? 'Checked In' : 'Not Checked In'}`}
              />
            ))}
            
            {/* Type 2: Guest mode visitors - Blue */}
            {type2Visitors.map((visitor) => (
              <div
                key={visitor._id}
                className="rounded-sm transition-all hover:scale-110"
                style={{
                  width: SQUARE_SIZE,
                  height: SQUARE_SIZE,
                  backgroundColor: '#a855f7',
                  opacity: visitor.checkedIn ? 1 : 0.2,
                }}
                title={`Guest Mode: ${visitor.barcode} - ${visitor.checkedIn ? 'Checked In' : 'Not Checked In'}`}
              />
            ))}
            
            {/* Type 3: Imaginary/Expected guests - Gray */}
            {Array.from({ length: type3Count }).map((_, index) => (
              <div
                key={`expected-${index}`}
                className="rounded-sm"
                style={{
                  width: SQUARE_SIZE,
                  height: SQUARE_SIZE,
                  backgroundColor: '#6b7280',
                }}
                title="Expected (Not Registered)"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
