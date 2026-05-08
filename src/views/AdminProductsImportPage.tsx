'use client'

import { useState } from 'react'
import { useNavigate } from '@/lib/router'
import { toast } from 'react-hot-toast'
import AdminProductBulkImportModal from '../components/admin/AdminProductBulkImportModal'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { bulkCreateProducts, type BulkCreateProductPayload } from '../services/productService'

export default function AdminProductsImportPage() {
  const navigate = useNavigate()
  const [isImporting, setIsImporting] = useState(false)

  async function handleImport(products: BulkCreateProductPayload[]) {
    if (products.length === 0) {
      toast.error('No valid products found in selected file.')
      return
    }

    setIsImporting(true)

    try {
      await bulkCreateProducts({ products })
      toast.success(`${products.length} product${products.length === 1 ? '' : 's'} imported successfully.`)
      navigate('/admin/products')
    } catch {
      toast.error('Unable to bulk import products right now.')
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff7fc_0%,#fffdfb_36%,#ffffff_100%)] text-[#2b1323] font-parsi">
      <Header />
      <main>
        <div className="mx-auto max-w-[92rem] px-4 py-8 sm:px-6 lg:px-8">
          <div className="border border-[#f0cbe1] bg-[linear-gradient(135deg,#7e2f63_0%,#b94886_55%,#dc74ad_100%)] px-6 py-8 text-white shadow-[0_30px_80px_rgba(153,45,106,0.28)] sm:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#f6d6ea]">Admin Panel</p>
            <h1 className="mt-4 font-serif text-3xl text-[#fff6fd] sm:text-4xl">Bulk Product Import</h1>
            <p className="mt-3 max-w-3xl text-sm text-[#f7deee] sm:text-base">
              Upload your Excel/CSV/JSON file, validate variant_name values, and import products in bulk.
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
