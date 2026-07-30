'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from '@/lib/router'
import { toast } from 'react-hot-toast'
import AdminProductBulkImportModal from '../components/admin/AdminProductBulkImportModal'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { bulkCreateProducts, type BulkCreateProductPayload } from '../services/productService'

export default function AdminProductsImportPage() {
  const { t } = useTranslation('common', { keyPrefix: 'admin.productsImport' })
  const navigate = useNavigate()
  const [isImporting, setIsImporting] = useState(false)

  async function handleImport(products: BulkCreateProductPayload[]) {
    if (products.length === 0) {
      toast.error(t('noValidProducts'))
      return
    }

    setIsImporting(true)

    try {
      await bulkCreateProducts({ products })
      toast.success(t('importSuccess', { count: products.length }))
      navigate('/admin/products')
    } catch {
      toast.error(t('importFailed'))
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff7fc_0%,#fffdfb_36%,#ffffff_100%)] text-[#2b1323] font-poppins">
      <Header />
      <main>
        <div className="mx-auto max-w-[92rem] px-4 py-8 sm:px-6 lg:px-8">
          <div className="border border-[#f0cbe1] bg-[linear-gradient(135deg,#7e2f63_0%,#b94886_55%,#dc74ad_100%)] px-6 py-8 text-white shadow-[0_30px_80px_rgba(153,45,106,0.28)] sm:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#f6d6ea]">{t('badge')}</p>
            <h1 className="mt-4 font-serif text-3xl text-[#fff6fd] sm:text-4xl">{t('title')}</h1>
            <p className="mt-3 max-w-3xl text-sm text-[#f7deee] sm:text-base">
              {t('subtitle')}
            </p>
          </div>

          <div className="mt-8">
            <AdminProductBulkImportModal
              isPageMode
              isImporting={isImporting}
              onClose={() => navigate('/admin/products')}
              onImport={handleImport}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
