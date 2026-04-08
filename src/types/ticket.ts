export type TicketMessage = {
  sender: string
  senderRole: string
  message: string
  attachments: string[]
  createdAt: string
}

export type TicketStatus = 'open' | 'closed'

export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent'

export type Ticket = {
  id: string
  createdAt: string
  updatedAt: string
  ticketId: string
  userId: string
  subject: string
  category: string
  priority: TicketPriority
  status: TicketStatus
  isEscalated: boolean
  messages: TicketMessage[]
}

export type TicketsPagination = {
  currentPage: number
  totalPages: number
  totalRecords: number
  recordsPerPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export type TicketsResult = {
  tickets: Ticket[]
  pagination: TicketsPagination
}

export type CreateTicketPayload = {
  subject: string
  category: string
  priority: string
  message: string
}

export type AddTicketMessagePayload = {
  message: string
}

export type AdminTicketStatusPayload = {
  status: TicketStatus
}

export type AdminTicketPriorityPayload = {
  priority: TicketPriority
}