import 'server-only'
import type { Lead, LeadNotificationProvider, Result } from '../../types'

// Escapes user content for Telegram MarkdownV2 parse mode.
function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+=|{}.!\\-]/g, '\\$&')
}

function formatField(value: string | undefined): string {
  return value ? escapeMarkdown(value) : '—'
}

function formatTimestamp(date: Date): string {
  return date.toLocaleString('ru-RU', {
    timeZone: 'Asia/Tashkent',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Maps the lead's locale to a staff-friendly Uzbek language name.
const LANGUAGE_LABELS: Record<Lead['language'], string> = {
  uz: "O'zbekcha",
  ru: 'Ruscha',
  en: 'Inglizcha',
}

// Builds the operator notification. Labels are Uzbek (clinic staff language);
// all dynamic values are escaped for MarkdownV2. Empty optional fields show '—'.
function buildMessage(lead: Lead): string {
  const lines = [
    '🔔 *Yangi lead*',
    '',
    `👤 *Ism:*\n${formatField(lead.fullName)}`,
    '',
    `📞 *Telefon:*\n${formatField(lead.phone)}`,
    '',
    `📍 *Shahar:*\n${formatField(lead.city)}`,
    '',
    `🧬 *Xizmat:*\n${formatField(lead.serviceInterest)}`,
    '',
    `💬 *Izoh:*\n${formatField(lead.message)}`,
    '',
    `🌐 *Til:*\n${escapeMarkdown(LANGUAGE_LABELS[lead.language])}`,
    '',
    `📅 *Vaqt:*\n${escapeMarkdown(formatTimestamp(lead.createdAt))}`,
    '',
    `🔗 *Sahifa:*\n${formatField(lead.sourcePage)}`,
  ]
  return lines.join('\n')
}

export class TelegramLeadNotificationProvider implements LeadNotificationProvider {
  private readonly botToken: string
  private readonly chatId: string

  constructor() {
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      throw new Error(
        'Missing Telegram environment variables: TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are required.',
      )
    }

    this.botToken = botToken
    this.chatId = chatId
  }

  async notify(lead: Lead): Promise<Result> {
    try {
      const text = buildMessage(lead)

      // Telegram message length limit: 4096 characters
      const truncatedText = text.length > 4000 ? text.slice(0, 4000) + '\n\\.\\.\\.' : text

      const response = await fetch(
        `https://api.telegram.org/bot${this.botToken}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: this.chatId,
            text: truncatedText,
            parse_mode: 'MarkdownV2',
          }),
        },
      )

      if (!response.ok) {
        const body = await response.text()
        return {
          success: false,
          error: `Telegram API error ${response.status}: ${body}`,
        }
      }

      return { success: true }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown notification error'
      return { success: false, error: message }
    }
  }
}
