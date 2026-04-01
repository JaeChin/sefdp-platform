'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  X,
  Check,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Upload,
  FileText,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Receipt,
} from 'lucide-react';

// ─── Schema ───────────────────────────────────────────────────────────────────

const wizardSchema = z.object({
  projectId: z.string().min(1, 'Please select a project'),
  milestoneId: z.string().min(1, 'Please select a milestone'),
  connectionsClaimed: z.coerce
    .number({ invalid_type_error: 'Enter a whole number' })
    .int('Must be a whole number')
    .min(1, 'Must claim at least 1 connection'),
  verifiedConnections: z.coerce
    .number({ invalid_type_error: 'Enter a whole number' })
    .int('Must be a whole number')
    .min(0, 'Must be 0 or more'),
  avgDailyConsumptionKwh: z.coerce
    .number({ invalid_type_error: 'Enter a number' })
    .nonnegative('Must be 0 or more'),
  uptimePercent: z.coerce
    .number({ invalid_type_error: 'Enter a number' })
    .min(0, 'Must be between 0–100')
    .max(100, 'Must be between 0–100'),
  claimPeriodStart: z.string().min(1, 'Start date is required'),
  claimPeriodEnd: z.string().min(1, 'End date is required'),
  declarationAccepted: z.boolean().refine((v) => v === true, {
    message: 'You must accept the declaration to submit',
  }),
});

type WizardFormData = z.infer<typeof wizardSchema>;

// ─── Static Reference Data ────────────────────────────────────────────────────

const RATE_PER_CONNECTION_NGN = 52_500;

interface Project {
  id: string;
  ref: string;
  name: string;
  state: string;
  programType: string;
  prefix: string;
}

interface Milestone {
  id: string;
  name: string;
  minConsumptionKwh: number;
  minUptimePercent: number;
  minActiveConnectionsPct: number;
  budgetNgn: number;
}

const PROJECTS: Project[] = [
  {
    id: 'proj-kano',
    ref: 'DARES-MG-2026-0891',
    name: 'Kano North Mini-Grid Cluster',
    state: 'Kano',
    programType: 'Performance Based Grant (PBG)',
    prefix: 'MG',
  },
  {
    id: 'proj-lagos',
    ref: 'DARES-SAS-2026-1204',
    name: 'Lagos Rooftop PBG Phase II',
    state: 'Lagos',
    programType: 'Performance Based Grant (PBG)',
    prefix: 'SAS',
  },
  {
    id: 'proj-borno',
    ref: 'DARES-MG-2026-0742',
    name: 'Borno Rural Cluster Phase I',
    state: 'Borno',
    programType: 'Performance Based Grant (PBG)',
    prefix: 'MG',
  },
];

const MILESTONES_BY_PROJECT: Record<string, Milestone[]> = {
  'proj-kano': [
    {
      id: 'ms-kano-m2',
      name: 'Milestone 2: Operations Verification',
      minConsumptionKwh: 4.2,
      minUptimePercent: 95,
      minActiveConnectionsPct: 90,
      budgetNgn: 424_500_000,
    },
  ],
  'proj-lagos': [
    {
      id: 'ms-lagos-m1',
      name: 'Milestone 1: Construction Completion',
      minConsumptionKwh: 3.5,
      minUptimePercent: 90,
      minActiveConnectionsPct: 85,
      budgetNgn: 86_800_000,
    },
  ],
  'proj-borno': [
    {
      id: 'ms-borno-m2',
      name: 'Milestone 2: Operations Verification',
      minConsumptionKwh: 4.2,
      minUptimePercent: 95,
      minActiveConnectionsPct: 90,
      budgetNgn: 565_000_000,
    },
  ],
};

// ─── Document Slots ───────────────────────────────────────────────────────────

interface DocSlot {
  id: string;
  label: string;
  description: string;
  required: boolean;
  accept: string;
}

const REQUIRED_DOCS: DocSlot[] = [
  {
    id: 'meter_data',
    label: 'Smart Meter Data Export',
    description: 'CSV format, covering the full claim period',
    required: true,
    accept: '.csv',
  },
  {
    id: 'site_photos',
    label: 'Site Verification Photos',
    description: 'Minimum 3 photographs of active connections',
    required: true,
    accept: 'image/*',
  },
  {
    id: 'connection_register',
    label: 'Community Connection Register',
    description: 'Signed register of all household connections',
    required: true,
    accept: '.pdf,.xlsx',
  },
  {
    id: 'bank_letter',
    label: 'Bank Account Verification Letter',
    description: 'Must match the registered entity name',
    required: true,
    accept: '.pdf',
  },
];

const VARIANCE_DOC: DocSlot = {
  id: 'variance_explanation',
  label: 'Variance Explanation',
  description: 'Required — claim amount differs >5% from milestone budget',
  required: true,
  accept: '.pdf,.docx',
};

// ─── Helper Functions ─────────────────────────────────────────────────────────

type ThresholdStatus = 'pass' | 'warn' | 'fail' | 'empty';

function getConsumptionStatus(val: number | string, min: number): ThresholdStatus {
  const n = typeof val === 'string' ? parseFloat(val) : val;
  if (isNaN(n) || val === '') return 'empty';
  if (n >= min) return 'pass';
  if (n >= 3.5) return 'warn';
  return 'fail';
}

function getUptimeStatus(val: number | string, min: number): ThresholdStatus {
  const n = typeof val === 'string' ? parseFloat(val) : val;
  if (isNaN(n) || val === '') return 'empty';
  if (n >= min) return 'pass';
  if (n >= 90) return 'warn';
  return 'fail';
}

function getComplianceStatus(
  consumptionStatus: ThresholdStatus,
  uptimeStatus: ThresholdStatus,
): 'ELIGIBLE' | 'PARTIALLY ELIGIBLE' | 'NOT ELIGIBLE' | null {
  if (consumptionStatus === 'empty' || uptimeStatus === 'empty') return null;
  if (consumptionStatus === 'fail' || uptimeStatus === 'fail') return 'NOT ELIGIBLE';
  if (consumptionStatus === 'warn' || uptimeStatus === 'warn') return 'PARTIALLY ELIGIBLE';
  return 'ELIGIBLE';
}

function formatNgn(amountNgn: number): string {
  return '₦' + amountNgn.toLocaleString('en-NG');
}

// ─── Step Config ──────────────────────────────────────────────────────────────

const STEPS = [
  { label: 'Project & Milestone', shortLabel: 'Project' },
  { label: 'Performance Data', shortLabel: 'Data' },
  { label: 'Documents', shortLabel: 'Docs' },
  { label: 'Review & Submit', shortLabel: 'Review' },
];

const STEP_FIELDS: Record<number, (keyof WizardFormData)[]> = {
  0: ['projectId', 'milestoneId'],
  1: [
    'connectionsClaimed',
    'verifiedConnections',
    'avgDailyConsumptionKwh',
    'uptimePercent',
    'claimPeriodStart',
    'claimPeriodEnd',
  ],
  2: [],
  3: ['declarationAccepted'],
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldError({ message }: { message: string | undefined }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600" role="alert">
      <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

function ThresholdIndicator({
  status,
  passText,
  warnText,
  failText,
}: {
  status: ThresholdStatus;
  passText: string;
  warnText: string;
  failText: string;
}) {
  if (status === 'empty') return null;
  const cfg = {
    pass: { icon: Check, text: passText, cls: 'text-green-600' },
    warn: { icon: AlertTriangle, text: warnText, cls: 'text-amber-600' },
    fail: { icon: AlertCircle, text: failText, cls: 'text-red-600' },
    empty: { icon: AlertCircle, text: '', cls: '' },
  }[status];
  const Icon = cfg.icon;
  return (
    <p className={`mt-1.5 flex items-center gap-1 text-xs font-medium ${cfg.cls}`} role="status">
      <Icon className="h-3 w-3 shrink-0" aria-hidden="true" />
      {cfg.text}
    </p>
  );
}

function DocUploadSlot({
  slot,
  status,
  onUpload,
}: {
  slot: DocSlot;
  status: 'pending' | 'uploading' | 'uploaded';
  onUpload: () => void;
}) {
  return (
    <div
      className={`flex items-start gap-4 rounded-xl border p-4 transition-colors ${
        status === 'uploaded'
          ? 'border-green-200 bg-green-50/40'
          : 'border-slate-200 bg-white'
      }`}
    >
      <div
        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          status === 'uploaded'
            ? 'bg-green-100 text-green-600'
            : status === 'uploading'
              ? 'bg-blue-100 text-blue-600'
              : 'bg-slate-100 text-slate-400'
        }`}
        aria-hidden="true"
      >
        {status === 'uploaded' ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : status === 'uploading' ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <FileText className="h-4 w-4" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-[#0A2540]">
          {slot.label}
          {slot.required && (
            <span className="ml-1 text-red-500" aria-label="required">
              *
            </span>
          )}
        </p>
        <p className="mt-0.5 text-xs text-slate-500">{slot.description}</p>
        {status === 'uploaded' && (
          <p className="mt-1 font-mono text-xs text-green-600">
            ✓ {slot.id.replace(/_/g, '-')}-verified.{(slot.accept.split(',')[0] ?? '').replace('.', '')}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={onUpload}
        disabled={status === 'uploading' || status === 'uploaded'}
        className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2540] ${
          status === 'uploaded'
            ? 'cursor-default bg-green-100 text-green-700'
            : status === 'uploading'
              ? 'cursor-wait bg-blue-50 text-blue-600'
              : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
        }`}
        aria-label={`Upload ${slot.label}`}
      >
        {status === 'uploaded' ? (
          <>
            <Check className="h-3 w-3" aria-hidden="true" />
            Uploaded
          </>
        ) : status === 'uploading' ? (
          <>
            <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />
            Uploading…
          </>
        ) : (
          <>
            <Upload className="h-3 w-3" aria-hidden="true" />
            Upload
          </>
        )}
      </button>
    </div>
  );
}

// ─── Main Wizard Component ────────────────────────────────────────────────────

interface ClaimsWizardProps {
  onClose: () => void;
}

export function ClaimsWizard({ onClose }: ClaimsWizardProps) {
  const [step, setStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [docStatuses, setDocStatuses] = useState<Record<string, 'pending' | 'uploading' | 'uploaded'>>({
    meter_data: 'pending',
    site_photos: 'pending',
    connection_register: 'pending',
    bank_letter: 'pending',
    variance_explanation: 'pending',
  });

  const form = useForm<WizardFormData>({
    resolver: zodResolver(wizardSchema),
    mode: 'onChange',
    defaultValues: {
      projectId: '',
      milestoneId: '',
      connectionsClaimed: undefined,
      verifiedConnections: undefined,
      avgDailyConsumptionKwh: undefined,
      uptimePercent: undefined,
      claimPeriodStart: '',
      claimPeriodEnd: '',
      declarationAccepted: false,
    },
  });

  const {
    register,
    watch,
    trigger,
    formState: { errors },
    handleSubmit,
  } = form;

  // ── Derived values ────────────────────────────────────────────────────────

  const projectId = watch('projectId');
  const milestoneId = watch('milestoneId');
  const verifiedConnections = watch('verifiedConnections');
  const avgConsumption = watch('avgDailyConsumptionKwh');
  const uptime = watch('uptimePercent');
  const declarationAccepted = watch('declarationAccepted');

  const selectedProject = PROJECTS.find((p) => p.id === projectId) ?? null;
  const availableMilestones = projectId ? (MILESTONES_BY_PROJECT[projectId] ?? []) : [];
  const selectedMilestone = availableMilestones.find((m) => m.id === milestoneId) ?? null;

  const minConsumption = selectedMilestone?.minConsumptionKwh ?? 4.2;
  const minUptime = selectedMilestone?.minUptimePercent ?? 95;

  const consumptionStatus = getConsumptionStatus(avgConsumption ?? '', minConsumption);
  const uptimeStatus = getUptimeStatus(uptime ?? '', minUptime);
  const complianceStatus = getComplianceStatus(consumptionStatus, uptimeStatus);

  const verifiedConnectionsNum = useMemo(() => {
    const n = Number(verifiedConnections);
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
  }, [verifiedConnections]);

  const calculatedAmountNgn = verifiedConnectionsNum * RATE_PER_CONNECTION_NGN;

  const showVarianceDoc = useMemo(() => {
    if (!selectedMilestone || calculatedAmountNgn === 0) return false;
    return (
      Math.abs(calculatedAmountNgn - selectedMilestone.budgetNgn) / selectedMilestone.budgetNgn > 0.05
    );
  }, [calculatedAmountNgn, selectedMilestone]);

  const requiredDocs = useMemo(
    () => (showVarianceDoc ? [...REQUIRED_DOCS, VARIANCE_DOC] : REQUIRED_DOCS),
    [showVarianceDoc],
  );

  const uploadedRequiredCount = requiredDocs.filter((d) => docStatuses[d.id] === 'uploaded').length;
  const allRequiredDocsUploaded = uploadedRequiredCount === requiredDocs.length;

  const generatedClaimRef = selectedProject
    ? `DARES-${selectedProject.prefix}-2026-${String(parseInt(selectedProject.ref.split('-').at(-1) ?? '0') + 1).padStart(4, '0')}`
    : 'DARES-MG-2026-XXXX';

  // ── Navigation ────────────────────────────────────────────────────────────

  const goNext = async () => {
    const fields = STEP_FIELDS[step] ?? [];
    const valid = fields.length > 0 ? await trigger(fields) : true;
    if (step === 2 && !allRequiredDocsUploaded) return;
    if (valid) setStep((s) => Math.min(s + 1, 3));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const uploadDoc = (docId: string) => {
    setDocStatuses((prev) => ({ ...prev, [docId]: 'uploading' }));
    setTimeout(() => {
      setDocStatuses((prev) => ({ ...prev, [docId]: 'uploaded' }));
    }, 1500);
  };

  const onSubmit = handleSubmit(async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    setIsSubmitted(true);
  });

  // ── Step 1 can go next if project + milestone selected ────────────────────

  const step1Valid = !!projectId && !!milestoneId;
  const step3NextDisabled = step === 2 && !allRequiredDocsUploaded;
  const step4SubmitDisabled = !declarationAccepted || isSubmitting;

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-white"
      role="dialog"
      aria-modal="true"
      aria-label="New Disbursement Claim"
    >
      {/* ── Top Bar ──────────────────────────────────────────────────────── */}
      <div className="border-b border-slate-200 bg-white">
        {/* Step progress */}
        <div className="flex items-center gap-0 px-8 pt-5">
          {STEPS.map((s, i) => {
            const isActive = i === step;
            const isComplete = i < step || isSubmitted;
            return (
              <div key={s.label} className="flex items-center">
                {/* Step bubble */}
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                      isComplete
                        ? 'bg-[#00A86B] text-white'
                        : isActive
                          ? 'bg-[#0A2540] text-white'
                          : 'bg-slate-100 text-slate-400'
                    }`}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    {isComplete && !isActive ? (
                      <Check className="h-4 w-4" aria-label="Complete" />
                    ) : (
                      i + 1
                    )}
                  </div>
                  <span
                    className={`mt-1.5 text-xs font-medium ${
                      isActive ? 'text-[#0A2540]' : isComplete ? 'text-[#00A86B]' : 'text-slate-400'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {/* Connector */}
                {i < STEPS.length - 1 && (
                  <div
                    className={`mx-3 mb-5 h-px w-16 transition-colors ${
                      i < step ? 'bg-[#00A86B]' : 'bg-slate-200'
                    }`}
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2540]"
            aria-label="Close wizard"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress track */}
        <div className="mt-4 h-1 bg-slate-100">
          <div
            className="h-full bg-[#0A2540] transition-all duration-300"
            style={{ width: `${isSubmitted ? 100 : ((step) / STEPS.length) * 100}%` }}
            role="progressbar"
            aria-valuenow={isSubmitted ? 100 : (step / STEPS.length) * 100}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>

      {/* ── Content Area ─────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        {isSubmitted ? (
          /* ── Success Screen ──────────────────────────────────────────── */
          <div className="flex h-full flex-col items-center justify-center px-8 py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00A86B]/10">
              <CheckCircle2 className="h-8 w-8 text-[#00A86B]" aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-2xl font-bold text-[#0A2540]">Claim Submitted Successfully</h2>
            <p className="mt-2 text-slate-500">
              Your claim has been submitted and is now under PMU review.
            </p>
            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-8 py-4 text-center">
              <p className="text-xs font-medium text-slate-500">Claim Reference</p>
              <p className="mt-1 font-mono text-xl font-bold text-[#0A2540]">{generatedClaimRef}</p>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              Expected review time: 5–7 business days. You will be notified by email.
            </p>
            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2540]"
              >
                Back to Claims
              </button>
              <button
                type="button"
                onClick={() => {
                  form.reset();
                  setStep(0);
                  setIsSubmitted(false);
                  setDocStatuses({
                    meter_data: 'pending',
                    site_photos: 'pending',
                    connection_register: 'pending',
                    bank_letter: 'pending',
                    variance_explanation: 'pending',
                  });
                }}
                className="rounded-lg bg-[#0A2540] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0A2540]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2540]"
              >
                Submit Another Claim
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mx-auto max-w-3xl px-8 py-8">
            {/* ── Step 1: Project & Milestone ─────────────────────────── */}
            {step === 0 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-[#0A2540]">Select Project & Milestone</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Choose the project and milestone this claim is being submitted against.
                  </p>
                </div>

                {/* Project select */}
                <div>
                  <label htmlFor="projectId" className="block text-sm font-semibold text-[#0A2540]">
                    Project <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <select
                    id="projectId"
                    {...register('projectId')}
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-[#0A2540] focus:outline-none focus:ring-1 focus:ring-[#0A2540]"
                  >
                    <option value="">Select a project…</option>
                    {PROJECTS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — {p.ref}
                      </option>
                    ))}
                  </select>
                  <FieldError message={errors.projectId?.message} />
                </div>

                {/* Milestone select — appears after project chosen */}
                {selectedProject && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                    <label
                      htmlFor="milestoneId"
                      className="block text-sm font-semibold text-[#0A2540]"
                    >
                      Milestone <span className="text-red-500" aria-label="required">*</span>
                    </label>
                    <select
                      id="milestoneId"
                      {...register('milestoneId')}
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-[#0A2540] focus:outline-none focus:ring-1 focus:ring-[#0A2540]"
                    >
                      <option value="">Select a milestone…</option>
                      {availableMilestones.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                    <FieldError message={errors.milestoneId?.message} />
                  </div>
                )}

                {/* Milestone requirements summary */}
                {selectedMilestone && (
                  <div className="animate-in fade-in slide-in-from-top-2 rounded-xl border border-slate-200 bg-slate-50 p-5 duration-200">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Milestone Requirements
                    </p>
                    <div className="mt-3 grid grid-cols-3 gap-4">
                      {[
                        {
                          label: 'Min. Avg Consumption',
                          value: `${selectedMilestone.minConsumptionKwh} kWh/day`,
                        },
                        {
                          label: 'Min. System Uptime',
                          value: `${selectedMilestone.minUptimePercent}%`,
                        },
                        {
                          label: 'Min. Active Connections',
                          value: `${selectedMilestone.minActiveConnectionsPct}%`,
                        },
                      ].map((req) => (
                        <div key={req.label} className="rounded-lg border border-slate-200 bg-white p-3">
                          <p className="text-xs text-slate-500">{req.label}</p>
                          <p className="mt-1 font-mono text-sm font-bold text-[#0A2540]">
                            {req.value}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2">
                      <Receipt className="h-4 w-4 shrink-0 text-blue-500" aria-hidden="true" />
                      <p className="text-xs text-blue-700">
                        Claim type auto-populated:{' '}
                        <span className="font-semibold">{selectedProject?.programType}</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── Step 2: Performance Data ─────────────────────────────── */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-[#0A2540]">Connections & Consumption Data</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Enter verified performance metrics for the claim period.
                  </p>
                </div>

                {/* Claim period */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="claimPeriodStart"
                      className="block text-sm font-semibold text-[#0A2540]"
                    >
                      Claim Period Start <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="claimPeriodStart"
                      type="date"
                      {...register('claimPeriodStart')}
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-mono text-sm text-slate-900 focus:border-[#0A2540] focus:outline-none focus:ring-1 focus:ring-[#0A2540]"
                    />
                    <FieldError message={errors.claimPeriodStart?.message} />
                  </div>
                  <div>
                    <label
                      htmlFor="claimPeriodEnd"
                      className="block text-sm font-semibold text-[#0A2540]"
                    >
                      Claim Period End <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="claimPeriodEnd"
                      type="date"
                      {...register('claimPeriodEnd')}
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-mono text-sm text-slate-900 focus:border-[#0A2540] focus:outline-none focus:ring-1 focus:ring-[#0A2540]"
                    />
                    <FieldError message={errors.claimPeriodEnd?.message} />
                  </div>
                </div>

                {/* Connections */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="connectionsClaimed"
                      className="block text-sm font-semibold text-[#0A2540]"
                    >
                      Total Connections Claimed <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="connectionsClaimed"
                      type="number"
                      min={0}
                      {...register('connectionsClaimed')}
                      placeholder="e.g. 850"
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-mono text-sm text-slate-900 placeholder:font-sans placeholder:text-slate-400 focus:border-[#0A2540] focus:outline-none focus:ring-1 focus:ring-[#0A2540]"
                    />
                    <FieldError message={errors.connectionsClaimed?.message} />
                  </div>
                  <div>
                    <label
                      htmlFor="verifiedConnections"
                      className="block text-sm font-semibold text-[#0A2540]"
                    >
                      Verified Active Connections <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="verifiedConnections"
                      type="number"
                      min={0}
                      {...register('verifiedConnections')}
                      placeholder="e.g. 847"
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-mono text-sm text-slate-900 placeholder:font-sans placeholder:text-slate-400 focus:border-[#0A2540] focus:outline-none focus:ring-1 focus:ring-[#0A2540]"
                    />
                    <p className="mt-1.5 text-xs text-slate-500">
                      Must be verified via smart meter API or file upload
                    </p>
                    <FieldError message={errors.verifiedConnections?.message} />
                  </div>
                </div>

                {/* Consumption + Uptime */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="avgDailyConsumptionKwh"
                      className="block text-sm font-semibold text-[#0A2540]"
                    >
                      Avg Daily Consumption per Connection{' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative mt-2">
                      <input
                        id="avgDailyConsumptionKwh"
                        type="number"
                        step="0.01"
                        min={0}
                        {...register('avgDailyConsumptionKwh')}
                        placeholder={`Min ${minConsumption} kWh/day`}
                        className={`w-full rounded-lg border bg-white px-3 py-2.5 pr-14 font-mono text-sm text-slate-900 placeholder:font-sans placeholder:text-slate-400 focus:outline-none focus:ring-1 ${
                          consumptionStatus === 'pass'
                            ? 'border-green-300 focus:border-green-500 focus:ring-green-500'
                            : consumptionStatus === 'warn'
                              ? 'border-amber-300 focus:border-amber-500 focus:ring-amber-500'
                              : consumptionStatus === 'fail'
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                : 'border-slate-200 focus:border-[#0A2540] focus:ring-[#0A2540]'
                        }`}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                        kWh/day
                      </span>
                    </div>
                    <ThresholdIndicator
                      status={consumptionStatus}
                      passText={`Above minimum threshold (${minConsumption} kWh/day)`}
                      warnText="Below target — partial eligibility applies"
                      failText="Below minimum — claim may be rejected"
                    />
                    <FieldError message={errors.avgDailyConsumptionKwh?.message} />
                  </div>

                  <div>
                    <label
                      htmlFor="uptimePercent"
                      className="block text-sm font-semibold text-[#0A2540]"
                    >
                      System Uptime over Claim Period <span className="text-red-500">*</span>
                    </label>
                    <div className="relative mt-2">
                      <input
                        id="uptimePercent"
                        type="number"
                        step="0.1"
                        min={0}
                        max={100}
                        {...register('uptimePercent')}
                        placeholder={`Min ${minUptime}%`}
                        className={`w-full rounded-lg border bg-white px-3 py-2.5 pr-8 font-mono text-sm text-slate-900 placeholder:font-sans placeholder:text-slate-400 focus:outline-none focus:ring-1 ${
                          uptimeStatus === 'pass'
                            ? 'border-green-300 focus:border-green-500 focus:ring-green-500'
                            : uptimeStatus === 'warn'
                              ? 'border-amber-300 focus:border-amber-500 focus:ring-amber-500'
                              : uptimeStatus === 'fail'
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                : 'border-slate-200 focus:border-[#0A2540] focus:ring-[#0A2540]'
                        }`}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                        %
                      </span>
                    </div>
                    <ThresholdIndicator
                      status={uptimeStatus}
                      passText={`Above minimum threshold (${minUptime}%)`}
                      warnText="Below target — partial eligibility applies"
                      failText="Below minimum — claim may be rejected"
                    />
                    <FieldError message={errors.uptimePercent?.message} />
                  </div>
                </div>

                {/* Live Calculation Panel */}
                <div className="rounded-xl border-2 border-[#00A86B]/20 bg-[#00A86B]/5 p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Disbursement Calculation
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Verified Connections</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-[#0A2540]">
                        {verifiedConnectionsNum > 0
                          ? verifiedConnectionsNum.toLocaleString()
                          : '—'}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500">Compliance Status</span>
                    </div>
                    <div className="text-right">
                      {complianceStatus ? (
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${
                            complianceStatus === 'ELIGIBLE'
                              ? 'bg-green-100 text-green-700'
                              : complianceStatus === 'PARTIALLY ELIGIBLE'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {complianceStatus === 'ELIGIBLE' && (
                            <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                          )}
                          {complianceStatus === 'PARTIALLY ELIGIBLE' && (
                            <AlertTriangle className="h-3 w-3" aria-hidden="true" />
                          )}
                          {complianceStatus === 'NOT ELIGIBLE' && (
                            <AlertCircle className="h-3 w-3" aria-hidden="true" />
                          )}
                          {complianceStatus}
                        </span>
                      ) : (
                        <span className="font-mono text-slate-400">—</span>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 border-t border-[#00A86B]/20 pt-5">
                    <p className="text-xs font-medium text-slate-500">Calculated Grant Amount</p>
                    <p className="mt-1 font-mono text-4xl font-bold tracking-tight text-[#00A86B]">
                      {calculatedAmountNgn > 0 ? formatNgn(calculatedAmountNgn) : '₦—'}
                    </p>
                    {calculatedAmountNgn > 0 && verifiedConnectionsNum > 0 && (
                      <p className="mt-2 font-mono text-xs text-slate-500">
                        {verifiedConnectionsNum.toLocaleString()} connections ×{' '}
                        {formatNgn(RATE_PER_CONNECTION_NGN)} per connection ={' '}
                        <span className="font-semibold text-[#00A86B]">
                          {formatNgn(calculatedAmountNgn)}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 3: Documents ────────────────────────────────────── */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-[#0A2540]">Supporting Documents</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Upload all required documents before proceeding to review.
                  </p>
                </div>

                {/* Progress indicator */}
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      allRequiredDocsUploaded
                        ? 'bg-[#00A86B] text-white'
                        : 'bg-[#0A2540] text-white'
                    }`}
                    aria-hidden="true"
                  >
                    {allRequiredDocsUploaded ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      `${uploadedRequiredCount}`
                    )}
                  </div>
                  <p className="text-sm font-medium text-[#0A2540]">
                    {allRequiredDocsUploaded ? (
                      <span className="text-[#00A86B]">All required documents uploaded</span>
                    ) : (
                      <>
                        <span className="font-mono">{uploadedRequiredCount}</span> of{' '}
                        <span className="font-mono">{requiredDocs.length}</span> required documents
                        uploaded
                      </>
                    )}
                  </p>
                </div>

                {/* Doc slots */}
                <div className="space-y-3">
                  {requiredDocs.map((slot) => (
                    <DocUploadSlot
                      key={slot.id}
                      slot={slot}
                      status={docStatuses[slot.id] ?? 'pending'}
                      onUpload={() => uploadDoc(slot.id)}
                    />
                  ))}
                </div>

                {!allRequiredDocsUploaded && (
                  <p className="flex items-center gap-1.5 text-xs text-amber-700">
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    Upload all required documents to proceed to the review step.
                  </p>
                )}
              </div>
            )}

            {/* ── Step 4: Review & Submit ──────────────────────────────── */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-[#0A2540]">Review & Submit</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Confirm all details are correct before submitting.
                  </p>
                </div>

                {/* Summary card */}
                <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
                  {/* Claim ref */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <p className="text-xs font-medium text-slate-500">Auto-Generated Claim ID</p>
                      <p className="mt-0.5 font-mono text-lg font-bold text-[#0A2540]">
                        {generatedClaimRef}
                      </p>
                    </div>
                    <span className="rounded-full bg-blue-50 px-3 py-1 font-mono text-xs font-semibold text-blue-700">
                      DRAFT
                    </span>
                  </div>

                  {/* Project + milestone */}
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                    <div>
                      <p className="text-xs text-slate-500">Project</p>
                      <p className="mt-0.5 font-medium text-[#0A2540]">
                        {selectedProject?.name ?? '—'}
                      </p>
                      <p className="font-mono text-xs text-slate-400">{selectedProject?.ref}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Milestone</p>
                      <p className="mt-0.5 font-medium text-[#0A2540]">
                        {selectedMilestone?.name ?? '—'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Claim Period</p>
                      <p className="mt-0.5 font-mono text-sm font-medium text-[#0A2540]">
                        {watch('claimPeriodStart') || '—'} → {watch('claimPeriodEnd') || '—'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Claim Type</p>
                      <p className="mt-0.5 font-medium text-[#0A2540]">
                        {selectedProject?.programType ?? '—'}
                      </p>
                    </div>
                  </div>

                  {/* Performance metrics */}
                  <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                    {[
                      {
                        label: 'Connections Claimed',
                        value: (() => {
                          const n = Number(watch('connectionsClaimed'));
                          return Number.isFinite(n) && n > 0 ? Math.floor(n).toLocaleString() : '—';
                        })(),
                        status: null,
                      },
                      {
                        label: 'Verified Connections',
                        value:
                          verifiedConnectionsNum > 0
                            ? verifiedConnectionsNum.toLocaleString()
                            : '—',
                        status: null,
                      },
                      {
                        label: 'Avg Consumption',
                        value:
                          typeof avgConsumption === 'number'
                            ? `${avgConsumption} kWh/day`
                            : '—',
                        status: consumptionStatus,
                      },
                      {
                        label: 'System Uptime',
                        value: typeof uptime === 'number' ? `${uptime}%` : '—',
                        status: uptimeStatus,
                      },
                    ].map((metric) => (
                      <div key={metric.label} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                        <p className="text-xs text-slate-500">{metric.label}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="font-mono text-sm font-semibold text-[#0A2540]">
                            {metric.value}
                          </span>
                          {metric.status && metric.status !== 'empty' && (
                            <span
                              className={`h-2 w-2 rounded-full ${
                                metric.status === 'pass'
                                  ? 'bg-green-500'
                                  : metric.status === 'warn'
                                    ? 'bg-amber-500'
                                    : 'bg-red-500'
                              }`}
                              aria-label={metric.status}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Documents checklist */}
                  <div className="border-t border-slate-100 pt-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Documents
                    </p>
                    <div className="space-y-2">
                      {requiredDocs.map((doc) => (
                        <div key={doc.id} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-[#00A86B]" aria-hidden="true" />
                          <span className="text-slate-700">{doc.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Disbursement amount */}
                  <div className="rounded-xl border-2 border-[#00A86B]/20 bg-[#00A86B]/5 p-4 text-center">
                    <p className="text-xs font-medium text-slate-500">Calculated Disbursement</p>
                    <p className="mt-1 font-mono text-3xl font-bold text-[#00A86B]">
                      {formatNgn(calculatedAmountNgn)}
                    </p>
                    {verifiedConnectionsNum > 0 && (
                      <p className="mt-1 font-mono text-xs text-slate-500">
                        {verifiedConnectionsNum.toLocaleString()} connections ×{' '}
                        {formatNgn(RATE_PER_CONNECTION_NGN)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Declaration */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      {...register('declarationAccepted')}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-[#0A2540]"
                    />
                    <span className="text-sm text-slate-700">
                      I confirm that all information provided is accurate and complete. I understand
                      that false claims may result in programme suspension and potential legal
                      consequences under the DARES programme terms.
                    </span>
                  </label>
                  <FieldError message={errors.declarationAccepted?.message} />
                </div>
              </div>
            )}
          </form>
        )}
      </div>

      {/* ── Bottom Nav ──────────────────────────────────────────────────── */}
      {!isSubmitted && (
        <div className="border-t border-slate-200 bg-white px-8 py-4">
          <div className="mx-auto flex max-w-3xl items-center">
            {/* Save draft link */}
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-slate-500 transition-colors hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2540] focus-visible:ring-offset-2"
            >
              Save Draft &amp; Exit
            </button>

            {/* Back / Next */}
            <div className="ml-auto flex items-center gap-3">
              {step > 0 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2540]"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  Back
                </button>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={
                    (step === 0 && !step1Valid) ||
                    step3NextDisabled
                  }
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0A2540] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0A2540]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2540] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {step === 2 && !allRequiredDocsUploaded
                    ? `Upload ${requiredDocs.length - uploadedRequiredCount} more document${requiredDocs.length - uploadedRequiredCount !== 1 ? 's' : ''}`
                    : 'Continue'}
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2540]"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="submit"
                    form="claims-wizard-form"
                    onClick={onSubmit}
                    disabled={step4SubmitDisabled}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#0A2540] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0A2540]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2540] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        Submit Claim
                        <ChevronRight className="h-4 w-4" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
