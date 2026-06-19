/**
 * Telegram Chat ID Finder
 *
 * Usage:
 *   1. Add @mrklivfbot to your Telegram group/channel as admin
 *   2. Send any message in that group
 *   3. Run: node scripts/find-telegram-chat-id.mjs
 */

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN

if (!BOT_TOKEN) {
  console.error('❌  TELEGRAM_BOT_TOKEN environment variable is not set.')
  console.error('    Run: TELEGRAM_BOT_TOKEN=<token> node scripts/find-telegram-chat-id.mjs')
  process.exit(1)
}

const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`)
const data = await response.json()

if (!data.ok) {
  console.error('❌  Telegram API error:', data.description)
  process.exit(1)
}

if (data.result.length === 0) {
  console.log('⚠️  No updates found.')
  console.log('    Steps:')
  console.log('    1. Add @mrklivfbot to your Telegram group as admin')
  console.log("    2. Send any message in that group (e.g. 'test')")
  console.log('    3. Run this script again')
  process.exit(0)
}

console.log('✅  Found chats:\n')

const seen = new Set()
for (const update of data.result) {
  const chat = update.message?.chat ?? update.channel_post?.chat
  if (!chat || seen.has(chat.id)) continue
  seen.add(chat.id)

  const type = chat.type
  const title = chat.title ?? `${chat.first_name ?? ''} ${chat.last_name ?? ''}`.trim()
  console.log(`  Chat ID : ${chat.id}`)
  console.log(`  Type    : ${type}`)
  console.log(`  Title   : ${title}`)
  console.log('')
}

console.log('👉  Copy the correct Chat ID and update TELEGRAM_CHAT_ID in .env.local')
