import { useMemo } from 'react'
import { generalApplicationNote, jobListings, type JobListing } from '@/data/careers'
import { industries } from '@/data/industries'
import { useI18n } from '@/i18n'
import { localizeItems, type Overlay } from '@/i18n/localize'
import type { Industry } from '@/types'

type JobText =
  | 'title'
  | 'employmentType'
  | 'workArrangement'
  | 'experience'
  | 'summary'
  | 'responsibilities'
  | 'requiredSkills'
  | 'preferredQualifications'
  | 'applicationNote'

/** Arabic job listings. Mirrors src/data/careers.ts. */
const jobsAr: Overlay<JobListing, JobText> = {
  'full-stack-developer-mern': {
    title: 'مطوّر برمجيات متكامل — MERN Stack',
    employmentType: 'دوام كامل',
    workArrangement: 'عن بُعد',
    experience: '5 سنوات أو أكثر',
    summary:
      'تبحث Kavelis عن مطوّر برمجيات متكامل ذي خبرة لبناء تطبيقات الويب وأدوات الأتمتة ومنصات التجارة الإلكترونية وصيانتها لعملاء دوليين. ستعمل عبر دورة الحياة الكاملة — من المتطلبات والبنية حتى التسليم والدعم.',
    responsibilities: [
      'بناء تطبيقات ويب متكاملة وصيانتها باستخدام MongoDB وExpress وReact وNode.js',
      'تحويل متطلبات الأعمال إلى تصاميم تقنية ونماذج بيانات وعقود API',
      'تطوير ودمج واجهات REST API والخدمات الخارجية ومزوّدي الدفع وسير عمل الأتمتة',
      'كتابة شيفرة واضحة ومختبرة وقابلة للصيانة ومراجعة عمل المطوّرين الآخرين',
      'التعاون مباشرةً مع العملاء وأصحاب المصلحة بشأن النطاق والتقدّم والمفاضلات',
      'تتبّع الأخطاء ومراقبة التطبيقات العاملة وتحسينها',
    ],
    requiredSkills: [
      '5 سنوات أو أكثر من الخبرة المهنية في التطوير المتكامل',
      'معرفة عملية قوية بـ MERN Stack (MongoDB وExpress وReact وNode.js)',
      'TypeScript أو JavaScript ES6+ في الواجهة الأمامية والخلفية',
      'خبرة في تصميم قواعد البيانات العلائقية أو المستندية ونماذج البيانات',
      'خبرة في تصميم REST API والمصادقة والتكاملات الخارجية',
      'الارتياح لاستخدام Git ومراجعة الشيفرة وسير عمل التسليم التعاوني',
      'إنجليزية واضحة كتابةً وتحدّثًا للتواصل مع العملاء',
    ],
    preferredQualifications: [
      'خبرة في منصات التجارة الإلكترونية أو تكاملات الدفع',
      'خبرة في ذكاء الأعمال أو التقارير أو مسارات البيانات',
      'إلمام بالنشر السحابي وCI/CD والمراقبة',
      'خبرة في تحديد نطاق مشاريع العملاء وتقديرها',
    ],
    applicationNote:
      'تُراجَع الطلبات باستمرار. أرفق سيرتك الذاتية، وروابط GitHub أو معرض أعمال أو LinkedIn إن وُجدت.',
  },
}

const generalNoteAr = 'لا تجد الدور المناسب؟ إذا كنت تبني برمجيات موثوقة وتتواصل بوضوح، فما زلنا نرغب في السماع منك.'

const industriesAr: Overlay<Industry, 'title' | 'description' | 'needs' | 'approaches'> = {
  'startups-saas': {
    title: 'الشركات الناشئة وشركات SaaS',
    description: 'مؤسسون وفرق منتجات يحتاجون إلى شريك هندسي موثوق لإطلاق نسخة أولية، أو تقوية منتج في بداياته، أو توسيع خارطة الطريق دون بناء فريق داخلي كبير أولًا.',
    needs: ['تسليم سريع على مراحل نحو منتج قابل للإطلاق', 'بنية قادرة على النمو بعد العملاء الأوائل', 'إرشاد واضح للمفاضلة بين النطاق والتكلفة والوقت'],
    approaches: ['جولة استكشاف يليها بناء على مراحل', 'أسس الاشتراك والمصادقة والفوترة من اليوم الأول', 'توثيق للتسليم ليتولّى فريق داخلي العمل عند الجاهزية'],
  },
  'ecommerce-businesses': {
    title: 'شركات التجارة الإلكترونية',
    description: 'تجّار وعلامات عبر الإنترنت يحتاجون إلى متاجر ومنصات تجارة وتكاملات خلفية تعمل تحت ضغط تشغيلي حقيقي.',
    needs: ['تجارب تسوّق سريعة وسهلة الوصول ترفع التحويل', 'روابط موثوقة بين المتجر والمدفوعات والمخزون والتوصيل', 'تطوير مستمر بعد الإطلاق — عروض وصفحات هبوط وتحسين التحويل'],
    approaches: ['بناء متاجر بتقنيات حديثة أو بنى مفصولة الواجهة', 'لوحات تشغيلية للطلبات والكتالوج والمرتجعات', 'جولات تحسين بعد الإطلاق تركّز على العوائق القابلة للقياس'],
  },
  'smes-growing-enterprises': {
    title: 'المؤسسات الصغيرة والمتوسطة النامية',
    description: 'شركات قائمة تستثمر في الأدوات الرقمية لتنظيم العمليات، وخدمة العملاء عبر الإنترنت، وتقليل الاعتماد على الإجراءات اليدوية.',
    needs: ['برمجيات مخصّصة مبنية حول العمليات الحالية', 'تكاملات مع الأنظمة القائمة', 'شريك يشرح القرارات التقنية بلغة الأعمال'],
    approaches: ['رسم الإجراءات قبل كتابة أي شيفرة', 'إطلاق على مراحل يقلّل تعطيل العمليات اليومية', 'تدريب وتوثيق للفرق الداخلية'],
  },
  'operations-heavy-businesses': {
    title: 'الشركات ذات العمليات الكثيفة',
    description: 'مؤسسات يمكن أن تستفيد فيها الجدولة أو التوزيع أو العمل الميداني أو الامتثال أو العمليات الخلفية كثيفة الحجم من الأتمتة والأدوات الداخلية.',
    needs: ['تسليم يدوي وإعادة إدخال أقل للبيانات', 'رؤية فورية للعمل قيد التنفيذ', 'قابلية التدقيق والضوابط للعمليات المنظّمة أو متعددة الخطوات'],
    approaches: ['أدوات داخلية ومحرّكات سير عمل مصمّمة للعملية', 'معالجة الاستثناءات مصمّمة مع من يديرون العملية', 'مراقبة وتنبيهات لاكتشاف الأعطال قبل العملاء'],
  },
}

/** Job listings and the general application note in the active language. */
export function useCareers() {
  const { lang } = useI18n()
  return useMemo(
    () => ({
      jobs: localizeItems(jobListings, jobsAr, lang),
      generalNote: lang === 'ar' ? generalNoteAr : generalApplicationNote,
    }),
    [lang],
  )
}

/** Industry profiles in the active language. */
export function useIndustries(): Industry[] {
  const { lang } = useI18n()
  return useMemo(() => localizeItems(industries, industriesAr, lang), [lang])
}
