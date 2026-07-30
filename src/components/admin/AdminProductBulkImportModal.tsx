'use client'

import { useMemo, useState, type ChangeEvent } from 'react'
import { Download, FileSpreadsheet, UploadCloud, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'
import type { AdminVariantName } from '../../types/product'
import type { BulkCreateProductPayload } from '../../services/productService'

type ParsedRowResult = {
  products: BulkCreateProductPayload[]
  errors: string[]
}

type AdminProductBulkImportModalProps = {
  isOpen?: boolean
  isPageMode?: boolean
  isImporting: boolean
  onClose?: () => void
  onImport: (products: BulkCreateProductPayload[]) => Promise<void>
}

const allowedVariantNames: AdminVariantName[] = ['gold', 'rose gold', 'silver']

const sampleCsvRows: string[][] = [
  [
    'Product Title',
    'Description',
    'Vendor',
    'Category',
    'Stone Type',
    'Color',
    'Shape',
    'Carat',
    'Origin',
    'Treatment',
    'Certificate',
    'Measurement',
    'Details',
    'Variant Title',
    'Variant Name',
    'SKU',
    'Price',
    'Stock',
  ],
  [
    'Celestia Diamond Stud Earrings',
    'Classic round diamond stud earrings designed for everyday elegance.',
    'I Want Jewels',
    'earrings',
    'diamond',
    'colorless',
    'round',
    '0.25',
    'lab-grown',
    'none',
    'IGI',
    '6mm',
    'Minimalist diamond studs crafted for daily wear with brilliant sparkle.',
    'Yellow Gold',
    'gold',
    'IWJ-ER-YG-002',
    '180',
    '40',
  ],
  [
    'Celestia Diamond Stud Earrings',
    'Classic round diamond stud earrings designed for everyday elegance.',
    'I Want Jewels',
    'earrings',
    'diamond',
    'colorless',
    'round',
    '0.25',
    'lab-grown',
    'none',
    'IGI',
    '6mm',
    'Minimalist diamond studs crafted for daily wear with brilliant sparkle.',
    'White Gold',
    'silver',
    'IWJ-ER-WG-002',
    '190',
    '35',
  ],
  [
    'Lunara Emerald Halo Ring',
    'Stunning emerald center stone surrounded by a halo of sparkle.',
    'I Want Jewels',
    'rings',
    'emerald',
    'green',
    'oval',
    '1.2',
    'zambia',
    'natural',
    'GIA',
    '8mm x 6mm',
    'Elegant halo ring with a vibrant emerald centerpiece and diamond halo.',
    'Yellow Gold',
    'gold',
    'IWJ-RG-YG-001',
    '850',
    '15',
  ],
  [
    'Lunara Emerald Halo Ring',
    'Stunning emerald center stone surrounded by a halo of sparkle.',
    'I Want Jewels',
    'rings',
    'emerald',
    'green',
    'oval',
    '1.2',
    'zambia',
    'natural',
    'GIA',
    '8mm x 6mm',
    'Elegant halo ring with a vibrant emerald centerpiece and diamond halo.',
    'Rose Gold',
    'rose gold',
    'IWJ-RG-RG-001',
    '870',
    '12',
  ],
]

function escapeCsvValue(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`
  }

  return value
}

function buildSampleCsv(): string {
  return sampleCsvRows
    .map((row) => row.map((cell) => escapeCsvValue(cell)).join(','))
    .join('\n')
}

function normalizeVariantName(value: string): AdminVariantName | null {
  const normalizedValue = value.trim().toLowerCase()

  if (normalizedValue === 'gold' || normalizedValue === 'rose gold' || normalizedValue === 'silver') {
    return normalizedValue
  }

  return null
}

function toNumber(value: unknown): number {
  if (typeof value === 'number') {
    return value
  }

  if (typeof value === 'string') {
    const parsedValue = Number(value.trim())

    return Number.isFinite(parsedValue) ? parsedValue : NaN
  }

  return NaN
}

function getStringField(row: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const value = row[key]

    if (typeof value === 'string' && value.trim()) {
      return value.trim()
    }

    if (typeof value === 'number') {
      return String(value)
    }
  }

  return ''
}

function normalizeHeaderKey(key: string): string {
  return key.toLowerCase().replace(/[^a-z0-9]+/g, '')
}

function normalizeRow(rawRow: Record<string, unknown>): Record<string, unknown> {
  const normalizedRow: Record<string, unknown> = {}

  Object.entries(rawRow).forEach(([key, value]) => {
    normalizedRow[key] = value
    normalizedRow[normalizeHeaderKey(key)] = value
  })

  return normalizedRow
}

function getVariantsFromRow(row: Record<string, unknown>): Array<Record<string, unknown>> {
  const variantsJsonValue =
    row.variants_json ??
    row.variantsJson ??
    row.variantsjson ??
    row.variants

  if (typeof variantsJsonValue === 'string' && variantsJsonValue.trim()) {
    try {
      const parsedValue = JSON.parse(variantsJsonValue)

      if (Array.isArray(parsedValue)) {
        return parsedValue.filter((entry): entry is Record<string, unknown> => Boolean(entry) && typeof entry === 'object')
      }
    } catch {
      return []
    }
  }

  const variants: Array<Record<string, unknown>> = []

  const hasSingleVariant =
    getStringField(row, ['variant_title', 'variantTitle', 'varianttitle']) ||
    getStringField(row, ['variant_name', 'variantName', 'variantname']) ||
    getStringField(row, ['variant_sku', 'variantSku', 'variantsku', 'sku'])

  if (hasSingleVariant) {
    variants.push({
      title: getStringField(row, ['variant_title', 'variantTitle', 'varianttitle']),
      variant_name: getStringField(row, ['variant_name', 'variantName', 'variantname']),
      sku: getStringField(row, ['variant_sku', 'variantSku', 'variantsku', 'sku']),
      price: row.variant_price ?? row.variantPrice ?? row.variantprice ?? row.price,
      stock: row.variant_stock ?? row.variantStock ?? row.variantstock ?? row.stock,
    })
  }

  for (let index = 1; index <= 8; index += 1) {
    const suffix = `_${index}`
    const title = getStringField(row, [`variant_title${suffix}`, `varianttitle${index}`])
    const variantName = getStringField(row, [`variant_name${suffix}`, `variantname${index}`])
    const sku = getStringField(row, [`variant_sku${suffix}`, `variantsku${index}`, `sku${index}`])
    const price = row[`variant_price${suffix}`] ?? row[`variantprice${index}`] ?? row[`price${index}`]
    const stock = row[`variant_stock${suffix}`] ?? row[`variantstock${index}`] ?? row[`stock${index}`]

    if (!title && !variantName && !sku && price === undefined && stock === undefined) {
      continue
    }

    variants.push({
      title,
      variant_name: variantName,
      sku,
      price,
      stock,
    })
  }

  return variants
}

function parseRows(rows: Record<string, unknown>[], t: TFunction): ParsedRowResult {
  const errors: string[] = []
  const groupedProducts = new Map<string, BulkCreateProductPayload>()

  rows.forEach((rawRow, rowIndex) => {
    const row = normalizeRow(rawRow)
    const rowLabel = t('validation.rowLabel', { row: rowIndex + 2 })
    const variantsSource = getVariantsFromRow(row)

    const variants = variantsSource.map((variant, variantIndex) => {
      const variantName = normalizeVariantName(getStringField(variant, ['variant_name', 'variantName']))
      const price = toNumber(variant.price)
      const stock = toNumber(variant.stock)

      if (!variantName) {
        errors.push(
          t('validation.invalidVariantName', {
            rowLabel,
            variantIndex: variantIndex + 1,
            allowed: allowedVariantNames.join(', '),
          }),
        )
      }

      if (!Number.isFinite(price) || price <= 0) {
        errors.push(t('validation.variantPrice', { rowLabel, variantIndex: variantIndex + 1 }))
      }

      if (!Number.isFinite(stock) || stock < 0) {
        errors.push(t('validation.variantStock', { rowLabel, variantIndex: variantIndex + 1 }))
      }

      return {
        title: getStringField(variant, ['title']),
        variant_name: variantName,
        sku: getStringField(variant, ['sku']),
        price,
        stock,
      }
    })

    if (variants.length === 0) {
      errors.push(t('validation.variantRequired', { rowLabel }))
    }

    const carat = toNumber(row.carat)

    if (!Number.isFinite(carat) || carat < 0) {
      errors.push(t('validation.caratInvalid', { rowLabel }))
    }

    const product = {
      title: getStringField(row, ['title', 'producttitle', 'productname']),
      description: getStringField(row, ['description', 'productdescription']),
      vendor: getStringField(row, ['vendor', 'brand']),
      category: getStringField(row, ['category']),
      stoneType: getStringField(row, ['stoneType', 'stone_type', 'stonetype']),
      color: getStringField(row, ['color']),
      shape: getStringField(row, ['shape']),
      carat,
      origin: getStringField(row, ['origin']),
      treatment: getStringField(row, ['treatment']),
      certificate: getStringField(row, ['certificate']),
      measurement: getStringField(row, ['measurement']),
      details: getStringField(row, ['details']),
      variants,
    }

    const requiredProductFields: Array<keyof Omit<BulkCreateProductPayload, 'variants'>> = [
      'title',
      'description',
      'vendor',
      'category',
      'stoneType',
      'color',
      'shape',
      'origin',
      'treatment',
      'certificate',
      'measurement',
      'details',
    ]

    requiredProductFields.forEach((field) => {
      if (!String(product[field]).trim()) {
        errors.push(t('validation.fieldRequired', { rowLabel, field }))
      }
    })

    variants.forEach((variant, variantIndex) => {
      if (!variant.title) {
        errors.push(t('validation.variantTitleRequired', { rowLabel, variantIndex: variantIndex + 1 }))
      }

      if (!variant.sku) {
        errors.push(t('validation.variantSkuRequired', { rowLabel, variantIndex: variantIndex + 1 }))
      }
    })

    if (
      product.title &&
      product.description &&
      product.vendor &&
      product.category &&
      product.stoneType &&
      product.color &&
      product.shape &&
      Number.isFinite(product.carat) &&
      product.origin &&
      product.treatment &&
      product.certificate &&
      product.measurement &&
      product.details &&
      variants.length > 0 &&
      variants.every((variant) =>
        Boolean(
          variant.title &&
          variant.variant_name &&
          variant.sku &&
          Number.isFinite(variant.price) &&
          variant.price > 0 &&
          Number.isFinite(variant.stock) &&
          variant.stock >= 0,
        ),
      )
    ) {
      const productKey = [
        product.title.toLowerCase(),
        product.vendor.toLowerCase(),
        product.category.toLowerCase(),
      ].join('::')

      const existingProduct = groupedProducts.get(productKey)

      if (!existingProduct) {
        groupedProducts.set(productKey, {
          ...product,
          variants: variants.map((variant) => ({
            title: variant.title,
            variant_name: variant.variant_name as AdminVariantName,
            sku: variant.sku,
            price: Number(variant.price),
            stock: Number(variant.stock),
          })),
        })
        return
      }

      const existingVariantSkus = new Set(existingProduct.variants.map((variant) => variant.sku.trim().toLowerCase()))
      const nextVariants = variants
        .map((variant) => ({
          title: variant.title,
          variant_name: variant.variant_name as AdminVariantName,
          sku: variant.sku,
          price: Number(variant.price),
          stock: Number(variant.stock),
        }))
        .filter((variant) => {
          const normalizedSku = variant.sku.trim().toLowerCase()

          if (existingVariantSkus.has(normalizedSku)) {
            return false
          }

          existingVariantSkus.add(normalizedSku)
          return true
        })

      groupedProducts.set(productKey, {
        ...product,
        variants: [...existingProduct.variants, ...nextVariants],
      })
    }
  })

  return {
    products: Array.from(groupedProducts.values()),
    errors,
  }
}

export default function AdminProductBulkImportModal({
  isOpen = false,
  isPageMode = false,
  isImporting,
  onClose,
  onImport,
}: AdminProductBulkImportModalProps) {
  const { t } = useTranslation('common', { keyPrefix: 'admin.components.productBulkImportModal' })
  const [fileName, setFileName] = useState('')
  const [products, setProducts] = useState<BulkCreateProductPayload[]>([])
  const [errors, setErrors] = useState<string[]>([])
  const [isParsing, setIsParsing] = useState(false)

  const visibleErrors = useMemo(() => errors.slice(0, 8), [errors])

  function handleDownloadSample() {
    const csvContent = buildSampleCsv()
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const downloadUrl = URL.createObjectURL(blob)
    const anchor = document.createElement('a')

    anchor.href = downloadUrl
    anchor.setAttribute('download', 'products-bulk-import-sample.csv')
    anchor.click()
    URL.revokeObjectURL(downloadUrl)
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0]

    if (!selectedFile) {
      return
    }

    setFileName(selectedFile.name)
    setProducts([])
    setErrors([])
    setIsParsing(true)

    try {
      let rows: Record<string, unknown>[] = []
      const lowerName = selectedFile.name.toLowerCase()

      if (lowerName.endsWith('.json')) {
        const fileText = await selectedFile.text()
        const parsedJson = JSON.parse(fileText)

        if (Array.isArray(parsedJson)) {
          rows = parsedJson.filter((entry): entry is Record<string, unknown> => Boolean(entry) && typeof entry === 'object')
        } else if (parsedJson && typeof parsedJson === 'object' && Array.isArray((parsedJson as Record<string, unknown>).products)) {
          rows = ((parsedJson as Record<string, unknown>).products as unknown[]).filter(
            (entry): entry is Record<string, unknown> => Boolean(entry) && typeof entry === 'object',
          )
        }
      } else {
        const XLSX = await import('xlsx')
        const arrayBuffer = await selectedFile.arrayBuffer()
        const workbook = XLSX.read(arrayBuffer, { type: 'array' })
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]

        rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(firstSheet, {
          defval: '',
          raw: false,
        })
      }

      if (rows.length === 0) {
        setErrors([t('errors.noRows')])
        return
      }

      const parsedResult = parseRows(rows, t)

      setProducts(parsedResult.products)
      setErrors(parsedResult.errors)
    } catch {
      setErrors([t('errors.parseFailed')])
    } finally {
      setIsParsing(false)
    }
  }

  async function handleImport() {
    if (products.length === 0 || isImporting || isParsing) {
      return
    }

    await onImport(products)

    setFileName('')
    setProducts([])
    setErrors([])
  }

  if (!isPageMode && !isOpen) {
    return null
  }

  return (
    <div className={isPageMode ? 'w-full' : 'fixed inset-0 z-50 flex items-center justify-center bg-[#2f0d25]/55 px-4 py-6 backdrop-blur-sm'}>
      <div className={`w-full max-w-3xl rounded-[30px] border border-[#f1cde2] bg-white p-6 ${isPageMode ? 'shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8' : 'shadow-[0_30px_80px_rgba(127,31,91,0.32)] sm:p-8'}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#a3477c]">{t('badge')}</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#3f1933]">{t('title')}</h2>
            <p className="mt-2 text-sm text-zinc-600">
              {t('subtitle')}
            </p>
          </div>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#e8c5db] text-[#7a3a61] transition hover:bg-[#fff2fa]"
              aria-label={t('closeAria')}
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>

        <div className="mt-6 rounded-[22px] border border-dashed border-[#d98cbc] bg-[#fff6fb] p-5">
          <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-[#7a3a61]">
            <UploadCloud className="h-5 w-5" />
            <span>{t('selectFile')}</span>
            <input
              type="file"
              accept=".xlsx,.xls,.csv,.json"
              onChange={(event) => {
                void handleFileChange(event)
              }}
              className="hidden"
            />
          </label>
          <button
            type="button"
            onClick={handleDownloadSample}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#d78ab9] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#8e3f6d] transition hover:bg-[#fff2fa]"
          >
            <Download className="h-4 w-4" />
            {t('downloadSample')}
          </button>
          {fileName ? <p className="mt-3 text-xs text-zinc-600">{t('selectedFile', { fileName })}</p> : null}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#f0d3e5] bg-[#fff6fb] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8d5574]">{t('stats.validProducts')}</p>
            <p className="mt-2 text-2xl font-extrabold text-[#4f2040]">{products.length}</p>
          </div>
          <div className="rounded-2xl border border-[#f0d3e5] bg-[#fff9fd] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8d5574]">{t('stats.validationErrors')}</p>
            <p className="mt-2 text-2xl font-extrabold text-[#4f2040]">{errors.length}</p>
          </div>
          <div className="rounded-2xl border border-[#f0d3e5] bg-[#fff8fc] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8d5574]">{t('stats.variantName')}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#4f2040]">{t('stats.variantNameValues')}</p>
          </div>
        </div>

        {visibleErrors.length > 0 ? (
          <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            <p className="font-semibold">{t('errors.fixBeforeImport')}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {visibleErrors.map((errorMessage) => (
                <li key={errorMessage}>{errorMessage}</li>
              ))}
            </ul>
            {errors.length > visibleErrors.length ? (
              <p className="mt-2 text-xs">{t('errors.moreErrors', { count: errors.length - visibleErrors.length })}</p>
            ) : null}
          </div>
        ) : null}

        <div className="mt-6 rounded-2xl border border-[#efe1d5] bg-[#fffdfa] p-4 text-xs leading-6 text-zinc-600">
          {t('columnsHint')}
        </div>

        <div className="mt-8 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={() => onClose?.()}
            disabled={isImporting || isParsing}
            className="rounded-full border border-[#e8c5db] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa] disabled:opacity-60"
          >
            {t('cancel')}
          </button>
          <button
            type="button"
            onClick={() => {
              void handleImport()
            }}
            disabled={isImporting || isParsing || products.length === 0 || errors.length > 0}
            className="inline-flex items-center gap-2 rounded-full bg-[#cc4f8f] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#ad3f78] disabled:opacity-60"
          >
            <FileSpreadsheet className="h-4 w-4" />
            {isImporting ? t('importing') : isParsing ? t('parsing') : t('importProducts')}
          </button>
        </div>
      </div>
    </div>
  )
}
