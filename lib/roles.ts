/**
 * Role-Based Access Control helpers
 *
 * Hierarchy (highest → lowest):
 *   SUPER_ADMIN > ADMIN > EDITOR > AUTHOR
 */

export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'AUTHOR'

const RANK: Record<Role, number> = {
  SUPER_ADMIN: 4,
  ADMIN:       3,
  EDITOR:      2,
  AUTHOR:      1,
}

/** Returns true if userRole meets or exceeds the required minimum role. */
export function hasMinRole(userRole: string | null | undefined, minRole: Role): boolean {
  if (!userRole) return false
  return (RANK[userRole as Role] ?? 0) >= RANK[minRole]
}

/** SUPER_ADMIN or ADMIN — full access including User management */
export const canManageUsers    = (role: string) => hasMinRole(role, 'ADMIN')

/** EDITOR or above — can manage Articles, Categories, Tags */
export const canManageContent  = (role: string) => hasMinRole(role, 'EDITOR')

/** Only SUPER_ADMIN is protected from deletion */
export const isSuperAdmin      = (role: string) => role === 'SUPER_ADMIN'

/**
 * Returns which admin sidebar menu items are visible for a given role.
 * Keys match href paths used in the sidebar.
 */
export function getAllowedMenus(role: string): Set<string> {
  const allowed = new Set<string>(['/admin'])

  if (hasMinRole(role, 'AUTHOR')) {
    allowed.add('/admin/articles')
  }
  if (hasMinRole(role, 'EDITOR')) {
    allowed.add('/admin/categories')
    allowed.add('/admin/tags')
  }
  if (hasMinRole(role, 'ADMIN')) {
    allowed.add('/admin/users')
    allowed.add('/admin/settings')
  }

  return allowed
}
