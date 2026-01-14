export type Language = "en" | "tr" | "zh" | "ar";

export const translations = {
  en: {
    hero: {
      title_start: "Trust Data,",
      title_end: "Not Hype",
      subtitle: "The first AI-powered leaderboard ranking crypto influencers by the accuracy of their financial predictions.",
      cta_primary: "Explore Leaderboard",
      cta_secondary: "How it Works",
      scroll: "Scroll",
      floating_card: {
        accuracy: "Accuracy",
        trust_score: "Trust Score",
        latest_signal: "Latest Signal:",
        signal_text: "Bitcoin to $100k"
      }
    },
    influencer: {
      trust_score: "Trust Score",
      accuracy: "Accuracy",
      signals: "Signals",
      follow: "Follow",
      following: "Following",
      financial_insights: "Financial Insights",
      all_activity: "All Activity",
      no_posts: "No posts found for this category.",
      back_to_leaderboard: "Back to Leaderboard",
      not_found_title: "404",
      not_found_desc: "Influencer not found in our database.",
      total_analyzed: "Total Analyzed",
      financial_count: "Financial Analysis",
      avg_performance: "Avg. Performance",
      posts_coming_soon: "Analysis and Tweets Coming Soon",
      followers_label: "Followers",
      following_label: "Following",
      rank_label: "Rank",
      ai_analysis_title: "AI Financial Analysis",
      performance_score: "Performance Score",
    },
    bento: {
      header: "From Chaos to",
      header_accent: "Clarity",
      subheader: "Social media is full of noise. We filter the hype to find the signal.",
      card_problem: {
        title: "The Problem",
        desc: "90% of financial \"advice\" on social media is noise, speculation, or direct manipulation."
      },
      card_solution: {
        title: "The Solution",
        desc: "Our AI pipelines analyze NLP sentiment, cross-reference historical data, and verify claims."
      },
      card_output: {
        title: "The Output",
        desc: "A definitive, data-backed Credibility Score for every major financial influencer."
      }
    },
    how_it_works: {
      title: "The",
      title_accent: "Zero-G",
      title_end: "Pipeline",
      subtitle: "How raw chaos becomes a verifiable trust score.",
      steps: [
        {
          title: "Multi-Source Data Ingestion",
          desc: "Our automated agents track thousands of posts from X (Twitter) in real-time, filtering noise from financial signals."
        },
        {
          title: "LLM-Powered Analysis",
          desc: "Our NLP engine detects financial intent, extracts ticker symbols (e.g., $BTC), and classifies sentiment."
        },
        {
          title: "Market Cross-Check",
          desc: "We don't guess. We compare the influencer's prediction against actual historical price actions from Binance & Yahoo Finance."
        },
        {
          title: "Dynamic Credibility Score",
          desc: "An evolving reputation score is calculated. High accuracy builds trust; speculation burns it."
        }
      ]
    },
    live_trends: {
      title: "Real-Time",
      title_accent: "Market Pulse",
      subtitle: "What the collective intelligence thinks right now."
    },
    tech: {
      caption: "Built on Modern Infrastructure"
    },
    team: {
      header: "Meet the Minds",
      subheader: "The engineers behind the algorithms.",
      role: "Co-Founder & Full Stack Developer",
      advisor_role: "Project Advisor & Visionary",
      university: "Istanbul Technical University"
    },
    metadata: {
      title: "Finfluencer - AI Supported Financial Analysis",
      focus_lost: "Miss you! 💔"
    },
    footer: {
      rights: "Graduation Project © 2025 Istanbul Technical University"
    },
    leaderboard: {
      title: "Top Financial Minds",
      subtitle: "We track, verify, and rank thousands of financial predictions every day. See who really knows the market.",
      search_placeholder: "Search influencers or assets (e.g. BTC)...",
      filters: {
        all: "All",
        twitter: "X (Twitter)",
        instagram: "Instagram",
        telegram: "Telegram",
        soon: "SOON"
      },
      columns: {
        rank: "Rank",
        influencer: "Influencer",
        score: "Score",
        trend: "7D Trend",
        asset: "Top Asset",
        prediction: "Prediction"
      },
      empty_state: {
        title: "No results found",
        desc: "Try adjusting your filters or search term."
      },
      pro: "PRO",
      last_days: "Last 7 Days",
      latest: "Latest",
      hit: "HIT ✅",
      miss: "MISS ❌"
    },
    auth: {
      join_beta: "Join Beta",
      welcome_back: "Welcome Back",
      start_tracking: "Start tracking the best predictors today.",
      sign_in_text: "Sign in to join the conversation",
      full_name: "Full Name",
      email: "Email Address",
      password: "Password",
      confirm_password: "Confirm Password",
      terms: "I agree to the Terms and Privacy Policy.",
      create_account: "Create Account",
      sign_in: "Sign In",
      continue_with: "Or continue with",
      already_have_account: "Already have an account?",
      dont_have_account: "Don't have an account?",
      register: "Register",
      processing: "Processing..."
    },
    error404: {
      title: "Lost in the Signal?",
      subtitle: "The page you are looking for has been swallowed by market volatility.",
      go_back: "Go Back Now",
      redirecting: "Redirecting in {seconds} seconds...",
    }
  },
  tr: {
    hero: {
      title_start: "Sadece Veriye,",
      title_end: "Güvenin",
      subtitle: "Kripto fenomenlerini finansal tahminlerinin doğruluğuna göre sıralayan ilk yapay zeka destekli liderlik tablosu.",
      cta_primary: "Sıralamayı Gör",
      cta_secondary: "Nasıl Çalışır",
      scroll: "Kaydır",
      floating_card: {
        accuracy: "Doğruluk",
        trust_score: "Güven Skoru",
        latest_signal: "Son Sinyal:",
        signal_text: "Bitcoin 100k$ Hedef",
      },
    },
    influencer: {
      trust_score: "Güven Skoru",
      accuracy: "Doğruluk",
      signals: "Sinyaller",
      follow: "Takip Et",
      following: "Takip Ediliyor",
      financial_insights: "Finansal Analizler",
      all_activity: "Tüm Aktivite",
      no_posts: "Bu kategoride gönderi bulunamadı.",
      back_to_leaderboard: "Sıralamaya Dön",
      not_found_title: "404",
      not_found_desc: "Fenomen veritabanımızda bulunamadı.",
      total_analyzed: "İncelenen Toplam",
      financial_count: "Finansal Analiz",
      avg_performance: "Ort. Performans",
      posts_coming_soon: "Analizler ve Tweetler Yakında",
      followers_label: "Takipçi",
      following_label: "Takip Edilen",
      rank_label: "Sıra",
      ai_analysis_title: "Yapay Zeka Finansal Analizi",
      performance_score: "Performans Skoru",
    },
    bento: {
      header: "Kaostan",
      header_accent: "Berraklığa",
      subheader: "Sosyal medya gürültü dolu. Sinyali bulmak için hype'ı filtreliyoruz.",
      card_problem: {
        title: "Problem",
        desc: "Sosyal medyadaki finansal \"tavsiyelerin\" %90'ı gürültü, spekülasyon veya doğrudan manipülasyondur."
      },
      card_solution: {
        title: "Çözüm",
        desc: "Yapay zeka boru hatlarımız NLP duyarlılığını analiz eder, geçmiş verilerle çapraz referanslar ve iddiaları doğrular."
      },
      card_output: {
        title: "Sonuç",
        desc: "Her büyük finansal influencer için kesin, veriye dayalı bir Güvenilirlik Skoru."
      }
    },
    how_it_works: {
      title: "",
      title_accent: "Sıfır Yerçekimi",
      title_end: "Boru Hattı",
      subtitle: "Ham kaos nasıl doğrulanabilir bir güven skoruna dönüşür.",
      steps: [
        {
          title: "Çok Kaynaklı Veri Alımı",
          desc: "Otomatik ajanlarımız X (Twitter) üzerindeki binlerce gönderiyi gerçek zamanlı izler, finansal sinyalleri gürültüden ayırır."
        },
        {
          title: "LLM Destekli Analiz",
          desc: "NLP motorumuz finansal niyeti tespit eder, borsa sembollerini (ör. $BTC) çıkarır ve duyarlılığı sınıflandırır."
        },
        {
          title: "Piyasa Çapraz Kontrolü",
          desc: "Tahmin etmiyoruz. Influencer tahminlerini Binance & Yahoo Finance'den alınan gerçek geçmiş fiyat hareketleriyle karşılaştırıyoruz."
        },
        {
          title: "Dinamik Güvenilirlik Skoru",
          desc: "Gelişen bir itibar skoru hesaplanır. Yüksek doğruluk güven inşa eder; spekülasyon onu yakar."
        }
      ]
    },
    live_trends: {
      title: "Gerçek Zamanlı",
      title_accent: "Piyasa Nabzı",
      subtitle: "Kolektif zekanın şu an ne düşündüğü."
    },
    tech: {
      caption: "Modern Altyapı Üzerine İnşa Edildi"
    },
    team: {
      header: "Ekiple Tanışın",
      subheader: "Algoritmaların arkasındaki mühendisler.",
      role: "Kurucu Ortak & Full Stack Geliştirici",
      advisor_role: "Proje Danışmanı & Yol Gösterici",
      university: "İstanbul Teknik Üniversitesi"
    },
    metadata: {
      title: "Finfluencer - Yapay Zeka Destekli Finansal Analiz",
      focus_lost: "Seni özledik! 💔"
    },
    footer: {
      rights: "Bitirme Projesi © 2025 İstanbul Teknik Üniversitesi"
    },
    leaderboard: {
      title: "En İyi Finansal Zihinler",
      subtitle: "Her gün binlerce finansal tahmini takip ediyor, doğruluyor ve sıralıyoruz. Piyasayı gerçekten kimin bildiğini görün.",
      search_placeholder: "Influencer veya varlık ara (örn. BTC)...",
      filters: {
        all: "Tümü",
        twitter: "X (Twitter)",
        instagram: "Instagram",
        telegram: "Telegram",
        soon: "YAKINDA"
      },
      columns: {
        rank: "Sıra",
        influencer: "Influencer",
        score: "Skor",
        trend: "7G Trend",
        asset: "En İyi Varlık",
        prediction: "Tahmin"
      },
      empty_state: {
        title: "Sonuç bulunamadı",
        desc: "Filtrelerinizi veya arama teriminizi değiştirmeyi deneyin."
      },
      pro: "PRO",
      last_days: "Son 7 Gün",
      latest: "Son",
      hit: "TUTTU ✅",
      miss: "TUTMADI ❌"
    },
    auth: {
      join_beta: "Beta'ya Katıl",
      welcome_back: "Tekrar Hoşgeldin",
      start_tracking: "En iyi tahmincileri bugün takip etmeye başla.",
      sign_in_text: "Sohbete katılmak için giriş yap",
      full_name: "Ad Soyad",
      email: "E-posta Adresi",
      password: "Şifre",
      confirm_password: "Şifreyi Onayla",
      terms: "Şartlar ve Gizlilik Politikasını kabul ediyorum.",
      create_account: "Hesap Oluştur",
      sign_in: "Giriş Yap",
      continue_with: "Veya şununla devam et",
      already_have_account: "Zaten hesabın var mı?",
      dont_have_account: "Hesabın yok mu?",
      register: "Kayıt Ol",
      processing: "İşleniyor..."
    },
    error404: {
      title: "Sinyal Mi Kayboldu?",
      subtitle: "Aradığınız sayfa piyasa oynaklığına kurban gitmiş olabilir.",
      go_back: "Hemen Geri Dön",
      redirecting: "{seconds} saniye içinde yönlendiriliyorsunuz...",
    }
  },
  zh: {
        hero: {
            title_start: "相信数据，",
            title_end: "拒绝炒作",
            subtitle: "首个根据金融预测准确性对加密货币影响者进行排名的 AI 驱动排行榜。",
            cta_primary: "探索排行榜",
            cta_secondary: "工作原理",
            scroll: "滚动",
            floating_card: {
                accuracy: "准确率",
                trust_score: "信任评分",
                latest_signal: "最新信号：",
                signal_text: "比特币目标 $100k",
            },
        },
        influencer: {
            trust_score: "信任评分",
            accuracy: "准确率",
            signals: "信号",
            follow: "关注",
            following: "已关注",
            financial_insights: "金融洞察",
            all_activity: "所有活动",
            no_posts: "没有找到此类别的帖子。",
            back_to_leaderboard: "返回排行榜",
            not_found_title: "404",
            not_found_desc: "未在我们的数据库中找到该影响者。",
            total_analyzed: "总分析量",
            financial_count: "金融分析",
            avg_performance: "平均表现",
            posts_coming_soon: "分析和推文即將推出",
            followers_label: "关注者",
            following_label: "关注中",
            rank_label: "排名",
            ai_analysis_title: "人工智能金融分析",
            performance_score: "表现评分",
        },
    bento: {
      header: "从混乱到",
      header_accent: "清晰",
      subheader: "社交媒体充满了噪音。我们过滤炒作以找到信号。",
      card_problem: {
        title: "问题",
        desc: "社交媒体上 90% 的金融“建议”都是噪音、投机或直接操纵。"
      },
      card_solution: {
        title: "解决方案",
        desc: "我们的人工智能管道分析 NLP 情绪，交叉引用历史数据，并验证声明。"
      },
      card_output: {
        title: "输出",
        desc: "为每个主要的金融影响者提供明确的、数据支持的信誉评分。"
      }
    },
    how_it_works: {
      title: "",
      title_accent: "零重力",
      title_end: "管道",
      subtitle: "原始混乱如何转化为可验证的信任评分。",
      steps: [
        {
          title: "多源数据摄取",
          desc: "我们的自动化代理实时跟踪 X (Twitter) 上的数千个帖子，从金融信号中过滤噪音。"
        },
        {
          title: "LLM 驱动的分析",
          desc: "我们的 NLP 引擎检测金融意图，提取股票代码（例如 $BTC），并对情绪进行分类。"
        },
        {
          title: "市场交叉核对",
          desc: "我们不猜测。我们将影响者的预测与来自 Binance 和 Yahoo Finance 的实际历史价格走势进行比较。"
        },
        {
          title: "动态信誉评分",
          desc: "计算不断发展的声誉评分。高准确性建立信任；投机则会破坏它。"
        }
      ]
    },
    live_trends: {
      title: "实时",
      title_accent: "市场脉搏",
      subtitle: "集体智慧现在的想法。"
    },
    tech: {
      caption: "建立在现代基础设施之上"
    },
    team: {
      header: "遇见团队",
      subheader: "算法背后的工程师。",
      role: "联合创始人 & 全栈开发者",
      advisor_role: "项目顾问 & 远见者",
      university: "伊斯坦布尔技术大学"
    },
    metadata: {
      title: "Finfluencer - 人工智能支持的金融分析",
      focus_lost: "想念你！💔"
    },
    footer: {
      rights: "毕业设计 © 2025 伊斯坦布尔技术大学"
    },
    leaderboard: {
      title: "顶级金融头脑",
      subtitle: "我们每天追踪、验证和排名数千个金融预测。看看谁真正了解市场。",
      search_placeholder: "搜索影响者或资产（例如 BTC）...",
      filters: {
        all: "全部",
        twitter: "X (推特)",
        instagram: "Instagram",
        telegram: "电报",
        soon: "即将来临"
      },
      columns: {
        rank: "排名",
        influencer: "影响者",
        score: "评分",
        trend: "7天趋势",
        asset: "顶级资产",
        prediction: "预测"
      },
      empty_state: {
        title: "未找到结果",
        desc: "尝试调整您的过滤器或搜索词。"
      },
      pro: "专业",
      last_days: "过去7天",
      latest: "最新",
      hit: "命中 ✅",
      miss: "未中 ❌"
    },
    auth: {
      join_beta: "加入测试版",
      welcome_back: "欢迎回来",
      start_tracking: "立即开始追踪最佳预测者。",
      sign_in_text: "登录以加入对话",
      full_name: "全名",
      email: "电子邮件地址",
      password: "密码",
      confirm_password: "确认密码",
      terms: "我同意条款和隐私政策。",
      create_account: "创建账户",
      sign_in: "登录",
      continue_with: "或继续使用",
      already_have_account: "已经有账户了吗？",
      dont_have_account: "还没有账户？",
      register: "注册",
      processing: "处理中..."
    },
    error404: {
      title: "信号丢失？",
      subtitle: "您正在寻找的页面已被市场波动吞噬。",
      go_back: "现在返回",
      redirecting: "将在 {seconds} 秒内重定向...",
    }
  },
  ar: {
    hero: {
      title_start: "ثق بالبيانات،",
      title_end: "لا بالضجيج.",
      subtitle: "نحن نتتبع آلاف التوقعات من X و Instagram و Telegram باستخدام الذكاء الاصطناعي للكشف عمن يعرف السوق حقًا.",
      cta_primary: "استكشف لوحة الصدارة",
      cta_secondary: "كيف يعمل",
      scroll: "تمرير",
      floating_card: {
        accuracy: "دقة التنبؤ",
        trust_score: "درجة الثقة",
        latest_signal: "أحدث إشارة:",
        signal_text: "البتكوين ستتجاوز 100 ألف دولار بحلول الربع الرابع"
      }
    },
    influencer: {
      trust_score: "درجة الثقة",
      accuracy: "الدقة",
      signals: "إشارات",
      follow: "متابعة",
      following: "تتابع",
      financial_insights: "رؤى مالية",
      all_activity: "كل النشاط",
      no_posts: "لا توجد منشورات في هذه الفئة.",
      back_to_leaderboard: "العودة إلى لوحة الصدارة",
      not_found_title: "404",
      not_found_desc: "لم يتم العثور على المؤثر في قاعدتنا.",
      total_analyzed: "إجمالي التحليلات",
      financial_count: "التحليل المالي",
      avg_performance: "متوسط الأداء",
      posts_coming_soon: "التحليلات والتغريدات قريباً",
      followers_label: "متابع",
      following_label: "يتابع",
      rank_label: "الترتيب",
      ai_analysis_title: "تحليل مالي بالذكاء الاصطناعي",
      performance_score: "درجة الأداء",
    },
    bento: {
      header: "من الفوضى إلى",
      header_accent: "الوضوح",
      subheader: "وسائل التواصل الاجتماعي مليئة بالضجيج. نقوم بتصفية المبالغات للعثور على الإشارة.",
      card_problem: {
        title: "المشكلة",
        desc: "90٪ من \"النصائح\" المالية على وسائل التواصل الاجتماعي هي ضجيج أو مضاربة أو تلاعب مباشر."
      },
      card_solution: {
        title: "الحل",
        desc: "تحلل خطوط أنابيب الذكاء الاصطناعي لدينا مشاعر البرمجة اللغوية العصبية، وتقوم بمراجعة البيانات التاريخية، والتحقق من الادعاءات."
      },
      card_output: {
        title: "النتائج",
        desc: "درجة مصداقية محددة ومدعومة بالبيانات لكل مؤثر مالي رئيسي."
      }
    },
    how_it_works: {
      title: "",
      title_accent: "خط أنابيب",
      title_end: "انعدام الجاذبية",
      subtitle: "كيف تتحول الفوضى الخام إلى درجة ثقة يمكن التحقق منها.",
      steps: [
        {
          title: "استيعاب البيانات متعدد المصادر",
          desc: "تتتبع وكلاؤنا الآليون آلاف المنشورات من X (Twitter) في الوقت الفعلي، وتصفية الضوضاء من الإشارات المالية."
        },
        {
          title: "تحليل مدعوم بـ LLM",
          desc: "يكتشف محرك البرمجة اللغوية العصبية لدينا النية المالية، ويستخرج رموز الأسهم (مثل $BTC)، ويصنف المشاعر."
        },
        {
          title: "فحص السوق المتبادل",
          desc: "نحن لا نخمن. نقارن توقعات المؤثر بتحركات الأسعار التاريخية الفعلية من Binance و Yahoo Finance."
        },
        {
          title: "درجة المصداقية الديناميكية",
          desc: "يتم حساب درجة سمعة متطورة. الدقة العالية تبني الثقة؛ والمضاربة تحرقها."
        }
      ]
    },
    live_trends: {
      title: "نبض السوق",
      title_accent: "في الوقت الفعلي",
      subtitle: "ما يفكر فيه الذكاء الجماعي الآن."
    },
    tech: {
      caption: "مبني على بنية تحتية حديثة"
    },
    team: {
      header: "قابل الفريق",
      subheader: "المهندسون وراء الخوارزميات.",
      role: "مؤسس مشارك & مطور شامل",
      advisor_role: "مستشار المشروع والرؤي",
      university: "جامعة إسطنبول التقنية"
    },
    metadata: {
      title: "Finfluencer - تحليل مالي مدعوم بالذكاء الاصطناعي",
      focus_lost: "اشتقنا لك! 💔"
    },
    footer: {
      rights: "مشروع التخرج © 2025 جامعة إسطنبول التقنية"
    },
    leaderboard: {
      title: "أفضل العقول المالية",
      subtitle: "نحن نتتبع، نتحقق، ونصنف آلاف التوقعات المالية كل يوم. انظر من يعرف السوق حقًا.",
      search_placeholder: "ابحث عن المؤثرين أو الأصول (مثل BTC)...",
      filters: {
        all: "الكل",
        twitter: "X (Twitter)",
        instagram: "Instagram",
        telegram: "Telegram",
        soon: "قريبًا"
      },
      columns: {
        rank: "الرتبة",
        influencer: "المؤثر",
        score: "النتيجة",
        trend: "اتجاه 7 أيام",
        asset: "أفضل أصل",
        prediction: "تنبؤ"
      },
      empty_state: {
        title: "لا توجد نتائج",
        desc: "حاول تعديل الفلاتر أو مصطلحات البحث."
      },
      pro: "محترف",
      last_days: "آخر 7 أيام",
      latest: "الأحدث",
      hit: "إصابة ✅",
      miss: "فشل ❌"
    },
    auth: {
      join_beta: "انضم إلى النسخة التجريبية",
      welcome_back: "مرحبًا بعودتك",
      start_tracking: "ابدأ في تتبع أفضل المتنبئين اليوم.",
      sign_in_text: "سجل الدخول للانضمام إلى المحادثة",
      full_name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      confirm_password: "تأكيد كلمة المرور",
      terms: "أوافق على الشروط وسياسة الخصوصية.",
      create_account: "إنشاء حساب",
      sign_in: "تسجيل الدخول",
      continue_with: "أو الاستمرار مع",
      already_have_account: "هل لديك حساب بالفعل؟",
      dont_have_account: "ليس لديك حساب؟",
      register: "تسجيل",
      processing: "جاري المعالجة..."
    },
    error404: {
      title: "هل فقدت الإشارة؟",
      subtitle: "الصفحة التي تبحث عنها ابتلعها تقلب السوق.",
      go_back: "العودة الآن",
      redirecting: "سيتم إعادة توجيهك خلال {seconds} ثوانٍ...",
    }
  }
};
