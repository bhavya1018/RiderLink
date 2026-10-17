// Temporary browser-only demo storage; backend must enforce privacy, membership, and capacity.
export type RideParticipant = {
  name: string
  joinedAt: string
}

export type Ride = {
  id: string
  code: string
  name: string
  start: string
  destination: string
  date: string
  departureTime: string
  maxRiders: number
  creator: string
  participants: RideParticipant[]
  createdAt: string
}

export type NewRide = Omit<Ride, 'id' | 'code' | 'participants' | 'createdAt' | 'creator'>

const RIDES_STORAGE_KEY = 'riderlink.demo.rides.v1'
const USER_STORAGE_KEY = 'riderlink.demo.user.v1'
const codeAlphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'

function isParticipant(value: unknown): value is RideParticipant {
  if (!value || typeof value !== 'object') return false
  const participant = value as Record<string, unknown>
  return typeof participant.name === 'string' && typeof participant.joinedAt === 'string'
}

function isRide(value: unknown): value is Ride {
  if (!value || typeof value !== 'object') return false
  const ride = value as Record<string, unknown>
  return typeof ride.id === 'string'
    && typeof ride.code === 'string'
    && /^RL-[A-Z0-9]{6}$/.test(ride.code)
    && typeof ride.name === 'string'
    && typeof ride.start === 'string'
    && typeof ride.destination === 'string'
    && typeof ride.date === 'string'
    && typeof ride.departureTime === 'string'
    && Number.isInteger(ride.maxRiders)
    && Number(ride.maxRiders) >= 2
    && typeof ride.creator === 'string'
    && Array.isArray(ride.participants)
    && ride.participants.every(isParticipant)
    && ride.participants.length <= Number(ride.maxRiders)
    && typeof ride.createdAt === 'string'
}

export function loadRides(): Ride[] {
  try {
    const stored = localStorage.getItem(RIDES_STORAGE_KEY)
    if (!stored) return []
    const parsed: unknown = JSON.parse(stored)
    if (!Array.isArray(parsed) || !parsed.every(isRide)) return []
    return parsed
  } catch {
    return []
  }
}

export function saveRides(rides: Ride[]) {
  try {
    localStorage.setItem(RIDES_STORAGE_KEY, JSON.stringify(rides))
  } catch {
    // The in-memory app state remains usable when browser storage is unavailable.
  }
}

export function loadDemoUser() {
  try {
    return localStorage.getItem(USER_STORAGE_KEY)?.trim() || 'Alex Morgan'
  } catch {
    return 'Alex Morgan'
  }
}

export function saveDemoUser(name: string) {
  try {
    localStorage.setItem(USER_STORAGE_KEY, name)
  } catch {
    // The in-memory app state remains usable when browser storage is unavailable.
  }
}

function generateRideCode(existingRides: Ride[]) {
  let code = ''
  do {
    const bytes = new Uint8Array(6)
    crypto.getRandomValues(bytes)
    code = `RL-${Array.from(bytes, (byte) => codeAlphabet[byte % codeAlphabet.length]).join('')}`
  } while (existingRides.some((ride) => ride.code === code))
  return code
}

export function createRide(input: NewRide, creator: string, existingRides: Ride[]): Ride {
  const now = new Date().toISOString()
  return {
    ...input,
    id: crypto.randomUUID(),
    code: generateRideCode(existingRides),
    creator,
    participants: [{ name: creator, joinedAt: now }],
    createdAt: now,
  }
}

export type JoinRideResult =
  | { status: 'joined'; ride: Ride }
  | { status: 'unknown' | 'full' | 'duplicate' }

export function joinRide(codeInput: string, participantName: string, rides: Ride[]): JoinRideResult {
  const code = codeInput.trim().toUpperCase()
  const ride = rides.find((candidate) => candidate.code === code)
  if (!ride) return { status: 'unknown' }

  const alreadyJoined = ride.participants.some(
    (participant) => participant.name.trim().toLowerCase() === participantName.trim().toLowerCase(),
  )
  if (alreadyJoined) return { status: 'duplicate' }
  if (ride.participants.length >= ride.maxRiders) return { status: 'full' }

  const updatedRide = {
    ...ride,
    participants: [...ride.participants, { name: participantName.trim(), joinedAt: new Date().toISOString() }],
  }
  return { status: 'joined', ride: updatedRide }
}
