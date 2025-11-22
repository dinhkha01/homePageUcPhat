import { useState, useEffect, useRef } from 'react'
import './App.css'
// import logoImage from '/image.png'

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredPanel, setHoveredPanel] = useState<number | null>(null)
  const [newsPage, setNewsPage] = useState(0)
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hoveredOffice, setHoveredOffice] = useState<string | null>(null)
  
  // Partners carousel drag functionality
  const partnersCarouselRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  // Hình ảnh cho các service panels - có thể thay thế bằng đường dẫn hình ảnh thật
  const serviceImages = [
    'https://upgroup.com.vn/vnt_upload/service/10_2022/img1.jpg', // Thiết kế kiến trúc & kết cấu
    'https://upgroup.com.vn/vnt_upload/service/10_2022/img4.jpg', // Thi công nhà xưởng
    'https://upgroup.com.vn/vnt_upload/service/10_2022/lv3.jpg', // Phát triển đất đai
    'https://upgroup.com.vn/vnt_upload/service/10_2022/img2.jpg', // Quản lý xây dựng
    'https://upgroup.com.vn/vnt_upload/service/10_2022/lv5.jpg', // MEP & Nội thất
  ]

  // Dự án tiêu biểu
  const projects = [
    { id: 1, image: 'https://upgroup.com.vn/vnt_upload/project/chinh_tan/6_700x400.jpg', title: 'NHÀ XƯỞNG' },
    { id: 2, image: 'https://upgroup.com.vn/vnt_upload/project/SLP_Binh_Minh/7.png', title: 'LOGISTICS' },
    { id: 3, image: 'https://upgroup.com.vn/vnt_upload/project/hai_my/1.jpg', title: 'KÝ TÚC XÁ' },
    { id: 4, image: 'https://upgroup.com.vn/vnt_upload/project/10_2022/da4.jpg', title: 'CAO ỐC' },
    { id: 5, image: 'https://upgroup.com.vn/vnt_upload/project/10_2022/da5.jpg', title: 'CƠ ĐIỆN' },
    { id: 6, image: 'https://upgroup.com.vn/vnt_upload/project/10_2022/da6.jpg', title: 'PHÒNG CHÁY CHỮA CHÁY' },
  ]

  // Tin tức tiêu điểm (6 thẻ nổi bật)
  const featuredNews = [
    { id: 1, image: 'https://upgroup.com.vn/vnt_upload/news/Tin_cong_ty/le_ban_giao_SLP_Long_Hau_GD1/4.jpg', date: '13/01/2023', title: 'LỄ BÀN GIAO DỰ ÁN SLP LONG HẬU (GIAI ĐOẠN 1)' },
    { id: 2, image: 'https://upgroup.com.vn/vnt_upload/news/CSR/Tay_Giang_Quang_Nam/12_1280.png', date: '23/11/2022', title: 'ỨC PHÁT HỖ TRỢ NHU YẾU PHẨM CHO NGƯỜI DÂN Ở THÔN ATU' },
    { id: 3, image: 'https://upgroup.com.vn/vnt_upload/news/CSR/1.jpg', date: '10/02/2021', title: 'ỨC PHÁT BÀN GIAO NHÀ NHÂN ÁI CHO HỘ NGHÈO' },
    { id: 4, image: 'https://upgroup.com.vn/vnt_upload/news/CSR/chua_an_lac/11.png', date: '30/11/2022', title: 'ỨC PHÁT ĐÓNG GÓP CÁC NHU YẾU PHẨM CHO CHÙA AN LẠC' },
    { id: 5, image: 'https://upgroup.com.vn/vnt_upload/news/Tin_cong_ty/khoi_cong_advanced_multitech_2/9.png', date: '28/06/2021', title: 'LỄ KHỞI CÔNG CÔNG TRÌNH ADVANCED MULTITECH 2' },
    { id: 6, image: 'https://upgroup.com.vn/vnt_upload/news/Team_building/2019/SinhTourist_CTY_UC_PHAT_TeamBuilding_GalaDinner_NHA_TRANG_2019_FULL_Moment.jpg', date: '30/11/2019', title: 'UC PHAT TEAMBUILDING GALADINNER NHA TRANG 2019' },
  ]

  // Tin tức khác (12+ thẻ)
  const otherNews = [
    { id: 7, image: 'https://upgroup.com.vn/vnt_upload/news/10_2022/slider.jpg', date: '15/03/2023', title: 'Dự án xây dựng nhà máy mới tại Long Thành' },
    { id: 8, image: 'https://upgroup.com.vn/vnt_upload/news/10_2022/img1.jpg', date: '20/02/2023', title: 'Ký kết hợp đồng xây dựng khu công nghiệp' },
    { id: 9, image: 'https://upgroup.com.vn/vnt_upload/news/10_2022/img3.jpg', date: '05/01/2023', title: 'Hoàn thành dự án nhà xưởng tại Bình Dương' },
    { id: 10, image: 'https://upgroup.com.vn/vnt_upload/news/10_2022/img6.jpg', date: '18/12/2022', title: 'Lễ khánh thành tòa nhà văn phòng mới' },
    { id: 11, image: 'https://upgroup.com.vn/vnt_upload/news/10_2022/img5.jpg', date: '10/12/2022', title: 'Hội thảo về công nghệ xây dựng hiện đại' },
    { id: 12, image: 'https://upgroup.com.vn/vnt_upload/news/10_2022/img2.jpg', date: '25/11/2022', title: 'Dự án cải tạo và nâng cấp hạ tầng' },
    { id: 13, image: 'https://upgroup.com.vn/vnt_upload/news/10_2022/img4.jpg', date: '12/11/2022', title: 'Khai trương chi nhánh mới tại Hà Nội' },
    { id: 14, image: 'https://upgroup.com.vn/vnt_upload/news/Tin_cong_ty/khoi_cong_advanced_multitech_2/11.png', date: '08/10/2022', title: 'Hợp tác với đối tác quốc tế về MEP' },
    { id: 15, image: 'https://upgroup.com.vn/vnt_upload/news/Tin_cong_ty/khoi_cong_advanced_multitech_2/12.png', date: '20/09/2022', title: 'Dự án xây dựng trường học tại Đồng Nai' },
    { id: 16, image: 'https://upgroup.com.vn/vnt_upload/news/Tin_cong_ty/khoi_cong_advanced_multitech_2/13.png', date: '15/08/2022', title: 'Lễ động thổ dự án khu dân cư mới' },
    { id: 17, image: 'https://upgroup.com.vn/vnt_upload/news/Tin_cong_ty/khoi_cong_advanced_multitech_2/14.png', date: '30/07/2022', title: 'Hoàn thiện hệ thống PCCC cho nhà máy' },
    { id: 18, image: 'https://upgroup.com.vn/vnt_upload/news/Tin_cong_ty/khoi_cong_advanced_multitech_2/15.png', date: '10/06/2022', title: 'Chứng nhận chất lượng ISO 9001:2015' },
  ]

  // Đối tác - Khách hàng (30 phần tử)
  const partners = [
    { id: 1, name: 'TATA', logo: 'https://upgroup.com.vn/vnt_upload/partner/09_2022/tata.jpg' },
    { id: 2, name: 'Gemtek', logo: 'https://upgroup.com.vn/vnt_upload/partner/09_2022/quest.jpg' },
    { id: 3, name: 'iBASE', logo: 'https://upgroup.com.vn/vnt_upload/partner/09_2022/_IBASE.jpg' },
    { id: 4, name: 'ZYLUX', logo: 'https://upgroup.com.vn/vnt_upload/partner/09_2022/logo_zylux.jpg' },
    { id: 5, name: 'ASKEY', logo: 'https://upgroup.com.vn/vnt_upload/partner/09_2022/Askey.jpg' },
    { id: 6, name: 'ALTOP', logo: 'https://upgroup.com.vn/vnt_upload/partner/09_2022/logo_altop_1.jpg' },
    { id: 7, name: 'Samsung', logo: 'https://upgroup.com.vn/vnt_upload/partner/09_2022/mitrastar.jpg' },
    { id: 8, name: 'LG', logo: 'https://upgroup.com.vn/vnt_upload/partner/09_2022/niemmade.png' },
    { id: 9, name: 'Panasonic', logo: 'https://upgroup.com.vn/vnt_upload/partner/09_2022/BW.png' },
    { id: 10, name: 'Sony', logo: 'https://upgroup.com.vn/vnt_upload/partner/09_2022/Tripod.jpg' },
    { id: 11, name: 'Intel', logo: 'https://upgroup.com.vn/vnt_upload/partner/09_2022/logo_1.jpg' },
    { id: 12, name: 'Microsoft', logo: 'https://upgroup.com.vn/vnt_upload/partner/09_2022/logo.gif' },
    { id: 13, name: 'Apple', logo: 'https://upgroup.com.vn/vnt_upload/partner/09_2022/logo_haimy.jpg' },
    { id: 14, name: 'HP', logo: 'https://upgroup.com.vn/vnt_upload/partner/09_2022/logo_newwide.jpg' },
    { id: 15, name: 'Dell', logo: 'https://upgroup.com.vn/vnt_upload/partner/09_2022/logo_youlin.jpg' },
    { id: 16, name: 'Lenovo', logo: 'https://upgroup.com.vn/vnt_upload/partner/09_2022/logo_2_1.jpg' },
    { id: 17, name: 'Acer', logo: 'https://upgroup.com.vn/vnt_upload/partner/09_2022/logo_5.jpg' },
    { id: 18, name: 'Asus', logo: 'https://upgroup.com.vn/vnt_upload/partner/09_2022/logo_4.jpg' },
    { id: 19, name: 'Canon', logo: 'https://upgroup.com.vn/vnt_upload/partner/09_2022/logo_3.jpg' },
    { id: 21, name: 'Fujitsu', logo: 'https://upgroup.com.vn/vnt_upload/partner/09_2022/logo_1.jpg' },
    { id: 22, name: 'Toshiba', logo: 'https://upgroup.com.vn/vnt_upload/partner/09_2022/logo.jpg' },
    { id: 23, name: 'Sharp', logo: 'https://upgroup.com.vn/vnt_upload/partner/09_2022/logo_delicacy.jpg' },
    { id: 24, name: 'Hitachi', logo: 'https://upgroup.com.vn/vnt_upload/partner/09_2022/ad_group_2.jpg' },
    { id: 25, name: 'Mitsubishi', logo: 'https://upgroup.com.vn/vnt_upload/partner/09_2022/Meisheng_logo_1.jpg' },
    { id: 26, name: 'Yamaha', logo: 'https://upgroup.com.vn/vnt_upload/partner/09_2022/logo_ss_2.jpg' },
    { id: 27, name: 'Honda', logo: 'https://upgroup.com.vn/vnt_upload/partner/09_2022/logo_haimy.jpg' },
    { id: 28, name: 'Toyota', logo: 'https://upgroup.com.vn/vnt_upload/partner/09_2022/logo_zylux.jpg' },
    { id: 29, name: 'Nissan', logo: 'https://upgroup.com.vn/vnt_upload/partner/09_2022/Logo_V.jpg' },
    { id: 30, name: 'Hyundai', logo: 'https://upgroup.com.vn/vnt_upload/partner/09_2022/slp_logo_2.jpg' },
  ]

  // Featured news now shows 1 item at a time
  const [currentFeaturedNews, setCurrentFeaturedNews] = useState(0)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  // Detect mobile screen size
  useEffect(() => {
    const handleResize = () => {
      const nowMobile = window.innerWidth <= 768
      setIsMobile((prevMobile) => {
        // Reset to first page when switching between mobile and desktop
        if (prevMobile !== nowMobile) {
          setNewsPage(0)
        }
        return nowMobile
      })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const newsPerPage = isMobile ? 4 : 6 // Show 4 items on mobile (2x2), 6 items on desktop (3x2)
  const totalNewsPages = Math.ceil(otherNews.length / newsPerPage)
  
  // Auto-cycle for other news
  useEffect(() => {
    const timer = setInterval(() => {
      setNewsPage((prev) => (prev + 1) % totalNewsPages)
    }, 6000) // Auto cycle every 6 seconds

    return () => clearInterval(timer)
  }, [totalNewsPages, newsPerPage])


  const aboutImages = [
    'https://upgroup.com.vn/vnt_upload/about/up_headquater/UP.jpg', // Thiết kế kiến trúc & kết cấu
    'https://upgroup.com.vn/vnt_upload/weblink/aaimg2.jpg', // Thi công nhà xưởng
    'https://upgroup.com.vn/vnt_upload/weblink/aaimg3.jpg', // Phát triển đất đai
    'https://upgroup.com.vn/vnt_upload/weblink/aaimg4.jpg', // Quản lý xây dựng
    'https://upgroup.com.vn/vnt_upload/weblink/aaimg5.jpg', // MEP & Nội thất
  ]

  const slides = [
    { id: 1, image: 'https://upgroup.com.vn/vnt_upload/weblink/banner.jpg', text: 'Xây dựng Ức Phát - An toàn - Tiến độ - Hiệu quả' },
    { id: 2, image: 'https://upgroup.com.vn/vnt_upload/weblink/Banner_Site/Advanced_multitech.jpg', text: 'Xây dựng Ức Phát - Tôn trọng môi trường' },
    { id: 3, image: 'https://upgroup.com.vn/vnt_upload/weblink/Banner_Site/Maxihub.jpg', text: 'Xây dựng Ức Phát - Chất lượng - Hiệu quả' },
    { id: 4, image: 'https://upgroup.com.vn/vnt_upload/weblink/Banner_Site/7.png', text: 'Xây dựng Ức Phát - Đội ngũ nhân sự chuyên nghiệp' },
    { id: 5, image: 'https://upgroup.com.vn/vnt_upload/weblink/Banner_Site/raw1.png', text: 'Xây dựng Ức Phát - Uy tín - Chất lượng' },
  ]



  // Helper functions for project information
  const getProjectDescription = (title: string): string => {
    const descriptions: { [key: string]: string } = {
      'NHÀ XƯỞNG': 'Thiết kế và thi công nhà xưởng công nghiệp hiện đại với công nghệ tiên tiến, đảm bảo chất lượng và tiến độ.',
      'LOGISTICS': 'Phát triển hệ thống logistics và kho bãi thông minh, tối ưu hóa quy trình vận chuyển và lưu trữ hàng hóa.',
      'KÝ TÚC XÁ': 'Xây dựng khu ký túc xá hiện đại với đầy đủ tiện nghi, tạo môi trường sống thoải mái cho sinh viên và công nhân.',
      'CAO ỐC': 'Thiết kế và thi công các tòa nhà cao tầng với kiến trúc hiện đại, ứng dụng công nghệ xây dựng tiên tiến.',
      'CƠ ĐIỆN': 'Lắp đặt hệ thống cơ điện chuyên nghiệp, đảm bảo an toàn và hiệu quả vận hành cho các công trình.',
      'PHÒNG CHÁY CHỮA CHÁY': 'Thiết kế và lắp đặt hệ thống PCCC đạt chuẩn quốc tế, bảo vệ tài sản và con người một cách tối ưu.'
    }
    return descriptions[title] || 'Dự án chất lượng cao với công nghệ hiện đại và đội ngũ chuyên nghiệp.'
  }

  const getProjectFeatures = (title: string): string[] => {
    const features: { [key: string]: string[] } = {
      'NHÀ XƯỞNG': ['Kết cấu thép hiện đại', 'Hệ thống thông gió tối ưu', 'An toàn lao động cao'],
      'LOGISTICS': ['Hệ thống tự động hóa', 'Quản lý thông minh', 'Tối ưu chi phí vận hành'],
      'KÝ TÚC XÁ': ['Thiết kế thân thiện môi trường', 'Tiện nghi đầy đủ', 'An ninh 24/7'],
      'CAO ỐC': ['Kiến trúc độc đáo', 'Công nghệ xanh', 'Tiết kiệm năng lượng'],
      'CƠ ĐIỆN': ['Hệ thống điện an toàn', 'Công nghệ hiện đại', 'Bảo trì dễ dàng'],
      'PHÒNG CHÁY CHỮA CHÁY': ['Chuẩn quốc tế', 'Phản ứng nhanh', 'Độ tin cậy cao']
    }
    return features[title] || ['Chất lượng cao', 'Tiến độ đảm bảo', 'Giá cả hợp lý']
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Changed from 4000ms to 10000ms (10 seconds)

    return () => clearInterval(timer)
  }, [slides.length])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeaturedNews((prev) => (prev + 1) % featuredNews.length)
    }, 4000) // Auto cycle every 4 seconds

    return () => clearInterval(timer)
  }, [featuredNews.length])


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const headerHeight = 0 // Header height
      const carouselHeight = 0 // Height of carousel section
      const carouselEndPosition = headerHeight + carouselHeight
      
      
      // Always show navbar when in carousel area
      if (currentScrollY < carouselEndPosition + 1) {
        setIsNavbarVisible(true)
      }
      // Hide navbar when scrolling DOWN past carousel
      else if (currentScrollY > lastScrollY && currentScrollY > carouselEndPosition + 80) {
        setIsNavbarVisible(false)
      } 
      // Show navbar when scrolling UP
      else if (currentScrollY < lastScrollY) {
        setIsNavbarVisible(true)
      }
      
      setLastScrollY(currentScrollY)
      
    }
    


    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Partners carousel drag handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!partnersCarouselRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - partnersCarouselRef.current.offsetLeft)
    setScrollLeft(partnersCarouselRef.current.scrollLeft)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !partnersCarouselRef.current) return
    e.preventDefault()
    const x = e.pageX - partnersCarouselRef.current.offsetLeft
    const walk = (x - startX) * 2
    partnersCarouselRef.current.scrollLeft = scrollLeft - walk
 
  }

  // Initialize carousel position at center
  useEffect(() => {
    const carousel = partnersCarouselRef.current
    if (!carousel) return
    
    // Set initial scroll position to middle
    setTimeout(() => {
      carousel.scrollLeft = carousel.scrollWidth / 2 - carousel.clientWidth / 2
    }, 100)
  }, [])

  // Auto loop carousel when reaching end
  useEffect(() => {
    const carousel = partnersCarouselRef.current
    if (!carousel) return

    const handleScroll = () => {
      const scrollWidth = carousel.scrollWidth
      const clientWidth = carousel.clientWidth
      const scrollLeft = carousel.scrollLeft
      // Nếu scroll đến gần cuối (trong vòng 50px), nhảy về giữa
      if (scrollLeft + clientWidth >= scrollWidth - 50) {
        carousel.scrollLeft = scrollWidth / 2 - clientWidth / 2
      }
      
      // Nếu scroll về gần đầu (trong vòng 50px), nhảy về giữa
      if (scrollLeft <= 50) {
        carousel.scrollLeft = scrollWidth / 2 - clientWidth / 2
      }
    }
    
    

    carousel.addEventListener('scroll', handleScroll)
    return () => carousel.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    
    <div className="app">
      {/* Header */}
      <header className={`header ${isNavbarVisible ? 'navbar-visible' : 'navbar-hidden'}`}>
        <div className="header-top">
          <div className="container">
            <div className="header-top-content">
              <div className="logo-section">
                <a href="#" className="logo-link">
                  <img src={`https://res.cloudinary.com/daug6bxma/image/upload/v1763103958/LOGO_UP_wwkovz.png`} alt="UP Construction Group" className="logo-img" />
                </a>
             <div>
               </div>
                <h1 className="logo-text" >CÔNG TY TNHH TM DV XÂY DỰNG ỨC PHÁT</h1>
              </div>
              <div className="header-actions">
                <div className="language-switcher">
                  <a href="#" className="lang-link active"><span>VN</span></a>
                  <span className="separator">|</span>
                  <a href="#" className="lang-link"><span>繁體</span></a>
                </div>
                <div className="search-box">
                  <input type="text" placeholder="Nhập từ khóa" className="search-input" />
                  <button className="search-btn">TÌM KIẾM</button>
                </div>
                <button 
                  className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
          <div className="mobile-nav-header">
            <h3 className="mobile-nav-title">Menu</h3>
            <button 
              className="mobile-nav-close"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div className="mobile-nav-links">
            <a href="#" className="nav-link active" onClick={() => setIsMenuOpen(false)}><span>Trang chủ</span></a>
            <a href="#" className="nav-link" onClick={() => setIsMenuOpen(false)}><span>Giới thiệu</span></a>
            <a href="#" className="nav-link" onClick={() => setIsMenuOpen(false)}><span>Dịch vụ</span></a>
            <a href="#" className="nav-link" onClick={() => setIsMenuOpen(false)}><span>Dự án</span></a>
            <a href="#" className="nav-link" onClick={() => setIsMenuOpen(false)}><span>Tin tức</span></a>
            <a href="#" className="nav-link" onClick={() => setIsMenuOpen(false)}><span>Khách hàng</span></a>
            <a href="#" className="nav-link" onClick={() => setIsMenuOpen(false)}><span>Liên hệ</span></a>
          </div>
          
          <div className="mobile-search">
            <div className="search-box">
              <input type="text" placeholder="Nhập từ khóa" className="search-input" />
              <button className="search-btn">TÌM KIẾM</button>
            </div>
          </div>
          
          <div className="mobile-cta">
            <a href="#" className="cta-button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Liên hệ ngay
            </a>
          </div>
        </div>

       
        
        <nav className="navbar mobile-hidden">
          <div className="container">
            <ul className="nav-menu">
              <li><a href="#" className="nav-link active"><span>Trang chủ</span></a></li>
              <li className="has-dropdown">
                <a href="#" className="nav-link"><span>Giới thiệu</span></a>
              </li>
              <li className="has-dropdown">
                <a href="#" className="nav-link"><span>Dịch vụ</span></a>
                <ul className="dropdown-menu">
                  <li><a href="#"><span>Thiết kế kiến trúc & kết cấu</span></a></li>
                  <li><a href="#"><span>Thi công nhà xưởng</span></a></li>
                  <li><a href="#"><span>Phát triển đất đai</span></a></li>
                  <li><a href="#"><span>Quản lý xây dựng</span></a></li>
                  <li><a href="#"><span>MEP & Nội thất (cơ điện, PCCC, nội thất)</span></a></li>
                </ul>
              </li>
              <li><a href="#" className="nav-link"><span>Dự án</span></a></li>
              <li><a href="#" className="nav-link"><span>Tin tức</span></a></li>
              <li><a href="#" className="nav-link"><span>Khách hàng</span></a></li>
              <li><a href="#" className="nav-link"><span>Liên hệ</span></a></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Banner Carousel */}
      <section className="banner-section">
        <div className="banner-carousel">
          {slides.map((slide, index) => {
            // Alternate between different Ken Burns effects for variety
            const kenBurnsEffect = index % 3 === 0 ? 'ken-burns' : 
                                 index % 3 === 1 ? 'ken-burns-left' : 'ken-burns-right';
            
            return (
              <div
                key={slide.id}
                className={`banner-slide ${index === currentSlide ? 'active' : ''} ${index === currentSlide ? kenBurnsEffect : ''}`}
                style={{
                  backgroundImage: `url(${slide.image})`
                }}
              >
                <div className="banner-overlay"></div>
                <div className="banner-content">
                  <h2 className="banner-title">{slide.text}</h2>
                </div>
              </div>
            );
          })}
          
          {/* Progress indicator */}
          <div className="slide-progress">
            <div 
              className={`progress-bar ${currentSlide >= 0 ? 'active' : ''}`}
              key={currentSlide}
              style={{
                animationDuration: '5s'
              }}
            ></div>
          </div>
        </div>
        
        <div className="banner-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            >
              <span className="dot-progress"></span>
            </button>
          ))}
        </div>
      
        
        <button className="banner-prev" onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
        </button>
        <button className="banner-next" onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>
      </section>


      {/* About Us Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-left">
              <div className="about-greeting">
                <span>Chào mừng đến với</span>
                <div className="greeting-line"></div>
              </div>
              <h2 className="about-title">XÂY DỰNG ỨC PHÁT</h2>
              <p className="about-description">
                Công ty TM DV Xây dựng Ức Phát được thành lập năm 2012, có kinh nghiệm trong việc xây dựng các loại nhà xưởng như: 
                dệt may, điện tử, lốp xe, dầu khí, hóa chất, da giày, giấy, sơn, xe đạp, dụng cụ thể thao, cơ khí chế tạo, 
                khuôn sắt, ốc vít... Ngoài ra còn có kinh nghiệm trong việc xây dựng nhà cao tầng, M&E, PCCC, các dự án môi trường 
                và các dịch vụ pháp lý liên quan (môi trường, PCCC, giấy phép, nghiệm thu công trình). Trong những năm gần đây, 
                doanh thu trung bình hàng năm đều vượt quá 40,000,000 USD, xếp hạng trong số các công ty xây dựng hàng đầu tại Đài Loan.
              </p>
              <a href="#" className="learn-more-btn">
                Tìm hiểu thêm <span className="arrow">›</span>
              </a>
            </div>
            
            <div className="about-right">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 3v18h18" />
                      <path d="M7 12l4-4 4 4 6-6" />
                    </svg>
                  </div>
                  <div className="stat-number">+12 năm</div>
                  <div className="stat-label">Hình thành và phát triển</div>
                </div>
                
                <div className="stat-item">
                  <div className="stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div className="stat-number">+ 3.000 người</div>
                  <div className="stat-label">Đội ngũ nhân sự</div>
                </div>
                
                <div className="stat-item">
                  <div className="stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <div className="stat-number">+ 150</div>
                  <div className="stat-label">Dự án hoàn thành</div>
                </div>
                
                <div className="stat-item">
                  <div className="stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      <circle cx="18" cy="8" r="2" />
                    </svg>
                  </div>
                  <div className="stat-number">+ 200</div>
                  <div className="stat-label">Đối tác khách hàng</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Cards Section */}
      <section className="services-cards-section">
        <div className="services-cards-container">
          <a href="#" className="service-card">
            <div className="card-background" style={{
              backgroundImage: `url(${aboutImages[0]})`
            }}>
              <div className="card-overlay"></div>
              <div className="card-play-icon">
                <svg viewBox="0 0 24 24" fill="white">
                  <circle cx="12" cy="12" r="10" fill="rgba(0,0,0,0.5)"/>
                  <path d="M10 8l6 4-6 4V8z" fill="white"/>
                </svg>
              </div>
            </div>
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="10" r="1.5" fill="white"/>
                <line x1="12" y1="12" x2="12" y2="16" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
            <div className="card-title">VỀ ỨC PHÁT</div>
          </a>

          <a href="#" className="service-card">
            <div className="card-background" style={{
              backgroundImage: `url(${aboutImages[1]})`
            }}>
              <div className="card-overlay"></div>
            </div>
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <circle cx="12" cy="12" r="1.5" fill="white"/>
                <line x1="12" y1="14" x2="12" y2="18" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
            <div className="card-title">THÔNG ĐIỆP CÔNG TY</div>
          </a>

          <a href="#" className="service-card">
            <div className="card-background" style={{
              backgroundImage: `url(${aboutImages[  2]})`
            }}>
              <div className="card-overlay"></div>
            </div>
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div className="card-title">SƠ ĐỒ TỔ CHỨC</div>
          </a>

          <a href="#" className="service-card">
            <div className="card-background" style={{
              backgroundImage: `url(${aboutImages[3]})`
            }}>
              <div className="card-overlay"></div>
            </div>
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                <path d="M8 10l2 2 4-4" stroke="white" strokeWidth="2" fill="none"/>
                <path d="M16 10l2 2 4-4" stroke="white" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <div className="card-title">THÀNH TỰU</div>
          </a>

          <a href="#" className="service-card">
            <div className="card-background" style={{
              backgroundImage: `url(${aboutImages[4]})`
            }}>
              <div className="card-overlay"></div>
            </div>
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <path d="M9 15l2 2 4-4"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
            <div className="card-title">HỒ SƠ NĂNG LỰC</div>
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="services-header">
            <div className="services-header-left">
              <h2 className="services-title">
                Dịch Vụ
                <span className="title-line"></span>
              </h2>
              <p className="services-description">
                Chúng tôi cam kết tạo ra môi trường sống đẹp, nhà xưởng chất lượng và trải nghiệm tốt nhất cho nhân viên, 
                luôn đặt sự hài lòng của khách hàng lên hàng đầu.
        </p>
      </div>
            <a href="#" className="view-all-btn">
              Xem tất cả <span className="arrow">›</span>
            </a>
          </div>
        </div>

        {/* Services Visual Panels */}
        <div className="services-panels-container">
          <a 
            href="#" 
            className={`service-panel ${hoveredPanel === 0 ? 'active' : ''}`}
            onMouseEnter={() => setHoveredPanel(0)}
            onMouseLeave={() => setHoveredPanel(null)}
          >
            <div className="panel-background" style={{
              backgroundImage: `url(${serviceImages[0] || 'https://via.placeholder.com/400x600/3b82f6/ffffff?text=Thiết+kế+Kiến+trúc'})`
            }}>
              <div className="panel-overlay"></div>
            </div>
            <div className="panel-content">
              <h3 className="panel-title">Thiết kế Kiến trúc</h3>
              <p className="panel-description">Dịch vụ thiết kế kiến trúc và kết cấu chuyên nghiệp với đội ngũ kỹ sư giàu kinh nghiệm.</p>
              <ul className="panel-features">
                <li>Thiết kế kiến trúc công nghiệp</li>
                <li>Tính toán kết cấu chính xác</li>
                <li>Bản vẽ kỹ thuật chi tiết</li>
              </ul>
            </div>
            <div className="panel-nav-content" data-number="01">
              <span className="panel-nav-text">Thiết kế kiến trúc & kết cấu</span>
            </div>
          </a>
      
          <a 
            href="#" 
            className={`service-panel ${hoveredPanel === 1 ? 'active' : ''}`}
            onMouseEnter={() => setHoveredPanel(1)}
            onMouseLeave={() => setHoveredPanel(null)}
          >
            <div className="panel-background" style={{
              backgroundImage: `url(${serviceImages[1] || 'https://via.placeholder.com/400x600/8b5cf6/ffffff?text=Thi+công+Nhà+xưởng'})`
            }}>
              <div className="panel-overlay"></div>
            </div>
            <div className="panel-content">
              <h3 className="panel-title">Thi công Nhà xưởng</h3>
              <p className="panel-description">Thi công nhà xưởng công nghiệp và nhà cao tầng với tiến độ nhanh, chất lượng cao.</p>
              <ul className="panel-features">
                <li>Nhà xưởng công nghiệp</li>
                <li>Nhà cao tầng hiện đại</li>
                <li>Đảm bảo tiến độ & chất lượng</li>
              </ul>
            </div>
            <div className="panel-nav-content" data-number="02">
              <span className="panel-nav-text">Thi công nhà xưởng</span>
            </div>
          </a>

          <a 
            href="#" 
            className={`service-panel ${hoveredPanel === 2 ? 'active' : ''}`}
            onMouseEnter={() => setHoveredPanel(2)}
            onMouseLeave={() => setHoveredPanel(null)}
          >
            <div className="panel-background" style={{
              backgroundImage: `url(${serviceImages[2] || 'https://via.placeholder.com/400x600/ec4899/ffffff?text=Phát+triển+Đất+đai'})`
            }}>
              <div className="panel-overlay"></div>
            </div>
            <div className="panel-content">
              <h3 className="panel-title">Phát triển Đất đai</h3>
              <p className="panel-description">Dịch vụ phát triển và quy hoạch đất đai cho các dự án công nghiệp và dân dụng.</p>
              <ul className="panel-features">
                <li>Quy hoạch tổng thể</li>
                <li>Phát triển khu công nghiệp</li>
                <li>Tư vấn đầu tư đất đai</li>
              </ul>
            </div>
            <div className="panel-nav-content" data-number="03">
              <span className="panel-nav-text">Phát triển đất đai</span>
            </div>
          </a>

          <a 
            href="#" 
            className={`service-panel ${hoveredPanel === 3 ? 'active' : ''}`}
            onMouseEnter={() => setHoveredPanel(3)}
            onMouseLeave={() => setHoveredPanel(null)}
          >
            <div className="panel-background" style={{
              backgroundImage: `url(${serviceImages[3] || 'https://via.placeholder.com/400x600/f59e0b/ffffff?text=Quản+lý+Xây+dựng'})`
            }}>
              <div className="panel-overlay"></div>
            </div>
            <div className="panel-content">
              <h3 className="panel-title">Quản lý Xây dựng</h3>
              <p className="panel-description">Dịch vụ quản lý dự án xây dựng toàn diện từ khởi công đến bàn giao.</p>
              <ul className="panel-features">
                <li>Quản lý tiến độ dự án</li>
                <li>Kiểm soát chất lượng</li>
                <li>Giám sát an toàn lao động</li>
              </ul>
            </div>
            <div className="panel-nav-content" data-number="04">
              <span className="panel-nav-text">Quản lý xây dựng</span>
            </div>
          </a>

          <a 
            href="#" 
            className={`service-panel ${hoveredPanel === 4 ? 'active' : ''}`}
            onMouseEnter={() => setHoveredPanel(4)}
            onMouseLeave={() => setHoveredPanel(null)}
          >
            <div className="panel-background" style={{
              backgroundImage: `url(${serviceImages[4] || 'https://via.placeholder.com/400x600/10b981/ffffff?text=MEP+%26+Nội+thất'})`
            }}>
              <div className="panel-overlay"></div>
            </div>
            <div className="panel-content">
              <h3 className="panel-title">MEP & Nội thất</h3>
              <p className="panel-description">Hệ thống cơ điện, phòng cháy chữa cháy và thiết kế nội thất chuyên nghiệp.</p>
              <ul className="panel-features">
                <li>Hệ thống cơ điện (MEP)</li>
                <li>Phòng cháy chữa cháy (PCCC)</li>
                <li>Thiết kế nội thất hiện đại</li>
              </ul>
            </div>
            <div className="panel-nav-content" data-number="05">
              <span className="panel-nav-text">MEP & Nội thất</span>
            </div>
          </a>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section">
        <div className="container">
          <div className="projects-header">
            <div className="projects-header-left">
              <h2 className="projects-title">
                Dự Án Tiêu Biểu
                <span className="projects-title-line"></span>
              </h2>
              <p className="projects-description">
                Chúng tôi có kinh nghiệm trong các lĩnh vực dân dụng, công nghiệp, xây dựng nhà xưởng, cơ điện, 
                hạ tầng kỹ thuật, hệ thống phòng cháy chữa cháy (PCCC). Với cơ sở vật chất mạnh, trang thiết bị hiện đại, 
                phát triển chiến lược, chúng tôi đã xây dựng được uy tín và trở thành lựa chọn hàng đầu của khách hàng 
                tại khu vực miền Nam và trên toàn quốc.
              </p>
            </div>
            <a href="#" className="view-all-projects-btn">
              Xem tất cả <span className="arrow">›</span>
            </a>
          </div>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <a key={project.id} href="#" className="project-card">
              <div className="project-image-wrapper">
                <div 
                  className="project-image" 
                  style={{
                    backgroundImage: `url(${project.image || 'https://via.placeholder.com/600x400/4a90e2/ffffff?text=' + project.title})`
                  }}
                >
                  <div className="project-overlay"></div>
                </div>
                
                {/* Project content that appears on hover */}
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">
                    {getProjectDescription(project.title)}
                  </p>
                  <ul className="project-features">
                    {getProjectFeatures(project.title).map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                {/* Project number badge */}
                <div className="project-number">{String(index + 1).padStart(2, '0')}</div>
                
                {/* Default label (hidden on hover) */}
                <div className="project-label">{project.title}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* News Section */}
      <section className="news-section">
        <div className="container">
          <div className="news-header">
            <h2 className="news-title">
              Tin Tức Tiêu Điểm
              <span className="news-title-line"></span>
            </h2>
            <a href="#" className="view-all-news-btn">
              Xem tất cả <span className="arrow">›</span>
            </a>
          </div>

          {/* Featured News - Single Item Carousel */}
          <div className="featured-news-section">
            <div className="featured-news-container">
              <div className="featured-news-single">
                <a href="#" className="featured-news-card active">
                  <div className="news-image-wrapper">
                    <div 
                      className="news-image" 
                      style={{
                        backgroundImage: `url(${featuredNews[currentFeaturedNews]?.image || 'https://via.placeholder.com/600x300/4a90e2/ffffff?text=' + featuredNews[currentFeaturedNews]?.title})`
                      }}
                    >
                      <div className="news-overlay"></div>
                    </div>
                  </div>
                  <div className="news-content">
                    <div className="news-date">{featuredNews[currentFeaturedNews]?.date}</div>
                    <h3 className="news-title-text">{featuredNews[currentFeaturedNews]?.title}</h3>
                  </div>
                </a>
              </div>
            </div>
            
            {/* Featured News Dots */}
            <div className="featured-news-dots">
              {featuredNews.map((_, index) => (
                <button
                  key={index}
                  className={`featured-news-dot ${index === currentFeaturedNews ? 'active' : ''}`}
                  onClick={() => setCurrentFeaturedNews(index)}
                />
              ))}
            </div>
          </div>

          {/* Other News - 3x2 Grid Carousel */}
          <div className="other-news-section">
            <div className="other-news-container">
              <div 
                className="other-news-carousel"
                style={{
                  transform: isMobile 
                    ? `translateX(calc(-${newsPage * 100}% - ${newsPage * 15}px))`
                    : `translateX(calc(-${newsPage * 100}% - ${newsPage * 20}px))`
                }}
              >
                {Array.from({ length: totalNewsPages }).map((_, pageIndex) => (
                  <div key={pageIndex} className="other-news-page">
                    {otherNews
                      .slice(pageIndex * newsPerPage, (pageIndex + 1) * newsPerPage)
                      .map((news) => (
                        <a key={news.id} href="#" className="other-news-card">
                          <div className="news-image-wrapper">
                            <div 
                              className="news-image" 
                              style={{
                                backgroundImage: `url(${news.image || '' + news.title})`
                              }}
                            >
                              <div className="news-overlay"></div>
                            </div>
                          </div>
                          <div className="news-content">
                            <div className="news-date">{news.date}</div>
                            <h3 className="news-title-text">{news.title}</h3>
                          </div>
                        </a>
                      ))}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <div className="news-navigation">
              <button 
                className="news-nav-btn" 
                onClick={() => setNewsPage((prev) => (prev - 1 + totalNewsPages) % totalNewsPages)}
                disabled={totalNewsPages <= 1}
              >
                ‹
              </button>
              
              <button 
                className="news-nav-btn" 
                onClick={() => setNewsPage((prev) => (prev + 1) % totalNewsPages)}
                disabled={totalNewsPages <= 1}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="partners-section">
        <div className="container">
          <div className="partners-header">
            <h2 className="partners-title">
              Đối Tác - Khách Hàng
              <span className="partners-title-line"></span>
            </h2>
          </div>
          <div 
            className="partners-carousel-wrapper"
            ref={partnersCarouselRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            <div className="partners-carousel">
              {/* Render partners twice for seamless loop */}
              {[...partners, ...partners].map((partner, index) => (
                <div key={`${partner.id}-${index}`} className="partner-item">
                  <div className="partner-logo-wrapper">
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className="partner-logo"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="company-info-section">
        <div className="company-info-background">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
        
        <div className="container">
          <div className="company-header">
            <div className="company-logo-section">
              <img src="https://res.cloudinary.com/daug6bxma/image/upload/v1763103958/LOGO_UP_wwkovz.png" alt="UP Construction Group" className="company-main-logo" />
              <div className="company-title-wrapper">
                <h2 className="company-main-title">CÔNG TY TNHH TM DV XÂY DỰNG ỨC PHÁT</h2>
                <h3 className="company-subtitle">Công ty TNHH Thương Mại Dịch Vụ Xây Dựng Ức Phát</h3>
                <div className="company-tagline">Xây dựng tương lai - Kết nối thành công</div>
              </div>
            </div>
          </div>
          
          <div className="offices-section">
            <h3 className="offices-title">Hệ thống văn phòng</h3>
            <div className="offices-grid">
              {/* Trụ sở chính */}
              <div 
                className={`office-card ${hoveredOffice === 'main' ? 'active' : ''}`}
                onMouseEnter={() => setHoveredOffice('main')}
                onMouseLeave={() => setHoveredOffice(null)}
              >
                <div className="office-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="office-content">
                  <h4>Trụ sở chính</h4>
                  <p>Tổ 7, hẻm 789, quốc lộ 51b, X.Long Thành, T.Đồng Nai</p>
                  <div className="office-badge">Headquarters</div>
                </div>
                <div className="office-map">
                  <div className="office-map-header">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    Vị trí trụ sở chính - Đồng Nai
                  </div>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18290.19100537223!2d106.94762343132435!3d10.786275109614783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31751ed60050cf21%3A0x1d41bb6cb68c7794!2zQ8O0bmcgdHkgVE5ISCBUaMawxqFuZyBN4bqhaSBE4buLY2ggVuG7pSBYw6J5IEThu7FuZyDhu6hjIFBow6F0!5e1!3m2!1svi!2s!4v1763085204921!5m2!1svi!2s" 
                    width="100%" 
                    height="300" 
                    style={{border: 0}} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              {/* Chi nhánh TP.HCM */}
              <div 
                className={`office-card ${hoveredOffice === 'hcm' ? 'active' : ''}`}
                onMouseEnter={() => setHoveredOffice('hcm')}
                onMouseLeave={() => setHoveredOffice(null)}
              >
                <div className="office-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="office-content">
                  <h4>Miền Nam – Chi nhánh TP.HCM</h4>
                  <p>The Signature - M7, Đường số 15, P.Tân Mỹ, Q.7, Thành phố Hồ Chí Minh</p>
                  <div className="office-badge">Southern Branch</div>
                </div>
                <div className="office-map">
                  <div className="office-map-header">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    Vị trí chi nhánh - TP. Hồ Chí Minh
                  </div>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1963.9163411375348!2d106.72685134913263!3d10.724017689377543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175252f80cab671%3A0x90e87a2c2eea763a!2sMidtown%20M7%20The%20Signature!5e1!3m2!1svi!2s!4v1763085367962!5m2!1svi!2s" 
                    width="100%" 
                    height="300" 
                    style={{border: 0}} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              {/* Chi nhánh Hà Nội */}
              <div 
                className={`office-card ${hoveredOffice === 'hanoi' ? 'active' : ''}`}
                onMouseEnter={() => setHoveredOffice('hanoi')}
                onMouseLeave={() => setHoveredOffice(null)}
              >
                <div className="office-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="office-content">
                  <h4>Miền Bắc - Chi nhánh Hà Nội</h4>
                  <p>Số 25, Lê Văn Lương, phường Nhân Chính, Quận Thanh Xuân Tầng 3, D01-31, BRG Diamond Residence</p>
                  <div className="office-badge">Northern Branch</div>
                </div>
                <div className="office-map">
                  <div className="office-map-header">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    Vị trí chi nhánh - Hà Nội
                  </div>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4345.459953756712!2d105.80285421142773!3d21.00546228055734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135adfd2a330e79%3A0x9917e9153e4bab51!2zVGhlIERpYW1vbmQgUmVzaWRlbmNlIC0gMjUgTMOqIFbEg24gTMawxqFuZw!5e1!3m2!1svi!2s!4v1763085424942!5m2!1svi!2s" 
                    width="100%" 
                    height="300" 
                    style={{border: 0}} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-background">
          <div className="footer-shapes">
            <div className="footer-shape footer-shape-1"></div>
            <div className="footer-shape footer-shape-2"></div>
            <div className="footer-shape footer-shape-3"></div>
          </div>
        </div>
        
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="footer-logo-wrapper">
                <img src={`https://res.cloudinary.com/daug6bxma/image/upload/v1763103958/LOGO_UP_wwkovz.png`} alt="UP Construction Group" className="footer-logo" />
              </div>
              <h3 className="footer-company-title">XÂY DỰNG ỨC PHÁT</h3>
              <p className="footer-company-subtitle">Công ty TNHH Thương Mại Dịch Vụ Xây Dựng Ức Phát</p>
              <p className="footer-tagline">Xây dựng tương lai - Kết nối thành công</p>
              
              <div className="footer-social">
                <a href="https://www.facebook.com/ucphatgroup/" className="social-link" title="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://www.youtube.com/@ucphatgroup" className="social-link" title="YouTube">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="footer-links">
              <div className="footer-column">
                <h4 className="footer-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9,22 9,12 15,12 15,22"/>
                  </svg>
                  Về chúng tôi
                </h4>
                <ul className="footer-list">
                  <li><a href="#">Giới thiệu công ty</a></li>
                  <li><a href="#">Lịch sử hình thành</a></li>
                  <li><a href="#">Tầm nhìn & sứ mệnh</a></li>
                  <li><a href="#">Giá trị cốt lõi</a></li>
                  <li><a href="#">Thành tựu nổi bật</a></li>
                </ul>
              </div>
              
              <div className="footer-column">
                <h4 className="footer-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                  </svg>
                  Dịch vụ
                </h4>
                <ul className="footer-list">
                  <li><a href="#">Thiết kế kiến trúc</a></li>
                  <li><a href="#">Thi công xây dựng</a></li>
                  <li><a href="#">Phát triển đất đai</a></li>
                  <li><a href="#">Quản lý dự án</a></li>
                  <li><a href="#">Hệ thống MEP & PCCC</a></li>
                </ul>
              </div>
              
              <div className="footer-column">
                <h4 className="footer-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                    <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                    <line x1="12" y1="22.08" x2="12" y2="12"/>
                  </svg>
                  Dự án
                </h4>
                <ul className="footer-list">
                  <li><a href="#">Nhà xưởng công nghiệp</a></li>
                  <li><a href="#">Trung tâm logistics</a></li>
                  <li><a href="#">Cao ốc văn phòng</a></li>
                  <li><a href="#">Ký túc xá hiện đại</a></li>
                  <li><a href="#">Hệ thống PCCC</a></li>
                </ul>
              </div>
            </div>
            
            <div className="footer-contact">
              <h4 className="footer-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Liên hệ ngay
              </h4>
              
              <div className="contact-info">
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div className="contact-details">
                    <span className="contact-label">Trụ sở chính</span>
                    <span className="contact-value">Tổ 7, hẻm 789, quốc lộ 51b<br/>X.Long Thành, T.Đồng Nai</span>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div className="contact-details">
                    <span className="contact-label">Hotline 24/7</span>
                    <span className="contact-value">0251 3844 313</span>
                  </div>
                </div>
                <div>
                  
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div className="contact-details">
                    <span className="contact-label">Email hỗ trợ</span>
                    <span className="contact-value">info@upgroup.com.vn</span>
                  </div>
                </div>
              </div>
              
              <div className="footer-cta">
                <a href="#" className="cta-button">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  Gọi ngay để tư vấn miễn phí
                </a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <div className="footer-copyright">
                <p>© 2024 <strong>XÂY DỰNG ỨC PHÁT</strong> - Tất cả quyền được bảo lưu</p>
              </div>
              <div className="footer-policies">
                <a href="#">Chính sách bảo mật</a>
                <span className="separator">|</span>
                <a href="#">Điều khoản sử dụng</a>
                <span className="separator">|</span>
                <a href="#">Sitemap</a>
              </div>
            </div>
            
            {/* Social media cho mobile - hiển thị dưới copyright */}
            <div className="footer-social-mobile">
              <a href="https://www.facebook.com/ucphatgroup/" className="social-link" title="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@ucphatgroup" className="social-link" title="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default App
