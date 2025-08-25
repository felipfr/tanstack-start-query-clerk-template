// New Relic agent configuration and safe fallback for all environments.
// In production, if configuration is missing, logs are never exposed.
// In development/test, a verbose mock is used for debugging.
import { BrowserAgent } from '@newrelic/browser-agent'

type NewRelicConfig = {
  applicationID: string
  licenseKey: string
  accountID: string
  trustKey: string
  agentID: string
  beacon: string
}

type NewRelicAgentLike = {
  noticeError: (error: Error, options?: { attributes?: Record<string, unknown> }) => void
  log: (message: string, options?: { customAttributes?: object; level?: string }) => void
  current: NewRelicAgentLike
}

const {
  VITE_NEW_RELIC_APPLICATION_ID,
  VITE_NEW_RELIC_LICENSE_KEY,
  VITE_NEW_RELIC_ACCOUNT_ID,
  VITE_NEW_RELIC_TRUST_KEY,
  VITE_NEW_RELIC_AGENT_ID,
  VITE_NEW_RELIC_BEACON_URL,
} = import.meta.env

const areAllVarsPresent =
  VITE_NEW_RELIC_APPLICATION_ID &&
  VITE_NEW_RELIC_LICENSE_KEY &&
  VITE_NEW_RELIC_ACCOUNT_ID &&
  VITE_NEW_RELIC_TRUST_KEY &&
  VITE_NEW_RELIC_AGENT_ID &&
  VITE_NEW_RELIC_BEACON_URL

const config: NewRelicConfig | null = areAllVarsPresent
  ? {
      applicationID: VITE_NEW_RELIC_APPLICATION_ID,
      licenseKey: VITE_NEW_RELIC_LICENSE_KEY,
      accountID: VITE_NEW_RELIC_ACCOUNT_ID,
      trustKey: VITE_NEW_RELIC_TRUST_KEY,
      agentID: VITE_NEW_RELIC_AGENT_ID,
      beacon: VITE_NEW_RELIC_BEACON_URL,
    }
  : null

let agentInstance: BrowserAgent | null = null

export function initializeNewRelicAgent(): BrowserAgent | null {
  if (!areAllVarsPresent) {
    // eslint-disable-next-line no-console
    console.warn('New Relic not initialized: missing environment variables')
    return null
  }

  if (!agentInstance) {
    if (config) {
      agentInstance = new BrowserAgent({
        init: {
          session_replay: {
            enabled: true,
            block_selector: '',
            mask_text_selector: '*',
            sampling_rate: 10.0,
            error_sampling_rate: 100.0,
            mask_all_inputs: true,
            collect_fonts: true,
            inline_images: false,
            fix_stylesheets: true,
            mask_input_options: {},
          },
          distributed_tracing: { enabled: true },
          privacy: { cookies_enabled: true },
          ajax: { deny_list: ['bam.nr-data.net'] },
        },
        info: {
          applicationID: config.applicationID,
          licenseKey: config.licenseKey,
          beacon: config.beacon,
          errorBeacon: config.beacon,
        },
        loader_config: { accountID: config.accountID, trustKey: config.trustKey, agentID: config.agentID },
      })
    }
  }
  return agentInstance
}

// Mock New Relic agent for development/testing
const mockNewRelicAgent: NewRelicAgentLike = {
  noticeError: (error, options) => {
    // eslint-disable-next-line no-console
    console.log('[NewRelic MOCK] noticeError:', error?.message, options)
  },
  log: (message, options) => {
    // eslint-disable-next-line no-console
    console.log('[NewRelic MOCK] log:', message, options)
  },
  current: undefined as unknown as NewRelicAgentLike,
}

const silentMockNewRelicAgent: NewRelicAgentLike = {
  noticeError: () => {},
  log: () => {},
  current: undefined as unknown as NewRelicAgentLike,
}

silentMockNewRelicAgent.current = silentMockNewRelicAgent
mockNewRelicAgent.current = mockNewRelicAgent

// Ensure mock never exposes sensitive information in production
export const newRelicAgent: NewRelicAgentLike =
  import.meta.env.MODE === 'production' ? (agentInstance ?? silentMockNewRelicAgent) : mockNewRelicAgent
