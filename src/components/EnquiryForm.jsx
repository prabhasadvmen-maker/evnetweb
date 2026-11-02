import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, MessageCircle } from 'lucide-react'
import Button from './ui/Button'
import { BUDGET_BANDS } from '../data/services'
import { hasWhatsapp, whatsappLink } from '../config/site'
import { scrollToId } from '../lib/scroll'
import { useI18n } from '../i18n/useI18n'

const CATEGORY_KEYS = ['birthday', 'wedding', 'corporate', 'live', 'experience', 'other']

const EMPTY = {
  name: '', mobile: '', email: '', category: '', date: '', dateTbd: false,
  location: '', guests: '', budget: '', services: '', message: '', consent: false, marketing: false,
}

const normaliseMobile = (v) => v.replace(/[\s-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, '')

function validate(values) {
  const e = {}
  if (values.name.trim().length < 2) e.name = 'name'
  if (!/^[6-9]\d{9}$/.test(normaliseMobile(values.mobile))) e.mobile = 'mobile'
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) e.email = 'email'
  if (!values.category) e.category = 'category'
  if (!values.date && !values.dateTbd) e.date = 'date'
  if (values.location.trim().length < 2) e.location = 'location'
  if (!values.consent) e.consent = 'consent'
  return e
}

const inputCls = () => 'field'

function Field({ label, error, children, htmlFor, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-ink">{label}</label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="mt-1.5 text-sm text-[#b3261e]">{error}</p>
      )}
    </div>
  )
}

export default function EnquiryForm({ initialCategory = '' }) {
  const { t } = useI18n()
  const uid = useId()
  const [values, setValues] = useState({ ...EMPTY, category: initialCategory })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)

  const id = (n) => `${uid}-${n}`
  const set = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }))
  }
  const bind = (name) => ({
    id: id(name),
    value: values[name],
    onChange: (e) => set(name, e.target.value),
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `${id(name)}-error` : undefined,
  })
  const err = (name) => (errors[name] ? t(`form.errors.${errors[name]}`) : undefined)

  const onSubmit = (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0]
      document.getElementById(id(first))?.focus()
      return
    }
    // Frontend-only: no network request. A short delay simulates processing.
    setSubmitting(true)
    setTimeout(() => {
      const ref = `LAXZ-${Date.now().toString(36).toUpperCase().slice(-6)}`
      setResult({ ref, values })
      setSubmitting(false)
      setTimeout(() => scrollToId(id('success')), 450)
    }, 900)
  }

  const reset = () => {
    setValues({ ...EMPTY, category: initialCategory })
    setErrors({})
    setResult(null)
  }

  const summary = (r) =>
    [
      `Enquiry ${r.ref} – LAXZ EVENTS`,
      `Name: ${r.values.name}`,
      `Mobile: ${r.values.mobile}`,
      `Category: ${t(`form.categories.${r.values.category}`)}`,
      `Date: ${r.values.dateTbd ? t('form.dateTbd') : r.values.date}`,
      `Location: ${r.values.location}`,
      r.values.guests && `Guests: ${r.values.guests}`,
      r.values.budget && `Budget: ${r.values.budget}`,
      r.values.services && `Services: ${r.values.services}`,
      r.values.message && `Message: ${r.values.message}`,
    ].filter(Boolean).join('\n')

  return (
    <AnimatePresence mode="wait">
      {result ? (
        <motion.div
          key="success"
          id={id('success')}
          role="status"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="card-light rounded-3xl p-8 text-center md:p-12"
        >
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.15 }} className="mx-auto grid size-16 place-items-center rounded-full bg-gold-gradient text-ink">
            <CheckCircle2 className="size-8" />
          </motion.span>
          <h2 className="mt-6 text-4xl font-semibold text-ink">{t('form.successTitle')}</h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">{t('form.success')}</p>
          <p className="mt-6 text-sm text-muted">
            {t('form.reference')}: <span className="font-mono text-base font-semibold text-ink">{result.ref}</span>
          </p>
          <p className="mx-auto mt-4 max-w-lg text-sm text-muted">{t('form.notBooking')}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {hasWhatsapp && (<Button href={whatsappLink(summary(result))} target="_blank" rel="noopener noreferrer" arrow={false}>
              <span className="inline-flex items-center gap-2"><MessageCircle aria-hidden="true" className="size-4" />{t('form.whatsappSend')}</span>
            </Button>)}
            <Button onClick={reset} variant="outline" arrow={false}>{t('form.newEnquiry')}</Button>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          noValidate
          onSubmit={onSubmit}
          exit={{ opacity: 0 }}
          className="card-light grid gap-5 rounded-3xl p-6 sm:grid-cols-2 md:p-10"
        >
          <Field label={`${t('form.name')} *`} htmlFor={id('name')} error={err('name')}>
            <input type="text" autoComplete="name" className={inputCls(errors.name)} {...bind('name')} />
          </Field>
          <Field label={`${t('form.mobile')} *`} htmlFor={id('mobile')} error={err('mobile')}>
            <input type="tel" inputMode="tel" autoComplete="tel" placeholder="98XXXXXXXX" className={inputCls(errors.mobile)} {...bind('mobile')} />
          </Field>
          <Field label={t('form.email')} htmlFor={id('email')} error={err('email')}>
            <input type="email" autoComplete="email" className={inputCls(errors.email)} {...bind('email')} />
          </Field>
          <Field label={`${t('form.category')} *`} htmlFor={id('category')} error={err('category')}>
            <select className={`${inputCls(errors.category)} `} {...bind('category')}>
              <option value="">{t('form.select')}</option>
              {CATEGORY_KEYS.map((k) => <option key={k} value={k}>{t(`form.categories.${k}`)}</option>)}
            </select>
          </Field>
          <Field label={`${t('form.date')} *`} htmlFor={id('date')} error={err('date')}>
            <input type="date" disabled={values.dateTbd} className={`${inputCls(errors.date)} disabled:opacity-40 `} {...bind('date')} />
            <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-muted">
              <input
                type="checkbox"
                checked={values.dateTbd}
                onChange={(e) => { set('dateTbd', e.target.checked); if (e.target.checked) set('date', '') }}
                className="size-4 accent-[#B88946]"
              />
              {t('form.dateTbd')}
            </label>
          </Field>
          <Field label={`${t('form.location')} *`} htmlFor={id('location')} error={err('location')}>
            <input type="text" autoComplete="address-level2" className={inputCls(errors.location)} {...bind('location')} />
          </Field>
          <Field label={t('form.guests')} htmlFor={id('guests')}>
            <input type="text" placeholder={t('form.guestsPh')} className={inputCls(false)} {...bind('guests')} />
          </Field>
          <Field label={t('form.budget')} htmlFor={id('budget')}>
            <select className={`${inputCls(false)} `} {...bind('budget')}>
              <option value="">{t('form.select')}</option>
              {BUDGET_BANDS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </Field>
          <Field label={t('form.services')} htmlFor={id('services')} className="sm:col-span-2">
            <input type="text" placeholder={t('form.servicesPh')} className={inputCls(false)} {...bind('services')} />
          </Field>
          <Field label={t('form.message')} htmlFor={id('message')} className="sm:col-span-2">
            <textarea rows={4} className={inputCls(false)} {...bind('message')} />
          </Field>

          <div className="space-y-3 sm:col-span-2">
            <label className="flex cursor-pointer items-start gap-3 text-sm text-muted">
              <input
                id={id('consent')}
                type="checkbox"
                checked={values.consent}
                onChange={(e) => set('consent', e.target.checked)}
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={errors.consent ? `${id('consent')}-error` : undefined}
                className="mt-0.5 size-5 shrink-0 accent-[#B88946]"
              />
              <span>
                {t('form.consent')}{' '}
                <Link to="/privacy" className="text-gold-dark underline underline-offset-2">{t('footer.privacy')}</Link> *
              </span>
            </label>
            {errors.consent && <p id={`${id('consent')}-error`} role="alert" className="text-sm text-[#b3261e]">{err('consent')}</p>}
            <label className="flex cursor-pointer items-start gap-3 text-sm text-muted">
              <input type="checkbox" checked={values.marketing} onChange={(e) => set('marketing', e.target.checked)} className="mt-0.5 size-5 shrink-0 accent-[#B88946]" />
              <span>{t('form.marketing')}</span>
            </label>
          </div>

          <div className="sm:col-span-2">
            {Object.keys(errors).length > 0 && <p role="alert" className="mb-4 text-sm text-[#b3261e]">{t('form.errors.fix')}</p>}
            <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
              {submitting ? t('form.sending') : t('form.submit')}
            </Button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
