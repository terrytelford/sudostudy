import Link from 'next/link'

export default function YubiKeySquareAd() {
  return (
    <Link
      href="https://www.amazon.ca/stores/page/12C906A0-DCE4-44D9-B3C8-6072418D073D?_encoding=UTF8&pd_rd_plhdr=t&pd_rd_i=B07HBCTYP1&store_ref=SBV_A03446803C0Z2Y0CIRBQ5-A042588835L5YGIX5JXSR&lp_asins=B07HBCTYP1&pd_rd_w=P1jWc&content-id=amzn1.sym.4d83b9b7-b781-428b-aa24-c9ca5f477ffc%3Aamzn1.sym.4d83b9b7-b781-428b-aa24-c9ca5f477ffc&pf_rd_p=4d83b9b7-b781-428b-aa24-c9ca5f477ffc&pf_rd_r=X1MZTS19YSPH3BETVRG1&pd_rd_wg=LBxLf&pd_rd_r=c2c957ef-19c9-4e25-87c6-0afb891191a1&linkCode=ll2&tag=terrytelford-20&linkId=eb45cafed5ec0fe53d4fa3845d530c47&ref_=as_li_ss_tl"
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-full aspect-square overflow-hidden rounded-3xl border border-border bg-bg-secondary p-5 transition-colors hover:border-accent-green/40"
    >
      <div className="flex h-full flex-col justify-between gap-5">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-green/20 bg-accent-green/5 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-accent-green">
            YubiKey security
          </div>
          <div>
            <h3 className="font-mono text-lg font-semibold text-text-primary leading-tight">
              YubiKey Security Key
            </h3>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">
              Touch to verify. No app or phone required. Strong MFA for Security+ students.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="rounded-2xl border border-border bg-bg-primary/80 p-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Works with</p>
            <p className="mt-2 text-sm font-semibold text-text-primary">MFA apps</p>
          </div>
          <div className="rounded-2xl border border-border bg-bg-primary/80 p-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Compact</p>
            <p className="mt-2 text-sm font-semibold text-text-primary">Pocket-ready</p>
          </div>
        </div>

        <span className="inline-flex items-center justify-center rounded-2xl border border-accent-green bg-accent-green px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-bg-primary transition-colors hover:bg-accent-green/90">
          View on Amazon ↗
        </span>
      </div>
    </Link>
  )
}
