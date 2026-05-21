import Link from 'next/link'

type ResourceTag = 'Book' | 'Course' | 'Exam Voucher' | 'Hardware'

interface Resource {
  tag: ResourceTag
  title: string
  author: string
  description: string
  price: string
  cta: string
  href: string
}

const TAG_STYLES: Record<ResourceTag, string> = {
  'Book':         'text-accent-green border-accent-green/30 bg-accent-green/5',
  'Course':       'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/5',
  'Exam Voucher': 'text-warning border-warning/30 bg-warning/5',
  'Hardware':     'text-text-muted border-border bg-transparent',
}

// Replace href values with your affiliate links after signing up:
//   Amazon Associates:  https://affiliate-program.amazon.com
//   Udemy:              https://www.udemy.com/affiliate
//   CompTIA vouchers:   https://www.cj.com (search "CompTIA")
const RESOURCES: Resource[] = [
  {
    tag: 'Book',
    title: 'CompTIA Security+ SY0-701 Study Guide with Practice Tests',
    author: 'Mike Chapple & David Seidl',
    description: 'The Sybex official guide. Covers all five domains with practice questions and a full exam at the end.',
    price: '~$35',
    cta: 'View on Amazon',
    href: 'https://www.amazon.ca/CompTIA-Security-Certification-Kit-SY0-701/dp/1394211449?crid=2TYF9NXWK9X13&dib=eyJ2IjoiMSJ9.cEgxVQi1TTld0XQJF2c_9uyDJUfY1yN_6Fms9hfCDLsZLj7MP2ngda8u5i1jHH9DIYbk8r6Z7KAvY5-nrso7t6XsqK-DsbcbWyDOsCpxx3ffmctc1E4fFRUM9zVu-xIwVoJXi2ngId_Aerjl_JYdTnhK81aJ6ZdjDYjpnUak7BnDuFgS5UwFrjTHO83khqhHsxGoHebeXCMoc1Yz7W3tQf89lRzBWgejXvpCN8JllKj3qQV_Ir9-L5FFLi05DuM1AeD5f7pwIYxb7rMk-oYOx8qd_CBMyEjzVjjOqVwsRyI.bZvZv1wszE6BTWnuPPfpbcXzKq9dPEuXXdzjS37qA6k&dib_tag=se&keywords=comptia+security+%2B&qid=1779378280&sprefix=comptia+security+%2B%2Caps%2C114&sr=8-1&linkCode=ll2&tag=terrytelford-20&linkId=3236be1ba29821a7f8b51d305bde1f39&ref_=as_li_ss_tl',  // replace with your affiliate link
  },
  {
    tag: 'Book',
    title: 'CompTIA Security+ Practice Tests',
    author: 'Mike Chapple',
    description: '1,000+ practice questions organized by domain. Great companion to any study guide or course.',
    price: '~$28',
    cta: 'View on Amazon',
    href: 'https://www.amazon.ca/Security-Practice-Tests-SY0-701-CertMike/dp/B0DHC632CY?dib=eyJ2IjoiMSJ9.cEgxVQi1TTld0XQJF2c_9uxDIeoYZB7MenxI6RkpIrXfIs1olnSGbRmBs9D-P8JrIYbk8r6Z7KAvY5-nrso7t6XsqK-DsbcbWyDOsCpxx3fzcFn61aHXNp6iA_k09QVck_IQllmBvJ6zztn_-vRYQVsVqmA6Pj2462XSZ9rx0UKeOZJjD1NK8BNo3xpHAHwt5ZRG70AFhQ7oRdJQOXbcBwC-9CbQY7iqzd3zThXI28o9mECTcpQEYX1IrottiyFYubG7d0uPHnb4qzDxH-fpY6lJFLP_Uapt6x6-8HAls4Q.Q5mYzhrG6civTGe_VmnUIGKUh4H6Bl-8NXDLeoj6W8w&dib_tag=se&keywords=comptia+security+%2B&qid=1779378494&sr=8-38&linkCode=ll2&tag=terrytelford-20&linkId=76cd05d1fa075b7084f11cda24e65b2b&ref_=as_li_ss_tl',  // replace with your affiliate link
  },
  {
    tag: 'Hardware',
    title: "YubiKey Security Key",
    author: 'Yubico',
    description: 'No more reaching for your phone to open an app or type a code - simply touch the YubiKey to verify and you're in. Works with all major password managers and MFA apps.',
    price: '$41 - $137',
    cta: 'View on Amazon',
    href: 'https://www.amazon.ca/stores/page/12C906A0-DCE4-44D9-B3C8-6072418D073D?_encoding=UTF8&pd_rd_plhdr=t&pd_rd_i=B07HBCTYP1&store_ref=SBV_A03446803C0Z2Y0CIRBQ5-A042588835L5YGIX5JXSR&lp_asins=B07HBCTYP1&pd_rd_w=P1jWc&content-id=amzn1.sym.4d83b9b7-b781-428b-aa24-c9ca5f477ffc%3Aamzn1.sym.4d83b9b7-b781-428b-aa24-c9ca5f477ffc&pf_rd_p=4d83b9b7-b781-428b-aa24-c9ca5f477ffc&pf_rd_r=X1MZTS19YSPH3BETVRG1&pd_rd_wg=LBxLf&pd_rd_r=c2c957ef-19c9-4e25-87c6-0afb891191a1&linkCode=ll2&tag=terrytelford-20&linkId=eb45cafed5ec0fe53d4fa3845d530c47&ref_=as_li_ss_tl',
  },
  {
    tag: 'Book',
    title: 'Hack the Cybersecurity Interview',
    author: 'Christophe Foulon, Ken Underhill, Tia Hopkins',
    description: 'Ace your cybersecurity interview by unlocking expert strategies, technical insights, and career-boosting tips for securing top roles in the industry',
    price: '$47',
    cta: 'View on Amazon',
    href: 'https://www.amazon.ca/Hack-Cybersecurity-Interview-Interviews-Confidence/dp/1835461298?crid=3EDMRDRY2WSUS&dib=eyJ2IjoiMSJ9.4eWBrWI0Wq9TgdfYsTaiNLG8q899nssuIMw9H9Fo5L1tMGPdUXki1gHcfn4M7AcMh9RiXWHXeuqnpPBiegm38IF8TjGyZBgvIolhyE5JKp4q_b2d1RVQvoS4KxinPW_A8SEo-MQcZrmCwcQQqnEfmFBkMV6X3p_sETKOc-6CWQeXMiZDdwvLO2CfDc1TepvfwwvJs11Cw312i7FPwCr3TwlG2kznmEA-kNGGL0yQzXgGtoc6Rd0zVTnvv0T8cAOngE0fomackbOom9FA0lBba00jKr6_zxUTjtutP-OV_xs.CYidsA_QySWu0cHHZLCFHksMwznalJEMnrsJCeMontY&dib_tag=se&keywords=cyber+security&qid=1779383921&sprefix=cyber+security%2Caps%2C193&sr=8-13-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9tdGY&psc=1&linkCode=ll2&tag=terrytelford-20&linkId=17781f33a556343d18c84457ec8745f7&ref_=as_li_ss_tl',  // replace with your Udemy affiliate link
  },
  {
    tag: 'Exam Voucher',
    title: 'CompTIA Security+ Exam Voucher',
    author: 'CompTIA',
    description: 'Official exam voucher. Buy when you are ready - valid for 12 months from purchase.',
    price: '~$392',
    cta: 'Buy Voucher',
    href: 'https://www.comptia.org/certifications/security',  // replace with your CJ affiliate link
  },
]

export default function RecommendedResources() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-mono text-text-muted text-xs uppercase tracking-widest">
          Recommended resources
        </h2>
        <p className="text-text-muted text-sm">
          Handpicked books, courses, and tools used by Security+ students.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {RESOURCES.map((r) => (
          <Link
            key={r.title}
            href={r.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-3 rounded-lg border border-border bg-bg-secondary p-5 hover:border-accent-green/30 transition-colors group"
          >
            <div className="flex items-center justify-between gap-2">
              <span className={`font-mono text-xs border px-1.5 py-0.5 rounded ${TAG_STYLES[r.tag]}`}>
                {r.tag}
              </span>
              <span className="font-mono text-xs text-text-muted">{r.price}</span>
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <h3 className="font-mono font-semibold text-text-primary text-sm leading-snug">
                {r.title}
              </h3>
              <p className="font-mono text-xs text-text-muted">{r.author}</p>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">{r.description}</p>
            <span className="font-mono text-xs text-accent-green group-hover:underline">
              {r.cta} ↗
            </span>
          </Link>
        ))}
      </div>

      <p className="font-mono text-xs text-text-muted">
        * Some links are affiliate links. We may earn a small commission at no extra cost to you.
      </p>
    </section>
  )
}
