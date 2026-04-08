import type {
  AddTicketMessagePayload,
  AdminTicketPriorityPayload,
  AdminTicketStatusPayload,
  CreateTicketPayload,
  Ticket,
  TicketMessage,
  TicketPriority,
  TicketStatus,
  TicketsPagination,
  TicketsResult,
} from '../types/ticket'
import { adminApiClient, authApiClient } from './apiClient'

type TicketMessageApiResponse = {
  sender?: string
  senderRole?: string
  message?: string
  attachments?: string[]
  createdAt?: string
}

type TicketApiResponse = {
  id: string
  createdAt: string
  updatedAt: string
  ticketId: string
  userId: string
  subject: string
  category: string
  priority: string
  status: string
  isEscalated: boolean
  messages: TicketMessageApiResponse[]
}

type TicketsListApiResponse = {
  success: boolean
  code: string
  message: string
  data: TicketApiResponse[]
  pagination: TicketsPagination
}

type TicketDetailApiResponse = {
  success: boolean
  code: string
  message: string
  data: TicketApiResponse
}

type TicketCreateApiResponse = {
  success: boolean
  code: string
  message: string
  data?: TicketApiResponse
}

type TicketActionApiResponse = {
  success: boolean
  code?: string
  message?: string
  data?: TicketApiResponse
}

function normalizeTicketMessage(message: TicketMessageApiResponse): TicketMessage {
  return {
    sender: message.sender ?? '',
    senderRole: message.senderRole ?? '',
    message: message.message ?? '',
    attachments: Array.isArray(message.attachments) ? message.attachments : [],
    createdAt: message.createdAt ?? '',
  }
}

function normalizeTicket(ticket: TicketApiResponse): Ticket {
  return {
    id: ticket.id,
    createdAt: ticket.createdAt,
    updatedAt: ticket.updatedAt,
    ticketId: ticket.ticketId,
    userId: ticket.userId,
    subject: ticket.subject,
    category: ticket.category,
    priority: normalizeTicketPriority(ticket.priority),
    status: normalizeTicketStatus(ticket.status),
    isEscalated: ticket.isEscalated,
    messages: (ticket.messages ?? []).map(normalizeTicketMessage),
  }
}

function normalizeTicketStatus(status: string): TicketStatus {
  return status === 'closed' ? 'closed' : 'open'
}

function normalizeTicketPriority(priority: string): TicketPriority {
  switch (priority) {
    case 'low':
    case 'medium':
    case 'high':
    case 'urgent':
      return priority
    default:
      return 'medium'
  }
}

export async function getTickets(): Promise<TicketsResult> {
  const response = await authApiClient.get<TicketsListApiResponse>('/tickets')

  return {
    tickets: (response.data.data ?? []).map(normalizeTicket),
    pagination: response.data.pagination,
  }
}

export async function createTicket(payload: CreateTicketPayload): Promise<Ticket | null> {
  const response = await authApiClient.post<TicketCreateApiResponse>('/tickets', payload)

  return response.data.data ? normalizeTicket(response.data.data) : null
}

export async function getTicketById(ticketId: string): Promise<Ticket> {
  const response = await authApiClient.get<TicketDetailApiResponse>(`/tickets/${ticketId}`)

  return normalizeTicket(response.data.data)
}

export async function addTicketMessage(ticketId: string, payload: AddTicketMessagePayload): Promise<void> {
  await authApiClient.post(`/tickets/${ticketId}/messages`, payload)
}

export async function getAdminTickets(status: TicketStatus | 'all' = 'all', page = 1, limit = 10): Promise<TicketsResult> {
  const response = await adminApiClient.get<TicketsListApiResponse>('/tickets/admin/all', {
    params: {
      page,
      limit,
      status: status === 'all' ? undefined : status,
    },
  })

  return {
    tickets: (response.data.data ?? []).map(normalizeTicket),
    pagination: response.data.pagination,
  }
}

export async function getAdminTicketById(ticketId: string): Promise<Ticket> {
  const response = await adminApiClient.get<TicketDetailApiResponse>(`/tickets/admin/${ticketId}`)

  return normalizeTicket(response.data.data)
}

export async function updateAdminTicketStatus(ticketId: string, payload: AdminTicketStatusPayload): Promise<Ticket | null> {
  const response = await adminApiClient.patch<TicketActionApiResponse>(`/tickets/admin/${ticketId}/status`, payload)

  return response.data.data ? normalizeTicket(response.data.data) : null
}

export async function updateAdminTicketPriority(ticketId: string, payload: AdminTicketPriorityPayload): Promise<Ticket | null> {
  const response = await adminApiClient.patch<TicketActionApiResponse>(`/tickets/admin/${ticketId}/priority`, payload)

  return response.data.data ? normalizeTicket(response.data.data) : null
}

export async function escalateAdminTicket(ticketId: string): Promise<Ticket | null> {
  const response = await adminApiClient.patch<TicketActionApiResponse>(`/tickets/admin/${ticketId}/escalate`)

  return response.data.data ? normalizeTicket(response.data.data) : null
}

export async function addAdminTicketMessage(ticketId: string, payload: AddTicketMessagePayload): Promise<Ticket | null> {
  const response = await adminApiClient.post<TicketActionApiResponse>(`/tickets/admin/${ticketId}/messages`, payload)

  return response.data.data ? normalizeTicket(response.data.data) : null
}