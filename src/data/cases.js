import { daysFromNow } from '../utils/date.js';

export function seedCases() {
  return [
    {
      id: 'case_pci_q4_pam',
      title: 'PCI Q4 - Privileged Access Review',
      subtitle: 'Mastercard - Identity & Access / PAM',
      control: 'ITGC-AC-04',
      period: '2025 Q4',
      owner: { name: 'Mary Allen', initials: 'MA' },
      due: daysFromNow(3),
      risk: 'Medium',
      status: 'In progress',
      tags: ['Awaiting Owner', 'Needs Review'],
      progress: { done: 7, total: 10 },
      activityAt: new Date(Date.now() - 2 * 3600e3),
      objective: 'Make case audit-ready by Jan 31',
      evidence: {
        required: [
          { id: 'ev1', name: 'PAM Quarterly Export (Q4)', source: 'CyberArk', status: 'Missing', owner: 'John', updatedAt: null, hash: null },
          { id: 'ev2', name: 'Reviewer sign-off', source: 'ServiceNow', status: 'Needs Review', owner: 'Mary', updatedAt: new Date(Date.now() - 2 * 3600e3), hash: 'a1c9...f2' },
          { id: 'ev3', name: 'Okta admin role membership', source: 'Okta', status: 'Uploaded', owner: 'Alex', updatedAt: new Date(Date.now() - 26 * 3600e3), hash: '93bd...0c' }
        ],
        optional: [
          { id: 'ev4', name: 'Splunk query results (PAM changes)', source: 'Splunk', status: 'Uploaded', owner: 'Mary', updatedAt: new Date(Date.now() - 6 * 3600e3), hash: '11ab...9d' }
        ],
        sensitive: [
          { id: 'ev5', name: 'Ticket screenshots (contains PAN)', source: 'ServiceNow', status: 'Rejected', owner: 'John', updatedAt: new Date(Date.now() - 49 * 3600e3), hash: '7c0a...31', flagged: 'PAN' }
        ]
      },
      blockers: [
        { id: 'b1', title: "Owner hasn't responded (48h)", actions: ['Nudge owner', 'Escalate'] },
        { id: 'b2', title: 'Evidence contains PAN -> needs redaction', actions: ['Open redaction', 'Escalate'] }
      ],
      timeline: [
        { text: 'Agent requested evidence from John', when: new Date(Date.now() - 26 * 3600e3) },
        { text: 'Uploaded export by Mary', when: new Date(Date.now() - 2 * 3600e3) },
        { text: 'Reviewer rejected screenshot - needs CSV export', when: new Date(Date.now() - 49 * 3600e3) }
      ]
    },
    {
      id: 'case_soc2_q1_vendor',
      title: 'SOC 2 Q1 - Vendor Access Review',
      subtitle: 'Mastercard - IT Risk / Third Party',
      control: 'TPRM-07',
      period: '2026 Q1',
      owner: { name: 'John Rivera', initials: 'JR' },
      due: daysFromNow(-2),
      risk: 'High',
      status: 'Blocked',
      tags: ['Overdue', 'Awaiting Owner'],
      progress: { done: 3, total: 9 },
      activityAt: new Date(Date.now() - 20 * 3600e3),
      objective: 'Clear overdue items and unblock reviewer',
      evidence: {
        required: [
          { id: 'ev6', name: 'Vendor user list export', source: 'Okta', status: 'Missing', owner: 'John', updatedAt: null, hash: null },
          { id: 'ev7', name: 'Quarterly attestation', source: 'ServiceNow', status: 'Missing', owner: 'John', updatedAt: null, hash: null }
        ],
        optional: [],
        sensitive: [
          { id: 'ev8', name: 'Invoice sample (PII)', source: 'ServiceNow', status: 'Needs Review', owner: 'Mary', updatedAt: new Date(Date.now() - 10 * 3600e3), hash: 'c9aa...e0', flagged: 'PII' }
        ]
      },
      blockers: [{ id: 'b3', title: 'Awaiting owner confirmation for vendor scope', actions: ['Nudge owner', 'Escalate'] }],
      timeline: [{ text: 'Case flagged as overdue', when: new Date(Date.now() - 20 * 3600e3) }]
    },
    {
      id: 'case_iso27001_access',
      title: 'ISO 27001 - Access Recertification',
      subtitle: 'Mastercard - Security Governance',
      control: 'A.5.15',
      period: '2026 H1',
      owner: { name: 'Alex Chen', initials: 'AC' },
      due: daysFromNow(12),
      risk: 'Low',
      status: 'Ready for Review',
      tags: ['Audit-ready'],
      progress: { done: 10, total: 10 },
      activityAt: new Date(Date.now() - 4 * 3600e3),
      objective: 'Prepare reviewer pack and submit',
      evidence: {
        required: [{ id: 'ev9', name: 'Recertification report', source: 'Splunk', status: 'Uploaded', owner: 'Alex', updatedAt: new Date(Date.now() - 4 * 3600e3), hash: '2aa1...1b' }],
        optional: [],
        sensitive: []
      },
      blockers: [],
      timeline: [{ text: 'Evidence completion reached 100%', when: new Date(Date.now() - 4 * 3600e3) }]
    }
  ];
}
