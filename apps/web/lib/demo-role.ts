export type DemoRole = 'marketplace' | 'cbn' | 'developer' | 'financier' | null

export function getDemoRole(): DemoRole {
  if (typeof window === 'undefined') return null
  return (localStorage.getItem('demo_role') as DemoRole) || null
}

export function setDemoRole(role: DemoRole) {
  if (typeof window === 'undefined') return
  if (role) {
    localStorage.setItem('demo_role', role)
  } else {
    localStorage.removeItem('demo_role')
  }
}
