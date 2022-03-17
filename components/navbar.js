class Navbar extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <html lang="en">
    
    <head>
        <base href="">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="assets/media/logos/favicon.ico" />
        <!-- CSRF Token -->
        <meta name="csrf-token" content="7aYCjfoFBwJZANn0jz9JbAYQTBNn8h1nbgKykcAi">
        <title>Admin System</title>
        <!--begin::Fonts-->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
            href="https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
            rel="stylesheet">
        <!--end::Fonts-->
        <!--begin::Global Stylesheets Bundle(used by all pages)-->
        <link href="https://pakpooncity.siaminno.co.th/plugins/global/plugins.bundle.css" rel="stylesheet" type="text/css">
        <link href="https://pakpooncity.siaminno.co.th/css/style.bundle.css" rel="stylesheet" type="text/css">
        <link href="https://pakpooncity.siaminno.co.th/css/app_style.css" rel="stylesheet" type="text/css">
        <link rel="stylesheet" type="text/css" href="https://pakpooncity.siaminno.co.th/css/sweetalert2.min.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Mitr:wght@200;300;400&display=swap" rel="stylesheet">
        <!--end::Global Stylesheets Bundle-->
        <style>
            .h250{
            height: 250px;
        }
        </style>
    </head>
    <!--begin::Body-->
    
    <body id="kt_body"
        class="header-fixed header-tablet-and-mobile-fixed toolbar-enabled toolbar-fixed toolbar-tablet-and-mobile-fixed"
        style="--kt-toolbar-height:55px;--kt-toolbar-height-tablet-and-mobile:55px">
        <!--begin::Main-->
        <!--begin::Root-->
        <div class="d-flex flex-column flex-root">
            <!--begin::Page-->
            <div class="page d-flex flex-row flex-column-fluid">
                <!--begin::Wrapper-->
                <div class="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
                    <!--begin::Header-->
                    <div id="kt_header" class="header align-items-stretch">
                        <!--begin::Container-->
                        <div class="container d-flex align-items-stretch justify-content-between">
                            <!--begin::Aside mobile toggle-->
                            <!--end::Aside mobile toggle-->
                            <!--begin::Logo-->
                            <div class="d-flex align-items-center flex-grow-1 flex-lg-grow-0 me-lg-15">
                                <a href="https://pakpooncity.siaminno.co.th/home">
                                    <img alt="Logo" src="https://pakpooncity.siaminno.co.th/logo/logo.png" class="h-60px" /> <span
                                        class="logoname">เทศบาลเมืองปากพูน</span>
                                </a>
                            </div>
                            <!--end::Logo-->
                            <!--begin::Wrapper-->
                            <div class="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
                                <!--begin::Navbar-->
                                <div class="d-flex align-items-stretch" id="kt_header_nav">
        <!--begin::Menu wrapper-->
        <div class="header-menu align-items-stretch" data-kt-drawer="true" data-kt-drawer-name="header-menu"
            data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true"
            data-kt-drawer-width="{default:'200px', '300px': '250px'}" data-kt-drawer-direction="end"
            data-kt-drawer-toggle="#kt_header_menu_mobile_toggle" data-kt-swapper="true" data-kt-swapper-mode="prepend"
            data-kt-swapper-parent="{default: '#kt_body', lg: '#kt_header_nav'}">
            <!--begin::Menu-->
            <div class="menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch"
                id="#kt_header_menu" data-kt-menu="true">
                <div class="menu-item me-lg-1">
                    <a class="menu-link py-3 active"
                        href="https://pakpooncity.siaminno.co.th/home">
                        <span class="menu-title">หน้าหลัก</span>
                    </a>
                </div>
                             <div data-kt-menu-trigger="click" data-kt-menu-placement="bottom-start"
                    class="menu-item menu-lg-down-accordion me-lg-1">
                    <span class="menu-link py-3 ">
                        <span class="menu-title">ร้องเรียน</span>
                        <span class="menu-arrow d-lg-none"></span>
                    </span>
                    <div class="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-rounded-0 py-lg-4 w-lg-225px">
                        <div class="menu-item">
                            <a class="menu-link py-3 "
                                href="./index.html">
                                <span class="menu-bullet">
                                    <span class="bullet bullet-dot"></span>
                                </span>
                                <span class="menu-title">ใบงานร้องเรียน</span>
                            </a>
                        </div>
                                            <div class="menu-item">
                            <a class="menu-link py-3 "
                                href="https://pakpooncity.siaminno.co.th/title">
                                <span class="menu-bullet">
                                    <span class="bullet bullet-dot"></span>
                                </span>
                                <span class="menu-title">จัดการหัวข้อเรื่อง</span>
                            </a>
                        </div>
                                                                  <div class="menu-item">
                            <a class="menu-link py-3 "
                                href="https://pakpooncity.siaminno.co.th/token">
                                <span class="menu-bullet">
                                    <span class="bullet bullet-dot"></span>
                                </span>
                                <span class="menu-title">Token Notify</span>
                            </a>
                        </div>
                                         </div>
                </div>
                
                                 <div data-kt-menu-trigger="click" data-kt-menu-placement="bottom-start"
                    class="menu-item menu-lg-down-accordion me-lg-1">
                    <span class="menu-link py-3 ">
                        <span class="menu-title">ดูแลสุขภาพ</span>
                        <span class="menu-arrow d-lg-none"></span>
                    </span>
                    <div class="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-rounded-0 py-lg-4 w-lg-225px">
                        <div class="menu-item">
                            <a class="menu-link py-3 "
                                href="https://pakpooncity.siaminno.co.th/smarthealth_register">
                                <span class="menu-bullet">
                                    <span class="bullet bullet-dot"></span>
                                </span>
                                <span class="menu-title">ข้อมูลสุขภาพ</span>
                            </a>
                        </div>
                                             <div class="menu-item">
                            <a class="menu-link py-3 "
                                href="https://pakpooncity.siaminno.co.th/smarthelth_healthscreening">
                                <span class="menu-bullet">
                                    <span class="bullet bullet-dot"></span>
                                </span>
                                <span class="menu-title">คัดกรองสุขภาพ</span>
                            </a>
                        </div>
                                                                   <div class="menu-item">
                            <a class="menu-link py-3 "
                                href="https://pakpooncity.siaminno.co.th/smarthealth_admin">
                                <span class="menu-bullet">
                                    <span class="bullet bullet-dot"></span>
                                </span>
                                <span class="menu-title">เจ้าหน้าที่ อสม.</span>
                            </a>
                        </div>
                                         </div>
                </div>
     `;
  }
}

customElements.define('navbar-pakpoon', Navbar);
